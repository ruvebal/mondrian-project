#!/usr/bin/env node
/** Fail if dist href/src escape the Pages base (except external/# /mailto). */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = join(import.meta.dirname, "../dist");
const base = (process.env.BASE || "/").replace(/\/$/, "");
const ok = new RegExp(
  `^(href|src)="(${base}/|https?:|mailto:|#|data:)`,
);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const bad = [];
for (const file of walk(dist)) {
  const html = readFileSync(file, "utf8");
  const matches = html.matchAll(/\b(?:href|src)="[^"]+"/g);
  for (const m of matches) {
    if (!ok.test(m[0]) && !m[0].includes('href=""')) {
      bad.push(`${file}: ${m[0]}`);
    }
  }
}

if (bad.length) {
  console.error("assert-dist-links FAIL:\n" + bad.slice(0, 40).join("\n"));
  process.exit(1);
}
console.log("assert-dist-links: OK");
