import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { MoreWork } from '~/components/case-study/MoreWork'
import { useScrollReveal } from '~/hooks/useScrollReveal'
import s from '~/components/case-study/InTheLoop.module.css'
import c from '~/components/case-study/IntegratedCare.module.css'

export const Route = createFileRoute('/integrated-care-for-children')({
  head: () => ({
    meta: [
      { title: 'Integrated Care for Children — Mrinal Jadhav' },
      { name: 'description', content: 'Integrated Care for Children.' },
      // Hide this page from search engines while it's still being built.
      // Remove this line when ready to launch.
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: IntegratedCarePage,
})

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
              <p>Content coming soon.</p>
            </div>
          </div>
        </section>

        {/* ============ CONTENT — sections go here once the copy arrives. ============ */}

        <MoreWork currentSlug="/integrated-care-for-children" />
      </main>
      <Footer />
    </>
  )
}
