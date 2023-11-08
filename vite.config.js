import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: [
        'assets/img/arrow-left.svg',
        'assets/img/arrow-right.svg',
        'assets/img/cal.svg',
        'assets/img/dots.svg',
        'assets/img/refresh.svg',
        'assets/img/save.svg',
        'assets/img/settings.svg',
        'favicon.ico'
      ]
    },
  }
})