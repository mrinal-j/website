import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { MoreWork } from '~/components/case-study/MoreWork'
import { SectionLabel } from '~/components/SectionLabel'
import { useScrollReveal } from '~/hooks/useScrollReveal'
import s from '~/components/case-study/InTheLoop.module.css'
import g from '~/components/case-study/Unga80.module.css'

export const Route = createFileRoute('/unga80')({
  head: () => ({
    meta: [
      { title: 'United Nations General Assembly Exhibit 2025 — Mrinal Jadhav' },
      {
        name: 'description',
        content:
          'An immersive UN 2.0 exhibit at UN Headquarters for the 80th General Assembly, with a visual identity built on AI-generated photography.',
      },
    ],
  }),
  component: Unga80Page,
})

// The identity banners that stood in the passage, in wall order. The zigzag
// takes a different colour on each.
const BANNERS = [
  { src: '/images/unga80-banner-1.webp', alt: 'Enter UN 2.0 banner: Exceptional times call for exceptional people, in blue, with a figure whose head is a filament light bulb' },
  { src: '/images/unga80-banner-2.webp', alt: 'Enter UN 2.0 banner: Exceptional times call for exceptional people, in purple and magenta, with a woman standing in a lit corridor' },
  { src: '/images/unga80-banner-3.webp', alt: 'Enter UN 2.0 banner: Exceptional times call for exceptional data, in red and orange, with a data dashboard on screen' },
  { src: '/images/unga80-banner-4.webp', alt: 'Enter UN 2.0 banner: Exceptional times call for exceptional data, in yellow, with a woman holding a light to her eye' },
  { src: '/images/unga80-banner-5.webp', alt: 'Enter UN 2.0 banner: Exceptional times call for exceptional solutions, in green, with a praying mantis resting on a hand' },
]

// The four voting banners. Each posed a question and left the answering to
// the room: visitors placed a sticker in the colour of who they were.
const QUESTIONS = [
  { src: '/images/unga80-question-1.webp', alt: 'Vote now banner: which innovations are working and should keep growing? A grid of options for visitors to vote on' },
  { src: '/images/unga80-question-2.webp', alt: "Vote now banner: where do you see the biggest potential for the UN's future work? A grid of options for visitors to vote on" },
  { src: '/images/unga80-question-3.webp', alt: "Vote now banner: how ready is the UN to meet today's challenges? A low-to-high scale for each of data, digital, innovation, foresight and behavioural science" },
  { src: '/images/unga80-question-4.webp', alt: 'The $3B Game banner: you have 3 UNGAbucks, where do you invest for the next 5 years? An empty investment jar garden for visitors to fill' },
]

