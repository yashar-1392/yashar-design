import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/deepmokh/', // <--- این خط را اضافه کن (دقیقاً نام ریپوزیتوری خودت)
})
