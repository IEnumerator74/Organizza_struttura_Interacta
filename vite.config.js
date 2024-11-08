import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Interacta/'  // Assicurati che questo corrisponda esattamente al nome del repository
})