import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://skyship-backend-env.eba-rfu7gfxy.us-east-2.elasticbeanstalk.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})