import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/HB/', // <- importante: app está publicado em /HB/
  build: {
    cssCodeSplit: false, // Gera um único CSS
    rollupOptions: {
      output: {
        entryFileNames: 'assets/m2-app.js',
        // assetFileNames removido para não renomear imagens incorretamente
        // O CSS único será gerado com o nome padrão (style.css ou similar)
      },
    },
  },
})
