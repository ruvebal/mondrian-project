# Seat 6 — First Svelte editor study (exploratory plan)

**Owner:** `galarp2005` · **Scope:** U6-T1 · **Status:** prototype, not yet a PR.

> The instructor has not opened an editor issue yet. This prototype lives in `lane/galarp2005-editor` for learning and review. Before submission, create a fresh `lane/galarp2005-issue-<n>-<slug>` branch from up-to-date `main`, use an agreed issue number, and follow `CONTRIBUTING.md`.

## Source instructions before each change

- `CONTRIBUTING.md`: path ownership, sync, branch naming, small PRs, human reviews, AI log.
- `docs/DEV_PLAN/MONDRIAN/TEAM-ASSIGNMENTS.md`: Seat 6 IDs U6-T1…U6-T7.
- `docs/DEV_PLAN/MONDRIAN/PHASE-M6.md`: functional acceptance.
- `docs/DEV_PLAN/MONDRIAN/DECISIONS/D30-2026-10-27-LIQUID-FRAME-REFACTOR.md` and `D31-2026-10-27-FORMAT-ASPECT-PRESETS.md`: updated layout rules.
- `docs/guides/stack-fundamentals.md`: Svelte only in editor and Astro route `/create/<slug>/`.

Do not invent a separate `services/web/src/pages/editor.astro`: the assigned page already exists at `/create/[slug].astro`.

## Goal

Replace the `/create/<slug>/` placeholder with a minimal Svelte 5 island displaying the actual measured source composition as inline SVG. Preserve the existing Astro shell and gallery navigation.

## Prototype purpose (first PR)

This is an **initial prototype for integration and testing**, not the final visual design of the editor. Its purpose is to verify the complete path: Astro selects a measured work, passes it to the Svelte component, `@mondrian/matrix` generates an SVG, and the browser displays it on the assigned `/create/<slug>/` route.

The simple heading, stage, painting container and basic CSS exist only to make this first result visible and testable. Their current appearance is **temporary**, not a proposed final UI. Visual composition, layout refinement, typography, colors, responsive styling and the graphical presentation of editor controls will be addressed in **later scoped tasks/PRs**, coordinated with the project's shared design tokens and Seat 7 where relevant.

This separation keeps the first PR focused on getting the component connected and verified before adding the full editor interface.

## Files / contract

- `services/web/src/pages/create/[slug].astro` obtains the validated work from the Astro `works` content collection and passes it as the `work` prop.
- `packages/editor/src/Editor.svelte` uses `@mondrian/matrix` `deriveRenderPlan` and `renderSvg` to display the study; no local geometry implementation.
- `packages/editor/package.json` exposes `./Editor.svelte` directly; Astro imports `@mondrian/editor/Editor.svelte`. The unused `packages/editor/src/index.js` barrel was removed; the original `Probe.svelte` remains available via its direct export.
- No changes to `packages/matrix`, `work.yml`, `services/api` or Seat 7 export controls.

## Deliberately out of scope

- **Final graphic / visual design**: polished editor layout, typography, color treatment, responsive presentation, and the visual design of controls. These are deferred to a later design/UI task or PR; the basic styles in this prototype are only a functional placeholder.
- **Interactive editor behavior**: corner-drag, format chips, variations, hue, undo, compare, reset and live URL/recipe syncing. These belong to subsequent scoped editor tasks/PRs under the Seat 6 specification.
- **Other integrations**: kiosk integration, export and print are not implemented in this first PR. Coordinate with Seat 7 for their assigned deliverables.

Deferring these parts does **not** remove them from the overall Neoplastix MVP; it only limits the scope of this first integration-and-testing PR.

## Verification (human check required)

1. `pnpm check` succeeds from repo root.
2. `pnpm develop` serves `/create/kunsthaus-1930-rbby/`; the heading and inline SVG are visible.
3. The SVG has measured planes and black lines; no console/runtime errors.
4. `/gallery/` stays functional; `/about/` does not mount a Svelte island.
5. Confirm only the intended files changed with `git status` and `git diff`.

## Assisted work review

- Assistant proposed initial architecture / code. **ACCEPT pending human code and browser review.**
- Decision to avoid duplicate geometry in Svelte: **ACCEPT**. The existing `matrix` package owns calculations.
- Do not claim a human test, approval or merge until completed by a person.
