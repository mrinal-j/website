import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { MoreWork } from '~/components/case-study/MoreWork'
import { SectionLabel } from '~/components/SectionLabel'
import { useScrollReveal } from '~/hooks/useScrollReveal'
import s from '~/components/case-study/InTheLoop.module.css'
import k from '~/components/case-study/KnowYourVote.module.css'

export const Route = createFileRoute('/know-your-vote')({
  head: () => ({
    meta: [
      { title: 'Know your Vote — Mrinal Jadhav' },
      {
        name: 'description',
        content:
          'A design intervention for New York City voters: an accessible website and a public booth that make the voting process easier to understand and act on.',
      },
      // Keep this page out of search results while it is still being written.
      // Visitors can still reach it from a direct link, and search engines may
      // still follow its links; they just won't list the page itself. Note
      // that /know-your-vote must stay crawlable in robots.txt, otherwise
      // crawlers never read this tag. Remove this line to publish.
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'googlebot', content: 'noindex, nofollow' },
    ],
  }),
  component: KnowYourVotePage,
})

// The three places the work lives, linked from the sections they belong to.
const MIRO_URL = 'https://miro.com/app/board/uXjVIX8JFzQ='
const SITE_PROTOTYPE_URL =
  'https://www.figma.com/proto/tWw7aHxgVKrYSWJlIBnsyq/know-your-vote.?page-id=0%3A1&node-id=1-270&viewport=25%2C346%2C0.03&t=GXkFo0kSwinpUx8b-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A270'
const BOOTH_PROTOTYPE_URL =
  'https://www.figma.com/proto/8WLGwrKn5xna4JdlFLvqNV/Public-and-Collab?node-id=128-2239&starting-point-node-id=128%3A2239&t=sKqVujTcNEJqKFsv-1'

// The four things standing between a New Yorker and a filled-in ballot.
const BARRIERS = [
  'Ballot designs that are confusing to read and unappealing to look at.',
  'Information about the electoral process itself is hard to find and harder to follow.',
  'Little neutral, accessible information about who the candidates are and what they stand for.',
  'Low engagement overall, and lowest of all among people voting for the first time.',
]

// What participants told us when we watched them look for voting information.
const RESEARCH_QUOTES = [
  'Most election resources ask a lot of questions and do not give me the information I need.',
  "The expectation versus reality of what I got had a huge gap. I couldn't find what I wanted, there was not much about what the candidates advocate for.",
  'Some of the websites stress me out because there are so many tabs and so much information.',
  'I received a flyer during election season, but it was too much information put together in a very complex manner.',
]

// The four things the pair of interventions was built to do.
const GOALS = [
  {
    label: 'Inclusivity and accessibility',
    text: 'Built for public space, parks and subway stations among them, so it reaches people with limited access to technology or with physical impairments.',
  },
  {
    label: 'Empowering civic participation',
    text: 'During an election it carries the essentials of the voting process alongside detail on each candidate, so a decision can be an informed one.',
  },
  {
    label: 'Fostering community dialogue',
    text: 'Out of season the booth becomes a third space, somewhere to say what you feel, need or fear, and keep the conversation going between elections.',
  },
  {
    label: 'Digital inclusion',
    text: 'Accessibility features, multiple languages and a plain, unfussy interface, so the digital half of the service excludes as few people as possible.',
  },
]

// What testers said after using the site and standing at the booth.
const FEEDBACK = [
  'A space like this would be great to just encourage more conversations and make people feel heard.',
  'This is a great way to combat information asymmetry.',
  'I loved how intuitive the platform was. It was incredibly easy to use, and I was able to navigate it without any assistance.',
]

