import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '~/components/Navbar'
import { PlayGrid } from '~/components/play/PlayGrid'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/play')({
  head: () => ({
    meta: [
      { title: 'Play — Mrinal Jadhav' },
      {
        name: 'description',
        content:
          'Odds and ends — packaging, identity, lighting, furniture, photography and styling work by Mrinal Jadhav.',
      },
    ],
  }),
  component: PlayPage,
})

function PlayPage() {
  return (
    <>
      <Navbar alwaysVisible ignoreFooter />
      <main style={{ minHeight: '100vh' }}>
        <PlayGrid />
      </main>
      <Footer />
    </>
  )
}
