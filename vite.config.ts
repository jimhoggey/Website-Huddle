import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      // Render every route to static HTML at build time. Cloudflare Pages then
      // serves `dist/client` as a plain static site — no server runtime needed.
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
    }),
    viteReact(),
  ],
})

export default config
