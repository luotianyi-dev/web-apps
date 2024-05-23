import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

import { packages } from './license-aggregator'


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    WEBSITE_NAME: JSON.stringify('Tianyi Network Apps'),
    DEPENDENCY_LICENSE: JSON.stringify(packages),
  },
  server: {
    proxy: {
      '/apps/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    vue(),
    ViteMinifyPlugin({}),
  ],
})
