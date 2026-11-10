# PHASE-M7: Kiosk profile and PWA — attract, touch, offline, wake, handoff, one real device

> **Track:** L3 site (`/kiosk/`), service worker, manifest, device runbook.
> **Status:** BLOCKED (M6 DONE; M5 optional)

## Goal

Turn the editor island into an exhibit. `/kiosk/` is the start URL: attract loop → one
touch → `/create/` in the kiosk profile → idle reset. A4 landscape is the
initial surface, but all MVP presets remain available. A QR encodes the
**recipe URL** only (~0.15 KB query form — D-26/D-27; not SVG or work JSON).
The phone opens
`/create/<slug>/?…` and reconstructs from the offline catalog plus the
normalized `Recipe` (surface, composition state, `variationId`).
The service worker precaches the **pattern catalog** and the Svelte island.
Device lockdown is a runbook. FastAPI is never contacted.

## Deliverables

- `src/pages/kiosk/index.astro` (attract + entry; `noindex`; not in nav); kiosk CSS profile in `src/styles/kiosk.css` (44 px+ targets, no hover-only affordances, big "start again", hidden chrome nav, the frame fills the stage).
- A generated `manifest.webmanifest` (`display: fullscreen`,
  `display_override: ["fullscreen", "standalone"]`, base-aware `start_url` and
  `scope`, icons generated from the reference matrix—not a photograph),
  `<link rel=manifest>` through the same URL helper.
- `src/sw.js` hand-written (precache the build manifest **and** `public/patterns/**`; stale-while-revalidate for pages; no runtime caching of the LAN API; never fetch FastAPI).
- `src/scripts/kiosk.js`: wake lock with re-request on `visibilitychange`; idle
  timer (any pointer event resets; 60 s → the base-aware kiosk URL); attract
  loop driven by `@keyframes` on `--theta` (CSS); under
  `prefers-reduced-motion` show one static attract frame with no cycling;
  counts-only session counters stay in
  `sessionStorage` and appear on hidden `/kiosk/stats/`.
- `ShareQR` / Copy link: encode `PUBLIC_CANONICAL_ORIGIN` + `/create/<slug>/?…`
  (complete live Recipe). Never emit `localhost` or LAN origins in the QR
  even when the kiosk runs offline from PWA cache (D-27 §4.4).
- `docs/runbooks/kiosk-device.md`: ChromeOS kiosk app / Chrome `--kiosk --app=<url>` on a locked desktop / iPad Guided Access / Android lock-task; HTTPS requirement for wake lock and SW; what to do when the screen goes dark; who holds the device.
- Playwright: fake timers → idle reset; emulated `display-mode: fullscreen` + coarse pointer → kiosk CSS applies; offline (`context.setOffline(true)`) → `/kiosk/` reloads from cache **and** a catalog variation still applies; no request leaves the Pages origin.
- Lighthouse PWA installable check recorded; Lighthouse a11y 100 on `/kiosk/`.
- `PHASE-M7-COLD-REVIEW.md`, `PHASE-M7-REPORT.md` with the device model, OS, browser version, date, and who ran it.

## Scope

**In:** the above. **Out:** camera/live measurement; analytics services; any identifier or image of a visitor; `navigator.keyboard.lock()` as a security measure (it is not one).

## Prompt (Implementation Agent)

```text
Implement PHASE-M7 per docs/DEV_PLAN/MONDRIAN/PHASE-M7.md.

## Deliver
1. Profile by CSS: @media (display-mode: fullscreen), (pointer: coarse) and (hover: none) → kiosk.css rules;
   also honour a `?profile=kiosk` query for development, documented as dev-only.
2. Manifest + icons from the matrix (render the reference work to PNG at build
   with a tiny script; no photos). Generate manifest URLs with Astro's base and
   assert `start_url=/kiosk/` and `"id": "/kiosk/"` under production `BASE=/` (D-33 D5, D-36 H9; the old
   `/mondrian-project/kiosk/` assertion is superseded). The manifest `id` never changes after the first device install.
3. Service worker: precache list generated post-build; versioned cache name from the build hash; cleanup on
   activate; never cache cross-origin.
4. kiosk.js: wake lock (try/catch, re-request on visibilitychange), idle reset
   using a server-rendered base-aware URL, attract via toggling a class that
   starts the @keyframes on --theta; counters in sessionStorage.
5. Runbook with the four device paths; be explicit that fullscreen ≠ kiosk and that lockdown is the OS's job.
6. Tests as listed. Lighthouse run. One real-device run with the human; record everything in the report.
7. Full suite + imports. Hand off for cold review — do NOT mark DONE yourself.

## Constraints
- No third-party scripts, fonts, or analytics on /kiosk/.
- Idle reset must not fire during an active drag (pointer events reset the timer).
- Reduced motion: one static attract frame; no cycling or hue animation.
```

## Acceptance

- Playwright with `page.clock`: 60 s without pointer events on
  `/create/<slug>/?profile=kiosk` navigates to `/kiosk/`; a pointer event at
  59 s prevents it.
- Playwright `context.setOffline(true)` after first load: `page.reload()` on `/kiosk/` succeeds and renders the attract loop.
- Network log over a full kiosk session shows only same-origin requests.
- Lighthouse: installable PWA (manifest valid, SW registered, HTTPS); a11y 100 on `/kiosk/`.
- Real-device run recorded: wake lock held ≥ 10 min, a drag round completed by someone who had not read the brief, QR opened on a phone, idle reset observed.
- The phone recipe deep-equals the kiosk recipe after URL parsing (except
  `profile=kiosk`); SVG exported on the phone has identical recipe metadata.
- Cold review filed; blocking findings closed.

## Risks

- Wake lock refused on battery-saver → documented in the runbook; the device must be on mains.
- The device browser lacks a Baseline-2026 feature used by M6 → amend-on-surprise: fallback promoted, D-row updated, report says which.
- The exhibit space has no HTTPS/LAN → Pages origin is HTTPS already; the API is optional; offline cache covers the kiosk. Portable QR still needs the public Pages deploy reachable from the visitor’s phone (or Print/HTML as air-gap takeaway).
- Misconfigured ShareQR using `window.location.origin` on a local kiosk → phones get a dead link; gate tests assert QR host === `PUBLIC_CANONICAL_ORIGIN`.
