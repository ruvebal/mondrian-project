#!/usr/bin/env node
/**
 * Deterministic Neoplastix favicon family from canonical SVG geometry.
 * Source of truth: services/web/public/favicon.svg (= brand/mark.svg geometry).
 * Requires: rsvg-convert (librsvg) and ImageMagick `magick`.
 *
 * Usage: node scripts/build-favicon-family.mjs
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "services/web/public");
const iconsDir = join(publicDir, "icons");
const source = join(publicDir, "favicon.svg");
const mark = join(publicDir, "brand/mark.svg");

function which(bin) {
  try {
    return execFileSync("which", [bin], { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const rsvg = which("rsvg-convert");
const magick = which("magick") || which("convert");
if (!existsSync(source)) {
  console.error("build-favicon-family: missing", source);
  process.exit(1);
}
if (!rsvg || !magick) {
  console.error("build-favicon-family: need rsvg-convert and ImageMagick (magick)");
  process.exit(1);
}

mkdirSync(iconsDir, { recursive: true });
copyFileSync(source, mark);

function png(size, out) {
  execFileSync(rsvg, ["-w", String(size), "-h", String(size), source, "-o", out]);
}

const png16 = join(iconsDir, "favicon-16.png");
const png32 = join(iconsDir, "favicon-32.png");
const png48 = join(iconsDir, "favicon-48.png");
const apple = join(iconsDir, "apple-touch-icon.png");
const p192 = join(iconsDir, "android-chrome-192.png");
const p512 = join(iconsDir, "android-chrome-512.png");
const ico = join(publicDir, "favicon.ico");

png(16, png16);
png(32, png32);
png(48, png48);
png(180, apple);
png(192, p192);
png(512, p512);

execFileSync(magick, [
  png16,
  png32,
  png48,
  ico,
]);

const manifest = {
  name: "Neoplastix",
  short_name: "Neoplastix",
  description: "Neoplastic composition studies — Mondrian Project / FE I",
  start_url: "./",
  display: "standalone",
  background_color: "#121212",
  theme_color: "#121212",
  icons: [
    {
      src: "icons/android-chrome-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "icons/android-chrome-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
  ],
};

writeFileSync(join(publicDir, "site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log("build-favicon-family: OK");
console.log("  source:", source);
console.log("  ico:", ico);
console.log("  icons:", iconsDir);
