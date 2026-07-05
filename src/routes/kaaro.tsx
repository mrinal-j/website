import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { SectionLabel } from '~/components/SectionLabel'
import { CountUp } from '~/components/CountUp'
import { useScrollReveal } from '~/hooks/useScrollReveal'
import s from '~/components/case-study/InTheLoop.module.css'
import k from '~/components/case-study/Kaaro.module.css'

export const Route = createFileRoute('/kaaro')({
  head: () => ({
    meta: [
      { title: 'Kaaro — Mrinal Jadhav' },
      { name: 'description', content: 'Branding, strategy and product design for Kaaro, a handcrafted jewelry brand.' },
      // Keep this page hidden from search engines (Google, etc.) while it's
      // being built. Delete this one line when you're ready for it to show up
      // in search results.
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: KaaroPage,
})

function KaaroPage() {
  // Banner "pin and pan": the image frame AND the grey info box pin together
  // under the navbar as one group, so they stay stacked with no gap while the
  // tall photo pans through the frame. Once the image reaches its end, the
  // whole group releases and the page scrolls normally again.
  const mainRef = useRef<HTMLElement>(null)
  const bannerWrapRef = useRef<HTMLDivElement>(null)
  const bannerStickyRef = useRef<HTMLDivElement>(null)
  const bannerFrameRef = useRef<HTMLDivElement>(null)
  const bannerImgRef = useRef<HTMLImageElement>(null)

  // Scroll-triggered reveal: each top-level section fades and rises as it
  // enters the viewport. The banner is a <div> (not a <section>), so it keeps
  // its own pin-and-pan behavior and is skipped.
  useScrollReveal(mainRef)

  useEffect(() => {
    const wrap = bannerWrapRef.current
    const sticky = bannerStickyRef.current
    const frame = bannerFrameRef.current
    const img = bannerImgRef.current
    if (!wrap || !sticky || !frame || !img) return

    const NAV = 60 // fixed navbar height the group pins beneath
    let maxTravel = 0

    const onScroll = () => {
      if (maxTravel <= 0) {
        img.style.transform = 'translateY(0)'
        return
      }
      const top = wrap.getBoundingClientRect().top
      const progress = Math.min(1, Math.max(0, (NAV - top) / maxTravel))
      img.style.transform = `translateY(${-progress * maxTravel}px)`
    }

    const measure = () => {
      // Clear any inline height so we read the CSS-defined band height first.
      frame.style.height = ''
      const cssFrameH = frame.offsetHeight
      const imgH = img.offsetHeight
      // Never let the frame be taller than the image (avoids empty space when
      // the photo is short, e.g. on narrow screens).
      const frameH = Math.min(cssFrameH, imgH)
      frame.style.height = `${frameH}px`
      maxTravel = Math.max(0, imgH - frameH)
      // Wrapper = pinned group height + the panning distance. The extra space
      // is the scroll the pin consumes, and it sits BELOW the whole group so
      // the image and info box never separate.
      wrap.style.height = `${sticky.offsetHeight + maxTravel}px`
      onScroll()
    }

    if (img.complete) measure()
    else img.addEventListener('load', measure)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      img.removeEventListener('load', measure)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <>
      <Navbar alwaysVisible />
      <main ref={mainRef} className={`${s.page} ${k.kaaro} reveal-root`}>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroHeader}>
            <div className={s.heroTitle}>
              <h1>Kaaro</h1>
            </div>
            <div className={s.heroDesc}>
              <p>Branding, strategy and product design for a handcrafted jewelry brand.</p>
            </div>
          </div>
        </section>

        {/* Banner + metadata — pin together as one group while the photo pans */}
        <div className={k.bannerScrollWrap} ref={bannerWrapRef}>
          <div className={k.bannerSticky} ref={bannerStickyRef}>
            <div className={k.bannerFrame} ref={bannerFrameRef}>
              <img
                ref={bannerImgRef}
                className={k.bannerImg}
                src="/images/kaaro_banner.JPG"
                alt="Kaaro handcrafted jewelry"
              />
            </div>

            {/* Metadata Grid */}
            <section className={s.metaGrid}>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Role</span>
                <span className={s.metaValue}>Co-founder,{'\n'}Brand & Product Design</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Skills / Tools</span>
                <span className={s.metaValue}>Brand Identity, Brand Strategy, Market Research, Logo Design, Jewelry Design, Photography, Adobe CC</span>
              </div>
              <div className={s.metaCell}>
                <span className={s.metaLabel}>Timeline</span>
                <span className={s.metaValue}>2 years{'\n'}(founded 2020)</span>
              </div>
              <div className={`${s.metaCell} ${s.metaCellLast}`}>
                <span className={s.metaLabel}>Team</span>
                <span className={s.metaValue}>2 co-founders —{'\n'}Mrinal Jadhav & Richa Premkumar</span>
              </div>
            </section>
          </div>
        </div>

        {/* Overview */}
        <section className={k.overviewSection}>
          <div className={k.overviewLabelWrap}>
            <SectionLabel title="OVERVIEW" />
          </div>
          <figure className={k.overviewFigure}>
            <img
              className={k.overviewImg}
              src="/images/kaaro_headline.png"
              alt="A model wearing Kaaro jewelry in a garden"
            />
            <figcaption className={k.overviewCaption}>
              Accessories that are handcrafted,<br />tasteful, and designed to last.
            </figcaption>
          </figure>
        </section>

        {/* Brand statement */}
        <section className={k.statement}>
          <p className={k.statementLede}>
            Founded in 2020, Kaaro creates unique, affordable and versatile accessories
            that blend modern and traditional elements for Urban Indian women. It was
            shaped end to end: naming, identity, product, packaging and the social
            presence that built a community.
          </p>
        </section>

        {/* Challenges */}
        <section className={k.section}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="CHALLENGES" />
          </div>
          <p className={`${k.sectionIntro} ${k.sectionIntroWide}`}>
            The Instagram small-business boom during COVID flooded the market with
            handmade jewelry.
            <br />
            To survive, Kaaro focused on fixing three main things:
          </p>
          <div className={k.challengeGrid}>
            {[
              // imgPos moves the visible part of each photo up or down:
              // '50% 0%' shows the TOP of the photo, '50% 100%' the BOTTOM,
              // '50% 50%' the middle. Only change the SECOND number.
              {
                title: 'Distinction',
                desc: 'In a saturated feed of similar products, the brand needed an identity that was instantly its own, not another minimalist label.',
                img: '/images/kaaro_01.png',
                imgPos: '50% 30%',
                flip: false,
              },
              {
                title: 'Authenticity',
                desc: 'With thousands of small businesses launching at once, buyers were skeptical. Kaaro had to prove genuine story and craft and build trust.',
                img: '/images/kaaro_02.jpg',
                imgPos: '50% 50%',
                flip: true, // middle card: image on top, icon + number at the bottom
              },
              {
                title: 'Visibility',
                desc: 'Growth of the brand depended on a strategic, creative presence both online and offline, building a community of customers.',
                img: '/images/kaaro_03.png',
                imgPos: '50% 60%',
                flip: false,
              },
            ].map((item, i) => {
              const iconRow = (
                <div className={k.challengeTop}>
                  <img
                    className={k.challengeIcon}
                    src="/images/kaaro_gingko.png"
                    alt=""
                    aria-hidden="true"
                  />
                  <span className={k.challengeNum}>{String(i + 1).padStart(2, '0')}</span>
                </div>
              )
              const photo = (
                <img
                  className={`${k.challengeImg} ${item.flip ? '' : k.challengeImgBottom}`}
                  src={item.img}
                  style={{ objectPosition: item.imgPos }}
                  alt=""
                  aria-hidden="true"
                />
              )
              // The coloured text block gets its own curved edge where it
              // meets the photo (bottom corners normally, top corners when
              // the card is flipped).
              const body = item.flip ? (
                <div className={`${k.challengeBody} ${k.challengeBodyFlip}`}>
                  <h4 className={k.challengeTitle}>{item.title}</h4>
                  <p className={k.challengeText}>{item.desc}</p>
                  {iconRow}
                </div>
              ) : (
                <div className={k.challengeBody}>
                  {iconRow}
                  <h4 className={k.challengeTitle}>{item.title}</h4>
                  <p className={k.challengeText}>{item.desc}</p>
                </div>
              )
              return (
                <div key={i} className={k.challengeCard}>
                  {item.flip ? photo : body}
                  {item.flip ? body : photo}
                </div>
              )
            })}
          </div>
        </section>

        {/* Brand Values + Target Market */}
        <section className={`${k.section} ${k.valuesSection}`} style={{ paddingTop: 64 }}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="BRAND VALUES" />
          </div>
          <p className={k.sectionIntro}>
            Six principles guide every piece, every photo, and every interaction.
          </p>
          <div className={k.valueCapsules}>
            {['Handcrafted', 'Simplicity', 'Tastefulness', 'Affordability', 'Indo-western elements', 'Elegance'].map((v) => (
              <span key={v} className={k.valueCapsule}>{v}</span>
            ))}
          </div>
          <div className={k.targetRow}>
            <span className={k.targetLabel}>Target Market</span>
            <span className={k.targetValue}>Urban Indian women, ages 18+</span>
          </div>
        </section>

        {/* Visual Identity */}
        <section className={k.section} style={{ paddingTop: 64, paddingBottom: 8 }}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="VISUAL IDENTITY" />
          </div>
          <div className={k.visualContent}>
            <div className={k.visualLogo}>
              <img src="/images/kaaro_logo.png" alt="Kaaro logo" />
            </div>
            <div className={k.visualText}>
              <h3 className={k.visualHeadline}>A logo rooted in meaning</h3>
              <p className={k.visualBody}>
                The mark pairs the Japanese <strong>enso</strong> — symbolizing enlightenment, strength,
                and the universe's continuous cycle — with <strong>ginkgo leaves</strong>, which stand
                for resilience and longevity. Together they capture Kaaro's belief that jewelry should
                be both timeless and personal.
              </p>
            </div>
          </div>

          {/* Colour palette */}
          <div className={k.sectionLabelWrap} style={{ paddingTop: 56 }}>
            <SectionLabel title="COLOUR PALETTE" />
          </div>
          <div className={k.paletteRow}>
            {[
              { hex: '#0F4747' },
              { hex: '#C9B866' },
              { hex: '#FFFFF1' },
            ].map((c) => (
              <div key={c.hex} className={k.swatch}>
                <div className={k.swatchColor} style={{ background: c.hex }} />
                <span className={k.swatchHex}>{c.hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Strategy */}
        <section className={k.section} style={{ paddingTop: 64, paddingBottom: 80 }}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="BRAND STRATEGY" />
          </div>
          <p className={k.sectionIntro}>
            Four moves to build distinctiveness, trust, and community.
          </p>
          <div className={k.strategyRow}>
            {[
              { title: 'Innovative Branding', desc: 'Creative packaging and consistent design innovation that makes Kaaro instantly recognizable.' },
              { title: 'Sustainable Packaging', desc: 'Eco-conscious options such as palm-leaf packaging that reflect the brand’s values.' },
              { title: 'Engagement', desc: 'Instagram and Facebook content, pop-ups, and flea markets to meet customers where they are.' },
              { title: 'Collaborations', desc: 'Partnerships with influencers, artists, photographers, and lifestyle brands to widen reach.' },
            ].map((item, i) => (
              <div key={i} className={k.strategyCard}>
                <span className={k.strategyNum}>{String(i + 1).padStart(2, '0')}</span>
                <h4 className={k.strategyTitle}>{item.title}</h4>
                <p className={k.strategyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Results & Impact (dark) */}
        <section className={s.impactSection}>
          <SectionLabel title="RESULTS & IMPACT" dark />
          <h2 className={s.impactHeadline}>
            From a two-person idea to a brand loved across India.
          </h2>

          <div className={k.resultsStats}>
            <div className={k.resultStat}>
              <span className={k.resultNum}><CountUp to={1500} duration={1800} />+</span>
              <span className={k.resultLabel}>Sales across India</span>
            </div>
            <div className={k.resultStat}>
              <span className={k.resultNum}><CountUp to={10} duration={1400} /></span>
              <span className={k.resultLabel}>Pop-up events</span>
            </div>
            <div className={k.resultStat}>
              <span className={k.resultNum}><CountUp to={5} duration={1200} /></span>
              <span className={k.resultLabel}>Press & feature mentions</span>
            </div>
            <div className={k.resultStat}>
              <span className={k.resultNum}><CountUp to={10} duration={1400} />+</span>
              <span className={k.resultLabel}>Collaborations</span>
            </div>
          </div>

          <h2 className={s.impactClosing} style={{ marginTop: 56 }}>
            Beyond the numbers, Kaaro built <span className={s.impactClosingHighlight}>lasting brand visibility and customer loyalty</span> — one handcrafted piece at a time.
          </h2>
        </section>
      </main>
      <Footer />
    </>
  )
}
