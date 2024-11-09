import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          preloadFonts: [
            {
              rel: 'preload',
              href: '/assets/fonts/NanumSquareOTF_acR.otf',
              as: 'font',
              type: 'font/otf',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: '/assets/fonts/NanumSquareOTF_acB.otf',
              as: 'font',
              type: 'font/otf',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: '/assets/fonts/NanumSquareOTF_acEB.otf',
              as: 'font',
              type: 'font/otf',
              crossorigin: 'anonymous',
            },
          ],
        },
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/fonts/*.otf',
          dest: 'assets/fonts',
        },
      ],
    }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
