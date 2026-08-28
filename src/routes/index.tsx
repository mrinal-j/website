import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/Navbar'
import { Hero } from '~/components/home/Hero'
import { FeaturedWorks } from '~/components/home/FeaturedWorks'
import { Statements } from '~/components/home/Statements'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Mrinal Jadhav' },
      { name: 'description', content: 'Mrinal Jadhav is a visual designer and strategist in New York City, building brand strategies, identities and campaigns.' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statements />
        <FeaturedWorks />
      </main>
      <Footer />
    </>
  )
}
