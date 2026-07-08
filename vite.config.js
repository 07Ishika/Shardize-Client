import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['tslib'],
    },
  },
  // ensure dev server pre-bundles tslib used by Mantine and other deps
  optimizeDeps: {
    include: ['tslib'],
  },
})
