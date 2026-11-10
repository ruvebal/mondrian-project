<!--
Mondrian Project — print presets (stickers first), paper-bound stage, URL recipe permanence.
Author: Rubén Vega Balbás, PhD · 27 October 2026
Amends D-16 / D-17 / D-26 and MVP-PRODUCT-SPEC §§2–3, 7–9.
-->

# D-27 — Paper presets (stickers), print button, URL recipe as permanent form

**Status:** adopted 27 October 2026 (product-owner clarification, pre-M1).
**Product contract:** [`../MVP-PRODUCT-SPEC.md`](../MVP-PRODUCT-SPEC.md) amended in place.
**Depends on:** D-16 (surface / frame / recipe), D-17 (export/print), D-26 (no SVG-in-QR).  
**Amended by D-36 (accepted 10 Nov 2026):** the canonical origin is `https://neoplastix.crea-comm.net` (D-33), not the github.io example in §4.4. Recipe evolution is append-only, with unknown keys ignored and invalid values clamped; absent `v` = 1. See [`D36`](D36-2026-11-10-LOCATORS-ORIGIN-EDGE.md) · registry [`../LOCATORS.md`](../LOCATORS.md).

---

## 1. The stage *is* the paper

The editor does not draw “a Mondrian floating on a website.” It draws a
**scaled representation of a physical surface**. Choosing a paper / sticker
preset sets:

| Field | Meaning |
| --- | --- |
| Physical size | e.g. `50 × 50 mm` |
| Aspect ratio | locks the on-screen stage |
| `@page` size | what `window.print()` asks the browser for |
| Units | `mm` for print presets; `px` only for digital presets |

**Ideal kiosk:** touch screen aspect ≈ print aspect (same ratio, scaled).
If the monitor is larger, the app **letterboxes the paper silhouette** inside
the viewport (chrome around it). The Mondrian is always generated **inside**
that paper rectangle—never in a free-floating full-bleed unrelated to print.

```text
Viewport (any size)
└── paper silhouette  ← aspect = selected preset (e.g. 1:1 sticker)
    └── printableArea (margins)
        └── containing frame (free-aspect corner-resize)
            └── Mondrian pattern (liquid-fill — D-30)
```

---

## 2. Presets: stickers first (kiosk giveaway), DIN still available

A4 remains supported. For exhibition **handout**, smaller stickers are the
default path—cheaper stock, faster print, fits a giveaway printer.

### Print presets (MVP catalog — seat 7 owns labels + `@page`)

| Preset id | Size (mm) | Orientation | Role |
| --- | --- | --- | --- |
| `sticker-50` | 50 × 50 | square | **Kiosk default** — square sticker |
| `sticker-70` | 70 × 70 | square | Larger sticker |
| `sticker-100x70` | 100 × 70 | landscape | Badge / name-tag sticker |
| `card-a6` | 105 × 148 | portrait | A6 mini-card |
| `card-a5` | 148 × 210 | portrait | A5 handout |
| `sheet-a4` | 210 × 297 | portrait | Full sheet (lab / home) |
| `sheet-a4-landscape` | 297 × 210 | landscape | Optional |

Digital presets (no `@page` physical claim): `square-1-1`, `portrait-4-5`,
`landscape-16-9`, `story-9-16`.

Margins: default **2 mm** on stickers (kiss-cut tolerance); **8–12 mm** on
A5/A4. Crop marks optional on sheet presets only.

---

## 3. Print button (kiosk giveaway)

Every editor surface (kiosk + handheld) exposes a primary **Print** control
that:

1. Builds a same-origin print document whose CSS `@page { size: <preset>; }`
   matches the selected surface.
2. Hides chrome (nav, buttons); shows only the paper silhouette + pattern +
   optional credit.
3. Calls `window.print()`.
4. Warns: printer dialog must use **Actual size / 100%** (no “fit to page”).

On kiosk: Print is the **giveaway** action—“take your Mondrian.” Download
SVG/HTML remains secondary for handheld continuation.

Calibration: `/calibrate-print/` still ships a 100 mm rule for sheet stock;
for stickers, calibration shows a 50 mm square target.

---

## 4. How query params permanently retain the form

There is **no server store** of visitor edits (GitHub Pages). Permanence =
anything that survives leaving the booth:

| Channel | What it stores | Permanent? |
| --- | --- | --- |
| **URL query (`Recipe`)** | Compact form of surface + composition state | Yes — bookmark, QR, share, history |
| `localStorage` draft | Last recipe JSON | Until browser clear / another user on same kiosk |
| Downloaded SVG / HTML / CSV | Full graphic + metadata | Yes — file on disk |
| Printed sticker | Physical artefact | Yes — paper |

### 4.0 Live sync — every UI decision writes the URL *immediately*

Yes: **the address bar is the live form**, not a serialize-on-export step.

Whenever the visitor changes anything in the UI, two things happen in the
same tick (or on drag-end for continuous gestures):

1. The SVG on screen updates (instant visual feedback).
2. The matching query params are rewritten so the URL always equals the
   current `Recipe`.

