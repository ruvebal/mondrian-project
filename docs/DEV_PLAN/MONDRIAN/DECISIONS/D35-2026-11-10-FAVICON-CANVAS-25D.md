<!--
Mondrian Project — decision record.
-->

# D-35 — Favicon family + Canvas 2.5D landing mark

**Status:** `adopted` · **Date:** 2026-11-10 · **Owner**  
**Skill:** `canvas-25d-content-hero` (Codex) · SVG-derived mark path  
**Amends / clarifies:** D-26.4 (token palette for mark fills); D-33 (Neoplastix chrome); D-34 (type/form). Does **not** reopen D-07 painting fills.

## Decision

| Item | Lock |
| --- | --- |
| Canonical geometry | `services/web/public/brand/mark.svg` ≡ `favicon.svg` — **rects only**; do not redraw |
| Palette | Token hex from `packages/tokens/color.css` roles (`#d41111` / `#f9d006` / `#1754cf` / `#121212` / `#f4f2ed`) |
| Favicon family | SVG + ICO + 16/32/48 PNG + Apple 180 + 192/512 + `site.webmanifest` via `pnpm favicon:build` |
| Canvas package | `@mondrian/mark-canvas` — `math` · `palette` · `favicon-canvas` · `hero-field` · `hero-coordinator` |
| Landing | Foreground mark Canvas + background field from `brand/hero-bg.svg`; static SVG twins for reduced-motion / print / failure |
| Foveal baselines | deadZone `0.08` · yaw `0.07` · pitch `0.052` · planeX `4.2%` · planeY `3.2%` · perspective clamp `0.94–1.06` |
| Coordination | `favicon-canvas-interaction` → `setCameraPaused(active)` only (ambient time continues) |

## Accessibility boundary

- Canvas is decorative (`aria-hidden` surfaces). Semantic heading, flag quote, CTAs remain HTML.
- Click inversion is decorative only — not a control; no Canvas hit-region semantics.
- `prefers-reduced-motion: reduce` keeps CSS `hero-bg` + static mark `<img>`.

## Student / Seat 7

Visual QA (`U7-T6`) covers mark contrast on light/dark chrome and specimen page may link this ADR. Regenerating icons: `pnpm favicon:build` (requires `rsvg-convert` + ImageMagick).

## Evidence paths

- Package: `packages/mark-canvas/`
- Build: `scripts/build-favicon-family.mjs`
- Landing mount: `services/web/src/scripts/landing-hero.js`
- Style notes: `docs/style/TOKEN-SYSTEM.md` · free faces: `docs/style/OPEN-TYPE-ALTERNATIVES.md`
