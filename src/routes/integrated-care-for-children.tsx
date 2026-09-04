import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { MoreWork } from '~/components/case-study/MoreWork'
import { SectionLabel } from '~/components/SectionLabel'
import { useScrollReveal } from '~/hooks/useScrollReveal'
import s from '~/components/case-study/InTheLoop.module.css'
import c from '~/components/case-study/IntegratedCare.module.css'

export const Route = createFileRoute('/integrated-care-for-children')({
  head: () => ({
    meta: [
      { title: 'Integrated Care for Children — Mrinal Jadhav' },
      {
        name: 'description',
        content:
          'Brand identity for a volunteer-run paediatric care initiative in Karnataka, India, bringing six specialties under a single window of care.',
      },
      // Hide this page from search engines while it's still being built.
      // Remove this line when ready to launch.
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: IntegratedCarePage,
})

// The banner's colour cells. Fixed sequences rather than random ones: the
// page is prerendered, so a value that differed between server and browser
// would flicker on load. Each column of three is mixed by hand so no two
// touching cells share a colour, and white is used sparingly, the way it is
// in the artwork itself.
const Y = '#FEC661'
const R = '#F04F39'
const P = '#F6A9BE'
const N = '#263474'
const W = '#FFFFFF'

// Read top to bottom, then left to right. The left run ends beside the
// artwork's yellow edge, so it leads away from yellow.
const BANNER_CELLS_LEFT = [
  N, R, Y,  P, Y, N,  R, N, P,  Y, P, R,  N, Y, W,  P, R, N,
]
// The right run starts beside the artwork's red edge.
const BANNER_CELLS_RIGHT = [
  N, Y, P,  Y, P, R,  W, N, Y,  R, Y, N,  P, R, Y,  N, P, R,
]

// The palette, as supplied. `light` marks the blocks pale enough to need
// dark type on them.
const PALETTE = [
  { hex: '#000000' },
  { hex: '#263474' },
  { hex: '#F04F39' },
  { hex: '#F6A9BE', light: true },
  { hex: '#FEC661', light: true },
  { hex: '#FFFFFF', light: true },
]

function IntegratedCarePage() {
  const mainRef = useRef<HTMLElement>(null)
  // Each top-level <section> fades and rises in as it enters the viewport.
  useScrollReveal(mainRef)

  return (
    <>
      <Navbar alwaysVisible />
      <main ref={mainRef} className={`${s.page} ${c.integratedCare} reveal-root`}>
        {/* ============ HERO ============ */}
        <section className={s.hero}>
          <div className={s.heroHeader}>
            <div className={s.heroTitle}>
              <h1>Integrated Care for Children</h1>
            </div>
            <div className={s.heroDesc}>
              <p>
                Brand identity for a volunteer-run paediatric care initiative
                in Karnataka, India.
              </p>
            </div>
          </div>
        </section>

        {/* ============ HERO BANNER — the finished mark, wordless. It gives
             the reader something to hold before the argument starts, and
             because it makes no claim it cannot pre-empt one. ============ */}
        <section className={c.bannerBand}>
          {/* The artwork is never cropped at the sides. It sits at its own
              width and the space left over on either side is filled with
              live cells on the same 160px module the collage is built on,
              so the band extends to any screen width without the
              photographs losing their edges. */}
          <div className={c.bannerFill} aria-hidden="true">
            {BANNER_CELLS_LEFT.map((hex, n) => (
              <span
                className={c.bannerCell}
                key={n}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
          <img
            className={c.bannerImg}
            src="/images/banner_icc.webp"
            alt="A collage banner: black and white photographs of mothers holding their children, interleaved with blocks of the identity's yellow, red, pink and navy."
          />
          <div className={c.bannerFill} aria-hidden="true">
            {BANNER_CELLS_RIGHT.map((hex, n) => (
              <span
                className={c.bannerCell}
                key={n}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section className={s.metaGrid}>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Role</span>
            <span className={s.metaValue}>
              Brand Identity, Print Collateral
            </span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Timeline</span>
            <span className={s.metaValue}>6 weeks, brief to approved identity</span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Team</span>
            <span className={s.metaValue}>
              Sole designer, collaborating with the lead doctor of the
              initiative
            </span>
          </div>
          <div className={`${s.metaCell} ${s.metaCellLast}`}>
            <span className={s.metaLabel}>Tools</span>
            <span className={s.metaValue}>
              Figma, Adobe Creative Cloud
            </span>
          </div>
        </section>

        {/* ============ OVERVIEW ============ */}
        <section className={c.section}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="OVERVIEW" />
          </div>
          <p className={c.overviewText}>
            Integrated Care for Children brings six specialties under a{' '}
            <span>single window of voluntary care</span> for disabled and
            underprivileged children at a private hospital in Karnataka, India.
          </p>
          <p className={c.bodyText} style={{ marginTop: '32px' }}>
            The initiative runs entirely on donated time and goodwill:
            specialists volunteering clinical hours, the hospital providing the
            room, donors covering the cost of treatment. I worked with the initiative's founding surgeon to build its
            brand foundation, both the identity it will carry permanently and
            the first piece of collateral used to take it to the hospital board
            and to prospective funders.
          </p>
        </section>

        {/* ============ WHY IT EXISTS — the emotional beat of the page, and
             the place for the single-window diagram. ============ */}
        <section className={`${c.section} ${c.sectionAlt}`}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="WHY IT EXISTS" number="01" />
          </div>
          <div className={c.whyGrid}>
            <div>
              <p className={`${c.bodyText} ${c.bodyLead}`}>
                A child with cerebral palsy in rural Karnataka may need a
                paediatrician, an orthopaedic surgeon, an occupational
                therapist, an audiologist and a psychiatrist.
              </p>
              <p className={c.bodyText}>
                That means five departments, five appointments, five separate
                days, and for a family earning daily wages, five days of lost
                income. Each separate visit is a chance to fall out of the
                system, which most families end up doing.
              </p>
              <p className={c.bodyText}>
                The initiative's aim is to make sure this happens within one
                visit, under a single roof. Every specialist in that room has
                volunteered their time to be there, so the visit costs the
                family nothing.
              </p>
            </div>
            {/* Filler illustration of the current journey: five visits,
                five days, families falling out at each handover. Swap the
                file at this path to replace it. */}
            <figure className={c.journeyFigure}>
              <img
                className={c.journeyImg}
                src="/images/integrated-care-journey.svg"
                alt="The current journey: five separate hospital visits across five days, one specialty each, with families falling out of the system at each handover."
              />
            </figure>
          </div>
        </section>

        {/* ============ THE ASK ============ */}
        <section className={c.section}>
          {/* The brief itself, set apart in a coloured box. The label sits
              inside the box, so it runs without its trailing line. */}
          <div className={`${c.askBox} ${c.askBoxCentered}`}>
            <SectionLabel title="THE ASK" noLine />
            <p className={c.askText}>
              To build the visual language and identity for the initiative
              "Integrated Care for Children", along with the first asset of a
              flyer that would be used to introduce the initiative to the
              hospital administration and to prospective donors.
            </p>
          </div>
        </section>

        {/* ============ THE IDENTITY — one continuous board rather than a
             run of separate sections. Tiles butt edge to edge, each carrying
             a small label and nothing else: the artwork does the explaining.
             ============ */}
        <section className={c.identityHeader}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="THE IDENTITY" number="02" />
          </div>
          <p className={`${c.bodyText} ${c.bodyLead}`}>
            The initiative is built so a child's care can be completed inside
            one system, rather than sending the family out of it and hoping
            they find their way back in. Care within a single loop.
          </p>
          <p className={c.bodyText}>
            The logomark draws its inspiration from that concept. Drawn as one
            unbroken line, the loop resolves into a parent and a child, so the
            thought and the picture are the same shape. A parent sees two
            figures. A hospital sees care that holds together.
          </p>
          <p className={c.bodyText}>
            Colour is where the identity loosens up. The warm run from red
            through pink to yellow adds a playful spirit, and it is
            deliberately the loudest thing in the system. The navy holds it in
            balance, steady underneath, so the warmth reads as care rather than
            decoration.
          </p>
        </section>

        <section className={c.boardWrap} aria-label="Identity style guide">
          <div className={c.board}>
            {/* Row 1 — the primary lockup, the full width of the grid. */}
            <div className={`${c.tile} ${c.tileWhite}`}>
              <span className={c.tileLabel}>Primary logo</span>
              <img
                className={`${c.tileArt} ${c.artPrimary}`}
                src="/images/icc-primary-logo.svg"
                alt="The Integrated Care for Children primary logo: a linked adult and child figure drawn in one continuous warm gradient line, beside the name set in three lines."
              />
            </div>

            {/* Row 2 — the reversed lockup, wider, beside the mark alone. */}
            <div className={c.rowSecondary}>
              <div className={`${c.tile} ${c.tileNavy}`}>
                <span className={`${c.tileLabel} ${c.tileLabelLight}`}>
                  Secondary logo
                </span>
                <img
                  className={`${c.tileArt} ${c.artSecondary}`}
                  src="/images/icc-secondary-logo.svg"
                  alt="The secondary logo: the same lockup reversed out of the deep navy ground."
                />
              </div>
              <div className={`${c.tile} ${c.tileWhite} ${c.tileHairline}`}>
                <span className={c.tileLabel}>Logomark</span>
                <img
                  className={`${c.tileArt} ${c.artMark}`}
                  src="/images/icc-logomark.svg"
                  alt="The logomark on its own: the adult and child figure, without the name."
                />
              </div>
            </div>

            {/* Row 3 — typography, the two families and the role each carries. */}
            <div className={`${c.tile} ${c.tileWhite} ${c.tileType}`}>
              <span className={c.tileLabel}>Typography</span>
              <div className={c.typeMap}>
                <div className={c.typeMapRow}>
                  <span
                    className={`${c.typeMapFace} ${c.typeClash} ${c.typeSemibold}`}
                  >
                    Clash Grotesk Semibold
                  </span>
                  <span className={c.typeMapArrow} aria-hidden="true" />
                  <span
                    className={`${c.typeMapUse} ${c.typeClash} ${c.typeSemibold}`}
                  >
                    Heading 1
                  </span>
                </div>
                <div className={c.typeMapRow}>
                  <span className={`${c.typeMapFace} ${c.typeClash}`}>
                    Clash Grotesk Regular
                  </span>
                  <span className={c.typeMapArrow} aria-hidden="true" />
                  <span className={`${c.typeMapUse} ${c.typeClash} ${c.typeMapUseTwo}`}>
                    Heading 2
                  </span>
                </div>
                <div className={c.typeMapRow}>
                  <span className={`${c.typeMapFace} ${c.typeNunito}`}>
                    Nunito Regular
                  </span>
                  <span className={c.typeMapArrow} aria-hidden="true" />
                  <p className={`${c.typeMapBody} ${c.typeNunito}`}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 4 — construction kept small, with the palette taking the
                wider half beside it. */}
            <div className={c.rowBuild}>
              <div className={`${c.tile} ${c.tileNavy}`}>
                <img
                  className={`${c.tileArt} ${c.artBuild}`}
                  src="/images/icc-logo-build.svg"
                  alt="The construction drawing: the mark laid over the circles its curves are struck from."
                />
              </div>
              {/* The palette fills its half of the row: six blocks butted
                  together, each carrying only its hex. */}
              <div className={c.tilePalette}>
                {PALETTE.map((sw) => (
                  <div
                    className={c.swatchBlock}
                    key={sw.hex}
                    style={{ backgroundColor: sw.hex }}
                  >
                    <span
                      className={`${c.swatchHex} ${
                        sw.light ? c.swatchHexDark : ''
                      }`}
                    >
                      {sw.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 5 — the three applications across one row, the flyer in
                the middle. The photographs fill their tiles rather than
                sitting in padding, so they read as pictures and not as
                artwork. Columns are weighted roughly to each image's own
                proportions, so no one of them is cropped much harder than
                the others. */}
            <div className={c.rowApps}>
              <div className={`${c.tile} ${c.tilePhoto}`}>
                <img
                  className={c.tilePhotoImg}
                  src="/images/icc-coat-mockup.webp"
                  alt="A doctor's white coat with the Integrated Care for Children logo embroidered on the chest."
                />
              </div>
              <div className={`${c.tile} ${c.tilePhoto}`}>
                <img
                  className={c.tilePhotoImg}
                  src="/images/icc-flyer-mockup.webp"
                  alt="The trifold flyer, opened and closed: a navy cover carrying the mark and the name, with inside panels setting out how a contribution helps, how to support the initiative, and the room, clinic hours and contact details."
                />
              </div>
              <div className={`${c.tile} ${c.tilePhoto}`}>
                <img
                  className={c.tilePhotoImg}
                  src="/images/icc-id-mockup.webp"
                  alt="A staff ID badge on a branded lanyard: the logo and the wearer's photograph on the card, with the lanyard carrying the logo and a run of the identity's colour blocks."
                />
              </div>
            </div>
          </div>
        </section>

        {/* The identity closes on what the whole thing is for. */}
        <section className={c.identityClose}>
          <p className={c.positioning}>An initiative held together by goodwill.</p>
          <p className={c.bodyText}>
            Care that runs on volunteered expertise, donated support and the
            hospital's own space, organised around the family rather than the
            department, and built to last.
          </p>
          <p className={`${c.bodyText} ${c.bodyLead}`}>
            Underneath it, dignity. Families arrive having already been through
            a lot of departments and a lot of waiting, and the identity's quiet
            job is to make the encounter feel like care, not charity.
          </p>
        </section>

        {/* ============ REFLECTIONS — the honest close: one note, set off
             by a rule on the left. ============ */}
        <section className={c.section}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="REFLECTIONS" number="03" />
          </div>
          <div className={c.reflectionsContent}>
            <div className={c.reflectionItem}>
              <p className={c.reflectionBody}>
                The timeline was short, which was a concern at first and turned
                out to work in the project's favour. There was no room to go in
                circles over what the design language should be. I went back to
                the words that had come to mind while I was understanding the
                initiative, trusted them, and moved. The doctors recognised the
                initiative in it. What made this one worth building was the care
                behind it. It is now awaiting approval to launch.
              </p>
            </div>
          </div>
        </section>

        <MoreWork currentSlug="/integrated-care-for-children" />
      </main>
      <Footer />
    </>
  )
}
