import react from '@vitejs/plugin-react'
import { defineConfig , splitVendorChunkPlugin } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: '8080'
  },
  resolve:{
    alias:{
    },
  },
  build: {
    rollupOptions: {
    },
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      }
    })
  ]
})