/** The arrow that follows every outbound link on this page. */
function CtaArrow() {
  return (
    <svg
      className={k.ctaArrow}
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 6h20M15 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function KnowYourVotePage() {
  const mainRef = useRef<HTMLElement>(null)
  // Each top-level <section> fades and rises in as it enters the viewport.
  useScrollReveal(mainRef)

  return (
    <>
      <Navbar alwaysVisible />
      <main ref={mainRef} className={`${s.page} ${k.kyv} reveal-root`}>
        {/* ============ HERO ============ */}
        <section className={s.hero}>
          <div className={`${s.heroHeader} ${k.heroCenter}`}>
            <div className={s.heroTitle}>
              <h1>Know your Vote</h1>
            </div>
            <div className={s.heroDesc}>
              <p>
                Transforming how New Yorkers access, understand and engage with
                electoral information.
              </p>
            </div>
          </div>
        </section>

        {/* ============ HERO BANNER — the booth in use, full width ============ */}
        <section className={k.bannerBand}>
          <img
            className={k.bannerImg}
            src="/images/kyv-booth-hero.webp"
            alt="Visitors standing at the cardboard Know your Vote booth, reading a yellow board headed Your Voice Matters: Share Your Thoughts, with sticky notes already stuck across it"
          />
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section className={s.metaGrid}>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Role</span>
            <span className={s.metaValue}>
              Secondary Research, Service Blueprint, Concept Development,
              Website UX/UI, Prototyping
            </span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Timeline</span>
            <span className={s.metaValue}>4 weeks</span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Team</span>
            <span className={s.metaValue}>A team of four</span>
          </div>
          <div className={`${s.metaCell} ${s.metaCellLast}`}>
            <span className={s.metaLabel}>Tools</span>
            <span className={s.metaValue}>
              Miro, Figma, Adobe Illustrator
            </span>
          </div>
        </section>

        {/* ============ CONTEXT ============ */}
        <section className={`${k.section} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="CONTEXT" />
          </div>
          <p className={k.headline}>
            Not knowing how voting works, from registering to marking a ballot,
            is often the main thing standing between a citizen and their vote.
          </p>
          <p className={`${k.para} ${k.leadPara}`}>
            The voting ecosystem in New York City is badly fragmented. Intricate
            electoral processes, gaps in the information on offer and plain
            design inefficiencies put obstacles in front of voters across
            different demographics, ages and languages.{' '}
            <strong>
              The effect is sharpest for first-time voters, immigrants, people
              with disabilities, and communities that have long been pushed to
              the edge of the electoral process.
            </strong>
          </p>

          <div className={k.barrierGrid}>
            {BARRIERS.map((text, i) => (
              <div key={text}>
                <div className={k.barrierNum}>{String(i + 1).padStart(2, '0')}</div>
                <p className={k.barrierText}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section className={`${k.section} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="PROCESS" />
          </div>
          <p className={`${k.para} ${k.leadPara}`}>
            Four weeks, seven steps, and a team of four covering user research,
            ecosystem mapping, a service blueprint, concept and service
            development, UI/UX design and prototyping.
          </p>
          <div className={k.processPanel}>
            <img
              className={k.processImg}
              src="/images/kyv-process.webp"
              alt="The seven-step process: team kick-off, problem discovery, research and understanding, define and synthesis, ideation, prototype, and testing"
              loading="lazy"
            />
          </div>
        </section>

        {/* ============ RESEARCH ============ */}
        <section className={`${k.section} ${k.sectionGrey} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="THE CURRENT LANDSCAPE" />
          </div>
          <p className={`${k.para} ${k.leadPara}`}>
            To see the problem rather than assume it, we sat with participants
            while they used whatever they normally would, websites, flyers,
            social posts, to work out how to vote and who to vote for. We mapped
            what we saw twice over: once as an ecosystem, to show every channel
            and stakeholder and how they connect, and once as a service
            blueprint, to follow a voter through the journey step by step.
          </p>

          <div className={k.artefactRow}>
            <figure className={k.artefact}>
              <img
                className={k.artefactImg}
                src="/images/kyv-ecosystem-map.webp"
                alt="The ecosystem map: clusters of coloured notes linking voters, candidates, social media, information channels, physical artefacts and accessibility, surrounded by screenshots of the real material"
                loading="lazy"
              />
              <figcaption className={k.artefactCaption}>
                Ecosystem map, showing the channels, the stakeholders and the
                relationships between them.
              </figcaption>
            </figure>
            <figure className={k.artefact}>
              <img
                className={k.artefactImg}
                src="/images/kyv-service-blueprint.webp"
                alt="The service blueprint: front stage user actions and subjective analysis along the top, candidate actions and system actions along the bottom, running left to right across the campaign and the election"
                loading="lazy"
              />
              <figcaption className={k.artefactCaption}>
                Service blueprint, following the voter journey against what the
                candidates and the systems behind them were doing.
              </figcaption>
            </figure>
          </div>

          <a
            className={k.cta}
            href={MIRO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the detailed process
            <CtaArrow />
          </a>

          <div className={k.quoteGrid}>
            {RESEARCH_QUOTES.map((quote) => (
              <blockquote key={quote} className={k.quote}>
                <p>{quote}</p>
              </blockquote>
            ))}
          </div>
        </section>

        {/* ============ THE INTERVENTION ============ */}
        <section className={`${k.section} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="THE INTERVENTION" />
          </div>
          <p className={k.headline}>
            Know your Vote answers the gap in two places at once: a website for
            people already looking, and a booth in public space for the people
            who are not.
          </p>
          <p className={`${k.para} ${k.leadPara}`}>
            Putting accessibility, clarity and engagement first, the pair is a
            scalable approach to voter education, and one that could be picked
            up and adapted by other cities.
          </p>

          <div className={k.strandRow}>
            <div className={k.strand}>
              <img
                className={k.strandIcon}
                src="/images/kyv-icon-website.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <h3 className={k.strandTitle}>An accessible website</h3>
              <ul className={k.strandList}>
                <li>
                  Designed for inclusivity, with support for other languages and
                  for visual impairment.
                </li>
                <li>
                  Simplifies the voting information and the processes behind it.
                </li>
                <li>
                  Candidate information and resources in plain, readable terms.
                </li>
              </ul>
              <video
                className={`${k.strandMedia} ${k.strandVideo}`}
                src="/images/kyv-site.mp4"
                poster="/images/kyv-site-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                aria-label="A screen recording of the Know your Vote website, opening on Your One-Stop Voting Information Hub with cards reading Can I vote, How do I vote and Where do I vote"
              />
              <a
                className={k.cta}
                href={SITE_PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View the website prototype
                <CtaArrow />
              </a>
            </div>

            <div className={k.strand}>
              <img
                className={k.strandIcon}
                src="/images/kyv-icon-booth.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <h3 className={k.strandTitle}>An interactive booth</h3>
              <ul className={k.strandList}>
                <li>
                  A safe space for passing on knowledge and talking it through.
                </li>
                <li>
                  Full voting and candidate information, carried by visuals and
                  activities rather than dense text.
                </li>
                <li>Printed flyers for visitors to take away with them.</li>
                <li>
                  Placed in public areas, during election season and outside it.
                </li>
              </ul>
              <img
                className={k.strandMedia}
                src="/images/kyv-booth-wall.webp"
                alt="The booth wall up close: a yellow, green and lilac board asking How do you feel about the future, covered in visitors' sticky notes, next to a candidate policy panel"
                loading="lazy"
              />
              <a
                className={k.cta}
                href={BOOTH_PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View the booth prototype
                <CtaArrow />
              </a>
            </div>
          </div>
        </section>

        {/* ============ GOALS ============ */}
        <section className={`${k.section} ${k.sectionGrey} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="WHAT IT SET OUT TO DO" />
          </div>
          <p className={`${k.para} ${k.leadPara}`}>
            The two halves were built to serve a city with very different
            people in it, and to keep working once the election is over.
          </p>
          <div className={k.goalGrid}>
            {GOALS.map((goal) => (
              <div key={goal.label}>
                <div className={k.goalLabel}>{goal.label}</div>
                <p className={k.goalText}>{goal.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FEEDBACK ============ */}
        <section className={`${k.section} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="WHAT TESTERS SAID" />
          </div>
          <div className={k.feedbackRow}>
            {FEEDBACK.map((quote) => (
              <blockquote key={quote} className={k.feedback}>
                <p>{quote}</p>
              </blockquote>
            ))}
          </div>
        </section>
      </main>
      {/* The home page still points this project at the legacy site, so the
          strip is told to drop that slug: otherwise the page you are reading
          is offered back to you as "more work". Change this to
          "/know-your-vote" when the card in src/data/projects.ts is switched
          over. */}
      <MoreWork currentSlug="https://legacy.mrinaljadhav.com/know-your-vote" />
      <Footer />
    </>
  )
}
