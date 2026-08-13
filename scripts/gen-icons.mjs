import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';

const out = 'public/icons';
await mkdir(out, { recursive: true });

await sharp('scripts/icon.svg').resize(512, 512).png({ compressionLevel: 9 }).toFile(`${out}/icon-512.png`);
await sharp('scripts/icon.svg').resize(192, 192).png({ compressionLevel: 9 }).toFile(`${out}/icon-192.png`);
await sharp('scripts/icon.svg').resize(512, 512).png({ compressionLevel: 9 }).toFile(`${out}/icon-maskable-512.png`);
await sharp('scripts/icon.svg').resize(180, 180).png({ compressionLevel: 9 }).toFile(`${out}/apple-touch-icon.png`);
await copyFile('scripts/favicon.svg', `${out}/favicon.svg`);

console.log('Icons generated in public/icons/');
