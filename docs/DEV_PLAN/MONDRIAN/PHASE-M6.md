# PHASE-M6: Neoplastix editor — Svelte island, SVG canvas, catalog variations, save and print

> **Track:** L2b editor island + L3 `/create/`. Owned by the Editor, Print & Kiosk lane.
> **Status:** BLOCKED (M3 DONE)

## Goal

Implement `MVP-PRODUCT-SPEC.md` exactly (D-21…D-31): **game** = texture →
format → variations → personal version. Surface (**sticker-50 default**)
is the print stage; **format chips** (D-31) maximise the frame in
printableArea; liquid-fill (D-30); free-aspect corners → `fmt=custom`;
catalog variations; live **URL Recipe** (`fmt` included); Print giveaway.
Inline SVG in a Svelte 5 island. No internal edge drag. No FastAPI.

## Deliverables

- `/create/<slug>/` hydrates `packages/editor` (`client:load`);
  `/calibrate-print/`; Svelte components
  `Editor/{Surface,Frame,Handles,Canvas,Controls,Format,Presets,Compare,Export,Print}.svelte`.
- Surface presets: **`sticker-50` / `sticker-70` / `sticker-100x70` first**
  (D-27), then A6/A5/A4 (+ landscape), digital square/4:5/16:9/9:16, custom.
- Frame: **format chips** + **corner handles**; free aspect; clamped to
  printable area; pattern liquid-fills (D-30). Chips call `maximizeFrame`
  (D-31). Edge midpoint handles absent.
- Format UI: `original`, `1:1`, `5:4`, `4:5`, `16:9`, `9:16` (+ `custom`
  after drag). Re-maximise when surface changes.
- Catalog / texture: load `/patterns/<id>.json` — no LAN API. Variations:
  original, mirror H/V, rotate 180°, invert rank, complement, reciprocal,
  equalize, invert contrast.
- Pedagogical extras: hue; palette inversion; line-weight; undo, reset,
  press-and-hold compare.
- Pointer capture on frame corners; ≥44 px targets. Format chips **and**
  free corner-drag are both MVP; chips shortcut common ratios, corners
  keep arbitrary free format (`fmt=custom`).
- Deterministic URL recipe (`SurfaceSpec` + `CompositionState` including
  `formatId` / `fmt` + `variationId`) — query stays small; QR encodes that
  URL only (D-26/D-27); never SVG or full work JSON in `?`;
  `localStorage` draft; SVG export; **standalone HTML**; CSV; PNG;
  primary **Print** control (`@page` = selected sticker/sheet), optional
  crop marks; calibrate 50 mm (stickers) + 100 mm (sheets).
- Playwright unit/journey tests plus one real A4 printer run.
- `PHASE-M6-COLD-REVIEW.md`, `PHASE-M6-REPORT.md`.

## Scope

**In:** product spec §9 journey. **Out:** kiosk/PWA profile (M7); any
FastAPI call; internal node/edge dragging; split/merge; edge-handle
free-resize; `refit` fit-mode; custom pattern generation;
accounts/cloud saves/public visitor gallery; camera analysis;
diagonal/free rotation; generative compositions; neural scoring; XYFlow;
Interact.js; putting Python inside Astro.

## Prompt (Implementation Agent)