function Unga80Page() {
  const mainRef = useRef<HTMLElement>(null)
  // Each top-level <section> fades and rises in as it enters the viewport.
  useScrollReveal(mainRef)

  return (
    <>
      <Navbar alwaysVisible />
      <main ref={mainRef} className={`${s.page} ${g.unga80} reveal-root`}>
        {/* ============ HERO ============ */}
        <section className={s.hero}>
          <div className={s.heroHeader}>
            <div className={s.heroTitle}>
              <h1>United Nations General Assembly Exhibit 2025</h1>
            </div>
            <div className={s.heroDesc}>
              <p>
                An immersive UN 2.0 exhibit at UN Headquarters, with a visual
                identity built on AI-generated photography.
              </p>
            </div>
          </div>
        </section>

        {/* ============ HERO BANNER — full-width, edge to edge. The wall
             artwork is roughly 9:1, far wider than the band, so it is
             cropped from the right and pinned to its left edge, keeping
             the #UNGA80 title panel in frame. ============ */}
        <section className={g.bannerBand}>
          <img
            className={g.bannerImg}
            src="/images/UNGA+Wall.webp"
            alt="The UNGA80 exhibit wall: a #UNGA80 title panel followed by a run of image panels, joined by a zigzag line that changes colour across them"
          />
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section className={s.metaGrid}>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Role</span>
            <span className={s.metaValue}>
              Exhibition design, Visual identity, AI imagery, Art direction,
              Brand design, Print design
            </span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Timeline</span>
            <span className={s.metaValue}>4 weeks</span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Team</span>
            <span className={s.metaValue}>
              Enerel Enkhsarnai (Lead Designer), Abel Fekade (Photographer)
            </span>
          </div>
          <div className={`${s.metaCell} ${s.metaCellLast}`}>
            <span className={s.metaLabel}>Tools</span>
            <span className={s.metaValue}>
              Figma, Adobe Photoshop, Adobe Illustrator, Google Whisk
            </span>
          </div>
        </section>

        {/* ============ CONTEXT ============ */}
        <section className={g.section}>
          <SectionLabel title="CONTEXT" />
          <div className={g.contextGrid}>
            <div className={g.contextBody}>
              <p className={g.contextPara}>
                At 80, the United Nations is working to stay fit for purpose in a
                fast-changing world. UN 2.0 is the transformation agenda
                behind that effort, scaling the use of data, digital,
                innovation, foresight and behavioural science to deliver better
                results for people and planet.
              </p>
              <p className={g.contextPara}>
                UNGA80 put that work on a global stage: a chance to show
                system-wide progress, point to concrete impact, and invite a
                wide audience to shape the future of multilateralism.
              </p>
            </div>
            <img
              className={g.contextPhoto}
              src="/images/unga80-unga-sign.webp"
              alt="Delegates gathered around the #UNGA letter sculpture on the plaza outside UN Headquarters"
              loading="lazy"
            />
          </div>
        </section>

        {/* ============ THE ASK — the brief, then the fixed facts of the
             job underneath it. ============ */}
        <section className={g.section}>
          <SectionLabel title="THE ASK" />
          <p className={g.askLead}>
            Transform the high-traffic area in the UN Secretariat into a
            bright, participatory meeting point, where passers-by are drawn in
            by bold visuals, stay for conversation, and leave with content to
            share. Create an engaging exhibit that showcases the quintets of the
            UN 2.0 agenda.
          </p>
          <p className={g.askNote}>
            The ask covered the installation and the activations across the
            whole area: a large curved wall, the pillars along the passage, and
            the lounge.
          </p>

          <div className={g.factRow}>
            <div>
              <div className={g.factLabel}>Audience</div>
              <div className={g.factValue}>
                World leaders, Member States, delegates and UN colleagues
              </div>
            </div>
            <div>
              <div className={g.factLabel}>Constraint</div>
              <div className={g.factValue}>
                A natural flow point with high visibility, but no staff on
                site, so the design had to carry the whole conversation
              </div>
            </div>
            <div>
              <div className={g.factLabel}>My contribution</div>
              <div className={g.factValue}>
                Conceptualising the interactive exhibit, exploring AI-generated
                imagery against the existing brand identity to build a new
                identity for the event, and creating the assets for the pillars
              </div>
            </div>
          </div>
        </section>

        {/* ============ THE OUTCOME ============ */}
        <section className={g.section}>
          <SectionLabel title="THE OUTCOME" />
          <p className={g.outcomeText}>
            Three columns standing between the wall and the lounge carried the
            exhibit: high-resolution UN 2.0 visuals on some faces, the questions
            on the others. Built from AI-generated imagery, they showcased the
            five tools of UN 2.0, the United Nations' transformation agenda:
            data, digital, innovation, foresight and behavioural science. What
            carries over from the parent brand are its core colours and elements
            drawn from the quintet icon.
          </p>

          {/* The identity banners, filling the full content width. */}
          <div className={g.bannerRow}>
            {BANNERS.map((b) => (
              <img
                key={b.src}
                className={g.bannerTile}
                src={b.src}
                alt={b.alt}
                loading="lazy"
              />
            ))}
          </div>
          {/* The voting banners, with the copy about them held alongside and
              centred against their height. */}
          <div className={g.questionGrid}>
            <div className={g.questionRow}>
              {QUESTIONS.map((q) => (
                <img
                  key={q.src}
                  className={g.bannerTile}
                  src={q.src}
                  alt={q.alt}
                  loading="lazy"
                />
              ))}
            </div>
            <div className={g.questionCopy}>
              <p className={g.questionText}>
                The exhibit opened with questions, drawing out how tools like
                AI, data platforms and digital public infrastructure can speed
                up decision-making, improve service delivery, and bring the UN
                closer to the people it serves.
              </p>
              <p className={g.questionNote}>
                Visitors answered by dot voting, so the wall filled in as a
                picture of who thought what: Member States, public and private
                sector, and UN colleagues.
              </p>
            </div>
          </div>

          {/* The columns themselves: one face carrying the identity, the
              next carrying a question with the votes on it. */}
          <div className={g.imgPair}>
            <figure className={g.imgFigure}>
              <div className={g.imgPairTall}>
                <img
                  className={g.photo}
                  src="/images/unga80-column-voting.webp"
                  alt="A column in the lounge with an Enter UN 2.0 banner on one face and a Vote Now banner on the next, dots already placed against the answers"
                  loading="lazy"
                />
              </div>
              <figcaption className={g.photoCaption}>
                One column, two jobs: the identity on one face, a question on
                the next, filling up as the week went on.
              </figcaption>
            </figure>
            <figure className={g.imgFigure}>
              <div className={g.imgPairTall}>
                <img
                  className={g.photo}
                  src="/images/unga80-column-conversation.webp"
                  alt="Two visitors talking across a high table beside the Exceptional Data column"
                  loading="lazy"
                />
              </div>
              <figcaption className={g.photoCaption}>
                The columns gave people somewhere to stop, which was the point.
              </figcaption>
            </figure>
          </div>

          {/* The exhibit as it stood, and as it was used. */}
          <div className={g.imgPair}>
            <figure className={g.imgFigure}>
              <div className={g.imgPairCell}>
                <img
                  className={g.photo}
                  src="/images/unga80-visitor-wall.webp"
                  alt="A visitor being photographed in front of the #UNGA80 wall in the passage"
                  loading="lazy"
                />
              </div>
              <figcaption className={g.photoCaption}>
                The wall as a backdrop people chose to stand in front of.
              </figcaption>
            </figure>
            <figure className={g.imgFigure}>
              <div className={g.imgPairCell}>
                <img
                  className={g.photo}
                  src="/images/unga80-vote-table.webp"
                  alt="A visitor filling in a voting card at the table, beside a card reading Vote now: what's the UN of the future?"
                  loading="lazy"
                />
              </div>
              <figcaption className={g.photoCaption}>
                Voting in progress. The colour a visitor picked recorded who
                they were as well as what they thought.
              </figcaption>
            </figure>
          </div>

          {/* The lounge end of the space. */}
          <div className={g.imgPair}>
            <figure className={g.imgFigure}>
              <div className={g.imgPairCell}>
                <img
                  className={g.photo}
                  src="/images/unga80-lounge-column.webp"
                  alt="The lounge seating along the window with the blue Exceptional People column standing in front of the #UNGA80 wall"
                  loading="lazy"
                />
              </div>
              <figcaption className={g.photoCaption}>
                The lounge, with a column holding the corner it turns.
              </figcaption>
            </figure>
            <figure className={g.imgFigure}>
              <div className={g.imgPairCell}>
                <img
                  className={g.photo}
                  src="/images/unga80-lounge-group.webp"
                  alt="Visitors gathered at the table beside a column, with the #UNGA80 wall behind them"
                  loading="lazy"
                />
              </div>
              <figcaption className={g.photoCaption}>
                The space in use during high-level week.
              </figcaption>
            </figure>
          </div>

          {/* Shown whole rather than cropped to a band, so the pillar and the
              wall stay in one frame. */}
          <figure className={`${g.imgFigure} ${g.imgFull}`}>
            <img
              className={g.photoFull}
              src="/images/unga80-passage.webp"
              alt="The passage at UN Headquarters: an Enter UN 2.0 pillar standing in the foreground with the blue #UNGA80 wall running down the corridor behind it"
              loading="lazy"
            />
            <figcaption className={g.photoCaption}>
              The exhibit in place on the Conference Building ground floor.
            </figcaption>
          </figure>

          <p className={g.photoCredit}>Photo credit: Abel Fekade</p>
        </section>
      </main>
      <MoreWork currentSlug="/unga80" />
      <Footer />
    </>
  )
}
