import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { curriculum } from '../data/index.js';
const dest = new URL('../ios/Weiji/Content/', import.meta.url);
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
await writeFile(new URL('curriculum.json', dest), JSON.stringify(curriculum));
await build({ entryPoints: ['scripts/ios-renderer.js'], bundle: true, format: 'iife', target: 'safari17',
  outfile: new URL('renderer.js', dest).pathname, loader: { '.woff': 'file', '.woff2': 'file', '.ttf': 'file' },
  assetNames: 'fonts/[name]-[hash]', minify: true });
// esbuild does not expand Tailwind directives; use the same local stylesheet pipeline as the web build.
execFileSync(process.execPath, ['node_modules/tailwindcss/lib/cli.js', '-i', new URL('renderer.css', dest).pathname,
  '-o', new URL('renderer.css', dest).pathname, '--minify'], { stdio: 'inherit' });
await writeFile(new URL('renderer.html', dest), `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'none'">
<link rel="stylesheet" href="renderer.css"></head><body><main id="content"></main><script src="renderer.js"></script></body></html>`);
await cp('node_modules/katex/LICENSE', new URL('KaTeX-LICENSE.txt', dest));
console.log(`Bundled ${curriculum.flatMap(m => m.lessons.flatMap(l => l.units)).length} offline lessons.`);
