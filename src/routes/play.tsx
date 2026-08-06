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
      // Work in progress: keep this page out of search results until the
      // nav links to it. (robots.txt also disallows /play as a backup.)
      { name: 'robots', content: 'noindex, nofollow' },
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
