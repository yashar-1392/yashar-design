import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // اگر روی گیت‌هاب اکشنز/پیجز بودیم از /deepmokh/ استفاده کن، در غیر این صورت './'
  const isGitHubPages = process.env.GITHUB_ACTIONS === true || process.env.DEPLOY_TARGET === 'gh-pages';
  
  return {
    base: process.env.NODE_ENV === 'production' && !isGitHubPages ? './' : '/deepmokh/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
