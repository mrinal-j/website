import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
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
          'Building a brand for the UN80 Initiative: a distinct visual identity, built inside the UN master brand, that made system-wide reform legible to a general public.',
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
            content into <span>plain-language, on-brand communication</span> a
            general public could easily follow.
          </p>
        </section>

        {/* ============ 01 · CONTEXT ============ */}
        <section className={u.section}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="CONTEXT" number="01" />
          </div>
          <h2 className={u.sectionHeadline}>
            One of the most significant reform pushes in the UN's history.
          </h2>
          <p className={u.bodyText}>
            In March 2025, as the UN marked its 80th anniversary, the
            Secretary-General launched the UN80 Initiative, a system-wide effort
            to make the organisation more agile, integrated and effective amid
            tightening resources. The work spans three workstreams: finding
            efficiencies in the Secretariat, reviewing how mandates are
            implemented, and examining structural change and programme
            realignment.
          </p>
          <p className={u.bodyText}>
            Its outputs (reports, memos, action plans and mandates) were written
            for Member States and diplomats. For a wider audience, the story of
            what the UN was changing, and why, wasn't easy to follow.
          </p>
        </section>

        {/* ============ 02 · THE CHALLENGE ============ */}
        <section className={u.section}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="THE CHALLENGE" number="02" />
          </div>
          <h2 className={u.sectionHeadline}>
            Make institutional reform recognisable and legible, without stepping
            outside the institution's master brand.
          </h2>
          <p className={u.sectionIntro}>
            Reform only builds public trust when people can follow it. UN80's
            story lived in reports and formats built for insiders. It needed a
            visual identity and a communications system that could carry complex
            reform to a general audience, while staying officially UN.
          </p>

          <p className={u.subLabel}>Three problems, one hard constraint:</p>
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
            ].map((c) => (
              <div key={c.title} className={u.challengeCard}>
                <h3 className={u.challengeCardTitle}>{c.title}</h3>
                <p className={u.challengeCardText}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className={u.constraintCard}>
            <h3 className={u.constraintTitle}>
              A fixed master brand: the constraint
            </h3>
            <p className={u.constraintText}>
              The UN's blue and typography are non-negotiable and centrally
              governed. Any new identity had to live inside them, not replace
              them.
            </p>
          </div>
        </section>

        {/* ============ 03 · OBJECTIVES ============ */}
        <section className={u.section}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="OBJECTIVES" number="03" />
          </div>
          <h2 className={u.sectionHeadline}>What success looked like.</h2>
          <p className={u.objectivesBody}>
            One recognisable identity, adopted across every channel. Complex
            reform made digestible at a glance. And a reusable system of brand
            guidelines, templates and components that any team could apply
            consistently.
          </p>
        </section>

        {/* ============ 04 · APPROACH ============ */}
        <section className={u.section}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="APPROACH" number="04" />
          </div>
          <h2 className={u.sectionHeadline}>
            A modern layer on a fixed institutional base.
          </h2>
          <div className={u.approachSteps}>
            {[
              {
                title: 'Audit & strategy',
                desc: 'Reviewed the initiative’s existing outputs and the UN master-brand guidelines to map what was fixed and where there was room to move.',
              },
              {
                title: 'Sub-identity strategy',
                desc: 'Rather than a new logo, I defined UN80 as a distinct layer on top of the master brand: inherited elements locked; new elements added to signal modernity and momentum.',
              },
              {
                title: 'System design',
                desc: 'Built the components (templates, type hierarchy and a plain-language content pattern) as a kit teams could reuse.',
              },
              {
                title: 'Rollout & documentation',
                desc: 'Applied the system across web, LinkedIn and a newsletter, then codified it in brand guidelines so it could run consistently across teams.',
              },
            ].map((step, i) => (
              <div key={step.title} className={u.approachStep}>
                <span className={u.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={u.stepTitle}>{step.title}</h3>
                  <p className={u.stepText}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={u.placeholderNote}>
            Early exploration (moodboard and first iterations) to be added here.
          </p>
        </section>

        {/* ============ 05 · THE SUB-IDENTITY (dark) ============ */}
        <section className={u.systemSection}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="THE SUB-IDENTITY" number="05" dark />
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

        {/* ============ 06 · ACROSS CHANNELS ============ */}
        <section className={u.channelsSection}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="ACROSS CHANNELS" number="06" />
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

        {/* ============ 07 · THE LANDING PAGE ============ */}
        <section className={u.section}>
          <div className={u.sectionLabelWrap}>
            <SectionLabel title="THE LANDING PAGE" number="07" />
          </div>
          <h2 className={u.sectionHeadline}>The public home for the reform.</h2>
          <p className={u.sectionIntro}>
            un.org/un80-initiative was the initiative's official home, and for
            most people the first and only place they'd go to stay informed about
            the reform. The page had to do two jobs at once: introduce a complex,
            system-wide reform to a general public, and stand as the credible
            reference point for Member States, press and partners.
          </p>

          <h3 className={u.subHeading}>Why the structure works</h3>
          <p className={u.bodyText}>
            The page is ordered around the reader's questions, not the
            institution's org chart: what is this, why does it matter, what's
            changing, and where do I go next.
          </p>
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

        {/* ============ 08 · RESULTS + 09 · REFLECTION (one blue box) ============ */}
        <section className={u.resultsSection}>
          <SectionLabel title="RESULTS" number="08" dark />
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
              <SectionLabel title="REFLECTION" number="09" dark />
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
      <Footer />
    </>
  )
}
