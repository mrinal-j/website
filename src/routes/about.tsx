import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/Navbar'
import { AboutHero } from '~/components/about/AboutHero'
import { Experience } from '~/components/about/Experience'
import { FreeTime } from '~/components/about/FreeTime'
// Parked for now, may come back. The component and its styles are still
// in src/components/home/HowIWork.tsx: put these two lines back to restore it.
// import { HowIWork } from '~/components/home/HowIWork'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About — Mrinal Jadhav' },
      { name: 'description', content: 'Mrinal Jadhav is a visual designer and strategist in New York City, building brand strategies, identities and campaigns.' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <Navbar alwaysVisible />
      <main style={{ minHeight: '100vh' }}>
        <AboutHero />
        <Experience />
        <FreeTime />
        {/* <HowIWork noLabelLine /> */}
      </main>
      <Footer />
    </>
  )
}
