/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { SmoothScroll } from '~/components/SmoothScroll'

import globalsCss from '~/styles/globals.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      { rel: 'stylesheet', href: globalsCss },
      { rel: 'icon', href: '/images/Favicon.png' },
      { rel: 'apple-touch-icon', href: '/images/Favicon.png' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <SmoothScroll />
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Runs before first paint so the browser doesn't restore scroll on refresh. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if('scrollRestoration' in history){history.scrollRestoration='manual'}var n=performance.getEntriesByType('navigation')[0];if(!n||n.type!=='back_forward'){window.scrollTo(0,0)}}catch(e){}",
          }}
        />
        <HeadContent />
        <script
          // Disable the browser's automatic scroll restoration so every refresh
          // starts at the top of the page (the hero section).
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);",
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
