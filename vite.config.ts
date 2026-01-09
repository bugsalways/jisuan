import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',   // 👈 直接写死，不要用函数
  plugins: [react()],
})
