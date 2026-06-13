import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const budgetBytes = 150 * 1024;
const routes = [
  '/inicio/page',
  '/admin/page',
  '/admin/productos/page',
  '/admin/cotizaciones/page',
];
const manifest = JSON.parse(
  await readFile('.next/app-build-manifest.json', 'utf8'),
);
const failures = [];

for (const route of routes) {
  const files = manifest.pages[route]?.filter((file) => file.endsWith('.js'));

  if (!files) {
    failures.push(`${route}: no encontrado`);
    continue;
  }

  let size = 0;
  for (const file of files) {
    size += gzipSync(await readFile(`.next/${file}`)).byteLength;
  }

  const sizeKb = (size / 1024).toFixed(1);
  console.log(`${route}: ${sizeKb} kB gzip`);
  if (size > budgetBytes) {
    failures.push(`${route}: ${sizeKb} kB`);
  }
}

if (failures.length > 0) {
  throw new Error(`Rutas sobre el presupuesto: ${failures.join(', ')}`);
}
