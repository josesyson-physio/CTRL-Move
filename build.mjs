// Ctrl+Move build: bundles src/ with esbuild and copies public/ into dist/.
// `npm run build`  → production bundle in dist/
// `npm run dev`    → local server at http://localhost:5173 with rebuild on save
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';

const serve = process.argv.includes('--serve');
const outdir = 'dist';

rmSync(outdir, { recursive: true, force: true });
mkdirSync(`${outdir}/assets`, { recursive: true });
cpSync('public', outdir, { recursive: true });

// Stamp the service worker cache name so each deploy refreshes offline files.
const swPath = `${outdir}/sw.js`;
writeFileSync(swPath, readFileSync(swPath, 'utf8').replace('__BUILD__', String(Date.now())));

const options = {
  entryPoints: { app: 'src/main.jsx' },
  bundle: true,
  outdir: `${outdir}/assets`,
  format: 'esm',
  jsx: 'automatic',
  target: ['es2020', 'safari15'],
  minify: !serve,
  sourcemap: serve ? 'inline' : false,
  define: { 'process.env.NODE_ENV': JSON.stringify(serve ? 'development' : 'production') },
  logLevel: 'info',
};

if (serve) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: outdir, port: 5173 });
  console.log(`\n  Ctrl+Move running at http://localhost:${port}\n`);
} else {
  await esbuild.build(options);
  console.log('Built Ctrl+Move into dist/');
}
