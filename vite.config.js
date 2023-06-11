import { defineConfig } from 'vite';
import viteBanner from 'vite-plugin-banner';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from './package.json';

const banner = `
/**
 * @name ${pkg.name}
 * @description ${pkg.description}
 *
 * @version ${pkg.version}
 * @author ${pkg.author}
 * @license ${pkg.license}
 */
`.trim();
const outputFolder = 'dist'; // Specify the output directory (relative to project root).
const assetsFolder = 'assets'; // Specify the assets folder (relative to project root).
const isForGithub = process.env.BRANCH === 'gh-pages';

export default defineConfig({
  base: isForGithub ? '/Ray-Casting/' : '/', // The name of the Github repository
  assetsInclude: assetsFolder,
  server: {
    open: true,
    host: true,
  },
  build: {
    outDir: outputFolder,
    assetsDir: assetsFolder,
    assetsInlineLimit: 0,
    minify: 'terser',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        dir: outputFolder,
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
        assetFileNames: ({ name = '' }) => {
          if (/\.css/.test(name)) return `${assetsFolder}/styles/[name][extname]`;
          return '[name][extname]';
        }
      }
    }
  },
  plugins: [
    viteBanner({ outDir: outputFolder, content: banner }),
    createHtmlPlugin({ minify: true }),
  ]
});