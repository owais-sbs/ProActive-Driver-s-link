/**
 * Builds site logos, link-preview, and favicon from the ProActive Driver's Link Canada mark.
 * Palette: solid teal #006078 + maple red #D83030 (no gradients).
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sourceLogo = path.join(
  root,
  'new logo',
  'Proactive Drivers Link Canada Final Logo.png'
);
const imagesDir = path.join(root, 'public', 'images');
const publicDir = path.join(root, 'public');

const TEAL_DEEP = { r: 0, g: 60, b: 72 }; // #003C48
const WHITE = { r: 255, g: 255, b: 255 };

async function toWhiteRgba(data, width, height, channels) {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += channels) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const a = out[i + 3];
    if (a < 8) continue;

    const isMaple = r > 140 && r > g + 40 && r > b + 40;
    if (isMaple) continue;

    const lum = r + g + b;
    const isRoad = lum < 90 && b - r < 40;
    if (isRoad) continue;

    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
  }
  return sharp(out, { raw: { width, height, channels } }).png().toBuffer();
}

async function composeOnCanvas({
  logoBuffer,
  width,
  height,
  paddingRatio,
  background,
  outPath,
}) {
  const meta = await sharp(logoBuffer).metadata();
  const padX = Math.round(width * paddingRatio);
  const padY = Math.round(height * paddingRatio);
  const maxW = width - padX * 2;
  const maxH = height - padY * 2;
  const scale = Math.min(maxW / (meta.width ?? maxW), maxH / (meta.height ?? maxH));
  const logoW = Math.round((meta.width ?? maxW) * scale);
  const logoH = Math.round((meta.height ?? maxH) * scale);
  const left = Math.round((width - logoW) / 2);
  const top = Math.round((height - logoH) / 2);
  const resized = await sharp(logoBuffer)
    .resize(logoW, logoH, { fit: 'inside' })
    .png()
    .toBuffer();

  await sharp({
    create: { width, height, channels: 3, background },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toFile(outPath);
}

await mkdir(imagesDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

const colorBuffer = await sharp(sourceLogo).trim({ threshold: 8 }).ensureAlpha().png().toBuffer();
const colorMeta = await sharp(colorBuffer).metadata();
const { data, info } = await sharp(colorBuffer).raw().toBuffer({ resolveWithObject: true });
const whiteBuffer = await toWhiteRgba(data, info.width, info.height, info.channels);

await sharp(colorBuffer)
  .resize({ width: 1600, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(imagesDir, 'logo-blue.png'));

await sharp(whiteBuffer)
  .resize({ width: 1600, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(imagesDir, 'logo-white.png'));

await composeOnCanvas({
  logoBuffer: colorBuffer,
  width: 1200,
  height: 630,
  paddingRatio: 0.1,
  background: WHITE,
  outPath: path.join(publicDir, 'og-image.png'),
});

const markWidth = Math.min(Math.round((colorMeta.width ?? 1600) * 0.28), colorMeta.width ?? 1600);
const markBuffer = await sharp(colorBuffer)
  .extract({
    left: 0,
    top: 0,
    width: markWidth,
    height: colorMeta.height ?? info.height,
  })
  .trim({ threshold: 8 })
  .png()
  .toBuffer();
const markRaw = await sharp(markBuffer).raw().toBuffer({ resolveWithObject: true });
const whiteMark = await toWhiteRgba(
  markRaw.data,
  markRaw.info.width,
  markRaw.info.height,
  markRaw.info.channels
);

await composeOnCanvas({
  logoBuffer: whiteMark,
  width: 512,
  height: 512,
  paddingRatio: 0.16,
  background: TEAL_DEEP,
  outPath: path.join(publicDir, 'icon.png'),
});

await sharp(markBuffer)
  .resize({ height: 256, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(imagesDir, 'logo-mark-blue.png'));

await sharp(whiteMark)
  .resize({ height: 256, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(imagesDir, 'logo-mark-white.png'));

console.log('Brand assets written: logo-blue, logo-white, logo-mark-blue, logo-mark-white, og-image, icon');
