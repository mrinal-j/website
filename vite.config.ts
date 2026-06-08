import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import path from 'path'

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart({
      router: {
        codeSplittingOptions: {
          defaultBehavior: [],
        },
      },
      // Prerendering only runs for the production build. Leaving it on during
      // `bun dev` makes the dev server hang on startup, so it's gated here.
      prerender: {
        enabled: command === 'build',
        crawlLinks: true,
        autoSubfolderIndex: true,
        filter: (page) => !page.path.endsWith('.pdf'),
      },
    }),
  ],
  server: {
    port: 3003,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
}))
