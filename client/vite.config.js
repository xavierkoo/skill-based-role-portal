import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, // enable routing from external (webpage served to user) to intenal container (docker container with the vue)
    port: 8080,
    proxy: {
      '/api/v1/rolelistings/': {
        // auto appends to the target
        target: 'http://server_backend:5101', // URL of Container 2
        changeOrigin: true,
        secure: false // Insecure, but okay for local development
      },
      '/api/v1/rolelistings/update': {
        target: 'http://server_backend:5101', // URL of Container 2
        changeOrigin: true,
        secure: false // Insecure, but okay for local development
      },
      '/api/v1/roledetails/': {
        // auto appends to the target
        target: 'http://server_backend:5101', // URL of Container 2
        changeOrigin: true,
        secure: false // Insecure, but okay for local development
      },
      '/api/v1/applications/': {
        // auto appends to the target
        target: 'http://server_backend:5101', // URL of Container 2
        changeOrigin: true,
        secure: false // Insecure, but okay for local development
      },
      '/api/v1/staffskills/': {
        target: 'http://server_backend:5101', // Update with the correct backend URL
        changeOrigin: true,
        secure: false
      },
      '/api/v1/allskills/': {
        target: 'http://server_backend:5101', // Update with the correct backend URL
        changeOrigin: true,
        secure: false
      }
      // '^/records/.*': {
      //     // auto appends to the target
      //     target: 'http://search:5101', // URL of Container 2
      //     changeOrigin: true,
      //     secure: false // Insecure, but okay for local development
      //     // rewrite: (path) =>
      //     //     path.replace(/^\/records\/([^\/]*)/, '/records?company=$1')
      // }
    }
  }
})
