import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/Navbar'
import { HowIWork } from '~/components/home/HowIWork'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About — Mrinal Jadhav' },
      { name: 'description', content: 'Learn more about Mrinal Jadhav — designer at the intersection of research, strategy, and impact.' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <Navbar alwaysVisible />
      <main style={{ minHeight: '100vh' }}>
        <HowIWork />
      </main>
      <Footer />
    </>
  )
}
