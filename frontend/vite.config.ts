import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/React-Typescript-Work-Day-Scheduler/',
  plugins: [react()],
})
