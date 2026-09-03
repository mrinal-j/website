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

// The four tensions the identity had to hold at once. Numbered in the row,
// the way the UN80 challenge grid is.
const PROBLEMS = [
  {
    title: 'Warmth without childishness',
    desc: 'Paediatric care defaults to bright, rounded and illustrative, the visual shorthand for friendly. But this identity had to sit inside a hospital, be approved by administrators, and still feel like it belonged to the child rather than the department. Too playful and it reads as a school project. Too clinical and it disappears into the hospital around it.',
  },
  {
    title: 'Six specialties, one promise',
    desc: 'Integration is the entire proposition. Six departments that currently operate separately had to look like one offer, without splintering into six sub-brands, and without flattening into something so general it says nothing.',
  },
  {
    title: 'A brand inside a brand',
    desc: 'The initiative lives within an existing hospital that has its own established identity. It needed enough distinctiveness to be recognised as a specific programme, while visibly belonging to its host institution.',
  },
  {
    title: 'Designing for a service that does not exist',
    desc: 'No patients treated, no outcomes, no photographs. Every decision was made for a version of the initiative that had not happened yet.',
  },
]

// The four brand attributes, drawn from the founding team's own word bank.
// Trust, one roof and holistic are folded into the definitions rather than
// listed separately, so the set stays at four memorable words.
const ATTRIBUTES = [
  {
    name: 'Warm',
    desc: 'The warmth of a good doctor, not of a toy shop. Approachable to a parent who is already anxious, without becoming childish.',
  },
  {
    name: 'Whole',
    desc: 'One file, one team, one door. Every element reinforces convergence rather than addition.',
  },
  {
    name: 'Together',
    desc: 'The initiative only exists because people give their time. Community is the mechanism here, not the sentiment.',
  },
  {
    name: 'Enduring',
    desc: 'The promise is continuity of care, so the identity had to be built to still look correct in a decade.',
  },
]

// TODO: replace with the real reference clusters from the territory board.
// Each one needs what it offered and what it risked, in the voice of the
// notes written at the time.
const TERRITORIES = [
  { name: 'Territory one', caption: 'What this cluster offered, and what it risked. Replace with the notes from the board.' },
  { name: 'Territory two', caption: 'What this cluster offered, and what it risked. Replace with the notes from the board.' },
  { name: 'Territory three', caption: 'What this cluster offered, and what it risked. Replace with the notes from the board.' },
]

// TODO: replace with the real logo routes. Every route needs the specific
// reason it was set aside, not a general one.
const ROUTES = [
  {
    name: 'Route one',
    reaching: 'What this route was reaching for.',
    verdict: 'The specific reason it was dropped.',
  },
  {
    name: 'Route two',
    reaching: 'What this route was reaching for.',
    verdict: 'The specific reason it was dropped.',
  },
  {
    name: 'Route three',
    reaching: 'What this route was reaching for.',
    verdict: 'The specific reason it was dropped.',
  },
]

