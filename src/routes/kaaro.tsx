import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { SectionLabel } from '~/components/SectionLabel'
import { CountUp } from '~/components/CountUp'
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
  return (
    <>
      <Navbar alwaysVisible />
      <main className={`${s.page} ${k.kaaro}`}>
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
          <div className={s.heroImage}>
            <img src="/images/kaaro_banner.JPG" alt="Kaaro handcrafted jewelry" />
          </div>
        </section>

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

        {/* Overview */}
        <section className={s.overview}>
          <SectionLabel title="OVERVIEW" />
          <div className={s.overviewGrid}>
            <h2 className={s.overviewHeading}>
              Kaaro is a handcrafted jewelry brand that blends modern and traditional elements.
            </h2>
            <p className={s.overviewBody}>
              Created by two NIFT Bengaluru students, Kaaro offers unique, affordable, and versatile
              accessories — handcrafted pieces designed to fill a gap in the market for urban Indian
              consumers across diverse, everyday settings.
            </p>
          </div>
        </section>

        {/* Brand statement */}
        <section className={k.statement}>
          <h2 className={k.statementText}>
            Accessories that seamlessly blend <em>modern</em> and <em>traditional</em> elements —
            handcrafted, tasteful, and made to last.
          </h2>
        </section>

        {/* Challenges */}
        <section className={k.section}>
          <div className={k.sectionLabelWrap}>
            <SectionLabel title="CHALLENGES" />
          </div>
          <p className={k.sectionIntro}>
            Launching a small jewelry brand meant standing out in a crowded, fast-moving market.
          </p>
          <div className={k.challengeGrid}>
            {[
              'Market saturation limiting distinctiveness',
              'Rapidly evolving fashion trends',
              'A crowded Instagram small-business marketplace',
              'Authenticity concerns amid a flood of small businesses',
              'Social media visibility obstacles',
            ].map((text, i) => (
              <div key={i} className={k.challengeCard}>
                <span className={k.challengeNum}>{String(i + 1).padStart(2, '0')}</span>
                <p className={k.challengeText}>{text}</p>
              </div>
            ))}
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
