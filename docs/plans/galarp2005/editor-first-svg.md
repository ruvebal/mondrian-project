# Seat 6 — First Svelte editor study (exploratory plan)

**Owner:** `galarp2005` · **Scope:** U6-T1 · **Status:** prototype implemented and checked; replacement PR pending human review.

> U6-T1 is the instructor-assigned task identifier. There is not yet a numbered GitHub issue for it in the upstream repository, and the linked account cannot create one there. This submission uses the descriptive branch `lane/galarp2005-u6-t1-editor-svg`. The missing issue-based branch suffix is disclosed for human review rather than claiming full naming compliance.

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

## Corrections incorporated after PR #16 review

Rubén's initial review identified three required follow-ups plus smaller cleanup:

1. **Restore the gallery navigation** removed from the original Astro placeholder: the editor page keeps both **View SVG study** (for the selected work) and **Gallery** (for the index). Links use `withBase()` so the site's base path remains supported.
2. **Keep recipe query parameters** when navigating from `/create/<slug>/` to `/gallery/<slug>/`. The Astro page retains `Astro.url.search` and `galleryHref`; because routes are statically generated, a small browser script copies `window.location.search` into the study link.
3. **Sync with upstream `main`** and repeat the project checks before resubmission. The new branch contains the upstream changes and `pnpm check` completed successfully in [GitHub Actions](https://github.com/galarp2005/mondrian-project/actions/runs/45182610047).
4. **Remove dead CSS**: delete the unused `.editor-study__note` rule from `Editor.svelte`.
5. **Document the package export change**: removing `packages/editor/src/index.js` also removes the package-root `"."` export; the actual consumer uses the explicit `@mondrian/editor/Editor.svelte` subpath.

**Open process point:** `U6-T1` is the assigned task ID, but the branch `lane/galarp2005-u6-t1-editor-svg` has no numbered GitHub issue. Instructor confirmation of this branch-naming exception is still required, as is a cross-lane human code review.

## Deliberately out of scope

- **Final graphic / visual design**: polished editor layout, typography, color treatment, responsive presentation, and the visual design of controls. These are deferred to a later design/UI task or PR; the basic styles in this prototype are only a functional placeholder.
- **Interactive editor behavior**: corner-drag, format chips, variations, hue, undo, compare, reset and live URL/recipe syncing. These belong to subsequent scoped editor tasks/PRs under the Seat 6 specification.
- **Other integrations**: kiosk integration, export and print are not implemented in this first PR. Coordinate with Seat 7 for their assigned deliverables.

Deferring these parts does **not** remove them from the overall Neoplastix MVP; it only limits the scope of this first integration-and-testing PR.

## Verification (human check required)

- **PASS — automated:** `pnpm check` succeeded on the updated branch in [GitHub Actions](https://github.com/galarp2005/mondrian-project/actions/runs/45182610047) using Node 24.22.1 and pnpm 10.30.0.
- **PASS — manual browser smoke:** `/create/kunsthaus-1930-rbby/` displayed the heading and measured SVG; Chrome's Console showed no error messages.
- **PASS — manual navigation:** **View SVG study** opened the matching work; a link opened with `?theta=42&format=square` preserved that query, and the `theta` colour rotation behaved as expected.
- **PASS — manual navigation:** **Gallery** opened the gallery index, showing the single currently measured work.
- **Still to verify separately:** `/about/` contains no editor island; cross-lane human code review and approval; final PR file list. These are not represented as completed.

## Assisted work review

- Assistant proposed initial architecture / code. **ACCEPT for the initial prototype; manual browser smoke check is complete, but cross-lane human code review and approval remain pending.**
- Decision to avoid duplicate geometry in Svelte: **ACCEPT**. The existing `matrix` package owns calculations.
- Do not claim a human test, approval or merge until completed by a person.
