<!--
Mondrian Project — export without a server, QR capacity truth, generative FastAPI as last feature.
Author: Rubén Vega Balbás, PhD · 27 October 2026
Owner amend, pre-M1. Complements D-17, D-09, D-23; does not reopen M0 history.
-->

# D-26 — Client export, QR payload truth, generative FastAPI (last)

**Status:** adopted 27 October 2026 (product-owner instruction, pre-M1).
**Amends:** D-17 (export surfaces), D-09/D-23 (what FastAPI is *for*), Phase-2 list in D-21…D-25.
**Scaffold:** [`../scaffold/`](../scaffold/) — token barrel, export helpers, schema draft, seat map.
**Team map:** [`../TEAM-ASSIGNMENTS.md`](../TEAM-ASSIGNMENTS.md).

---

## D-26.1 Why export matters without a server

GitHub Pages + offline PWA means there is **no permanent server-side copy** of a
visitor’s modified composition. Persistence in MVP is:

| Channel | Survives device change? | Survives browser clear? |
| --- | --- | --- |
| URL recipe (`?…`) | Yes, if the visitor copies/shares the URL | Yes (state is in the URL) |
| `localStorage` draft | No | No |
| Downloaded SVG / HTML / CSV / PNG | Yes (file on disk) | Yes |
| QR | Yes, if the payload is a URL (or a tiny recipe) | Yes |

Therefore export is not a nice-to-have: it is the **only durable artefact**
the visitor owns when they leave the kiosk.

---

## D-26.2 Can a QR contain full HTML with an embedded SVG?

**Short answer: not for real measured Mondrian compositions. Do not ship that as MVP.**

| Fact | Implication |
| --- | --- |
| QR Version 40 (maximum) binary capacity ≈ **2 953 bytes** | Hard ceiling for the entire payload |
| A measured work SVG (planes + lines + metadata) is typically **several KB to tens of KB** | Already exceeds QR before wrapping in HTML |
| `data:text/html,…` + base64/URI-encoding grows further | Fits only toy/minimal grids |
| Many phone camera apps **refuse or mishandle `data:` URIs** | Even a tiny payload is unreliable in exhibition |

So: **HTML+SVG-inside-QR is not a viable handoff for this product.**

### What we ship instead (MVP)

1. **Download standalone HTML** — client builds a full-size document with the
   current SVG inline (`scaffold/export/build-html-document.js`). User saves
   the file; opens it offline in any browser. No server.
2. **Download SVG / CSV / PNG** — same session, same client serializers.
3. **QR encodes a recipe URL** on the Pages origin, e.g.
   `https://…/create/<work>/?surface=a4&frame=…&variation=…&theta=…`
   Phone opens the app; catalog + client state reconstruct the composition.
   Works offline **after** the PWA/catalog was cached once.
4. **Optional experimental** (not a gate): if a composition’s gzipped SVG is
   under ~2.2 KB *and* a device under test opens `data:text/html`, allow a
   “tiny QR” toggle — never the default; never claimed as durable.

### Acceptance wording (replaces naive “QR contains the HTML”)

> Scanning the QR recovers the **same composition state** on another device
> via recipe URL. The visitor can also download a **self-contained HTML file**
> that embeds the SVG at full size and opens offline without the app.

---

## D-26.3 FastAPI’s real destination: “Make your own Mondrian” (last feature)

FastAPI is **not** the path for preset buttons (build-time catalog) and **not**
required for MVP frame resize / variations.

FastAPI **is** the home of a **Phase-2 generative** feature — explicitly the
**last** product ambition after MVP ships:

> **Make your own Mondrian** — live generation of a composition that did **not**
> previously exist in the measured catalog, driven by formula seeds:

| Seed family | Controls (illustrative; frozen in Phase-2 contract) |
| --- | --- |
| **Complexity** | Split depth, max planes, junction count |
| **Density** | Line weight distribution, minimum cell area, gap bias |
| **Colorimetry** | Primaries vs muted, white-share, contrast target |
| **Other seeds** | RNG seed, aspect target, print-surface fit constraints |

