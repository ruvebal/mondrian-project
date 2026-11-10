<!--
Neoplastix / Mondrian Project — student-facing token contract (Seat 7).
Locked by D-34 · 2026-11-10
-->

# Token system — barrel pattern (student preview)

**Owner:** Seat 7 (`PauLAanDReEa-Ai`) · specs `U7-T1`, `U7-T6`  
**ADR:** [`../DEV_PLAN/MONDRIAN/DECISIONS/D34-2026-11-10-STYLE-TOKEN-TYPOGRAPHY.md`](../DEV_PLAN/MONDRIAN/DECISIONS/D34-2026-11-10-STYLE-TOKEN-TYPOGRAPHY.md)  
**Typography research:** [`De_Stijl_Typography_Report.md`](De_Stijl_Typography_Report.md)  
**Package:** `packages/tokens/` → import `@mondrian/tokens` (barrel = `index.css` only)

## Barrel layout

```text
packages/tokens/
  index.css       ← only public import (@import siblings)
  color.css       ← chrome + role chips (not painting fills)
  type.css        ← headline / subhead / body / caption stacks
  space.css
  form.css        ← radius 0, stroke, modular unit
  motion.css
  elevation.css
```

**Rule:** no raw `#hex` / `rgb()` / `hsl()` in `services/web` or `packages/editor` except inside these token files (and SVG brand assets generated from the same hexes). Pages consume `var(--nx-*)` only. Exception: HTML `<meta name="theme-color">` and `site.webmanifest` need literal hex mirrored from `--nx-color-theme`.

## Typography roles (D-34)

| Role | CSS custom properties | Face |
| --- | --- | --- |
| Headlines | `--nx-font-headline` | Architype Van Doesburg |
| Subheads | `--nx-font-subhead` | Futura |
| Body | `--nx-font-body` (aliases `--nx-font-sans`) | Neue Haas Grotesk |
| Captions / labels | `--nx-font-caption` | Univers |
| Code / JSON | `--nx-font-mono` | keep system mono stack |

Fallbacks in `type.css` keep the site readable before licensed webfonts ship. **Do not** claim Foundry Architype is loaded until a licensed file is under `services/web/public/fonts/` with a documented EULA path.

## Colour roles

| Token family | Meaning |
| --- | --- |
| `--nx-color-*` | Product chrome (canvas, ink, muted, line, focus, danger, ok) |
| `--nx-role-{red,yellow,blue,black,white}` | Teaching chips / editor legend — **not** the measured work fills |

Painting fills stay in work JSON + D-07 relative HSL. Grounding for the three primaries + rectangular planes: [`../DEV_PLAN/MONDRIAN/grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md`](../DEV_PLAN/MONDRIAN/grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md) §6.3–6.4 · flag [`FLAG-QUOTE-1920.md`](../DEV_PLAN/MONDRIAN/grounding/FLAG-QUOTE-1920.md).

## Form

- `--nx-radius-chrome: 0` — rectangular planes; no rounded chrome.
- No diagonal transforms on nav / cards / buttons.
- Prefer `--nx-stroke-armature` hairlines over soft shadows.

## Preview (your deliverable)

Ship a small specimen page (suggested route `/design/tokens/` or `/method/` section) showing:

1. Headline / subhead / body / caption specimens  
2. Role swatches + chrome swatches  
3. A 0-radius control next to a forbidden “rounded” note  
4. One-line license status for Architype  

Visual QA checklist (`U7-T6`) attaches to every chrome PR.

## Prefix migration

Prefer `--nx-*` in new CSS. `--mp-*` remain aliases this academic year (D-33 D8).

## Related

- Free / OFL classroom faces: [`OPEN-TYPE-ALTERNATIVES.md`](OPEN-TYPE-ALTERNATIVES.md)
- Favicon family + Canvas 2.5D landing: [`../DEV_PLAN/MONDRIAN/DECISIONS/D35-2026-11-10-FAVICON-CANVAS-25D.md`](../DEV_PLAN/MONDRIAN/DECISIONS/D35-2026-11-10-FAVICON-CANVAS-25D.md)
- Regenerate icons: `pnpm favicon:build`