```text
UI control  ──►  CompositionState / SurfaceSpec  ──►  SVG paint
                         │
                         └──►  history.replaceState(…?surface=&var=&fx=…)
```

| User action | Query fields that update |
| --- | --- |
| Choose sticker / paper preset | `surface`, `orient`, margins |
| Choose format aspect chip (D-31) | `fmt` + recomputed `fx`…`fh` (maximise) |
| Pick catalog work / variation (mirror, rotate 180°, invert rank, complement, reciprocal, equalize, invert contrast) | path `workId`, `var` |
| Hue rotate | `hue` (or `pal` + hue key) |
| Explicit palette inversion | `pal` |
| Line-weight scale | `lw` |
| Corner-drag resize / move containing frame | `fx`, `fy`, `fw`, `fh` |
| θ / reflect toggles | `theta`, reflect flags |
| Reset / undo | whole recipe restored to prior URL state |

Implementation contract (M6):

- Prefer `history.replaceState` while dragging (avoid flooding history).
- Prefer `history.pushState` (or one replace after debounce) for discrete
  controls (variation button, preset, hue commit) so Back undoes one decision.
- QR / “Copy link” / Print / Download **read the current address bar** — they
  never keep a second, stale copy of state.
- There is no separate “Save to URL” button. Looking at the URL *is* seeing
  the retained form.

So “permanent URL query-params export” means: **at every moment the URL
already contains the visitor’s decisions**; export/QR/print only *use* that
URL, they do not invent it at the end.

### 4.1 What the URL is (and is not)

The URL encodes the **Recipe form**, not the pixels and not the SVG markup.

```text
Recipe = {
  surface: { preset, width?, height?, unit, orientation, margins },
  compositionState: {
    workId, variationId,
    frame: { x, y, width, height },   // normalized 0..1 of printableArea
    theta, paletteMode, reflectX, reflectY, lineWeightScale
  }
}
```

On load:

1. Read query → `Recipe`.
2. Load `/patterns/<workId>.json` (and variation artefact if any) from the
   **static catalog** (already on the device after first PWA cache).
3. Re-derive the SVG in the browser from catalog + recipe.
4. Paint inside the paper silhouette for `surface.preset`.

So the URL is a **reconstruction key**. The heavy geometry stays in the
bundled catalog. That is why offline + QR works without stuffing SVG into
the address bar.

### 4.2 Concrete query string (MVP recipe) — worked length

This is the **permanent retained form**. Same string lives in the address
bar, the QR payload, the “Copy link” clipboard, and browser history.

Readable (production may use the same keys; whitespace removed in real URLs):

```text
https://example.github.io/mondrian-project/create/comp-b/?surface=sticker-50&orient=square&mt=2&mr=2&mb=2&ml=2&var=mirror-h&fx=0.08&fy=0.08&fw=0.84&fh=0.84&theta=12&pal=direct&lw=1
```

| Piece | Characters (approx) |
| --- | ---: |
| Origin + path (`…/create/comp-b/`) | ~70 |
| Query string alone (`?surface=…&lw=1`) | **~140** |
| **Full URL** | **~210** |

So: **~0.14 KB of form fields**. That is the whole permanent edit record.

What each param retains (the “form”):

| Param | Retains |
| --- | --- |
| path `comp-b` | which catalog work |
| `surface` | paper/sticker preset → stage aspect + `@page` |
| `fmt` | format chip id (`original`\|`1-1`\|`5-4`\|`4-5`\|`16-9`\|`9-16`\|`custom`) — D-31 |
| `mt`…`ml` | margins in mm |
| `var` | catalog variation id |
| `fx`…`fh` | containing frame as fractions of printableArea |
| `theta` | rotation of the pattern inside the frame |
| `pal`, `lw` | palette mode + line-weight scale |

**Not** in the URL: plane coordinates, line segments, colours as hex lists,
or any `<svg>…</svg>` markup. Those are recomputed from
`/patterns/comp-b.json` + the variation artefact + the frame/θ above.

### 4.3 Length comparison — Recipe vs JSON vs SVG (same composition)

Illustrative sizes for one kit neoplastic composition (`comp-b` class):

| What you might put after `?` | Raw size | URI-encoded in query | Fit QR (~2.9 KB max)? | Verdict |
| --- | ---: | ---: | --- | --- |
| Flat Recipe params (MVP) | ~140 B | ~140–160 B | Yes, easily | **Do this** |
| Phase-2 seeds (`complexity&density&seed&…`) | ~80–200 B | same order | Yes | Phase 2 OK |
| Full Recipe as one JSON blob, then `encodeURIComponent` | ~250–400 B JSON | ~350–600 B | Yes | Optional `r=` if keys get noisy |
| Entire generative / work JSON (planes, lines, points) | **2–15 KB** | **3–20+ KB** | No / marginal | **Forbidden** |
| Full SVG source (typical kit) | **5–40 KB** | **7–55+ KB** ( `%3Csvg`… ) | No | **Forbidden** |
| Dense kit SVG (many rects) | **40–80+ KB** | **55–110+ KB** | No | **Forbidden** |
| Standalone HTML (SVG embedded) | **10–100+ KB** | same | No | **Download only** |

