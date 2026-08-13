import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { MoreWork } from '~/components/case-study/MoreWork'
import { SectionLabel } from '~/components/SectionLabel'
import { CountUp } from '~/components/CountUp'
import { useScrollReveal } from '~/hooks/useScrollReveal'
import s from '~/components/case-study/InTheLoop.module.css'
import u from '~/components/case-study/Un80.module.css'

export const Route = createFileRoute('/un80')({
  head: () => ({
    meta: [
      { title: 'UN80 Initiative — Mrinal Jadhav' },
      {
        name: 'description',
        content:
          'Building a brand for the UN80 Initiative: a distinct visual identity, built inside the UN master brand, that made system-wide reform legible to the general public.',
      },
      // Work-in-progress: keep this page out of search results until it's
      // ready to publish. (robots.txt also disallows /un80 as a backup.)
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: Un80Page,
})

// The three live homes for the work, linked from their sections.
const LINKEDIN_URL = 'https://www.linkedin.com/company/un80-initiative'
const NEWSLETTER_URL =
  'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7426685523542372353'
const SITE_URL = 'https://www.un.org/un80-initiative'

// The UN80 palette: the single-blue tonal scale (one hue laddered from 100%
// to 10%) plus the black and white that carry type and structure.
const PALETTE = [
  { pct: '100%', hex: '#019EDB' },
  { pct: '80%', hex: '#34B1E2' },
  { pct: '60%', hex: '#67C5E9' },
  { pct: '40%', hex: '#99D8F1' },
  { pct: '20%', hex: '#CCECF8' },
  { pct: '10%', hex: '#E6F5FB' },
  { pct: 'Black', hex: '#000000' },
  { pct: 'White', hex: '#FFFFFF' },
]

// The LinkedIn post system: three still formats and two motion pieces, all
// square, all built from the same identity.
const POSTS = [
  {
    type: 'image' as const,
    src: '/images/un80-post-1.webp',
    alt: 'Quote card: co-facilitators Brian Wallace and Carolyn Schwalger on producing an implementable outcome, over a photo of the General Assembly',
  },
  {
    type: 'video' as const,
    src: '/images/un80-post-video.mp4',
    alt: 'Animated title card: United to Deliver Better',
  },
  {
    type: 'image' as const,
    src: '/images/un80-post-2.webp',
    alt: 'Quote card: Guy Ryder, UN Under-Secretary-General for Policy, on entering the delivery-focused phase',
  },
  {
    type: 'video' as const,
    src: '/images/un80-briefing-video.mp4',
    alt: 'Captioned clip of Tom Fletcher speaking at the UN80 Initiative General Assembly briefing',
  },
  {
    type: 'image' as const,
    src: '/images/un80-post-3.webp',
    alt: 'Carousel opener: Why Mandates matter? over a photo of a woman working in a tea field',
  },
]

function Un80Page() {
  const mainRef = useRef<HTMLElement>(null)
  // Each top-level <section> fades/rises in as it enters the viewport.
  useScrollReveal(mainRef)

  // The landing-page browser mockup: while the tall wrapper is pinned, the
  // screenshot slides up inside the browser window, stopping exactly at the
  // bottom of the page image.
  const siteWrapRef = useRef<HTMLElement>(null)
  const siteViewRef = useRef<HTMLDivElement>(null)
  const siteImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = siteImgRef.current

    const onScroll = () => {
      const wrap = siteWrapRef.current
      const view = siteViewRef.current
      const image = siteImgRef.current
      if (!wrap || !view || !image) return

      const rect = wrap.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const travel = image.offsetHeight - view.clientHeight
      // Nothing to scroll through (very short viewport, or image not measured
      // yet): park the screenshot at the top of the page.
      if (scrollable <= 0 || travel <= 0) {
        image.style.transform = 'translate3d(0, 0, 0)'
        return
      }
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      image.style.transform = `translate3d(0, ${-progress * travel}px, 0)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // The image height is only known once it has loaded.
    img?.addEventListener('load', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      img?.removeEventListener('load', onScroll)
    }
  }, [])

  return (
    <>
      <Navbar alwaysVisible />
      <main ref={mainRef} className={`${s.page} ${u.un80} reveal-root`}>
        {/* ============ HERO ============ */}
        <section className={s.hero}>
          <div className={s.heroHeader}>
            <div className={s.heroTitle}>
              <h1>UN80 Initiative</h1>
            </div>
            <div className={s.heroDesc}>
              <p>
                A sub-identity for the UN80 Initiative, the United Nations'
                system-wide reform effort.
              </p>
            </div>
          </div>
        </section>

        {/* ============ HERO BANNER — full-width, edge to edge ============ */}
        <section className={u.bannerBand}>
          <img
            className={u.bannerImg}
            src="/images/un80_banner 5.webp"
            alt="The UN80 Initiative on LinkedIn: the UN80 logo, a phone showing the feed, and content carousel cards"
          />
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section className={s.metaGrid}>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Role</span>
            <span className={s.metaValue}>Design Lead</span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Timeline</span>
            <span className={s.metaValue}>8 months</span>
          </div>
          <div className={s.metaCell}>
            <span className={s.metaLabel}>Team</span>
            <span className={s.metaValue}>
              Sole designer, partnering with two communications writers
            </span>
          </div>
          <div className={`${s.metaCell} ${s.metaCellLast}`}>
            <span className={s.metaLabel}>Tools</span>
            <span className={s.metaValue}>
              Figma, Adobe Creative Cloud, Drupal, Canva, Claude (Cowork, design,
              chat)
            </span>
          </div>
        </section>

        {/* ============ OVERVIEW ============ */}
        <section className={u.section}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="OVERVIEW" />
          </div>
          <p className={u.oneLiner}>
            Designed a distinct visual identity for the UN80 Initiative that
            lived inside the United Nations' master brand, turning dense reform
            content into <span>plain-language, on-brand communication</span> the
            general public could easily follow.
          </p>
        </section>

        {/* ============ 01 · CONTEXT — label, then a rounded photo with
             a 40% black layer and the text centred on it ============ */}
        <section className={u.contextSection}>
          <div className={u.contextLabelWrap}>
            <SectionLabel title="CONTEXT" number="01" />
          </div>
          <figure className={u.contextFigure}>
            <img
              className={u.contextImg}
              src="/images/UN80_GA.webp"
              alt="The UN General Assembly hall in session during the UN's 80th anniversary"
            />
            <div className={u.contextScrim} aria-hidden="true" />
            <figcaption className={u.contextCaption}>
              In March 2025, as the UN marked its 80th anniversary, the
              Secretary-General launched the UN80 Initiative, a system-wide
              effort to make the organisation more agile, integrated and
              effective amid tightening resources.
            </figcaption>
          </figure>
        </section>

        {/* ============ 02 · THE CHALLENGE ============ */}
        <section className={u.section}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="THE CHALLENGE" number="02" />
          </div>
          <h2 className={u.sectionHeadline}>
            How might we make institutional reform something the general public
            can actually follow?
          </h2>

          {/* Three problems, then the constraint — the fourth point is the
              constraint, so its number and subhead are black, not blue. */}
          <div className={u.challengeGrid}>
            {[
              {
                title: 'No identity',
                desc: 'The initiative had a website, but no brand to make it recognisable as UN80. The identity had to be built first, before any content or channels could follow.',
              },
              {
                title: 'Complex by nature',
                desc: 'Reform is dense by default. The text needed distinct visuals alongside it to make the content easier to digest.',
              },
              {
                title: 'Every channel is different',
                desc: 'The identity had to work across the web, the social feed and the inbox, each with its own format, not one asset stretched to fit all three.',
              },
              {
                title: 'The constraint',
                desc: "The UN's blue and typography are non-negotiable and centrally governed. Any new identity had to live inside them, not replace them.",
                isConstraint: true,
              },
            ].map((c, i) => (
              <div key={c.title} className={u.challengeItem}>
                <span
                  className={`${u.challengeNum} ${
                    c.isConstraint ? u.challengeNumDark : ''
                  }`}
                >
                  {i + 1}
                </span>
                <h3
                  className={`${u.challengeItemTitle} ${
                    c.isConstraint ? u.challengeItemTitleDark : ''
                  }`}
                >
                  {c.title}
                </h3>
                <p className={u.challengeItemText}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ 03 · THE SUB-IDENTITY — the three pieces of the
             system: the logo lockup, the palette, and the type ============ */}
        <section className={u.systemSection}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="THE SUB-IDENTITY" number="03" />
          </div>
          <p className={u.systemIntro}>
            The UN80 layer stays entirely within the UN's master brand: the UN
            blue, scaled, plus curves that make it recognisable while keeping it
            unmistakably UN.
          </p>

          {/* The primary lockup, in its two approved settings. */}
          <h3 className={u.specTitle}>Primary logo</h3>
          <div className={u.logoRow}>
            <div className={u.logoPanel}>
              <img
                className={u.logoImg}
                src="/images/un80-logo-on-white.webp"
                alt="The UN80 Initiative lockup: the UN emblem, United Nations, and UN80 Initiative, in blue on white"
              />
            </div>
            <div className={u.logoPanel}>
              <img
                className={u.logoImg}
                src="/images/un80-logo-on-blue.webp"
                alt="The same UN80 Initiative lockup reversed out in white on UN blue"
              />
            </div>
          </div>
          <p className={u.specCaption}>
            The initiative's name locked to the UN wordmark by a divider rule, so
            UN80 always reads as part of the institution, never beside it.
          </p>

          {/* The palette, as circles. */}
          <h3 className={u.specTitle}>Colour palette</h3>
          <div className={u.pillRow}>
            {PALETTE.map((c) => (
              <div key={c.pct} className={u.pillItem}>
                <div className={u.pill} style={{ background: c.hex }} />
                <div className={u.pillPct}>{c.pct}</div>
                <div className={u.pillHex}>{c.hex}</div>
              </div>
            ))}
          </div>
          <p className={u.specCaption}>
            One blue, laddered from 100% to 10%, gives depth and hierarchy
            without introducing a single new hue. Black and white carry the type
            and the structure.
          </p>

          {/* The type, set in the real thing. */}
          <h3 className={u.specTitle}>Typography</h3>
          <div className={u.typeRow}>
            <div className={u.typePanel}>
              <div className={`${u.typeAa} ${u.typeAaBold}`}>Aa</div>
              <div className={u.typeInfo}>
                {/* Each label is set in the weight it names. */}
                <span className={`${u.typeName} ${u.typeNameBold}`}>
                  Roboto Bold
                </span>
                <span className={u.typeUse}>Headers</span>
              </div>
            </div>
            <div className={u.typePanel}>
              <div className={u.typeAa}>Aa</div>
              <div className={u.typeInfo}>
                <span className={u.typeName}>Roboto Regular</span>
                <span className={u.typeUse}>Body</span>
              </div>
            </div>
          </div>
          <p className={u.specCaption}>
            Roboto, inherited from the UN master brand. Bold for headers,
            regular for body, and nothing else, so the hierarchy is doing the
            work rather than the typeface.
          </p>
        </section>

        {/* ============ 04 · ACROSS CHANNELS ============ */}
        <section className={u.channelsSection}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="ACROSS CHANNELS" number="04" />
          </div>

          {/* LinkedIn posts — each square asset sits in a post frame so it
              reads as a feed post rather than a loose graphic. */}
          <div className={u.channelLabel}>LinkedIn</div>
          <p className={u.channelDesc}>
            A template system including quote cards, announcements,
            did-you-knows, end slides, short motion pieces and more, translating
            complex institutional content into more accessible and engaging
            content.
          </p>
          <p className={u.channelOutcome}>
            The templates meant a dense progress report could be published as a
            feed post the same day, without a designer redrawing it each time.
          </p>
          <a
            className={u.siteCta}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the LinkedIn page
            <svg
              className={u.siteCtaArrow}
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 6h20M15 1l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div className={u.postsScroller}>
            <div className={u.postsTrack}>
              {POSTS.map((post) => (
                <figure key={post.src} className={u.postCard}>
                  <div className={u.postHead}>
                    <span className={u.postAvatar} aria-hidden="true">
                      <img src="/images/un80-avatar.webp" alt="" />
                    </span>
                    <span className={u.postWho}>
                      <span className={u.postName}>UN80 Initiative</span>
                      <span className={u.postMeta}>13,025 followers</span>
                    </span>
                  </div>
                  {post.type === 'video' ? (
                    <video
                      className={u.postMedia}
                      src={post.src}
                      aria-label={post.alt}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      className={u.postMedia}
                      src={post.src}
                      alt={post.alt}
                      loading="lazy"
                    />
                  )}
                  {/* Stands in for a post's caption text, without inventing
                      copy that was never written. */}
                  <figcaption className={u.postCaption} aria-hidden="true">
                    ....
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* The newsletter — the two captures stacked, the top of the issue
              sitting in front of the full-length one. */}
          <div className={u.channelLabel}>
            UN80 Initiative Newsletter · LinkedIn and email
          </div>
          <div className={u.newsletterRow}>
            <div className={u.newsletterStack}>
              <img
                className={u.newsletterBack}
                src="/images/un80-newsletter-body.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <img
                className={u.newsletterFront}
                src="/images/un80-newsletter-top.webp"
                alt="The UN80 Initiative newsletter, Edition 05: United to Deliver Better, with the contents of the issue and a quote from the Secretary-General"
                loading="lazy"
              />
            </div>
            <div className={u.newsletterCopy}>
              <p className={u.newsletterText}>
                A monthly issue offering insights into major milestones, work
                underway, and progress toward a more effective UN system. It goes
                out on <strong>LinkedIn</strong> and as an <strong>email</strong>,
                so the same edition reaches the feed and the inbox.
              </p>
              <p className={u.channelOutcome}>
                One template carries a long, link-heavy report, so each issue
                lands looking like the last and readers know where to find
                things.
              </p>
              <a
                className={u.siteCta}
                href={NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View the newsletter
                <svg
                  className={u.siteCtaArrow}
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 6h20M15 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============ THE LANDING PAGE — copy on the left, a browser
             mockup on the right. The wrapper is taller than the screen, so
             while it is pinned the screenshot scrolls inside the browser
             window until it reaches the bottom of the page. Same idea as the
             phone screens in the In the Loop case study. ============ */}
        <section ref={siteWrapRef} className={u.siteScrollWrap}>
          <div className={u.siteSticky}>
            <div className={u.siteGrid}>
              <div className={u.siteCopy}>
                <div className={u.channelLabel}>Website</div>
                <p className={u.siteText}>
                  The website served two purposes: it introduces a system-wide
                  reform to the general public, and stands as the resource
                  centre for Member States, press and partners.
                </p>
                <p className={u.siteText}>
                  The structure answers the reader's questions:{' '}
                  <strong className={u.siteEmphasis}>
                    what this is, why it matters, what's changing, and where to
                    go next.
                  </strong>
                </p>
                <a
                  className={u.siteCta}
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the website
                  <svg
                    className={u.siteCtaArrow}
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 6h20M15 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <div className={u.browser}>
                  <div className={u.browserBar}>
                    <span className={`${u.browserDot} ${u.dotRed}`} />
                    <span className={`${u.browserDot} ${u.dotAmber}`} />
                    <span className={`${u.browserDot} ${u.dotGreen}`} />
                    <span className={u.browserAddress}>
                      un.org/un80-initiative
                    </span>
                  </div>
                  <div ref={siteViewRef} className={u.browserViewport}>
                    <img
                      ref={siteImgRef}
                      className={u.browserPage}
                      src="/images/un80_site_home.webp"
                      alt="The UN80 Initiative home page on un.org"
                    />
                  </div>
                </div>
                <p className={u.builtNote}>Built on Drupal 11.0.0</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 05 · RESULTS + 06 · REFLECTION (one blue box) ============ */}
        <section className={u.resultsSection}>
          <SectionLabel title="RESULTS" number="05" dark />
          <div className={u.resultsGrid}>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={1111122} duration={2000} />
              </span>
              <span className={u.resultLabel}>
                LinkedIn impressions since the channel started in November 2025
              </span>
            </div>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={13025} duration={1800} />
              </span>
              <span className={u.resultLabel}>
                LinkedIn followers, from zero and all organic
              </span>
            </div>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={6944} duration={1800} />
              </span>
              <span className={u.resultLabel}>
                Newsletter subscribers on LinkedIn, also from zero
              </span>
            </div>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={8050} duration={1800} />
              </span>
              <span className={u.resultLabel}>
                Newsletter article views on LinkedIn
              </span>
            </div>
          </div>

          <div className={u.reflectionBlock}>
            <div className={u.sectionLabelWrap}>
              <SectionLabel title="REFLECTION" number="06" dark />
            </div>
            <p className={u.reflectionQuote}>
              The hardest decision wasn't the blue or the type. It was insisting
              that <span>clarity itself was part of the brand</span>. Once the
              system made simplification the default, the identity did the heavy
              lifting, and on-brand, on-message work followed by design. The real
              deliverable wasn't a logo. It was a system that made a complex
              institution easier to understand.
            </p>
            <div className={u.tagRow}>
              {['Brand identity', 'Design systems', 'Content strategy', 'Multi-channel'].map(
                (t) => (
                  <span key={t} className={u.tag}>
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
      <MoreWork currentSlug="/un80" />
      <Footer />
    </>
  )
}
