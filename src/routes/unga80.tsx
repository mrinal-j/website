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
      // Work in progress: keep this page out of search results until it is
      // ready to publish. (robots.txt also disallows /unga80 as a backup.)
      { name: 'robots', content: 'noindex, nofollow' },
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
            alt="The UNGA80 exhibit wall: a #UNGA80 title panel followed by six image panels, one per UN 2.0 tool, joined by a zigzag line that changes colour across them"
          />
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section className={s.metaGrid}>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Role</span>
            <span className={s.metaValue}>
              Exhibit concept, exhibit design, visual identity, AI image
              direction, large-format print design
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

        {/* ============ THE ASK — the brief on the left, the fixed facts
             of the job on the right. ============ */}
        <section className={g.section}>
          <SectionLabel title="THE ASK" />
          <div className={g.askGrid}>
            <div className={g.askBody}>
              <p className={g.askLead}>
                Create an engaging exhibit that showcases the six quintets of
                the UN 2.0 agenda, and asks its audience how the UN could do it
                better.
              </p>
              <p className={g.askPara}>
                A week-long exhibit showcasing the six tools of UN 2.0, the
                United Nations' transformation agenda: data, digital,
                innovation, foresight, behavioural science and culture. The
                space was built to welcome world leaders, delegates and visitors
                at the 2025 General Assembly, and to invite them to explore the
                agenda and share where they think the UN should go next.
              </p>
              <p className={g.askPara}>
                The exhibit did not open with an answer. It opened with a
                question: which innovations are already delivering results, and
                how can we scale them further? The exercise drew out how tools
                like AI, data platforms and digital public infrastructure can
                speed up decision-making, improve service delivery, and bring
                the UN closer to the people it serves.
              </p>
            </div>

            <div className={g.askSide}>
              <div>
                <div className={g.sideLabel}>Audience</div>
                <div className={g.sideValue}>
                  World leaders, delegates and visitors at UNGA80
                </div>
              </div>
              <div>
                <div className={g.sideLabel}>Constraint</div>
                <div className={g.sideValue}>
                  One passage wall, six tools and no staffed demos, so the
                  design had to carry the whole conversation
                </div>
              </div>
              <div>
                <div className={g.sideLabel}>My contribution</div>
                <div className={g.sideValue}>
                  Conceptualising the interactive exhibit, and exploring
                  AI-generated imagery against the existing brand identity to
                  build a new identity for the event
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ THE OUTCOME — the result stated once, then the
             wall itself panel by panel, then the installation
             photography. ============ */}
        <section className={g.section}>
          <SectionLabel title="THE OUTCOME" />
          <p className={g.outcomeText}>
            A visual language that put those questions in the room. A wall
            running the length of the passage gave each of the six tools its own
            panel, built from AI-generated imagery and joined by a single zigzag
            line that changes colour as it travels across them. It turned six
            abstract capabilities into something people could walk up to, look
            at, and answer.
          </p>

          {/* The identity banners, stood in a row the way they stood in
              the passage. */}
          <div className={g.bannerStrip}>
            <div className={g.bannerTrack}>
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
          </div>
          <p className={g.stripCaption}>
            One invitation, five ways in. Each banner opens with the same line
            and hands it to a different image, with the zigzag changing colour
            as it crosses.
          </p>

          {/* The voting banners: the half of the exhibit that the visitors
              finished. */}
          <h3 className={g.subTitle}>Asking the room</h3>
          <p className={g.stripCaption}>
            Four banners carried the questions, and left the answering to the
            room. Visitors placed a sticker in the colour of who they were, so
            the wall filled in as a picture of who thought what: Member States,
            public and private sector, and UN colleagues.
          </p>
          <div className={g.bannerStrip}>
            <div className={g.bannerTrack}>
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

          <figure className={g.imgFigure}>
            <div className={g.imgWide}>
              <img
                className={g.photo}
                src="/images/unga80-passage.webp"
                alt="The passage at UN Headquarters: an Enter UN 2.0 banner standing in the foreground with the blue #UNGA80 wall running down the corridor behind it"
                loading="lazy"
              />
            </div>
            <figcaption className={g.photoCaption}>
              The exhibit in place on the Conference Building ground floor.
              Photo credit: Abel Fekade.
            </figcaption>
          </figure>
        </section>

        {/* ============ PROCESS — three beats, each a titled column and
             the work it produced. ============ */}
        <section className={g.section}>
          <SectionLabel title="PROCESS" />
          <p className={g.processIntro}>
            Three beats: work out what visitors would actually do, build an
            identity that could hold AI imagery, then make it survive at wall
            scale.
          </p>

          <div className={g.processRow}>
            <div>
              <div className={g.processNum}>01</div>
              <h3 className={g.processTitle}>Brainstorming the interaction</h3>
              <p className={g.processText}>
                We started from what the exhibit would ask, not what it would
                say. The question came first, then the format that could collect
                an answer from someone walking through with four minutes to
                spare.
              </p>
            </div>
            <div className={`${g.ph} ${g.processMedia}`}>
              <span className={g.phNote}>
                Whiteboard and brainstorm sketches: interaction ideas for how
                visitors respond
              </span>
            </div>
          </div>

          <div className={g.processRow}>
            <div>
              <div className={g.processNum}>02</div>
              <h3 className={g.processTitle}>
                An identity that could hold AI imagery
              </h3>
              <p className={g.processText}>
                Built with the lead designer and photographer. The existing UN
                2.0 identity set the frame; the AI-generated photography had to
                sit inside it and still read as new, innovative and futuristic.
                The zigzag came out of this: one line to carry six separate
                images as a single wall.
              </p>
            </div>
            <div className={g.processPair}>
              <div className={`${g.ph} ${g.processMedia}`}>
                <span className={g.phNote}>
                  Identity exploration: colour and line studies
                </span>
              </div>
              <div className={`${g.ph} ${g.processMedia}`}>
                <span className={g.phNote}>
                  AI imagery trials against the identity
                </span>
              </div>
            </div>
          </div>

          <div className={g.processRow}>
            <div>
              <div className={g.processNum}>03</div>
              <h3 className={g.processTitle}>Banner iterations at wall scale</h3>
              <p className={g.processText}>
                Iterating the physical banner: where the line crosses each
                panel, how the colour changes hand off between tools, and how
                much space the imagery gives up to keep the type legible from
                across the passage.
              </p>
            </div>
            <div className={g.processStack}>
              <div className={`${g.ph} ${g.processStrip}`}>
                <span>Iteration v1: full banner strip</span>
              </div>
              <div className={`${g.ph} ${g.processStrip}`}>
                <span>Iteration v2: full banner strip</span>
              </div>
              <div className={`${g.ph} ${g.processStrip}`}>
                <span>Final: shipped banner strip</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ IMPACT — what the wall did. On white, with
             hairlines top and bottom instead of a grey band. ============ */}
        <section className={g.impactBand}>
          <div className={g.impactGrid}>
            <div className={g.impactStats}>
              <div>
                {/* Waiting on the real footfall figure. */}
                <div className={g.impactNumTodo}>[figure]</div>
                <div className={g.impactLabel}>
                  estimated people through the passage over the week
                </div>
              </div>
              <div className={g.impactPair}>
                <div>
                  <div className={g.impactNum}>6</div>
                  <div className={g.impactLabel}>panels, one per tool</div>
                </div>
                <div>
                  <div className={g.impactNum}>1</div>
                  <div className={g.impactLabel}>week live at UNGA80</div>
                </div>
              </div>
            </div>

            <div className={g.impactCopy}>
              <SectionLabel title="WHAT IT DID" />
              <p className={g.impactText}>
                Visitors stopped and answered. The wall was read tool by tool
                rather than skimmed, and the responses left on it became the
                record of where people think the UN should go next, which is the
                outcome the exhibit was built to produce.
              </p>
              <p className={g.impactNote}>
                Responses were collected on the wall during the week and were
                not documented photographically.
              </p>
            </div>
          </div>
        </section>
      </main>
      <MoreWork currentSlug="/unga80" />
      <Footer />
    </>
  )
}
