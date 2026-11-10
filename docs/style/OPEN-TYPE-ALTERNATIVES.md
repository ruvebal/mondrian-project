<!--
Neoplastix — free / open-licensed type alternatives for D-34 stacks.
Research pass: 2026-11-10
-->

# Open-type alternatives (classroom / Pages)

D-34 names commercial faces for historical fidelity. Until Foundry / Monotype / Linotype licenses are procured, use these **self-hostable OFL** (or clearly free) stacks in `packages/tokens/type.css` fallbacks and Seat 7 previews.

| D-34 role | Commercial lock | Free alternative | License | Notes |
| --- | --- | --- | --- | --- |
| Headlines | Architype Van Doesburg (Foundry / Monotype) | **Styl** (Feòrag NicBhrìde) | SIL OFL 1.1 | Explicit De Stijl / Dutch Futurism modular alphabet. Prefer over unverified “Theo Van Doesburg” CDN mirrors. https://www.feorag.com/freestuff/styl.html |
| Headlines (fallback digitization) | — | Theo Van Doesburg (1001 Fonts listing) | FFC (verify EULA) | Historical 1917 alphabet revival; **re-check license** before production. Not OFL. |
| Subheads | Futura | **Jost** (Owen Earl / indestructible type*) | SIL OFL 1.1 | Closest measured free Futura attitude; enable stylistic set 1 for single-storey *a*. |
| Subheads (bold display) | Futura | **League Spartan** | SIL OFL 1.1 | Heavy geometric posters. |
| Body | Neue Haas Grotesk | **Inter** or **Inter Tight** | SIL OFL 1.1 | Screen-first neo-grotesk; Inter Tight for display weights. |
| Body (poster) | Neue Haas Grotesk | **Schibsted Grotesk** | SIL OFL 1.1 | Sturdier grotesk feel. |
| Captions | Univers | **Inter** / **IBM Plex Sans** | OFL / OFL | Univers has no clean OFL twin; use a quiet grotesk at caption size. **Public Sans** (OFL) also works for UI chrome. |

## Classroom policy

1. Prefer **OFL** faces for GitHub Pages embedding.
2. Do **not** claim Architype is live until a Foundry license + webfont files land under `services/web/public/fonts/`.
3. Keep D-34 names in token comments as the **target** pairing; CSS stacks list free faces first when no licensed files are present.
4. Seat 7 specimen page must show license status per role.

## Suggested CSS order (unlicensed term)

```css
--nx-font-headline: "Styl", "Jost", "Century Gothic", system-ui, sans-serif;
--nx-font-subhead: "Jost", "League Spartan", "Century Gothic", system-ui, sans-serif;
--nx-font-body: "Inter", "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
--nx-font-caption: "Inter", "Public Sans", "Helvetica Neue", Arial, sans-serif;
```
