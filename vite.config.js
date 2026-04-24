import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Configurado para a raiz do domínio (m2flex.com.br/)
  build: {
    target: 'es2015',
    cssCodeSplit: false, // Gera um único CSS
    rollupOptions: {
      output: {
        // Removendo nomes fixos para evitar problemas de cache no navegador
        // Agora o Vite gerará nomes com hashes únicos por build
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
