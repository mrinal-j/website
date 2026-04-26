import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import styles from './MeshGradient.module.css'

// ─────────────────────────────────────────────────────────────
// Ported from a Claude Design prototype: an interactive mesh-gradient
// wallpaper. 6 floating colour nodes blended via inverse-distance
// weighting, cursor-driven warp + wake, click ripples.
//
// Pass `colors` to change the palette (exactly 6 hex strings).
// ─────────────────────────────────────────────────────────────

export interface MeshGradientHandle {
  /** Capture the current canvas frame as a PNG data URL. */
  snapshot: () => string | null
}

interface MeshGradientProps {
  colors?: [string, string, string, string, string, string]
  /** Animation speed multiplier (1 = default). */
  speed?: number
  className?: string
}

const DEFAULT_COLORS: [string, string, string, string, string, string] = [
  '#ffb375',
  '#ffd8b8',
  '#ff8e42',
  '#ffa270',
  '#ffcda3',
  '#f98c43',
]

const VS = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.,1.); }`

const FS = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_vel;
uniform float u_speed;

uniform vec2  u_p[6];
uniform vec3  u_col[6];

uniform vec2  u_rp[6];
uniform float u_rt[6];
uniform float u_ra[6];

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float ar = u_res.x / u_res.y;

  vec2 toMouse = uv - u_mouse;
  toMouse.x *= ar;
  float mDist  = length(toMouse);
  float mProx  = exp(-mDist * mDist * 8.0);

  vec2 warpDir  = vec2(-u_vel.x / ar, -u_vel.y);
  float warpAmt = u_speed * 0.22;
  vec2 warpedUV = uv + warpDir * warpAmt * mProx;

  float wsum = 0.0;
  vec3  csum = vec3(0.0);
  float power = 4.0;

  for(int i = 0; i < 6; i++){
    vec2 dp = warpedUV - u_p[i];
    dp.x *= ar;
    float d2 = dot(dp,dp);
    float w = 1.0 / pow(d2 + 0.0001, power * 0.5);
    wsum += w;
    csum += w * u_col[i];
  }
  vec3 col = csum / wsum;

  float halo = exp(-mDist * mDist * 6.0);
  col = mix(col, min(col * 1.18 + 0.025, vec3(1.0)), halo * 0.45);

  if(u_speed > 0.001){
    vec2 velN = normalize(u_vel);
    vec2 tm2  = toMouse;
    float along = dot(tm2, vec2(velN.x / ar, velN.y));
    float perp  = abs(dot(tm2, vec2(-velN.y / ar, velN.x)));
    float streak = exp(-perp * perp * 120.0)
                 * exp(-max(along, 0.0) * 5.0)
                 * clamp(u_speed * 6.0, 0.0, 1.0);
    col += streak * 0.07;
  }

  for(int i = 0; i < 6; i++){
    if(u_ra[i] > 0.5){
      vec2 rd = uv - u_rp[i];
      rd.x *= u_res.x / u_res.y;
      float dist = length(rd);
      float age  = u_rt[i];
      float ring = exp(-pow(dist - age * 0.7, 2.0) * 180.0);
      float fade = pow(1.0 - age, 2.5);
      col += ring * fade * 0.09;
    }
  }

  float v = length(uv - 0.5);
  col *= 1.0 - smoothstep(0.3, 0.9, v) * 0.28;

  float g = fract(sin(dot(gl_FragCoord.xy + u_time * 37.0, vec2(12.9898,78.233))) * 43758.5453);
  col += (g - 0.5) * 0.012;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

const NODES = [
  { hx: 0.15, hy: 0.85, rx: 0.18, ry: 0.12, spd: 0.19, ph: 0.0 },
  { hx: 0.85, hy: 0.80, rx: 0.14, ry: 0.16, spd: 0.14, ph: 1.1 },
  { hx: 0.75, hy: 0.20, rx: 0.20, ry: 0.11, spd: 0.17, ph: 2.3 },
  { hx: 0.20, hy: 0.25, rx: 0.12, ry: 0.18, spd: 0.22, ph: 3.7 },
  { hx: 0.55, hy: 0.55, rx: 0.22, ry: 0.14, spd: 0.11, ph: 0.8 },
  { hx: 0.40, hy: 0.10, rx: 0.15, ry: 0.10, spd: 0.16, ph: 5.1 },
]

function hexToRgb(h: string): [number, number, number] {
  return [
    parseInt(h.slice(1, 3), 16) / 255,
    parseInt(h.slice(3, 5), 16) / 255,
    parseInt(h.slice(5, 7), 16) / 255,
  ]
}

export const MeshGradient = forwardRef<MeshGradientHandle, MeshGradientProps>(function MeshGradient(
  { colors = DEFAULT_COLORS, speed = 1, className },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorsRef = useRef(colors)
  const speedRef = useRef(speed)
  colorsRef.current = colors
  speedRef.current = speed

  useImperativeHandle(
    ref,
    () => ({
      snapshot: () => {
        const c = canvasRef.current
        if (!c) return null
        try {
          return c.toDataURL('image/png')
        } catch {
          return null
        }
      },
    }),
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // preserveDrawingBuffer lets us capture a snapshot with toDataURL later
    const gl = (canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true })) as WebGLRenderingContext | null
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('[MeshGradient]', gl.getShaderInfoLog(s))
      }
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aloc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aloc)
    gl.vertexAttribPointer(aloc, 2, gl.FLOAT, false, 0, 0)

    const U = {
      res: gl.getUniformLocation(prog, 'u_res'),
      time: gl.getUniformLocation(prog, 'u_time'),
      mouse: gl.getUniformLocation(prog, 'u_mouse'),
      vel: gl.getUniformLocation(prog, 'u_vel'),
      speed: gl.getUniformLocation(prog, 'u_speed'),
    }
    const pLocs = Array.from({ length: 6 }, (_, i) => gl.getUniformLocation(prog, `u_p[${i}]`))
    const colLocs = Array.from({ length: 6 }, (_, i) => gl.getUniformLocation(prog, `u_col[${i}]`))
    const rpLocs = Array.from({ length: 6 }, (_, i) => gl.getUniformLocation(prog, `u_rp[${i}]`))
    const rtLocs = Array.from({ length: 6 }, (_, i) => gl.getUniformLocation(prog, `u_rt[${i}]`))
    const raLocs = Array.from({ length: 6 }, (_, i) => gl.getUniformLocation(prog, `u_ra[${i}]`))

    const syncColors = () => {
      colorsRef.current.forEach((hex, i) => gl.uniform3fv(colLocs[i], hexToRgb(hex)))
    }

    type Ripple = { x: number; y: number; t: number; alive: boolean }
    const ripples: Ripple[] = Array.from({ length: 6 }, () => ({ x: 0.5, y: 0.5, t: 0, alive: false }))
    let nextRip = 0
    const spawnRipple = (nx: number, ny: number) => {
      const r = ripples[nextRip % 6]
      r.x = nx
      r.y = ny
      r.t = 0
      r.alive = true
      nextRip++
    }

    let mouse: [number, number] = [0.5, 0.5]
    let tMouse: [number, number] = [0.5, 0.5]
    let rawVel: [number, number] = [0, 0]
    const smoothVel: [number, number] = [0, 0]

    const onMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth
      const ny = 1 - e.clientY / window.innerHeight
      rawVel = [nx - tMouse[0], ny - tMouse[1]]
      tMouse = [nx, ny]
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const nx = t.clientX / window.innerWidth
      const ny = 1 - t.clientY / window.innerHeight
      rawVel = [nx - tMouse[0], ny - tMouse[1]]
      tMouse = [nx, ny]
    }
    const onClick = (e: MouseEvent) => {
      spawnRipple(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('click', onClick)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      // Match the canvas's displayed CSS size, not the viewport, so the
      // gradient adapts to whatever container we're dropped into.
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)
    resize()

    const start = performance.now()
    syncColors()

    let rafId = 0
    let cancelled = false

    const frame = () => {
      if (cancelled) return
      const now = ((performance.now() - start) / 1000) * speedRef.current

      // keep colours live if the prop changes between frames
      syncColors()

      mouse[0] += (tMouse[0] - mouse[0]) * 0.08
      mouse[1] += (tMouse[1] - mouse[1]) * 0.08
      smoothVel[0] = smoothVel[0] * 0.75 + rawVel[0] * 0.25
      smoothVel[1] = smoothVel[1] * 0.75 + rawVel[1] * 0.25
      rawVel = [0, 0]
      const velMag = Math.sqrt(smoothVel[0] ** 2 + smoothVel[1] ** 2)

      NODES.forEach((n, i) => {
        const angle = now * n.spd + n.ph
        let nx = n.hx + Math.cos(angle) * n.rx
        let ny = n.hy + Math.sin(angle * 0.77 + n.ph) * n.ry
        const dx = mouse[0] - nx
        const dy = mouse[1] - ny
        const dist = Math.sqrt(dx * dx + dy * dy)
        const pull = Math.max(0, 1 - dist / 0.5) * 0.14
        nx += dx * pull
        ny += dy * pull
        gl.uniform2f(pLocs[i], nx, ny)
      })

      ripples.forEach((r, i) => {
        if (r.alive) {
          r.t += 0.008
          if (r.t >= 1) r.alive = false
        }
        gl.uniform2f(rpLocs[i], r.x, r.y)
        gl.uniform1f(rtLocs[i], r.t)
        gl.uniform1f(raLocs[i], r.alive ? 1.0 : 0.0)
      })

      gl.uniform2f(U.res, canvas.width, canvas.height)
      gl.uniform1f(U.time, now)
      gl.uniform2f(U.mouse, mouse[0], mouse[1])
      gl.uniform2f(U.vel, smoothVel[0], smoothVel[1])
      gl.uniform1f(U.speed, velMag)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafId = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className ?? ''}`} aria-hidden="true" />
})
