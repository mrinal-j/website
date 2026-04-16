import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/Navbar'
import { Hero } from '~/components/home/Hero'
import { FeaturedWorks } from '~/components/home/FeaturedWorks'
import { Statements } from '~/components/home/Statements'
import { HowIWork } from '~/components/home/HowIWork'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Mrinal Jadhav — Designer' },
      { name: 'description', content: 'I design with empathy for communities, solutions that scale impact, and interventions that matter.' },
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
        <FeaturedWorks />
        <Statements />
        <HowIWork />
      </main>
      <Footer />
    </>
  )
}