```text
Implement PHASE-M6 per docs/DEV_PLAN/MONDRIAN/PHASE-M6.md.

## Deliver
1. Implement `Recipe`, `SurfaceSpec` and `CompositionState` from M2, including
   `variationId`. On load, the frame is the maximal original-ratio rectangle
   inside printableArea; the pattern liquid-fills the frame (D-30).
2. Draw the M2 plan as inline SVG (packages/editor + matrix render-svg). Plane
   rects below line overlays. Clamp `lineWeightScale` with M2's work-specific
   function. `--line-weight-scale` exposes the applied state. Do not render
   draggable internal handles.
3. Pointer Events on frame **corners only**. Capture; ignore a second pointer.
   Aspect locked. Clamp to printableArea and minimum size. Preserve-ratio fit
   after every resize (pattern aspect unchanged).
4. Preset buttons load catalog JSON from the same origin (`/patterns/…`).
   Cheap variations (mirrors, rotate 180, invert contrast) may use matrix.vary;
   weight operations load the precomputed artefact. Never fetch services/api.
5. Explicit hue/palette inversion as in the product spec — not
   `filter: invert()`. Every control has a preset/button alternative.
6. Undo (at least one step), reset, hold-to-compare, **live URL sync**
   (every control + drag-end → `replaceState`/`pushState` Recipe query;
   no separate “Save URL”), QR reads address bar, localStorage draft.
7. Export canonical SVG with source credit, variation id, state recipe and app
   version in metadata. Also standalone HTML (full-size SVG embedded) and CSV
   of the current partition. QR encodes recipe URL — never full HTML (D-26). PNG
   rasterizes the generated SVG in a temporary canvas.
8. Print (kiosk giveaway): paper silhouette only; inject selected preset into
   `@page` (default sticker-50 = 50mm×50mm); mm units; hidden chrome; optional
   crop marks on sheets; “Actual size / 100%”. `/calibrate-print/` = 50 mm
   square + 100 mm rule. URL serialize/parse must round-trip recipe only
   (D-27 §4 — assert query length ≪ 2 KB; reject SVG-in-query in tests).
9. Tests + a real-printer run. Full suite. Hand off; do not mark DONE.

## Constraints
- No canvas/WebGL editor. Canvas is allowed only transiently for PNG export.
- No XYFlow, Interact.js, or node-graph library.
- packages/editor may import packages/matrix; packages/matrix must not import
  packages/editor or svelte.
- Never mutate `work.yml`. No free rotation/shear. No browser `filter: invert()`.
- No FastAPI, no Python in the Astro process.
```

## Acceptance

- State/property tests: no generated frame crosses printableArea over 1,000
  random corner-resize sequences; reset deep-equals default state; source work
  deep-equals its original object; after free-aspect resize the pattern still
  liquid-fills the frame and source fractions are unchanged (D-30).
- Playwright: dragging an **internal** line/junction (if painted) does not
  change geometry; only corner handles do. Drag updates URL; reload reproduces
  every recipe field and frame geometry within 1 px; second pointer is ignored.
  Offline after first load: applying a catalog variation still works.
- Network log on `/create/<slug>/` shows no request to the LAN API origin.
- Every variation changes the export and satisfies Σ area = pattern bbox.
  Inversion tests prove explicit lines and black planes use the current
  `--black` token and that applying the involution twice restores them.
  Undo restores prior state.
- Downloaded SVG parses, has expected planes/lines/viewBox/metadata and no
  external resources. HTML/CSV dumps exist. PNG has selected pixel dimensions.
- Print test: stylesheet `@page` matches selected preset (sticker-50 and one
  sheet); real printer run records variance on 50 mm and/or 100 mm targets.
- Live URL: after hue, invert, variation, preset, and corner-drag end, the
  address-bar query deep-equals in-memory Recipe without a save step; reload
  restores every field; query stays under 2 KB; no `svg=` / work-JSON blob.
- Recipe tolerance (D-36, [`LOCATORS.md`](LOCATORS.md) key table): every key's *missing* and *invalid*
  row has a test; unknown keys are ignored and dropped on re-serialise; invalid values clamp and the live
  region announces the adjustment; no input blanks the stage. A golden file of recipe URLs written at M6
  VERIFYING must parse to the same state in every later release (append-only keys/ids).
- Copy link / QR origin = `PUBLIC_CANONICAL_ORIGIN` (`https://neoplastix.crea-comm.net`); a test fails if
  `github.io`, `localhost` or a LAN IP appears in a generated share URL.
- All interactive targets ≥ 44×44 CSS px (Playwright bounding-box sweep).
- axe 0 critical/serious on `/create/<slug>/`; keyboard-only and preset-only
  users can complete the journey without dragging.
- Cold review filed; blocking findings closed.

## Risks

- Browser/printer silently scales → never claim precision before calibration;
  record printer/browser/variance.
- Dynamic `@page` support differs → generate a dedicated print document and
  provide PDF/SVG download as the reliable fallback.
- Export drifts from the live SVG → golden comparison over state fixtures
  (SVG DOM semantics, not CSS Grid).
- Temptation to "just add node dragging" because the SVG is there → forbidden
  by D-24; a test that internal edges are inert is the gate.
