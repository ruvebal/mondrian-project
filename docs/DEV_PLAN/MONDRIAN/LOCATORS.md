<!--
Neoplastix locator registry. Proposed with D-36 (10 Nov 2026). The registry is the contract:
a route, recipe key or fragment id that is not listed here is not promised to anyone.
-->

# Locator registry — Neoplastix

**Status:** PROPOSED with [D-36](DECISIONS/D36-2026-11-10-LOCATORS-ORIGIN-EDGE.md) · freezes at **M6 VERIFYING**
(recipe) and **M7 VERIFYING** (kiosk, manifest).  
**Canonical origin:** `https://neoplastix.crea-comm.net` (`PUBLIC_CANONICAL_ORIGIN`; D-33 lock D4/D5).  
**Legacy:** `https://ruvebal.github.io/mondrian-project/*` → 301 to the canonical origin, path and query kept (GitHub
behaviour, verified 10 Nov 2026). It stays a courtesy, not a contract (D-36 H3).

## Rules in one screen

| Layer | Carries | Example |
| --- | --- | --- |
| Path | the page or the catalog work (permanent) | `/create/comp-b/` |
| Query | the visitor's **Recipe** (D-27) | `?surface=sticker-50&fmt=16-9&var=mirror-h…` |
| Fragment | position inside a page | `/about/#scene-ratios` |

- Owned origin only in anything printed, copied, canonical or in the sitemap.
- Always-slash pages; slashless → 301.
- Keys are code, labels are copy: identical keys and ids in every language; values are catalog ids, never translated labels.
- Recipe keys and enumerated values are **append-only**. Unknown keys are ignored; invalid values clamp and the UI says so. Absent `v` = 1.
- Language never enters a printed path.

## Routes

| Path | Indexed | Notes |
| --- | --- | --- |
| `/` | yes | landing |
| `/gallery/` | yes | measured source compositions |
| `/gallery/{work}/` | yes | one study; `{work}` = catalog slug (immutable once published) |
| `/about/` | yes | scroll story; fragments below |
| `/about-us/` | yes | credits, research notice |
| `/method/` | yes | |
| `/declaration/` | yes | M9 |
| `/create/{work}/` | **no** (`noindex`, already) | editor; the Recipe lives in the query |
| `/kiosk/` | no | PWA start URL; device mode, not in visitor nav (D-36 H8) |
| `/contribute/` | yes | cohort entry |
| `/assignments/` · `/assignments/seat-{n}/` | **no** until M9 pseudonymisation (D-36 H6) | shows student handles |
| `/design/tokens/` | no | design seat preview |
| `/probe/svelte/` | no (already) | M1 probe |
| `/robots.txt` · `/sitemap-index.xml` | — | to add (D-36 H6) |
| any other path | — | real **404** (never a 200 "not found") |

## Recipe keys (`/create/{work}/?…`) — frozen at M6

Source of truth for meaning: [D-27 §4.1](DECISIONS/D27-2026-10-27-PRINT-STICKERS-URL-RECIPE.md) and D-31. This table only adds the **evolution and tolerance** columns.

| Key | Values | On missing | On invalid |
| --- | --- | --- | --- |
| `v` | integer | `1` | ignore the recipe, open defaults + note |
| `surface` | preset id (catalog) | `sticker-50` (kiosk default, D-16) | default + note |
| `orient` | preset orientation id | preset default | default |
| `fmt` | `original`\|`1-1`\|`5-4`\|`4-5`\|`16-9`\|`9-16`\|`custom` | `original` | `original` + note |
| `mt` `mr` `mb` `ml` | mm, ≥ 0 | preset margins | clamp to printable range |
| `var` | catalog variation id | none | none + note (ids are never renamed or reused) |
| `fx` `fy` `fw` `fh` | fractions `[0,1]` | native frame | clamp into `printableArea` (D-27 rule "a frame cannot leave its printable area") |
| `theta` | degrees | `0` | same clamp as `hue.js` |
| `pal` | palette mode id | `direct` | `direct` |
| `lw` | line-weight scale | `1` | clamp to UI range |
| *(unknown)* | — | — | **ignored**, kept out of re-serialised URLs |

"Note" = one polite live-region message ("Esta receta se ha ajustado / This recipe was adjusted"); the stage always renders.

## Fragments

| Page | Ids (frozen) |
| --- | --- |
| `/about/` | `#scene-measure` `#scene-ratios` `#scene-render` `#scene-frame` `#scene-colour` `#scene-yours` `#scene-print` |
| every page | `#main` (skip-link target) |

New fragment ids are added here first, then in code.

## Manifest (M7)

`"id": "/kiosk/"`, `"start_url": "/kiosk/"` (base-aware), `"scope": "/"`, maskable icons. The `id` must not change once a kiosk device is installed.

## How it is proven

1. **Unit (M6):** every recipe key's missing/invalid row above has a test. A fixture of URLs "printed" today must keep parsing to the same state (golden file under `packages/editor/test/recipes/`).
2. **Build (CI):** build with production `BASE=/` **and** with a dummy non-root base. Both pass the dist grep for unprefixed hrefs.
3. **Live (each phase report + scheduled smoke):** `curl` each route row against the canonical origin (status + `noindex` + `canonical`), and the legacy github.io redirect for one recipe URL.
