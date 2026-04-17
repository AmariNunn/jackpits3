import sharp from "sharp";
import { readdir, stat, mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "client", "public", "images");
const ATTACHED = path.join(ROOT, "attached_assets");
const GALLERY_OUT = path.join(ROOT, "client", "src", "assets", "gallery");

const GALLERY_SOURCES = [
  "img_1869_1775627155323.jpg",
  "img_1867_1775627182910.jpg",
  "img_1782_1775627297000.jpg",
  "img_1788_1775627297001.jpg",
  "img_1783_1775627297001.jpg",
  "img_1787_1775627297001.jpg",
  "img_1779_1775627297001.jpg",
  "img_1786_1775627297002.jpg",
  "img_1785_1775627297002.jpg",
  "img_1682_1775627297002.jpg",
  "img_1789_1775627297002.jpg",
  "img_1793_1775627297002.jpg",
  "img_1795_1775627297003.jpg",
  "ac603f7b-fdad-4ad4-9ece-4d7b05d8bbc3_1775627299254.jpg",
  "img_1858_1775630634164.jpg",
  "img_1729_1775630634164.jpg",
  "img_1770_1775630634164.jpg",
  "img_1771_1775630634165.jpg",
  "img_1712_1775630634165.jpg",
  "img_1801_1775630634165.jpg",
  "img_1809_1775630634165.jpg",
  "img_1820_1775630634166.jpg",
  "img_1748_1775630634166.jpg",
  "img_1868_1775630634166.jpg",
  "img_1844_1775630634166.jpg",
  "img_1784_1775630634167.jpg",
  "img_1759_1775630634167.jpg",
  "img_1867_1775630634167.jpg",
  "img_1770_1775630647896.jpg",
  "img_1745_1775630647897.jpg",
  "img_1732_1775630647897.jpg",
  "img_1858_1775630647897.jpg",
  "img_1729_1775630647898.jpg",
  "img_1656_1775631232295.jpg",
  "img_1654_1775631232296.jpg",
  "img_1628_1775631232296.jpg",
  "img_1632_1775631232296.jpg",
  "img_1655_1775631232298.jpg",
];

const MAX_GALLERY_WIDTH = 1600;
const GALLERY_JPEG_QUALITY = 78;
const TOURNAMENT_MAX_WIDTH = 1600;
const GRASS_SIZE = 512;

function human(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function fileSize(p: string): Promise<number> {
  try {
    return (await stat(p)).size;
  } catch {
    return 0;
  }
}

async function optimizeGrass() {
  const src = path.join(PUBLIC_IMAGES, "grass.png");
  if (!existsSync(src)) {
    console.warn("[grass] not found, skipping");
    return;
  }
  const before = await fileSize(src);
  const buf = await readFile(src);
  const resized = await sharp(buf)
    .resize({ width: GRASS_SIZE, height: GRASS_SIZE, fit: "cover" })
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toBuffer();
  await writeFile(src, resized);
  const after = await fileSize(src);
  console.log(
    `[grass.png] ${human(before)} -> ${human(after)} (${Math.round(
      (1 - after / before) * 100,
    )}% smaller)`,
  );
}

async function optimizeTournamentPhotos() {
  const entries = await readdir(PUBLIC_IMAGES);
  const targets = entries.filter((f) => /^tournament-\d+\.(jpe?g|png)$/i.test(f));
  for (const name of targets) {
    const src = path.join(PUBLIC_IMAGES, name);
    const before = await fileSize(src);
    const buf = await readFile(src);
    const dstName = name.replace(/\.(png|jpeg)$/i, ".jpg").replace(/\.JPG$/, ".jpg");
    const dst = path.join(PUBLIC_IMAGES, dstName);
    const out = await sharp(buf)
      .rotate()
      .resize({ width: TOURNAMENT_MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: GALLERY_JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    await writeFile(dst, out);
    if (dst !== src) {
      // remove original PNG after JPEG conversion
      const { rm } = await import("fs/promises");
      await rm(src, { force: true });
    }
    const after = await fileSize(dst);
    console.log(
      `[${name} -> ${dstName}] ${human(before)} -> ${human(after)} (${Math.round(
        (1 - after / before) * 100,
      )}% smaller)`,
    );
  }
}

async function optimizeGallerySources() {
  if (!existsSync(GALLERY_OUT)) await mkdir(GALLERY_OUT, { recursive: true });

  for (const name of GALLERY_SOURCES) {
    const src = path.join(ATTACHED, name);
    if (!existsSync(src)) {
      console.warn(`[gallery] source missing: ${name}`);
      continue;
    }
    const dst = path.join(GALLERY_OUT, name);
    // skip if already optimized and up to date
    const srcStat = await stat(src);
    if (existsSync(dst)) {
      const dstStat = await stat(dst);
      if (dstStat.mtimeMs >= srcStat.mtimeMs && dstStat.size < srcStat.size) {
        continue;
      }
    }
    const before = srcStat.size;
    const buf = await readFile(src);
    const out = await sharp(buf)
      .rotate()
      .resize({ width: MAX_GALLERY_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: GALLERY_JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    await writeFile(dst, out);
    const after = await fileSize(dst);
    console.log(
      `[gallery ${name}] ${human(before)} -> ${human(after)} (${Math.round(
        (1 - after / before) * 100,
      )}% smaller)`,
    );
  }
}

export async function optimizeImages() {
  console.log("Optimizing images...\n");
  await optimizeGrass();
  await optimizeTournamentPhotos();
  await optimizeGallerySources();
  console.log("\nDone.");
}

// Run directly when invoked as a script (tsx scripts/optimize-images.ts)
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename ?? "");
if (invokedDirectly) {
  optimizeImages().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
