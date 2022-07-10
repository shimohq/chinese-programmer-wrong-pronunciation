import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs',
    assetsDir: '',
  },
  define: {
    'process.env': {
      BASE_URL: '/'
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
    ]
  }
})
