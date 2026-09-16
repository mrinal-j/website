import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
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

// The one prototype still linked from the page. The booth prototype and the
// Miro research board that used to sit alongside it have both been taken
// down, so neither is linked any more.
const SITE_PROTOTYPE_URL =
  'https://www.figma.com/proto/tWw7aHxgVKrYSWJlIBnsyq/know-your-vote.?page-id=0%3A1&node-id=1-270&viewport=25%2C346%2C0.03&t=GXkFo0kSwinpUx8b-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A270'

// The four things standing between a New Yorker and a filled-in ballot.
const BARRIERS = [
  'Ballot designs that are confusing to read and unappealing to look at.',
  'Information about the electoral process itself is hard to find and harder to follow.',
  'Little neutral, accessible information about who the candidates are and what they stand for.',
  'Low engagement overall, and lowest of all among people voting for the first time.',
]

// The two research artefacts. Both are dense enough that they cannot be read
// at the size they sit on the page, so both open full screen on a click.
const ARTEFACTS = [
  {
    src: '/images/kyv-ecosystem-map.webp',
    alt: 'The ecosystem map: clusters of coloured notes linking voters, candidates, social media, information channels, physical artefacts and accessibility, surrounded by screenshots of the real material',
    caption:
      'Ecosystem Map to understand the various channels, stakeholder and their relationship',
  },
  {
    src: '/images/kyv-service-blueprint.webp',
    alt: 'The service blueprint: front stage user actions and subjective analysis along the top, candidate actions and system actions along the bottom, running left to right across the campaign and the election',
    caption: 'Service Blueprint to analyze the service and customer journey',
  },
]

// What participants told us when we watched them look for voting information.
// `side` puts the bubble's tail on the left or the right and `tone` picks its
// fill, so the four read as four different people in one conversation rather
// than as a stack of quotations.
const RESEARCH_QUOTES = [
  {
    text: 'Most election resources ask a lot of questions and do not give me the information I need.',
    side: 'left' as const,
    tone: 'white' as const,
  },
  {
    text: "The expectation versus reality of what I got had a huge gap. I couldn't find what I wanted, there was not much about what the candidates advocate for.",
    side: 'right' as const,
    tone: 'lilac' as const,
  },
  {
    text: 'Some of the websites stress me out because there are so many tabs and so much information.',
    side: 'left' as const,
    tone: 'yellow' as const,
  },
  {
    text: 'I received a flyer during election season, but it was too much information put together in a very complex manner.',
    side: 'right' as const,
    tone: 'green' as const,
  },
]

// Maps a quote's tone to the class that fills its bubble.
const BUBBLE_TONE = {
  white: '',
  lilac: k.bubbleLilac,
  yellow: k.bubbleYellow,
  green: k.bubbleGreen,
} as const

