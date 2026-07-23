/**
 * Generates link-preview and favicon from Bright Teal logo.
 * OG preview: full logo centered on black background.
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const logoPath = path.join(root, 'public', 'images', 'logo-blue.png');
const publicDir = path.join(root, 'public');

async function composeLogo({
  width,
  height,
  paddingRatio = 0.1,
  background,
  outName,
}) {
  const logo = sharp(logoPath);
  const meta = await logo.metadata();
  const padX = Math.round(width * paddingRatio);
  const padY = Math.round(height * paddingRatio);
  const maxW = width - padX * 2;
  const maxH = height - padY * 2;
  const scale = Math.min(maxW / (meta.width ?? maxW), maxH / (meta.height ?? maxH));
  const logoW = Math.round((meta.width ?? maxW) * scale);
  const logoH = Math.round((meta.height ?? maxH) * scale);
  const left = Math.round((width - logoW) / 2);
  const top = Math.round((height - logoH) / 2);

  const resizedLogo = await logo.resize(logoW, logoH, { fit: 'inside' }).png().toBuffer();

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background,
    },
  })
    .composite([{ input: resizedLogo, left, top }])
    .png()
    .toFile(path.join(publicDir, outName));

  console.log(`Created public/${outName} (${width}x${height})`);
}

await mkdir(publicDir, { recursive: true });

/* Link preview: full Bright Teal logo, centered on black */
await composeLogo({
  width: 1200,
  height: 630,
  paddingRatio: 0.12,
  background: { r: 0, g: 0, b: 0 },
  outName: 'og-image.png',
});

/* Favicon / app icon: logo on white for browser tabs */
await composeLogo({
  width: 512,
  height: 512,
  paddingRatio: 0.14,
  background: { r: 255, g: 255, b: 255 },
  outName: 'icon.png',
});
