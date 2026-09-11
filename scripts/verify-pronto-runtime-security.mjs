import { readFileSync } from 'node:fs';

const nextPackage = JSON.parse(readFileSync('node_modules/next/package.json', 'utf8'));
const [major = 0, minor = 0, patch = 0] = String(nextPackage.version)
  .split('.')
  .slice(0, 3)
  .map((part) => Number.parseInt(part, 10) || 0);

const patched = major > 16 || (major === 16 && (minor > 3 || (minor === 3 && patch >= 3)));

if (!patched) {
  throw new Error(
    `Pronto release blocked: Next.js ${nextPackage.version} is below the August 2026 security floor 16.3.3.`
  );
}

console.log(`Pronto runtime security floor: PASS (${nextPackage.version})`);