// TODO: replace with the real reflections. The strongest thread available:
// designing something permanent for a service with no history, for a family
// you have not met, that first has to survive a room it was not designed for.
const REFLECTIONS = [
  {
    title: '[Reflection one]',
    body: '[Designing something permanent for a service that has no history yet.]',
  },
  {
    title: '[Reflection two]',
    body: '[Designing for a family you have not met, in a room that has not opened.]',
  },
  {
    title: '[Reflection three]',
    body: '[What you would carry into the next piece of work like this.]',
  },
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
          <div className={`${c.ph} ${c.bannerPh}`}>
            Final mark, full bleed
          </div>
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section className={s.metaGrid}>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Role</span>
            <span className={s.metaValue}>
              Brand Strategy, Identity Design, Print Collateral
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
                A child with cerebral palsy in rural Karnataka may need an
                orthopaedic surgeon, an occupational therapist, an audiologist
                and a psychiatrist.
              </p>
              <p className={c.bodyText}>
                That means four departments, four appointments, four separate
                days, and for a family earning daily wages, four days of lost
                income. Each separate visit is a chance to fall out of the
                system, which most families end up doing.
              </p>
              <p className={c.bodyText}>
                The initiative's aim is to make sure this happens within one
                visit, under a single roof.
              </p>
            </div>
            {/* Filler illustration of the current journey: four visits,
                four days, families falling out at each handover. Swap the
                file at this path to replace it. */}
            <figure className={c.journeyFigure}>
              <img
                className={c.journeyImg}
                src="/images/integrated-care-journey.svg"
                alt="The current journey: four separate hospital visits across four days, one specialty each, with families falling out of the system at each handover."
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

        {/* ============ THE IDENTITY — the outcome, placed up front. The
             strategy and exploration that produced it follow. ============ */}
        <section className={c.section}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="THE IDENTITY" number="02" />
          </div>
          <p className={`${c.bodyText} ${c.bodyLead}`}>
            {/* TODO: what the final mark is, and why it answered both tests.
                Two or three sentences, then let the images run. */}
            [What the final mark is, and why it answered both tests: recognisable
            as theirs by a parent, serious by a surgeon.]
          </p>
        </section>

        {/* The mark, alone, on its own band. */}
        <section className={c.markBand}>
          <div className={`${c.ph} ${c.phWide}`}>The mark, full bleed</div>
        </section>

        <section className={c.section}>
          <h3 className={c.specTitle}>Construction</h3>
          <p className={c.specCaption}>
            [The geometry or system underneath the mark.]
          </p>
          <div className={`${c.ph} ${c.phWide}`}>Construction drawing</div>

          <h3 className={c.specTitle}>Lockups</h3>
          <p className={c.specCaption}>
            Primary, horizontal, stacked, and the symbol on its own.
          </p>
          <div className={c.tileRow}>
            {['Primary', 'Horizontal', 'Stacked', 'Symbol alone'].map((t) => (
              <div className={`${c.ph} ${c.phSquare}`} key={t}>{t}</div>
            ))}
          </div>

          <h3 className={c.specTitle}>Alongside the hospital's identity</h3>
          <p className={c.specCaption}>
            The endorsement relationship: distinct enough to be recognised as
            its own programme, visibly belonging to its host institution.
          </p>
          <div className={`${c.ph} ${c.phHalf}`}>Endorsement lockup</div>

          <h3 className={c.specTitle}>Palette</h3>
          <p className={c.specCaption}>
            {/* TODO: the anchor colour and its rationale. Worth saying what
                you moved away from: the paediatric primary-brights and the
                corporate-hospital blue both fail the positioning, for
                opposite reasons. */}
            [Anchor colour and rationale.] Chosen against two tests: does it
            hold authority next to the hospital's own identity, and does it stay
            warm printed on uncoated, low-cost stock.
          </p>
          <div className={c.pillRow}>
            {[1, 2, 3, 4].map((n) => (
              <div className={c.pillItem} key={n}>
                <div className={`${c.pill} ${c.ph}`}>Swatch</div>
                <p className={c.pillName}>[Name]</p>
                <p className={c.pillHex}>#000000</p>
              </div>
            ))}
          </div>

          <h3 className={c.specTitle}>Typography</h3>
          <p className={c.specCaption}>
            {/* TODO: if the chosen typeface has Kannada or Devanagari
                coverage, say so and say why. Script support is a specific,
                contextual decision that shows you understood where this
                lives. */}
            [Typeface, and why. Note the script coverage if it has any.]
          </p>
          <div className={`${c.ph} ${c.phHalf}`}>Typography in use</div>

          <h3 className={c.specTitle}>Supporting elements</h3>
          <p className={c.specCaption}>
            [The six-specialty device, pattern, or system element.] This is the
            most direct visual proof of integration.
          </p>
          <div className={`${c.ph} ${c.phWide}`}>Supporting elements</div>

          <h3 className={c.specTitle}>Built to survive its own conditions</h3>
          <p className={c.specCaption}>
            Minimum size, clear space, single colour and reversed: proof it
            works on a flyer footer and on a badge. [If true: the mark had to
            survive a photocopier and a WhatsApp compression before anything
            else. Both were tested early, and both eliminated routes.]
          </p>
          <div className={`${c.tileRow} ${c.tileRowThree}`}>
            {['Single colour', 'Reversed', 'Minimum size'].map((t) => (
              <div className={`${c.ph} ${c.phSquare}`} key={t}>{t}</div>
            ))}
          </div>
        </section>

        {/* ============ THE FLYER — the identity translated for the
             boardroom. ============ */}
        <section className={`${c.section} ${c.sectionAlt}`}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="THE FLYER" number="03" />
          </div>
          <h2 className={c.sectionHeadline}>
            The same identity, switched into an institutional register.
          </h2>
          <p className={c.bodyText}>
            The flyer is the identity's first and only live application, and it
            carries a specific load. It is handed across a desk in a funding
            conversation, and forwarded to specialists who are being asked to
            give up a Saturday.
          </p>
          <p className={c.bodyText}>
            This is where the identity switches register. The mark stays as it
            is. Everything around it becomes structural: the six specialties
            laid out as a model rather than a list, specifics instead of
            appeals, the mechanism made legible in the first three seconds.
          </p>
          <p className={c.bodyText}>
            {/* TODO: two or three decisions. Hierarchy, how the six
                specialties are shown, what was cut and why. */}
            [Two or three decisions: hierarchy, how the six specialties are
            shown, what was cut and why.]
          </p>
          <div className={`${c.tileRow} ${c.tileRowTwo}`} style={{ marginTop: '48px' }}>
            <div className={`${c.ph} ${c.phWide}`}>Flyer, front</div>
            <div className={`${c.ph} ${c.phWide}`}>Flyer, back</div>
          </div>

          {/* TODO: two or three speculative applications, labelled honestly
              as proposed. One application makes an identity look untested;
              three make it look like a system. */}
          <h3 className={c.specTitle}>Proposed applications</h3>
          <p className={c.specCaption}>
            Not yet produced. Shown to test the system rather than to claim it
            has shipped.
          </p>
          <div className={`${c.tileRow} ${c.tileRowThree}`}>
            {['Room signage', 'ID badge', 'Donor one-pager'].map((t) => (
              <div className={`${c.ph} ${c.phSquare}`} key={t}>{t}</div>
            ))}
          </div>
        </section>

        {/* ============ BRAND STRATEGY ============ */}
        <section className={c.section}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="BRAND STRATEGY" number="04" />
          </div>
          <p className={c.positioning}>An initiative held together by goodwill.</p>
          <p className={c.bodyText}>
            Care that runs on volunteered expertise, donated support and the
            hospital's own space, organised around the family rather than the
            department, and built to last.
          </p>

          <div className={c.attributeGrid}>
            {ATTRIBUTES.map((a) => (
              <div key={a.name}>
                <h3 className={c.attributeName}>{a.name}</h3>
                <p className={c.attributeText}>{a.desc}</p>
              </div>
            ))}
          </div>

          <div className={c.underneath}>
            <p className={`${c.bodyText} ${c.bodyLead}`}>
              Running underneath all four: dignity. The initiative serves
              families who are used to being processed. The identity's quiet job
              is to make the encounter feel like care, not charity.
            </p>
          </div>
        </section>

        {/* ============ VISUAL TERRITORY — named clusters, not one
             undifferentiated reference wall. ============ */}
        <section className={`${c.section} ${c.sectionAlt}`}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="VISUAL TERRITORY" number="05" />
          </div>
          <p className={c.bodyText}>
            {/* TODO: the synthesis line. The specific intersection taken
                forward is the most valuable sentence in this section. */}
            [The synthesis line: the specific intersection of these territories
            that was taken forward.]
          </p>
          <div className={c.territoryGrid}>
            {TERRITORIES.map((t) => (
              <div key={t.name}>
                <div className={`${c.ph} ${c.phSquare}`}>{t.name}</div>
                <h3 className={c.territoryName}>{t.name}</h3>
                <p className={c.caption}>{t.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ LOGO EXPLORATION — routes and why they failed, each
             judged against the same single question. ============ */}
        <section className={c.section}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="LOGO EXPLORATION" number="06" />
          </div>
          <h2 className={c.sectionHeadline}>
            Would a parent recognise this as theirs, and would a surgeon
            recognise it as serious?
          </h2>
          <p className={c.bodyText}>
            Every route was tested against that same question. Most failed one
            or the other.
          </p>
          <div style={{ marginTop: '48px' }}>
            {ROUTES.map((r) => (
              <div className={c.routeRow} key={r.name}>
                <div>
                  <h3 className={c.routeName}>{r.name}</h3>
                  <p className={c.routeText}>{r.reaching}</p>
                  <p className={`${c.routeText} ${c.routeVerdict}`}>{r.verdict}</p>
                </div>
                <div className={`${c.ph} ${c.phHalf}`}>{r.name} explorations</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ REFLECTIONS — the honest close, each note set off
             by a rule on the left. ============ */}
        <section className={`${c.section} ${c.sectionAlt}`}>
          <div className={c.sectionLabelWrap}>
            <SectionLabel title="REFLECTIONS" number="07" />
          </div>
          <div className={c.reflectionsContent}>
            {REFLECTIONS.map((r) => (
              <div className={c.reflectionItem} key={r.title}>
                <h3 className={c.reflectionTitle}>{r.title}</h3>
                <p className={c.reflectionBody}>{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        <MoreWork currentSlug="/integrated-care-for-children" />
      </main>
      <Footer />
    </>
  )
}