Worked micro-example of *why* SVG-in-query fails — even a toy SVG:

```text
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect …/></svg>
```

~100 characters raw → ~130+ once percent-encoded. A real Mondrian with
dozens of planes/lines is **hundreds of times** that. Putting it in `?svg=`
would also:

- exceed QR capacity by an order of magnitude;
- hit browser / proxy URL limits on share;
- duplicate what print/download already give as files.

**Rule:** query params = **form fields that select and transform** catalog
(or seed) data. SVG / HTML / work JSON = **export artefacts** (Print button
or download), never the address bar.

### 4.4 Offline kiosk vs portable URL — you still need an online deploy

Two different “offline” problems:

| Concern | What “offline” means | Who needs network? |
| --- | --- | --- |
| **Kiosk keeps working** | PWA already cached catalog + island | Kiosk: **no** (after first install) |
| **Visitor takes the recipe away** | Phone must open a URL later | Phone: **yes**, unless they took a **file** or a **print** |

The live address bar on the kiosk may show a local origin
(`http://localhost:4321/…`, a LAN IP, or a file/cache view). That string is
**not portable**. A phone on cellular data cannot open `localhost`.

**Rule (QR / Copy link / share):** always build the portable recipe from a
configured **canonical public origin** (the GitHub Pages deploy), not from
`window.location.origin` when that origin is local/LAN.

```text
Canonical (portable):
  https://<user>.github.io/mondrian-project/create/comp-b/?surface=sticker-50&…

Kiosk may be serving from cache / USB / localhost — same query params,
different origin. QR encodes the canonical one.
```

So:

1. **Yes — keep a public online version deployed** (Pages). That is what QR
   and “Copy link” point at. The visitor opens it at home / on mobile data;
   the app reconstructs from catalog + recipe (and can then go offline on
   *their* device after first load).
2. **Kiosk itself does not need internet during the exhibition** once the
   PWA is installed — editing, Print, and HTML/SVG download work from cache.
3. **Air-gapped show (no visitor internet ever):** portable URL is useless
   until later. Primary takeaways = **Print sticker** + **standalone HTML /
   SVG download** (USB / AirDrop if available). QR still encodes the
   canonical Pages URL as “open when you have network,” not as instant
   local handoff.
4. Optional later (not MVP): LAN captive portal mirroring the same build —
   only if phones join the exhibition Wi‑Fi; still not a substitute for
   the public deploy for take-home.

Config: one build env var, e.g. `PUBLIC_CANONICAL_ORIGIN=https://….github.io/mondrian-project`
(no trailing slash). ShareQR / Copy link use it; the kiosk’s own navigation
keeps using relative / same-origin routes.

### 4.5 Upper bounds (practical)

| Limit | Approx |
| --- | --- |
| Our MVP recipe query | **~0.15 KB** |
| Comfortable shareable URL (origin + path + query) | &lt; **2 KB** total |
| Many browsers / proxies start failing | ~8–16 KB URL |
| QR Version 40 binary max | ~**2.9 KB** **entire** payload |
| Our MVP full URL | ≪ **0.5 KB** → fits Version ~10 QR with room |
| SVG or work JSON in query | Usually **fails** QR and often fails paste |

Phase-2 generative: encode seeds (`complexity`, `density`, `colorimetry`,
`seed`) as query params (or one compressed `r=` blob of the Recipe). After
generate, either (a) keep seeds in the URL and regenerate client-side if the
engine is later ported, or (b) treat the result as a transient work and
**require HTML/SVG download**—do not persist full generated JSON in the URL.

---

## 5. Acceptance additions (print / URL)

1. Selecting `sticker-50` sets stage aspect 1:1 and `@page` 50mm × 50mm.
2. Pattern is drawn only inside the paper silhouette.
3. **Print** produces a chrome-free sticker layout; kiosk can complete
   giveaway without download.
4. **Live URL:** after each discrete control (variation, hue, invert, preset)
   and after each corner-drag end, the address bar query deep-equals the
   in-memory Recipe; no “Save URL” step required.
5. Copying the address bar mid-session and opening it elsewhere restores the
   same recipe (surface + frame + variation + θ…).
6. URL length for a full MVP recipe stays under 2 KB; no SVG/HTML in query.
7. QR encodes that same live recipe URL (D-26), not the graphic.
8. QR / Copy link use `PUBLIC_CANONICAL_ORIGIN` (Pages), never `localhost` /
   LAN origin — even when the kiosk is offline (§4.4).
9. After PWA install, kiosk edit + Print + HTML download work with network
   disabled; phone recovery of a recipe URL still needs reachability of the
   canonical origin (or a prior phone-side cache).

---

## 6. Seat ownership

| Seat | Owns |
| --- | --- |
| 7 | Preset catalog UI, `@page` CSS, Print button, calibrate stickers, recipe serialize/parse, `PUBLIC_CANONICAL_ORIGIN` for ShareQR |
| 6 | Stage paper silhouette, frame inside printableArea |
| 3–5 | Copy: “sticker / take your Mondrian” on About / kiosk attract |