// The booth photography, shown as one frame that moves through the set.
// Slide three is the banner at the top of the page shown again, and points at
// that same file rather than a second copy of it. Drop more files in and add a
// line each; the carousel picks them up with no other change. The masters live
// in design-source/know-your-vote.
const BOOTH_PHOTOS = [
  {
    src: '/images/kyv-booth-01.webp',
    alt: 'The booth seen from the side of the room, its scalloped cardboard walls hung with candidate policy posters, visitors gathered along it and the Know your Vote website projected on the screen behind',
  },
  {
    src: '/images/kyv-booth-02.webp',
    alt: 'The booth wall up close: a yellow, green and lilac board asking How do you feel about the future, covered in visitors\u2019 sticky notes, next to a candidate policy panel',
  },
  {
    // The hero banner again, deliberately. It sits here rather than first so
    // it is not repeated immediately under itself, and it belongs next to 02:
    // it is the same wall, stepped back far enough to show people reading it.
    src: '/images/kyv-booth-hero.webp',
    alt: 'Visitors standing at the booth reading the Your Voice Matters board, seen over the shoulders of the people in front of them',
  },
  {
    src: '/images/kyv-booth-03.webp',
    alt: 'A team member standing in the booth\u2019s arched window, newspapers spread across the counter in front of her and a policy poster on the wall beside',
  },
  {
    src: '/images/kyv-booth-04.webp',
    alt: 'A visitor leaning over the booth counter to look through the material laid out on it, while others in the room watch',
  },
  {
    src: '/images/kyv-booth-05.webp',
    alt: 'Two visitors at the booth holding the printed flyers, with a team member serving them from inside the arched window',
  },
  {
    src: '/images/kyv-booth-06.webp',
    alt: 'The team gathered in front of the finished booth at the end of the day',
  },
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

/** The magnifier badge sitting on an artefact, marking it as openable. */
function ZoomIcon() {
  return (
    <span className={k.zoomBadge} aria-hidden="true">
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <circle
          cx="8.5"
          cy="8.5"
          r="5.75"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12.9 12.9 17.5 17.5M8.5 6.2v4.6M6.2 8.5h4.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

/**
 * The booth photography. One frame that slides through the set on its own,
 * with arrows and dots for taking it over by hand. Autoplay stops for good the
 * moment the reader touches a control, so it never fights them, and it never
 * starts at all for anyone who has asked for reduced motion.
 */
function BoothCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = BOOTH_PHOTOS.length

  useEffect(() => {
    if (paused || count < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, 5000)
    return () => window.clearInterval(id)
  }, [paused, count])

  const go = useCallback(
    (next: number) => {
      setPaused(true) // a deliberate move takes the wheel off autoplay
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  return (
    <div
      className={k.carousel}
      onMouseEnter={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photographs of the booth"
    >
      <div className={k.carouselFrame}>
        {BOOTH_PHOTOS.map((photo, i) => (
          <img
            key={photo.src}
            className={`${k.carouselSlide} ${i === index ? k.carouselSlideOn : ''}`}
            src={photo.src}
            alt={photo.alt}
            aria-hidden={i !== index}
            loading="lazy"
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              className={`${k.carouselArrow} ${k.carouselArrowPrev}`}
              onClick={() => go(index - 1)}
              aria-label="Previous photograph"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 2.5 4.5 8l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={`${k.carouselArrow} ${k.carouselArrowNext}`}
              onClick={() => go(index + 1)}
              aria-label="Next photograph"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 2.5 11.5 8 6 13.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className={k.carouselDots}>
          {BOOTH_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className={`${k.carouselDot} ${i === index ? k.carouselDotOn : ''}`}
              onClick={() => go(i)}
              aria-label={`Photograph ${i + 1} of ${count}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function KnowYourVotePage() {
  const mainRef = useRef<HTMLElement>(null)
  // Each top-level <section> fades and rises in as it enters the viewport.
  useScrollReveal(mainRef)

  // Which artefact, if any, is open full screen.
  const [zoomed, setZoomed] = useState<(typeof ARTEFACTS)[number] | null>(null)

  // Escape closes the zoom, and the page behind it is held still while it is
  // open so the reader does not lose their place.
  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(null)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [zoomed])

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
              Primary and Secondary Research, Service Blueprint, Concept
              Development, Website UX/UI, Prototyping
            </span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Timeline</span>
            <span className={s.metaValue}>4 weeks</span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Team</span>
            <span className={s.metaValue}>Team of five</span>
          </div>
          <div className={`${s.metaCell} ${s.metaCellLast}`}>
            <span className={s.metaLabel}>Tools</span>
            <span className={s.metaValue}>Miro, Figma, Adobe Illustrator</span>
          </div>
        </section>

        {/* ============ OVERVIEW — the whole project in one statement,
             opening the page the way UN80's does. ============ */}
        <section className={`${k.section} ${k.overviewSection} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="OVERVIEW" />
          </div>
          <p className={k.overviewText}>
            Through this project, we address the challenges of voter engagement
            and accessibility in New York City, focusing on making the voting
            process{' '}
            <span>more inclusive, informative and user-friendly</span>. By
            addressing the systemic barriers to voting knowledge and
            participation, it builds a user-centred approach to civic
            engagement, one that empowers people through intuitive design,
            comprehensive information and inclusive communication.
          </p>
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
            The voting ecosystem in New York City is severely fragmented.
            Intricate electoral processes, gaps in the information on offer and
            plain design inefficiencies put obstacles in front of voters across
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
                <div className={k.barrierNum}>
                  {String(i + 1).padStart(2, '0')}
                </div>
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
          <img
            className={k.processImg}
            src="/images/kyv-process.webp"
            alt="The seven-step process: team kick-off, problem discovery, research and understanding, define and synthesis, ideation, prototype, and testing"
            loading="lazy"
          />
        </section>

        {/* ============ CURRENT LANDSCAPE ============ */}
        <section className={`${k.section} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="CURRENT LANDSCAPE" />
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
            {ARTEFACTS.map((artefact) => (
              <figure key={artefact.src} className={k.artefact}>
                <button
                  type="button"
                  className={k.artefactButton}
                  onClick={() => setZoomed(artefact)}
                  aria-label={`Open ${artefact.caption} full screen`}
                >
                  <img
                    className={k.artefactImg}
                    src={artefact.src}
                    alt={artefact.alt}
                    loading="lazy"
                  />
                  <ZoomIcon />
                </button>
                <figcaption className={k.artefactCaption}>
                  {artefact.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className={k.saidBlock}>
            <h3 className={k.subhead}>What users said?</h3>
            <div className={k.bubbleCluster}>
              {RESEARCH_QUOTES.map((quote) => (
                <blockquote
                  key={quote.text}
                  className={[
                    k.bubble,
                    quote.side === 'right' ? k.bubbleRight : k.bubbleLeft,
                    BUBBLE_TONE[quote.tone],
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <p>{quote.text}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ============ INTERVENTION ============ */}
        <section className={`${k.section} section-columns`}>
          <div className="section-columns-label">
            <SectionLabel title="INTERVENTION" />
          </div>
          {/* The project's own logotype, opening the section that introduces
              the thing it belongs to. It takes the first row of the column
              layout, so it sits level with the section title. */}
          <img
            className={k.interventionLogo}
            src="/images/kyv-logo.webp"
            alt="The Know your Vote logotype: know your set in black above vote in purple, closed with a full stop"
          />
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
              <BoothCarousel />
            </div>
          </div>
        </section>

        {/* ============ GOALS ============ */}
        <section className={`${k.section} section-columns`}>
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

        {/* ============ PROTOTYPE FEEDBACK ============ */}
        <section className={`${k.section} section-columns`}>
          <div className="section-columns-label">
            {/* The non-breaking space keeps FROM and USERS together, so the
                title breaks as "PROTOTYPE FEEDBACK / FROM USERS" rather than
                leaving USERS stranded alone on the second line of the column. */}
            <SectionLabel title={'PROTOTYPE FEEDBACK FROM\u00a0USERS'} />
          </div>
          <div className={k.feedbackRow}>
            {FEEDBACK.map((quote) => (
              <blockquote key={quote} className={k.feedback}>
                <span className={k.feedbackMark} aria-hidden="true">
                  &ldquo;
                </span>
                <p>{quote}</p>
              </blockquote>
            ))}
          </div>
        </section>
      </main>

      {/* The full-screen view of an artefact. Clicking anywhere outside the
          picture, or pressing Escape, closes it again. */}
      {zoomed && (
        <div
          className={k.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.caption}
          onClick={() => setZoomed(null)}
        >
          <button
            type="button"
            className={k.lightboxClose}
            onClick={() => setZoomed(null)}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <img
            className={k.lightboxImg}
            src={zoomed.src}
            alt={zoomed.alt}
            onClick={(e) => e.stopPropagation()}
          />
          <p className={k.lightboxCaption}>{zoomed.caption}</p>
        </div>
      )}

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
