import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const targets = ['.next', 'out', 'coverage', 'playwright-report', 'tsconfig.tsbuildinfo'];

await Promise.all(
  targets.map((target) =>
    rm(resolve(process.cwd(), target), { recursive: true, force: true }),
  ),
);