```text
POST /api/v1/patterns/generate
Content-Type: application/json

{
  "complexity": 0.4,
  "density": 0.55,
  "colorimetry": { "mode": "neoplastic-primary", "whiteShare": 0.45 },
  "seed": "visitor-optional-string",
  "surface": { "id": "a4", "unit": "mm" }
}
→ Work-shaped JSON + SVG (same schema as measured works)
```

Rules:

- Generated output **must validate** against `work.schema.json` (same contract
  as measured works) so the Svelte editor can load it without a second path.
- Label every generated artefact **“algorithmic study — not a measured work”**
  in metadata and visible credit.
- This feature is **out of MVP**, **out of M1–M7 gates**, and sits **after**
  internal node-drag / refit if those land first — or as the closing Phase-2
  milestone. It is never “sneaked” into M5’s LAN analyze endpoints as MVP scope.
- M5 FastAPI remains: catalog read, `/analyze`, HTML/CSS/SVG **preview** for
  development — still not a Pages runtime dependency.

D-21…D-25’s Phase-2 bullet “Generating fake Mondrian compositions” is hereby
**renamed and scoped**: generative seed-based composition under the schema,
not an unlabeled fake gallery.

---

## D-26.4 Unified CSS token barrel

One token system for shell, gallery, editor chrome, and print UI:

```text
packages/tokens/
  index.css          ← barrel (@import only; this is what apps import)
  color.css
  space.css
  type.css
  form.css           ← D-34 orthogonal chrome (radius 0)
  motion.css
  elevation.css
```

Rules:

- No raw hex/rgb in page or component CSS except inside token files.
- Editor island and Astro layouts both import `@mondrian/tokens` (or the
  relative barrel until the package is wired in M1).
- Design seat owns the barrel; other lanes consume, do not fork palettes.
- Scaffold copy lived in forge `scaffold/tokens/` until M1; product path is
  `packages/tokens/` (this repo). Typography / form locks: **D-34** +
  [`../../../style/TOKEN-SYSTEM.md`](../../../style/TOKEN-SYSTEM.md).

---

## D-26.5 Cohort seats (7) — path ownership

| Seat | Role | Lane | Primary paths |
| --- | --- | --- | --- |
| **1** | Backend / Analyzer | Analyzer & API | `packages/analyzer/`, `packages/works/python/`, catalog CLI |
| **2** | Backend / API | Analyzer & API | `services/api/` (M5); Phase-2 generate endpoint owner |
| **3** | Storytelling | Shell & Story | `/about/`, captions, motion-reduced story beats |
| **4** | Storytelling | Shell & Story | `/gallery/`, CSS Grid miniatures, method/contribute prose |
| **5** | Storytelling / content | Shell & Story | `/about-us/`, `/declaration/`, i18n ES mirrors, credits |
| **6** | App UI | Editor, Print & Kiosk | `packages/editor/` Svelte+SVG, frame handles, variations |
| **7** | App UI | Editor + Design lead | export/print/PWA/QR recipe; **token barrel**; visual QA |

Geometry contract (`packages/works/schema/`, `packages/matrix/`) stays
**dual-reviewed** by seats 1–2 and 6–7 (D-25). Detailed task specs:
[`TEAM-ASSIGNMENTS.md`](../TEAM-ASSIGNMENTS.md).

---

## Acceptance of this amend

- MVP export section names HTML download + recipe-URL QR; forbids full-HTML QR as default.
- Phase-2 generative endpoint and seed families are named; MVP “not” list still excludes them.
- Token barrel scaffold exists and INDEX links it.
- `_private` emails mention Astro/Svelte/SVG, offline MVP, FastAPI deferred generative.
- Cascade §1 includes D-26; programme status unchanged (still ready to trigger M0 cold-review → M1 after M0 DONE).
