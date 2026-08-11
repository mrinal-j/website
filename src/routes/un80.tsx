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

// The UN80 single-blue tonal scale: one hue laddered from 100% to 10%.
const TONAL_SCALE = [
  { pct: '100%', hex: '#019EDB' },
  { pct: '80%', hex: '#34B1E2' },
  { pct: '60%', hex: '#67C5E9' },
  { pct: '40%', hex: '#99D8F1' },
  { pct: '20%', hex: '#CCECF8' },
  { pct: '10%', hex: '#E6F5FB' },
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

        {/* ============ 03 · THE SUB-IDENTITY ============ */}
        <section className={u.systemSection}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="THE SUB-IDENTITY" number="03" />
          </div>
          <h2 className={u.systemHeadline}>
            Modernised without adding a single new colour.
          </h2>
          <p className={u.systemIntro}>
            The UN's colour and typography are non-negotiable; the whole
            institution runs on them. So the UN80 layer stays entirely inside the
            master brand: <em>one blue, scaled</em>, plus curves and motion that
            make it recognisable while keeping it unmistakably UN.
          </p>

          {/* Inherited — the UN system */}
          <div className={u.systemGroupLabel}>
            <span>Inherited · the UN system</span>
            <span className={u.systemChip}>unchanged</span>
          </div>
          <div className={u.inheritedGrid}>
            <div className={u.typeCard}>
              <div className={u.typeGlyph}>Aa</div>
              <div className={u.typeMeta}>
                <span className={u.typeMetaName}>Roboto</span>
                <span className={u.typeMetaSub}>Display · Text</span>
              </div>
            </div>
            <div className={u.swatchCard}>
              <div className={u.swatchColor} style={{ background: '#019EDB' }} />
              <div className={u.swatchBody}>
                <div className={u.swatchName}>UN Blue</div>
                <div className={u.swatchHex}>#019EDB</div>
              </div>
            </div>
          </div>

          {/* Created — the UN80 layer */}
          <div className={`${u.systemGroupLabel} ${u.systemGroupLabelCreated}`}>
            <span>Created · the UN80 layer</span>
            <span className={`${u.systemChip} ${u.systemChipNew}`}>new</span>
          </div>

          {/* The tonal scale — the signature systems move */}
          <div className={u.scaleBlock}>
            <div className={u.scaleText}>
              <h3 className={u.createdTitle}>A single-blue tonal scale</h3>
              <p className={u.createdText}>
                One blue, laddered from 100% to 10%, giving depth, hierarchy and
                a distinct UN80 feel without introducing a single new hue.
              </p>
            </div>
            <div className={u.scaleLadder}>
              {TONAL_SCALE.map((t) => (
                <div key={t.pct} className={u.scaleSwatch}>
                  <div
                    className={u.scaleSwatchColor}
                    style={{ background: t.hex }}
                  />
                  <div className={u.scalePct}>{t.pct}</div>
                  <div className={u.scaleHex}>{t.hex}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={u.createdGrid}>
            <div className={u.createdCard}>
              <div className={`${u.createdVisual} ${u.visualNeutral}`}>
                <span style={{ background: '#111' }} />
                <span style={{ background: '#8a8a8a' }} />
                <span style={{ background: '#fff' }} />
              </div>
              <div className={u.createdBody}>
                <div className={u.createdTitle}>Neutral support</div>
                <div className={u.createdText}>
                  Black, white and grey for type, structure and contrast.
                </div>
              </div>
            </div>
            <div className={u.createdCard}>
              <div className={`${u.createdVisual} ${u.visualCurves}`} />
              <div className={u.createdBody}>
                <div className={u.createdTitle}>Curved forms</div>
                <div className={u.createdText}>
                  Arcs and pill shapes that soften a rigid, institutional brand
                  and give UN80 its own signature.
                </div>
              </div>
            </div>
            <div className={u.createdCard}>
              <div className={`${u.createdVisual} ${u.visualMotion}`}>
                <span />
                <span />
                <span />
              </div>
              <div className={u.createdBody}>
                <div className={u.createdTitle}>Motion</div>
                <div className={u.createdText}>
                  Subtle movement (carousels and transitions) that made static
                  reform content feel active and current.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 04 · ACROSS CHANNELS ============ */}
        <section className={u.channelsSection}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="ACROSS CHANNELS" number="04" />
          </div>
          <h2 className={u.sectionHeadline}>One system, three homes.</h2>

          {/* LinkedIn */}
          <div className={u.channelLabel}>
            LinkedIn · auto-scrolling carousel &amp; post system
          </div>
          <p className={u.channelDesc}>
            An auto-scrolling carousel format plus a set of post types (1:1
            posts, carousel slides, data-stat cards and quote cards) that turned
            reports into a scrollable feed.
          </p>
          <div className={u.carousel}>
            <div className={u.carouselTrack}>
              {/* The list is duplicated so the marquee loops seamlessly. */}
              {[0, 1].map((loop) =>
                Array.from({ length: 5 }).map((_, i) => (
                  <img
                    key={`${loop}-${i}`}
                    className={u.carouselSlide}
                    src="/images/Li carousel_un80.webp"
                    alt=""
                    aria-hidden={loop === 1 ? true : undefined}
                  />
                )),
              )}
            </div>
          </div>

          {/* The Reform Brief newsletter */}
          <div className={u.channelLabel}>
            The Reform Brief · LinkedIn newsletter
          </div>
          <div className={u.newsletterRow}>
            <div className={u.emailCard}>
              <div className={u.emailHead}>UN80 · The Reform Brief</div>
              <div className={u.emailBody}>
                <div className={`${u.ph} ${u.emailMast}`}>masthead image</div>
                <div className={u.emailLine} style={{ width: '80%' }} />
                <div className={u.emailLine} style={{ width: '95%' }} />
                <div className={u.emailLine} style={{ width: '60%', marginBottom: 0 }} />
              </div>
            </div>
            <div>
              <h3 className={u.newsletterTitle}>
                A recurring template that made complex reform digestible.
              </h3>
              <p className={u.newsletterText}>
                Same masthead, same rhythm, same plain-language cards, issue
                after issue. It grew a subscriber base from zero and gave the
                initiative a dependable voice in the inbox.
              </p>
            </div>
          </div>

          {/* Web (Drupal) */}
          <div className={u.channelLabel}>Web · un.org/un80-initiative (Drupal)</div>
          <p className={u.channelDesc}>
            Templates for the un.org/un80-initiative landing page and updates, so
            the identity carried onto the initiative's official home.
          </p>
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
                <h2 className={u.siteHeadline}>
                  The public home for the reform.
                </h2>
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
                  href="https://www.un.org/un80-initiative"
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

        {/* ============ THE LANDING PAGE — the detail still to be written ==== */}
        <section className={u.section}>
          <h3 className={u.subHeadingFirst}>Why the structure works</h3>
          <p className={u.placeholderNote}>
            To finalise: the actual top-to-bottom page structure and the one
            design decision you're proudest of.
          </p>

          <h3 className={u.subHeading}>Designing within Drupal</h3>
          <p className={u.bodyText}>
            The page was built in Drupal, the UN's content management system,
            which set the boundaries of what was possible.
          </p>
          <p className={u.placeholderNote}>
            To finalise: the specific Drupal constraints you worked within and
            how the design adapted, ideally with one concrete before/after
            example.
          </p>
        </section>

        {/* ============ 05 · RESULTS + 06 · REFLECTION (one blue box) ============ */}
        <section className={u.resultsSection}>
          <SectionLabel title="RESULTS" number="05" dark />
          <div className={u.resultsGrid}>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={610} duration={1600} />K
              </span>
              <span className={u.resultLabel}>
                social impressions across the campaign
              </span>
            </div>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={8050} duration={1800} />
              </span>
              <span className={u.resultLabel}>newsletter article views</span>
            </div>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={5992} duration={1800} />
              </span>
              <span className={u.resultLabel}>new subscribers, from zero</span>
            </div>
            <div className={u.resultStat}>
              <span className={u.resultNum}>
                <CountUp to={1} duration={900} />
              </span>
              <span className={u.resultLabel}>
                coherent identity, adopted across the initiative
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
