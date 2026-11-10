<!--
Mondrian Project — decision record.
Lessons transferred from TTOD Phase AA (pre-production hardening, 2026-11-10) before M6/M7 freeze
the recipe and the kiosk start URL. Every finding below was re-probed against this repo and the
live hosts on 10 Nov 2026; nothing is copied from TTOD without Mondrian evidence.
Author: Rubén Vega Balbás, PhD (agent-assisted). Status `accepted` by the owner on 10 Nov 2026.
-->

# D-36 — Permanent locators, canonical origin, edge honesty

**Status:** `accepted` · **Date:** 2026-11-10 · **Owner** (accepted in-session 10 Nov 2026)  
**Amends:** D-27 §4.4 (canonical origin example), D-33 (cutover state), PHASE-M6 / PHASE-M7 acceptance.
Does **not** amend D-03 (MPA, every edit rewrites the query) or the recipe field set.  
**Registry:** [`../LOCATORS.md`](../LOCATORS.md) · **Source of the lessons:** TTOD
`docs/DEV_PLAN/PHASE-AA-PREPROD-HARDENING/` (FINDINGS F1, F8, F14, F43, F49–F58; LOCATORS.md).

## Why now, not after M7

Neoplastix prints its URLs. A sticker with a QR code is a link nobody can edit. TTOD learned
the cost of loose locators *after* shipping, when wisdom quotes, landing chapters and the 3D graph
turned out to be unlinkable and the language switch soft-404'd. Mondrian is earlier: the recipe exists (D-27),
but M6 has not frozen its parser and M7 has not installed a kiosk PWA. Every rule below is cheaper today
than after the first sticker leaves the booth.

## Evidence — live probe, 10 Nov 2026

| ID | Sev | Finding | Evidence | Fix direction |
| --- | --- | --- | --- | --- |
| **H1** | **P0** | **Half-done cutover. The canonical domain renders unstyled with broken navigation, and github.io redirects to it, so there is no correct copy of the site anywhere.** The Pages custom domain is set (`cname: neoplastix.crea-comm.net`, cert approved, HTTPS enforced), but `deploy-pages.yml` still builds `SITE=https://ruvebal.github.io` + `BASE=/mondrian-project`. On the live domain `/mondrian-project/_astro/ShellLayout.*.css`, `/mondrian-project/brand/mark.svg`, `/mondrian-project/favicon.svg` and every nav link → **404**. `https://ruvebal.github.io/mondrian-project/*` → **301** to the domain root | `gh api repos/ruvebal/mondrian-project/pages`; `curl` of the paths above; `.github/workflows/deploy-pages.yml:38` | Flip deploy env to `SITE=https://neoplastix.crea-comm.net`, `BASE=/` (D-33 lock D5; DNS is evidently live). Re-probe the registry. **Human/ops action. This ADR does not change workflows** |
| **H2** | P1 | Legacy origin hardcoded in four places: `services/web/src/pages/index.astro:17` (`liveHref = "https://ruvebal.github.io/mondrian-project/"`), `astro.config.mjs` default `SITE`, D-27 §4.4 example `PUBLIC_CANONICAL_ORIGIN=https://….github.io/mondrian-project`, PHASE-M7 asserting `start_url=/mondrian-project/kiosk/` | `grep -rn ruvebal.github.io` | One source: `PUBLIC_CANONICAL_ORIGIN` = `SITE` + `BASE` (no trailing slash), read through one helper next to `withBase`; nothing else names a host |
| **H3** | P1 | **Printed QR codes outlive hosts.** Today a github.io recipe URL survives only because GitHub redirects project Pages to the custom domain (verified: path **and query** preserved). That redirect dies if the Pages domain is unset, or if the repo is renamed, which D-33 lock D2 explicitly revisits post-term | `curl -I 'https://ruvebal.github.io/mondrian-project/create/comp-b/?surface=sticker-50&fmt=16-9'` → 301 with query | QR / Copy link encode **only the owned domain** `https://neoplastix.crea-comm.net`. No sticker is ever printed with `github.io` in it |
| **H4** | P1 | **The recipe has no evolution rule.** Keys and values are listed (D-27 §4.1), but nothing says what an old printed recipe does after `var` ids change or a key is added in Phase 2. TTOD's rule after the fact: *shipped parameters are never renamed* | D-27 §4; PHASE-M6 acceptance covers round-trip but not old/invalid input | Keys and enumerated ids are **append-only**. Unknown keys are ignored. Invalid or out-of-range values clamp to the nearest valid value (θ already clamps) with a visible "ajustado / adjusted" note. Never throw, never blank the stage. No `v` key until the first breaking change; **absent `v` means 1** |
| **H5** | P1 | **Locale is undecided while URLs are about to be printed.** `ShellLayout` takes `lang` but there is no locale routing. M9 writes EN + ES. If `/es/…` prefixes arrive after stickers ship, every printed URL becomes an English-only or broken link | `layouts/ShellLayout.astro`; PHASE-M9 | Decide **before M7 prints**: recipe paths stay **locale-neutral** (`/create/<work>/?…`). Language is UI state (toggle + `Accept-Language`), not part of the printed path. Recipe keys and fragment ids are identical in every language: *keys are code, labels are copy* (TTOD F57) |
| **H6** | P1 | No `<link rel="canonical">`, no `robots.txt` (404 on the live domain), no sitemap. `/assignments/` and `/assignments/seat-*/` render student GitHub handles on the public product domain **without** `noindex` (only `/create/*` and `/probe/svelte/` set it) | `grep -rn canonical\|noindex services/web/src`; live `curl /robots.txt` | Canonical from `PUBLIC_CANONICAL_ORIGIN` on every page; `robots.txt` + sitemap of visitor routes only; `noindex` on `/assignments/*`, `/design/tokens/`, `/probe/*` until M9's pseudonymisation decision |
| **H7** | P1 | **GitHub Pages cannot send security headers.** Live `curl -sI` shows GitHub defaults only: no CSP, no `frame-ancestors`/`X-Frame-Options`, no `Permissions-Policy`, and `access-control-allow-origin: *`. A `<meta>` CSP cannot express `frame-ancestors` | live `curl -sI https://neoplastix.crea-comm.net/` | On Pages: `<meta name="referrer">` + a `<meta>` CSP (scripts/styles self + Google Fonts) and **say plainly that clickjacking protection is absent**. If D-33's studio host (Lilith/Traefik) path is taken, the headers move to Traefik (TTOD F1). Never claim headers the host does not send |
| **H8** | P2 | Shell nav mixes the visitor's product with the cohort's workshop: 10 items (Home, Assignments, Gallery, About, About us, Method, Tokens, Contribute, Create, Kiosk). "Home" duplicates the brand link. Kiosk is a device mode, not a visitor destination | `components/SiteNav.astro` | At scaffold close (M3 polish / M9): visitor primary ≤ 5 (Gallery · About · Method · Create), with cohort pages under a footer "Project" group or a `/project/` hub. Kiosk is reached by its own start URL. TTOD F56: a classic, quiet bar, nothing louder than the nav |
| **H9** | P2 | PWA identity is tied to the base path. The manifest has no `id`, so identity defaults to `start_url`. Moving the base changes the app identity on installed devices. No maskable icon | `public/site.webmanifest`; PHASE-M7 deliverables | Set `"id": "/kiosk/"` and `"scope": "/"` before the first real kiosk install; add maskable 192/512 (TTOD F43/F44) |
| **H10** | P2 | About chapters already have ids (`#scene-measure` … `#scene-print`), but nothing promises they stay, or that a cold deep link lands correctly under GSAP parallax | `pages/about.astro` | Freeze them in the registry. A deep-link test at 390/1440 px; if a sticky header ever appears, `scroll-padding-top` from one token (TTOD F51/F58) |
| **H11** | P2 | The docs said "live = github.io until cutover" while the server said otherwise (H1) | AGENTS.md, README, INDEX, D-33 vs live probe | Each phase close re-probes [`LOCATORS.md`](../LOCATORS.md) against the canonical origin and records the table in its report. A scheduled CI smoke curls the same registry |

