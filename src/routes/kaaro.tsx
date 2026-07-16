import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
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
  // Brand strategy accordion: which of the three panels is expanded.
  const [openStrategy, setOpenStrategy] = useState(0)
  // Customer reviews: horizontal scroller with arrows + a parallax backdrop
  // (the background photo drifts slower than the review cards).
  const reviewsTrackRef = useRef<HTMLDivElement>(null)
  const reviewsBgRef = useRef<HTMLImageElement>(null)
  const [reviewScroll, setReviewScroll] = useState({ left: false, right: true })

  useEffect(() => {
    const track = reviewsTrackRef.current
    const bg = reviewsBgRef.current
    if (!track || !bg) return
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track
      setReviewScroll({
        left: scrollLeft > 8,
        right: scrollLeft < scrollWidth - clientWidth - 8,
      })
      // Parallax: pan the (oversized) backdrop across its spare width as the
      // cards scroll from start to end.
      const maxScroll = scrollWidth - clientWidth
      const spare = bg.offsetWidth - clientWidth
      if (maxScroll > 0 && spare > 0) {
        bg.style.transform = `translateX(${-(scrollLeft / maxScroll) * spare}px)`
      }
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollReviews = (dir: 'left' | 'right') => {
    reviewsTrackRef.current?.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }
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
                src="/images/kaaro_banner.webp"
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
              src="/images/kaaro_headline.webp"
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
            The Instagram small-business boom during the COVID-19 pandemic flooded
            the market with handmade jewelry.
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
                img: '/images/kaaro_01.webp',
                imgPos: '50% 30%',
                flip: false,
              },
              {
                title: 'Authenticity',
                desc: 'With thousands of small businesses launching at once, buyers were skeptical. Kaaro had to prove genuine story and craft and build trust.',
                img: '/images/kaaro_02.webp',
                imgPos: '50% 50%',
                flip: true, // middle card: image on top, icon + number at the bottom
              },
              {
                title: 'Visibility',
                desc: 'Growth of the brand depended on a strategic, creative presence both online and offline, building a community of customers.',
                img: '/images/kaaro_03.webp',
                imgPos: '50% 60%',
                flip: false,
              },
            ].map((item, i) => {
              const iconRow = (
                <div className={k.challengeTop}>
                  <img
                    className={k.challengeIcon}
                    src="/images/kaaro_gingko.webp"
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

        {/* Target Market — text left, looping photo-album stack right */}
        <section className={k.section} style={{ paddingTop: 64 }}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="TARGET MARKET" />
          </div>
          <div className={k.targetContent}>
            <p className={k.targetText}>
              We anchored every decision in a clear audience: those who appreciate
              craft and design but expect it to stay affordable and wearable. That
              focus kept the brand from chasing trends and pushed it toward
              versatile pieces with genuine longevity.
            </p>
            <div className={k.albumStack} aria-hidden="true">
              {/* ?v=3 makes browsers re-download the updated files instead of
                  using an old cached copy — bump the number if they change again */}
              <img className={`${k.albumPhoto} ${k.albumPhoto1}`} src="/images/kaaro_target 01.webp?v=3" alt="" />
              <img className={`${k.albumPhoto} ${k.albumPhoto2}`} src="/images/kaaro_target 02.webp?v=3" alt="" />
              <img className={`${k.albumPhoto} ${k.albumPhoto3}`} src="/images/kaaro_target 03.webp?v=3" alt="" />
            </div>
          </div>
        </section>

        {/* Brand Language & Visual Identity — logo + meaning, then bento grid.
            Hovering one bento tile dims all the others. */}
        <section className={k.section} style={{ paddingTop: 64 }}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="BRAND LANGUAGE AND VISUAL IDENTITY" />
          </div>
          <div className={k.visualContent}>
            <div className={k.visualText}>
              <p className={k.visualBody}>
                The logo mark pairs the Japanese <strong>enso</strong>, symbolizing enlightenment,
                strength, and the universe's continuous cycle, with <strong>ginkgo leaves</strong>,
                which stand for resilience and longevity. Together they capture Kaaro's belief that
                jewelry should be both timeless and personal.
              </p>
            </div>
          </div>
          <div className={k.valueTagRow}>
            {['Tasteful', 'Simple', 'Elegant', 'Affordable'].map((word) => (
              <span key={word} className={k.valueTag}>{word}</span>
            ))}
          </div>
          <div className={k.bentoGrid}>
            <img className={`${k.bentoImg} ${k.bentoLogo}`} src="/images/Card 1.1 (1×2).webp" alt="Kaaro logo card" />
            <img className={`${k.bentoImg} ${k.bentoChain}`} src="/images/Card 2.3 (2×3)-1.webp" alt="Palm-leaf packaging" />
            <img className={`${k.bentoImg} ${k.bentoGrey}`} src="/images/Card 5.1 (1×2).webp" alt="Monochrome jewelry flatlay" />
            <img className={`${k.bentoImg} ${k.bentoInsta}`} src="/images/Card 2.2 (1×3).webp" alt="Instagram post of models in the garden" />
            <img className={`${k.bentoImg} ${k.bentoTote}`} src="/images/Card 3.1 (1×2)-1.webp" alt="Kaaro tote bag" />
            <img className={`${k.bentoImg} ${k.bentoPicnic}`} src="/images/Card 3.1 (1×2).webp" alt="Jewelry chains flatlay" />
            <img className={`${k.bentoImg} ${k.bentoPack}`} src="/images/Card 2.3 (2×3).webp" alt="Picnic styling with flowers" />
            <img className={`${k.bentoImg} ${k.bentoGlass}`} src="/images/Card 2.3 (2×3)-2.webp" alt="Glassware still life" />
            <div className={k.bentoPalette} role="img" aria-label="Kaaro colour palette">
              <div style={{ background: 'var(--kaaro-teal)' }} />
              <div style={{ background: 'var(--kaaro-gold)' }} />
              <div style={{ background: '#1E1E1E' }} />
            </div>
          </div>
        </section>

        {/* Brand Strategy */}
        <section className={k.section} style={{ paddingTop: 64, paddingBottom: 80 }}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="BRAND STRATEGY" />
          </div>
          <p className={k.sectionIntro}>
            Rather than competing on price and volume, Kaaro built differentiation into
            how it designed, packaged, sold and partnered.
          </p>
          {/* Expanding panels: the open panel shows its content and media,
              the other two collapse into numbered strips. Click to switch.
              To add media to a panel, put file paths in its `media` array —
              images ('/images/foo.png') or videos ('/images/foo.mp4') both
              work. While `media` is empty, dashed placeholder boxes show. */}
          <div className={k.strategyAccordion}>
            {[
              { label: 'Innovate', title: 'Design & packaging', desc: <>Used sustainable palm-leaf packaging and a steady stream of fresh design collections, keeping the brand feeling distinct. Our design collections ranged from traditional Indian designs, featuring motifs and <em>jhumkas</em>, to more minimal and simplistic designs, catering to all needs.</>, media: ['/images/packaging_01.webp', '/images/designs.webp'] },
              { label: 'Engage', title: 'Community, on & offline', desc: <>Fostered strong engagement with the audience online through Instagram, and offline through pop-ups. This encouraged customer interaction, helped gather feedback, and involved the audience in the brand's journey. This connection enhanced loyalty and differentiated Kaaro from competitors.</>, media: ['/images/engagement_01.webp', '/images/engagement_02.webp'] },
              { label: 'Amplify', title: 'Collaborations', desc: <>Explored collaborations with influencers, artists, photographers, or other fashion brands that aligned with Kaaro's values. This amplified the brand's visibility and brought in new audiences while reinforcing its unique identity.</>, media: ['/images/collaboration_01.webp', '/images/engagement_new.webp'] },
            ].map((item, i) => {
              const open = openStrategy === i
              return (
                <div
                  key={i}
                  className={`${k.strategyPanel} ${k[`strategyPanel${i + 1}`]} ${open ? k.strategyPanelOpen : ''}`}
                  onClick={() => setOpenStrategy(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenStrategy(i) }}
                  aria-expanded={open}
                >
                  <div className={k.strategyContent} aria-hidden={!open}>
                    <span className={k.strategyLabel}>{item.label}</span>
                    <h4 className={k.strategyTitle}>{item.title}</h4>
                    <p className={k.strategyDesc}>{item.desc}</p>
                    <div className={k.strategyMedia}>
                      {item.media.length > 0 ? (
                        // Each image/video sits inside a clipping box so it can
                        // be zoomed/nudged without spilling over its rounded
                        // corners or the gap between items.
                        item.media.map((src) => (
                          <div key={src} className={k.strategyMediaBox}>
                            {src.endsWith('.mp4') || src.endsWith('.webm') ? (
                              <video className={k.strategyMediaFill} src={src} autoPlay muted loop playsInline />
                            ) : (
                              <img className={k.strategyMediaFill} src={src} alt="" />
                            )}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className={k.strategyMediaPlaceholder}>Image / video</div>
                          <div className={k.strategyMediaPlaceholder}>Image / video</div>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={k.strategyPanelNum}>{i + 1}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Results & Impact (brand green) */}
        <section className={`${s.impactSection} ${k.impactGreen}`}>
          <SectionLabel title="RESULTS & IMPACT" dark />

          <p className={k.impactBody}>
            Over the course of 2 years, Kaaro witnessed a notable increase in brand
            visibility, engagement on social media platforms, and a growing community
            of loyal customers. Collaborations with multiple brands and artists
            resulted in expanded reach and heightened credibility. The brand's
            commitment to authenticity and uniqueness not only withstood market
            challenges but has also contributed to a positive impact on customer
            perception and brand loyalty. Kaaro's strategic approaches translated
            into tangible results, solidifying its position in the competitive
            jewelry and accessory market.
          </p>

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
            Beyond the numbers, Kaaro built <span className={s.impactClosingHighlight}>lasting brand visibility and customer loyalty</span>, one handcrafted piece at a time.
          </h2>

          {/* Customer reviews — screenshot cards scrolling inside a rounded
              frame that lives within the green results band. The backdrop
              photo pans slower than the cards (parallax). Every card renders
              at the SAME scale (natural width × 0.75) so the text inside each
              screenshot reads at a consistent size. */}
          <div className={k.reviews} aria-label="Customer reviews">
          <div className={k.reviewsFrame}>
            <img ref={reviewsBgRef} className={k.reviewsBg} src="/images/collaboration_02.webp" alt="" aria-hidden="true" />

            <button
              className={k.reviewsArrow}
              style={{ left: 24, opacity: reviewScroll.left ? 1 : 0, pointerEvents: reviewScroll.left ? 'auto' : 'none' }}
              aria-label="Scroll reviews left"
              onClick={() => scrollReviews('left')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className={k.reviewsArrow}
              style={{ right: 24, opacity: reviewScroll.right ? 1 : 0, pointerEvents: reviewScroll.right ? 'auto' : 'none' }}
              aria-label="Scroll reviews right"
              onClick={() => scrollReviews('right')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>

            <div className={k.reviewsTrack} ref={reviewsTrackRef}>
              <div className={k.reviewsRow}>
                {[
                  { src: 'reviews_01.webp', w: 413 },
                  { src: 'reviews_02.webp', w: 477 },
                  { src: 'reviews_03.webp', w: 658 },
                  { src: 'reviews_04.webp', w: 547 },
                  { src: 'reviews_05.webp', w: 550 },
                  { src: 'reviews_06.webp', w: 250 },
                  { src: 'reviews_07.webp', w: 169 },
                  { src: 'reviews_08.webp', w: 665 },
                  { src: 'reviews_09.webp', w: 260 },
                  { src: 'reviews_010.webp', w: 345 },
                  { src: 'reviews_11.webp', w: 411 },
                  { src: 'reviews_12.webp', w: 449 },
                  { src: 'reviews_13.webp', w: 665 },
                  { src: 'reviews_14.webp', w: 414 },
                ].map((r) => (
                  <img
                    key={r.src}
                    className={k.reviewImg}
                    src={`/images/${r.src}`}
                    alt="Customer review"
                    style={{ width: Math.round(r.w * 0.75) }}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Instagram CTA — closes the page with a link to the live brand. */}
          <div className={k.instaCtaWrap}>
            <a
              className={k.instaCta}
              href="https://www.instagram.com/kaaro._/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              View Kaaro on Instagram
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