**Already good (keep):** every href through `withBase` (hard constraint); recipe ≪ 0.5 KB and never SVG/JSON in
`?` (D-27); MPA with no hash router (D-03); unknown slugs and paths are real **404**s, not soft 404s (live `/nope`);
`/about` → 301 → `/about/` on Pages (one canonical form); `aria-current` by route id, not exact path
(the bug TTOD F38 had); M5 already carries TTOD's backend lessons (size limit, per-IP rate limit, non-root,
healthcheck, no Pages→API); HTTPS certificate approved and enforced.

## Decision (accepted)

1. **Owned origin only.** `PUBLIC_CANONICAL_ORIGIN=https://neoplastix.crea-comm.net` is the only host name in
   printed or copied URLs, canonical tags and the sitemap. Derived from `SITE`+`BASE`, set once in the deploy env.
2. **Three layers.** Path = the work or page (permanent); query = the recipe (D-27, the visitor's state); fragment =
   position on a page (About scenes). No other channel carries state.
3. **Recipe evolution:** keys and enumerated ids append-only; unknown ignored; invalid clamped and announced;
   absent `v` = 1. A sticker printed in November 2026 opens the same study in 2030 or opens a clamped neighbour
   with a note. It never opens a blank stage.
4. **Locale-neutral printed paths.** Language never enters `/create/…`. Keys and ids are the same in EN and ES.
5. **One slash form:** always-slash pages (Pages already 301s); set Astro `trailingSlash: "always"` so `astro dev`
   behaves like production. Any non-Pages host must replicate the 301.
6. **Edge honesty:** document what the host sends; meta-level hardening on Pages; real headers only where a proxy
   exists.
7. **Registry or it is not a contract:** [`LOCATORS.md`](../LOCATORS.md) lists every route, key and id. Tests walk it;
   phase reports probe it live.

## Consequences

- PHASE-M6 acceptance gains old/invalid recipe cases; PHASE-M7 asserts `start_url` under `BASE=/` and a manifest `id`.
- D-27 §4.4's example origin is superseded by rule 1.
- CI should build once with a non-root `BASE` (e.g. `/__base-check__`) in addition to production `BASE=/`. With
  production at root, a hardcoded `/gallery/` href would work by accident and hide a `withBase` violation.
- Students get small, falsifiable seats: canonical tag, robots/noindex, recipe clamp tests, manifest id,
  registry test (see [`../ISSUE-SEEDS.md`](../ISSUE-SEEDS.md) additions).

## Reverses if

- The product moves to a host with server-side redirects and a link shortener we own. Rule 1 then applies to the
  shortener's domain instead.
- Phase 2 needs a breaking recipe change. Introduce `v=2` and keep a v1 reader. Never reinterpret v1 keys.

## Out of this decision

- Editing `.github/workflows/*` or DNS (H1 is a human/ops action; owner runs it or asks for it).
- Choosing the M9 pseudonymisation policy (H6 only asks for `noindex` until then).
- Visual redesign of the nav (H8 records the IA rule; the design seat decides the form).
