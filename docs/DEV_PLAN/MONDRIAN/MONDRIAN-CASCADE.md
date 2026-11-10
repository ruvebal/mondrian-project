<!--
Mondrian Project — technical-director face. Orchestrator for PHASE-M0…M9.
Author: Rubén Vega Balbás, PhD · 25 October 2026 · amended 27 October 2026 (D-21…D-32; M0 DONE; M1 DONE).
Pattern: ~/src/.cursor/skills/cascade-forge/SKILL.md (INDEX + orchestrator + phase files + cold review + report).
Canonical home: product repo docs/DEV_PLAN/MONDRIAN/ (moved at M1).
Forge keeps PITCH.md + INDEX pointer + scaffold/assets/_private.
-->

# Mondrian Project — cascade (M0–M9)

**Status:** ACTIVE. Run phases **in order**, except the two parallel lanes named in §2. Each `PHASE-Mn.md` is a self-contained paste prompt. Decisions are not taken in chat: they are taken in **M0 (preflight)** against the proposals in §1, and amended later only through the closing protocol (§5).

**Product definition:** [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md) (wins; 27 Oct 2026 rewrite).
**Product/why:** [`MONDRIAN-RATIONALE.md`](MONDRIAN-RATIONALE.md).
**Origin:** [`PITCH.md`](PITCH.md) (22 Oct 2026), amended by §7 below.
**Stack/MVP amend:** [`DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md`](DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md) — Astro host, Svelte editor island, SVG canvas, build-time Python catalog, Addendum B interaction cut.

---

## 1. Preflight decisions (ratified in M0)

Each row is an ADR in one line. M0 recorded each as `ratified` or `rejected` with one sentence of evidence, and amends every downstream phase that assumed otherwise. (No D-row remains in `proposed` status.)

| ID | Decision | Proposal | Why this and not the alternative | Reverses if |
| --- | --- | --- | --- | --- |
| **D-01 Repository** | One cohort monorepo, public, `ruvebal/mondrian-project`, local clone at `~/projects/ruvebal/scholar/udit/courses-repos/mondrian-project/`; students as collaborators; protected `main`. | Supersedes pitch §9 "one repo per student". The product is the cohort's (Strand B shape); individual authorship is kept legible by `packages/works/<slug>/` (one measured work per student), `docs/plans/<handle>/`, `CODEOWNERS`, commit history. | The department requires individually submitted repositories → fall back to forks + upstream PRs, same layout. |
| **D-02 Generator** | **Astro 7**, static output, GitHub Pages via `withastro/action@v6`. **Node ≥24.22.1** (LTS Krypton; D-28). pnpm. **Client UI: Svelte 5 island on editor routes only (D-21).** | Supersedes pitch §9 Jekyll / earlier Astro 6. M0 dry-run `astro@^7.4.2`. Oct 2026 security releases: Brotli RCE CVE-2026-111497 — floor **24.22.1** (or 22.23.4 escape hatch). `withastro/action@v6` default Node 24. D-21: `@astrojs/svelte` on `/create/` + `/kiosk/` only; `packages/matrix` vanilla ESM. | Department forbids Astro/Svelte → vanilla SVG editor or Jekyll; schema (M2) unaffected. Lab stuck on 22 → `>=22.23.4` documented exception until image upgrade. |
| **D-03 Routing** | MPA. No SPA router, no `#` router. **Every UI edit immediately rewrites the URL query** (`?theta=`, `?fx=`… — live Recipe sync, D-27 §4.0). Cross-document view transitions as enhancement only. | A hash router breaks the "every state is a URL" rule the kiosk QR depends on; deferred serialize-on-export would leave the address bar stale. | Never for this product. |
| **D-04 Packages** | `pnpm` workspace (≥ 10; 12 acceptable) for JS; **`uv` workspace** for Python, Python pinned **3.12**. pnpm 12's experimental Python support is *not* relied on. | Two mature tools, one each; TensorFlow has no 3.14 wheels (instructor machine is 3.14 today). | pnpm's Python support leaves experimental and the team wants one installer → revisit, do not block. |
| **D-05 Schema** | One `work.schema.json` (JSON Schema 2020-12) in `packages/works/schema/`, adapted from Andrzejewski et al.'s grid-point representation: normalized x/y points; coloured rectangles referencing point pairs; black horizontal/vertical lines with centre, extent and relative thickness; white background; method-discriminated provenance, rights and uncertainty. Ajv executes the canonical schema; hand-written vanilla ESM and Python add identical semantic geometry checks; Astro/zod and Python/pydantic mirror the source contract. JS and Python derive **one** render plan that serialises to **both** SVG (editor/export) and CSS Grid (gallery/About/LAN preview) by expanding line edges and rectangle bounds into overlapping plane/line items. | The paper separates planes from superimposed lines and gives the analyzer a research-comparable representation; dual serialisation keeps CSS Grid as FE I pedagogy without making Grid the live editor (D-22). Four validation paths, two derivations and one fixture set catch drift. Source: [Andrzejewski et al. 2010, §3.2 / pp. 5–6](grounding/ANDRZEJEWSKI-2010.md). | Never for the source/derived separation; amend only if a measured work cannot be represented without loss. |
| **D-06 Framework ladder** | Bootstrap, Tailwind, Vite are **not** in the product. **GSAP is** — scoped to `/about/` parallax (S11 evidence, D-29). Communicated in the M0 letter. | Only GSAP has a semester-1 session row; absorbing Bootstrap/Tailwind would fake coverage. | Department wants Bootstrap/Tailwind → session exercises, not this product. |
| **D-07 Hue** | Hue rotation in **CSS relative colour syntax** on chromatic roles; JS writes `--theta` and computes Δ for captions. HSL, not OKLCH, for the integrator; OKLCH as a named comparison. | Pitch §7 formula, moved to where it belongs; one custom property makes the editor and attract loop trivially animatable (`@property`). | Relative colour syntax unavailable on a target device → JS fallback, same formula (M3 keeps it). |
| **D-08 Renderers** | **SVG is the live editor canvas and the canonical export** (D-22). CSS Grid remains the pedagogical/gallery renderer from the same plan. Canvas is PNG-only. FastAPI emits HTML/CSS and/or SVG preview with the same semantic contract. | The live graphic is an SVG partition with frame handles; Grid still teaches `fr` arithmetic on gallery/About. Canvas would hide both CSS and the export tree. | Department forbids Svelte → vanilla SVG in `packages/matrix` + a small editor module; Grid pedagogy unchanged. |
| **D-09 API** | **FastAPI**, REST: validated JSON plus a self-contained HTML/CSS (and SVG) preview. Development/analysis service on the studio LAN. **Never** an MVP runtime dependency of Pages or the kiosk (D-23). Preset buttons load build-time catalog files; they do not call the API. Phase 2 (last): `POST /patterns/generate` seed-based “Make your own Mondrian” (D-26); also `POST /patterns/calculate` / server PDF. | GitHub Pages is the pedagogical host; an exhibition must survive the LAN being absent. Python’s authority for presets is the **build**, not a request. Generative live compositions need the service. | Camera-analysis or cloud save may also call FastAPI later; not MVP. |
| **D-10 Kiosk** | One codebase, two profiles; `/kiosk/` + PWA offline cache + wake lock; lockdown = runbook. **QR/Copy link always use public Pages origin** (`PUBLIC_CANONICAL_ORIGIN`); kiosk may be offline, phones need the online deploy (or Print/HTML) — D-27 §4.4. | Kiosk ≠ fullscreen; handheld bridged by portable recipe URL, not localhost. | Full air-gap → Print + HTML only; QR becomes “open later”. |
| **D-11 Licences** | Code **MIT** (`LICENSE-CODE`); content — works data, measurements, texts — **CC BY-NC-SA 4.0** (`LICENSE-CONTENT`). Same pattern as TTOD and hc-app-design. Clarified by **D-32**: we license *our* SVG studies/measurements, not the painting. | Dataset reuse in DH wants a clear content licence separate from code. | — |
| **D-12 Corpus** | Three instructor-measured reference works first (square-ish, vertical, horizontal), then one per student. Lozenge, coloured-line, *Boogie Woogie*, multi-grey works excluded (pitch §5). Rights checked per work, EU **and** US. | Pitch §13 unchanged; the US check is new because Pages is US-hosted. | — |
| **D-13 Plans** | Plans at `docs/plans/<handle>/planN.md`; AI declaration at `docs/declarations/<handle>.md`. Astro publishes only `src/pages/`, so the Jekyll "stray Markdown" problem is gone, and the pitch's `plans/`-vs-`docs/` argument is moot. | Monorepo needs per-person namespacing; `docs/` is where the cascade also lives. | — |
| **D-14 Ethics/institution** | No new dictamen for the stated scope (committee position, 22 Oct). Communicate in advance to department/degree coordination and ECSIT IP using the private draft adapted from TTOD; provide separate FE I information/acceptance before research use. | Same innovación docente line as TTOD; teaching and research participation remain separable. | The committee asks for a dictamen or the design expands → research use pauses, teaching continues (pitch §3). |
| **D-15 Nomenclature** | The corpus is Mondrian / Neoplasticism. “Texture” is acceptable interaction language; public attribution says “composition” or “texture after Mondrian”. “Kandinsky” is not used for these orthogonal works. | Kandinsky and Mondrian are different artists and programmes; conflating them would make the premise false. | Kandinsky becomes a later, separately modelled corpus. |
| **D-16 Surface and state** | Separate immutable `Work` from `SurfaceSpec` and normalized `CompositionState`; serialize `Recipe { surface, compositionState }` (`MVP-PRODUCT-SPEC.md` §3). **Kiosk default = sticker-50 (50×50 mm)**; also 70×70, 100×70, A6/A5/A4 (D-27). Stage = paper silhouette. **Fit mode MVP = `liquid-fill` (D-30)** — supersedes earlier preserve-ratio wording. Frame = corner handles, free aspect. `variationId` in state (D-24). | Print size, containing frame and source canvas are different systems; sticker giveaway needs small presets; frame change *is* the composition refactor. | Never drop the nested rectangles; fraction-rewriting `refit` solver is Phase 2. |
| **D-17 Export and print** | Save **URL recipe** (~0.15 KB query — never SVG-in-`?`) + SVG + standalone HTML + CSV + PNG. QR = recipe URL (D-26). **Print** button: `@page` = selected sticker/sheet; kiosk giveaway. Calibrate stickers (50 mm) and sheets (100 mm). No account/server save (D-27). | Pages has no durable store; URL form + print/download are permanence. SVG in query breaks QR/browsers. | Server PDF later, outside MVP. |
| **D-18 Story motion** | No Framer Motion / `motion`. **About parallax = GSAP ScrollTrigger** (D-29); reduced-motion kills triggers; no-JS scenes complete. CSS `view()` optional for non-parallax fades. | Framer is React; GSAP is FE I S11 and fits scrubbed scroll depth. | GSAP unavailable → fall back to CSS-only D-18-classic (IO + view timelines). |
| **D-19 Contribution governance** | Short-lived parseable branches, student-owned conflict resolution, same-branch amend loop, exact `Ready for re-review`, no renaming an open-PR branch, one cross-lane human approval. Local Ollama may comment; it never approves or merges. | Integrates the TTOD cohort's concrete Git feedback before M1 freezes the contribution contract. | Department policy requires a different merge model. |
| **D-20 AI-critical operation** | The shared rubric remains summative; assisted PRs accumulate ACCEPT/REJECT and human-vs-assistant verification evidence through [`AI-CRITICAL-OPERATING-ADDENDUM.md`](AI-CRITICAL-OPERATING-ADDENDUM.md). | Avoids making M9 the first time Critique and Verify become visible; separates product quality from control of assistance. | The shared institutional rubric changes. |
| **D-21 Interactive stack** | Astro 7 host + **Svelte 5 island** (`@astrojs/svelte`) on `/create/` and `/kiosk/` only. `packages/matrix` remains vanilla ESM with no Svelte import. React forbidden. | Pointer-driven SVG frame handles are an island, not a SPA. FE I still writes HTML/CSS/vanilla modules; the Editor lane learns one island from the starter. | Department forbids the island → vanilla SVG editor; catalog/schema unchanged. |
| **D-22 Renderers (live SVG)** | Live editor = inline SVG; CSS Grid = gallery/About/LAN preview from the **same** plan; canvas = PNG only. Default fit = **`liquid-fill` (D-30)**. | Same plan JSON; relative `fr` rhythm is the claim; absolute cell aspect follows the visitor’s frame. | — |
| **D-23 Computation topology** | Three paths, never conflated: (1) Python **build-time** catalog for preset buttons; (2) client Svelte/SVG for resize and cheap variations; (3) FastAPI POST for Phase-2 custom calculation **and** seed-based generate (D-26, last). No Python inside Astro. | GitHub Pages + offline PWA. Calling the API on every button would contradict D-09/D-10. | Phase 2 may add `POST /patterns/calculate` and `/patterns/generate` without moving them into the Astro app. |
| **D-24 MVP interaction cut** | Print canvas + one containing frame + **free-aspect corner-resize** + **liquid-fill** + catalog works + predefined variations (D-30). **No** internal node/edge dragging, split/merge, fraction `refit` solver, or runtime backend. | Addendum B amended by D-30: the joke is refactoring Mondrian via the frame. Node dragging remains Phase 2. | Never for MVP; Phase 2 is a later cascade, not an M6 scope creep. |
| **D-25 Cohort git surfaces** | Path-owned CODEOWNERS: Analyzer (`packages/analyzer`, `works/python`, `services/api`); shared contract (`schema`, `packages/matrix`) dual-reviewed; Shell (Astro pages except create/kiosk); Editor (`packages/editor` + create/kiosk); Design (tokens). Svelte stops at `packages/editor`. Seats **1–7** mapped in [`TEAM-ASSIGNMENTS.md`](TEAM-ASSIGNMENTS.md). | One monorepo (D-01) with merge-safe lanes (D-19). Mixing Svelte and schema in one PR is how the bottleneck explodes. | Department requires per-student repos → D-01 fallback (forks + upstream PRs), same layout. |
| **D-26 Export / QR / generative** | MVP export = client SVG + **standalone HTML** (SVG embedded) + CSV/PNG; QR encodes **recipe URL** only (full HTML+SVG in QR rejected — capacity ≈3 KB). FastAPI Phase-2 **last** feature = `POST /patterns/generate` (complexity, density, colorimetry, seed) → schema-valid algorithmic study. Token barrel `packages/tokens/` (copied from forge `scaffold/` at M1). | No server persistence on Pages; visitor must own a file or a URL. Generative Mondrian is not a preset button. | Exhibition requires true offline HTML-in-QR → only for toy SVGs under ~2 KB with proven device support; never default. |

**Decision status (26 Oct 2026 — M0):** D-01…D-20 **`ratified`**. Evidence: [`PHASE-M0-REPORT.md`](PHASE-M0-REPORT.md) § Decisions. Cascade amended that day for **D-02 Astro 7** (was Astro 6).

**Decision status (27 Oct 2026 — owner amend, pre-M1):** D-21…D-25 **`adopted`**. Evidence: [`DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md`](DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md). D-02/D-08/D-09/D-16 clauses that conflict are superseded in-place above; M0 ratification history is not rewritten.

| **D-27 Print / stickers / URL form** | Stage = paper silhouette; sticker presets first; Print = kiosk giveaway; **live URL sync** (every control → query immediately); Recipe ~150 chars; never SVG/work JSON in `?`. | Permanence without a server; address bar always = visitor decisions. | Exhibition mandates only A4 → demote stickers but keep live-recipe rules. |

**Decision status (27 Oct 2026 — owner amend, pre-M1):** D-26 **`adopted`**. Evidence: [`DECISIONS/D26-2026-10-27-EXPORT-QR-GENERATIVE.md`](DECISIONS/D26-2026-10-27-EXPORT-QR-GENERATIVE.md).

**Decision status (27 Oct 2026 — owner amend, pre-M1):** D-27 **`adopted`**. Evidence: [`DECISIONS/D27-2026-10-27-PRINT-STICKERS-URL-RECIPE.md`](DECISIONS/D27-2026-10-27-PRINT-STICKERS-URL-RECIPE.md).

| **D-28 Node security pin** | Product + CI + students: **Node `>=24.22.1`**; `.nvmrc` `24.22.1`; `engines` + `engine-strict`; CI pin. Forbidden: EOL ≤20, unpatched 22.22.x / 24.22.0. | Oct 2026 Node security releases (Brotli RCE, TLS/DNS highs). Aligns with Astro action Node 24. | Lab image cannot run 24 → temporary `>=22.23.4` with dated exception in AGENTS.md. |

**Decision status (27 Oct 2026 — owner amend, pre-M1):** D-28 **`adopted`**. Evidence: [`DECISIONS/D28-2026-10-27-NODE-SECURITY-PIN.md`](DECISIONS/D28-2026-10-27-NODE-SECURITY-PIN.md).

| **D-29 About GSAP parallax** | `/about/` only: **gsap + ScrollTrigger** scrubbed parallax (`data-speed` layers); reduced-motion kill; no-JS complete; no GSAP on editor/kiosk/gallery. | FE I S11 evidence inside the integrator; depth without Framer. | Bundle budget fails → CSS-only fallback; keep a11y gates. |

**Decision status (27 Oct 2026 — owner amend, pre-M1):** D-29 **`adopted`**. Evidence: [`DECISIONS/D29-2026-10-27-ABOUT-GSAP-PARALLAX.md`](DECISIONS/D29-2026-10-27-ABOUT-GSAP-PARALLAX.md).

| **D-30 Liquid frame refactor** | Corner-drag = **free frame aspect**; pattern **`liquid-fill`** (same column/row fractions → new absolute cells). Native aspect is start only. Variations/colorimetry compose on the current fill. Not letterbox-in-frame; not a fraction solver. | Owner product joke: refactor Mondrian by changing the frame while keeping mathematical rhythm. | Exhibition wants inset original for compare → optional later `preserve-ratio` chrome only. |

**Decision status (27 Oct 2026 — owner amend, pre-M1):** D-30 **`adopted`**. Evidence: [`DECISIONS/D30-2026-10-27-LIQUID-FRAME-REFACTOR.md`](DECISIONS/D30-2026-10-27-LIQUID-FRAME-REFACTOR.md). Supersedes preserve-ratio MVP fit in D-16/D-22/D-24.

| **D-31 Format aspect presets** | UI chips: `original`, `1:1`, `5:4`, social four `1:1`/`4:5`/`16:9`/`9:16`; selecting one **maximises** the frame in `printableArea`; `fmt` in Recipe; corner-drag → `custom`. Game: texture → format → variations → personal version. | Common social/print aspects without conflating paper stock with frame aspect. | Need more ratios → extend chip catalog only; maximise helper unchanged. |

**Decision status (27 Oct 2026 — owner amend, pre-M1):** D-31 **`adopted`**. Evidence: [`DECISIONS/D31-2026-10-27-FORMAT-ASPECT-PRESETS.md`](DECISIONS/D31-2026-10-27-FORMAT-ASPECT-PRESETS.md).

| **D-32 SVG study ≠ photo** | Public artefact = measured SVG / Grid **study after** the work; never museum photos. Improves photo-rights posture; composition rights still per-work (EU PD Mondrian MVP; siblings may stay pending). | Pitch §13 + owner clarification 27 Oct. | US or estate claim on a specific study → pull that slug from Pages until cleared. |
| **D-33 Neoplastix marque** | Visitor product = **Neoplastix** (canonical `https://neoplastix.crea-comm.net`; live = github.io until cutover). Programme/repo remain **Mondrian Project** / `ruvebal/mondrian-project` this AY. Athanor slug `mondrian-project` unchanged. Vanity `.io`/`.art` deferred. | Owner §9 locks 9 Nov 2026; D4 amended same day. | DNS/host cutover or `@neoplastix` scope wait on human / Wave A. |
| **D-34 Style tokens** | Barrel `packages/tokens/` (+ `form.css`); type roles Architype Van Doesburg / Futura / Neue Haas Grotesk / Univers; chrome `--nx-radius-chrome: 0`; painting fills stay D-07. Seat 7 owns preview. | Typography report + 1920 imprint grounding (FIRST-SOURCES §6.3–6.4). | Foundry license before claiming Architype webfont live. |
| **D-35 Favicon + Canvas 2.5D** | Canonical `brand/mark.svg`; deterministic favicon family; `@mondrian/mark-canvas` (parse SVG rects); landing field + foveal mark; `setCameraPaused` coordination. | canvas-25d-content-hero skill · token palette. | Tune amplitudes only; do not redraw mark geometry. |

**Decision status (27 Oct 2026 — owner amend):** D-32 **`adopted`**. Evidence: [`DECISIONS/D32-2026-10-27-SVG-STUDY-NOT-PHOTO.md`](DECISIONS/D32-2026-10-27-SVG-STUDY-NOT-PHOTO.md). Product repo already exists (`ruvebal/mondrian-project`); keep cascade docs in sync there.

**Decision status (9 Nov 2026 — owner):** D-33 **`adopted`**. Evidence: [`DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md`](DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md).

**Decision status (10 Nov 2026 — owner):** D-34 **`adopted`**. Evidence: [`DECISIONS/D34-2026-11-10-STYLE-TOKEN-TYPOGRAPHY.md`](DECISIONS/D34-2026-11-10-STYLE-TOKEN-TYPOGRAPHY.md) · [`../../style/TOKEN-SYSTEM.md`](../../style/TOKEN-SYSTEM.md).

**Decision status (10 Nov 2026 — owner):** D-35 **`adopted`**. Evidence: [`DECISIONS/D35-2026-11-10-FAVICON-CANVAS-25D.md`](DECISIONS/D35-2026-11-10-FAVICON-CANVAS-25D.md).

---

## 2. Programme (do not invert)

| Step | File | Deliverable | Gate (first word is the status token) |
| --- | --- | --- | --- |
| 0 | [PHASE-M0.md](PHASE-M0.md) | D-01…D-20 decided; Ahmes→Athanor grounding receipt (Andrzejewski **and** voice corpus under Athanor `mondrian-project` — see [`grounding/CORPUS-OVERNIGHT.md`](grounding/CORPUS-OVERNIGHT.md)); toolchain probes; private institutional communications; reference works + rights | **DONE** — [`PHASE-M0-REPORT.md`](PHASE-M0-REPORT.md); cold review triage F1–F6 closed; owner flip 27 Oct 2026 |
| — | [WORK-QUEUE.md](WORK-QUEUE.md) | Parallel non-blocking items (Q-FA1…Q-FA4 **DONE**). Does not invert M0–M9. | Item-local gates only |
| 1 | [PHASE-M1.md](PHASE-M1.md) | Repository from `git init`: monorepo, Astro 7 + `@astrojs/svelte` probe, `packages/editor` stub, CI/Pages, Git/PR contract with D-25 CODEOWNERS, cascade move | **DONE** — Pages 200; CI green; probe hydrates; no public island; `main` protected; F1–F3 triage closed; [`PHASE-M1-REPORT.md`](PHASE-M1-REPORT.md) · [`PHASE-M1-COLD-REVIEW.md`](PHASE-M1-COLD-REVIEW.md) |
| 2 | [PHASE-M2.md](PHASE-M2.md) | Andrzejewski-compatible `Work` primitives; render plan serialising to SVG **and** CSS Grid; `SurfaceSpec`/`CompositionState`/`Recipe` including `variationId`; catalog generator; measured reference; conformance | **DONE** — [`PHASE-M2-REPORT.md`](PHASE-M2-REPORT.md); cold FAIL F1–F5 triage closed; owner flip 8 Nov 2026 |
| 3 | [PHASE-M3.md](PHASE-M3.md) | Product shell: start, gallery CSS Grid miniatures, About scroll story, About Us, method; **no** Svelte island on these routes | **DONE (scaffold)** — PR #5; Wave A polish student-owned; [`PHASE-M3-REPORT.md`](PHASE-M3-REPORT.md) |
| 4 | [PHASE-M4.md](PHASE-M4.md) | Classical analyzer: image → normalized points, rectangles and explicit lines in `work.yml`; evaluation; TensorFlow only as extension | **OPEN** — CLI scaffold; seat 1 implements ([`PHASE-M4-SCAFFOLD.md`](PHASE-M4-SCAFFOLD.md)) |
| 5 | [PHASE-M5.md](PHASE-M5.md) | FastAPI analysis service: source JSON, derived HTML/CSS **and SVG** preview, `/analyze`; semantic snapshot against Astro; **no** public runtime calls | BLOCKED (M4 for `/analyze`) — source primitives and derived plan equal Astro; public build has no API dependency; Playwright later asserts no Pages→API fetch |
| 6 | [PHASE-M6.md](PHASE-M6.md) | MVP Svelte+SVG editor: texture + format chips (D-31 maximise) + liquid-fill + corners + variations + URL/print | **READY** — shell scaffold DONE; seat 6 owns island (create placeholder already on Pages) |
| 7 | [PHASE-M7.md](PHASE-M7.md) | Kiosk + PWA: offline, wake, attract/idle, QR state handoff, real touch-device run | BLOCKED — offline reload; idle reset; QR recovers identical state on phone; device/date recorded |
| 8 | [PHASE-M8.md](PHASE-M8.md) | **Parallel lane from M2:** two remaining references + one measured work per student, `MEASUREMENT.md` each, rights rows, peer-reviewed PRs | **OPEN** — CORPUS.md + issue seeds; cohort measures ([`PHASE-M8-SCAFFOLD.md`](PHASE-M8-SCAFFOLD.md)) |
| 9 | [PHASE-M9.md](PHASE-M9.md) | Declaration, custody, defence, brief EN+ES, dataset, grounded synthesis and congress abstract | BLOCKED (M7 + M8) — shipped-product transcript exists; brief bilingual; pseudonymisation passes; synthesis cites evaluator-safe Ahmes nodes only |

**Parallel lanes.** M8 (corpus) runs from the moment M2 closes, alongside M3–M7, because measuring does not depend on rendering. M4–M5 (Python lane) may run alongside M3 and M6 once M2 is DONE, because the schema is frozen there. Everything else is strictly ordered. Only one phase per lane is IN_PROGRESS at a time.

**Calendar hooks (FE I 2026–27 session order, not dates):** M0–M1 before S9
(modules). M2 at S9. M3 across S10–S12 (linting and trends). **GSAP is
absorbed for `/about/` parallax only** (D-29 / D-06 / D-18) — S11 evidence
inside the integrator; no GSAP on editor/kiosk/gallery. Bootstrap and Tailwind
remain *not* absorbed (no S1–S13 product row). The Svelte island is taught by
the M1 starter (Editor lane), not by a new FE I session — same honesty as
Astro. M6 recalls S5's container queries for chrome, not for stretching the
painting. M7 follows S12. M8 is continuous. Defence is S13.

---

## 3. Master paste (start / resume)

```text
Implement the Mondrian Project cascade per docs/DEV_PLAN/MONDRIAN/MONDRIAN-CASCADE.md
in the product repo (ruvebal/mondrian-project). Forge INDEX is a pointer only.

## Context
- Product/why: MONDRIAN-RATIONALE.md. Origin: PITCH.md (amended by cascade §7).
- Product contract: MVP-PRODUCT-SPEC.md. It wins if an older game description differs.
- Stack/MVP amend: DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md.
- Evidence: INDEX.md "Live snapshot" + PHASE-M0-REPORT.md once it exists;
  grounding/CORPUS-OVERNIGHT.md (voice corpus DONE); grounding/ABOUT-MONDRIAN-VALUE.md
  (primary About anchors); grounding/GRAPHRAG-PHASE-QUERIES.md; WORK-QUEUE.md for
  parallel visual work.
- Skills to read, read-only: ~/src/.cursor/skills/cascade-forge/SKILL.md;
  frontend-pedagogy/AI-EVIDENCE-HARNESS.md for any citation that reaches a public page;
  for Q-FA1 also fractal-architect + visual-forger.
- Out of scope: the student-facing brief (M9 schedules it; nobody writes it earlier); React;
  Svelte outside packages/editor and the create/kiosk islands; XYFlow / Interact.js;
  internal node/edge dragging; FastAPI as a Pages runtime; Python endpoints inside Astro;
  a database; user accounts; museum photographs in the repository; live camera
  analysis; a neural quality/authenticity score; public visitor galleries; generating
  fake Mondrian compositions; changing web-atelier-udit lesson pages; naming private
  LAN hosts in institutional text.

## Programme
Execute the next incomplete phase only, in order M0 → M9, honouring the two parallel lanes in §2.
After each phase: VERIFYING (full suite of every touched package) → cold subprocess review →
PHASE-Mn-COLD-REVIEW.md → triage/amend → PHASE-Mn-REPORT.md. Do not start M(n+1) until Mn is DONE.
The implementer must not self-certify DONE.

## Hard constraints
- No cloud AI SDKs anywhere (openai, anthropic, langchain_openai are forbidden imports); local inference only.
- Numbers come from a named measurement or from the analyzer with provenance. No invented proportions,
  not even in fixtures: the "broken" fixture is the valid fixture with one bound corrupted.
- `work.schema.json` is the single source contract and Ajv executes it; zod and
  pydantic mirror it, while JS/Python semantic checks share error paths. JS and
  Python derivations must produce the same canonical render plan. A change to
  the contract, either mirror/checker, either derivation or fixtures lands in
  one PR.
- CSS does the colour; JS writes --theta. Non-colours never rotate.
- `work.yml` is immutable. Visitor edits live in `CompositionState`; portable
  URLs/exports contain the complete `Recipe`, including `SurfaceSpec` and `variationId`.
- The live editor is a Svelte island drawing inline SVG. CSS Grid is gallery/About
  pedagogy from the same plan. Canvas is PNG-only. `packages/matrix` never imports Svelte.
- Preset buttons load build-time catalog files. They do not fetch FastAPI.
- Internal dividers and junctions are not draggable in MVP. Corner-resize is
  free-aspect; the pattern **liquid-fills** the frame (D-30). Relative
  fractions stay; absolute cells adapt. Do not letterbox the painting inside
  the frame.
- Palette inversion is explicit and reversible; never browser `filter: invert()`.
- A frame cannot leave its printable area; print accuracy is claimed only after calibration.
- Every href/src goes through Astro's base-aware helpers; the Pages URL, not localhost, is the acceptance surface.
- No photographs or scans of paintings committed or hotlinked.
- Public site never depends on the LAN API. Astro must not execute Python.
- AI Review Logs distinguish human checks from assistant-run checks; assistants
  may comment but never approve or merge.
- Students resolve their own branch conflicts; do not hide Git learning by
  silently repairing their branches.
- Do not commit unless the human asks; never force-push main.
```

---

## 4. Layer map

| Layer | Store / artefact | Written by | Read by |
| --- | --- | --- | --- |
| **L0 Contract** | `packages/works/schema/work.schema.json`, `packages/matrix/schema/{surface,composition-state,recipe}.schema.json`, fixtures | M2 only (later changes via amend) | Everything |
| **L1 Corpus** | `packages/works/works/<slug>/work.yml`, `MEASUREMENT.md`, `rights` block | M2 (reference 1), M8 (references 2–3 + student works), M4 (analyzer proposals, `method: analyzer`) | Astro collection (M3, M6), catalog generator, API (M5), analyzer evaluation (M4) |
| **L1b Catalog** | `services/web/public/patterns/<id>[--<variation>].{json,svg}` generated by Python at build | M2 generator; CI `pnpm build` | Editor island (M6), PWA cache (M7); never hand-edited |
| **L2 Geometry/state core** | `packages/matrix/src/{validate,derive-render-plan,derive-visible-cells,render-grid,render-svg,vary,state,hue,export-svg,export-png,print}.js` plus Python `mondrian_work_schema/{derive,vary,catalog}.py` | M2/M6 | M3, M6, M7; M5 semantic snapshot |
| **L2b Editor island** | `packages/editor` (Svelte 5, SVG canvas, Pointer Events on frame handles) | M1 stub, M6 | `services/web` create/kiosk pages |
| **L3 Site** | `services/web` (Astro 7 + `@astrojs/svelte`) → `dist/` → GitHub Pages | M1 skeleton, M3, M6, M7, M9 | Visitors, kiosk |
| **L4 Analyzer** | `packages/analyzer` (Python), `evaluation/REPORT.md` | M4 | M5, M8 (as a measuring aid), research |
| **L5 API** | `services/api` (FastAPI) on LAN host | M5 | Developers, analyzer clients, semantic conformance tests; never the public/kiosk runtime |
| **L6 Process** | `docs/plans/<handle>/`, `docs/declarations/`, `docs/DEV_PLAN/MONDRIAN/`, custody file (outside git) | Every phase; M9 | Defence, research (after pseudonymisation) |
| **L7 Research grounding** | Forge-pack `grounding/` (Andrzejewski receipt, CORPUS-OVERNIGHT, GraphRAG query bank, About value); Ahmes vaults under `~/ahmes-library/scholar/`; Athanor project slug **`mondrian-project`** (voice / math / method) plus **`profield-frontend-pedagogy`** (Andrzejewski geometry only) | Overnight corpus + M0 cite gates; Q-FA1 for tree-mode visuals | M0/M3/M9 prose; WORK-QUEUE visuals; never student HTML IDs |

A phase that writes to a layer it is not listed for is out of order. L0 changes after M2 go through amend-on-surprise and touch L1 fixtures and L2/L5 validators in the same PR. L7 discoveries are never citations until Ahmes `--require-evaluator-safe`.

---

## 5. Closing protocol

`BLOCKED → READY → IN_PROGRESS → VERIFYING → COLD_REVIEW → DONE` (with `PARTIAL` allowed in reports for long lanes M4 and M8).

- **VERIFYING** means: the phase's own tests *and* `pnpm -r test`, `pnpm -r build`, `uv run pytest` across the repo are green; every touched module imports; Astro builds with zero warnings.
- **Cold review**: a fresh session (Cursor Task `generalPurpose`, or the studio `cascade-cold-reviewer` subagent) that did not implement the phase, receiving only the runbook Acceptance, the diff, the suite transcript and §3's hard constraints. Output `PHASE-Mn-COLD-REVIEW.md` with `Fn` findings (severity, blocks DONE?, evidence, fix). Zero findings is still a filed document.
- **Amend on surprise**: if a finding invalidates a downstream assumption (e.g. relative colour syntax missing on the kiosk device, Astro base-path behaviour, TensorFlow wheel availability), amend this orchestrator and every downstream `PHASE-M*.md` in the **same commit** as the report, and write "cascade amended: <paths>" in the report.
- **Report**: `PHASE-Mn-REPORT.md`, status first, commands with exit codes, no hedge words.

## 6. Resume rule (one branch per status)

- **DONE** → skip to the next pending phase in the same lane.
- **PARTIAL** (M4 evaluation incomplete, M8 fewer works than students) → finish the listed remainder before advancing that lane; other lanes may continue.
- **IN_PROGRESS** → do not restart. If a long job is running (analyzer evaluation sweep, Lighthouse CI), wait or check its checkpoint; do not advance past it in the same lane. Independent lanes (M8 vs M3–M7) may proceed.
- **VERIFYING** → run the full suites named in §5, then hand off to cold review. Do not open the next phase.
- **COLD_REVIEW** → wait for `PHASE-Mn-COLD-REVIEW.md`; triage; fix blocking findings (back to IN_PROGRESS) or defer with a decision record; file the report; flip to DONE.
- **BLOCKED** → resolve the named blocker (a D-row not ratified, a letter unanswered, a device unavailable). Teaching work that does not depend on the blocker continues; research use never does.
- **READY** → open the phase: paste `PHASE-Mn.md` into a fresh session.

---

## 7. Amendments to PITCH.md (recorded, not edited into the pitch)

The pitch stays as the 22 Oct record. The cascade changes these points; the pitch's header now points here.

| Pitch § | Was | Now | Reason |
| --- | --- | --- | --- |
| §4 item 6, §9 Process notes, §12 | `plans/` excluded from Jekyll | `docs/plans/<handle>/` in the monorepo | D-13 |
| §9 Generator, §10 Scaffold | Jekyll via `github-pages` gem, Liquid, `_data`, `_includes` | Astro 7 static, content collections, `.astro` layouts/components | D-02 |
| §9 Painting logic | Vanilla ES modules, no bundler | Vanilla ES modules in `packages/matrix` (still); Svelte island in `packages/editor` consumes them; Astro's Vite bundles at build | D-02, D-21 |
| §7 Hue | JS computes `hsl()` fills | CSS relative colour syntax; JS writes `--theta` | D-07 |
| §8 Responsive | SVG-only study | Containing frame on a physical/digital surface; **SVG is the live editor**; CSS Grid remains gallery/About pedagogy from the same plan | D-08, D-16, D-22 |
| §6 Matrix | Dense `role[][]` plus boundary vectors; black cells stand for lines | Andrzejewski-compatible points, coloured rectangles and explicit black lines are canonical; a dense visible-cell plan is derived only for validation/statistics; SVG and CSS Grid both consume the same overlapping plane/line items | D-05, D-22 |
| §4 / §11 game | Hue slider and “find the frame” | Full editor in `MVP-PRODUCT-SPEC.md`: surfaces, free-aspect liquid-fill frame, catalog variations, hue/line-weight, save and calibrated print. **No internal node dragging in MVP** | D-16, D-17, D-24, D-30 |
| — | No client UI framework | Svelte 5 island on editor routes only; matrix stays vanilla | D-21 |
| — | Letterbox original inside a new frame | **`liquid-fill` is MVP** (D-30); fraction-rewriting `refit` solver remains Phase 2 | D-22, D-24, D-30 |
| — | FastAPI behind interactive buttons | Build-time catalog; FastAPI is LAN analysis; generate is Phase-2 last | D-09, D-23, D-26 |
| — | Full HTML+SVG inside QR | Recipe-URL QR + downloadable HTML/SVG | D-17, D-26 |
| §9 Tests | Browser-console assertion page | Vitest in `packages/matrix`, pytest in Python, Playwright in `services/web`, three-way conformance | D-05 |
| §14 risk 44 | "One repository per student" | Cohort monorepo with authorship kept legible | D-01 |
| §15 item 2 (Jekyll slot) | Open | Closed: Astro components are taught inside M1/M3 by the starter; no Liquid | D-02 |
| §2 last row | Jekyll gap | Astro gap — smaller (HTML-with-expressions), still not in any S1–S13 session; starter carries it | D-02 |
| — | No motion decision | No Framer Motion; **GSAP ScrollTrigger parallax on `/about/`** (D-29); reduced-motion / no-JS complete | D-18, D-29 |

Everything else in the pitch — the hue formula (§7), the frame-fit CSS (§8),
the art-historical contract (§5), the exclusions, the rights checklist (§13)
and the risk register (§14) — stands and is referenced, not repeated. Pitch §6
is superseded by D-05 and M2.

---

## 8. Target repository layout (what M1 creates)

```text
mondrian-project/
├── AGENTS.md                       # agent contract (studio format); CLAUDE.md redirects here
├── README.md                       # index: what, live URL, How to contribute, lanes, licences, declaration
├── CONTRIBUTING.md                 # lanes, branches, PR template rules, measurement checklist
├── CODEOWNERS
├── LICENSE-CODE  LICENSE-CONTENT
├── pnpm-workspace.yaml  package.json  .npmrc   # engines.node >=24.22.1; engine-strict (D-28)
├── .nvmrc                          # 24.22.1
├── pyproject.toml                  # uv workspace root; requires-python = "==3.12.*"
├── .python-version                 # 3.12
├── .github/
│   ├── workflows/{ci.yml, deploy-pages.yml}
│   ├── CODEOWNERS → ../CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md    # plan link · declaration delta · measurement source
│   └── ISSUE_TEMPLATE/{task.yml, measurement.yml, bug.yml}
├── packages/
│   ├── works/                      # L0 + L1: data/schema plus python/ (derive, vary, catalog)
│   ├── matrix/                     # L2: vanilla ESM + vitest — no Svelte import
│   ├── editor/                     # L2b: Svelte 5 island (SVG canvas, frame handles)
│   └── analyzer/                   # L4: Python (uv member), CLI `mondrian-analyzer`, evaluation/
├── services/
│   ├── web/                        # L3: Astro 7 + @astrojs/svelte — pages, layouts, public/patterns/
│   └── api/                        # L5: FastAPI (uv member), LAN only, never Pages runtime
├── docs/
│   ├── DEV_PLAN/MONDRIAN/          # this cascade, moved here at M1
│   ├── plans/<handle>/             # D-13
│   ├── declarations/<handle>.md
│   ├── research/                   # notices, abstract drafts, pseudonymisation protocol (no data)
│   └── runbooks/{kiosk-device.md, lan-api.md}
└── scripts/                        # conformance.sh, pseudonymise.py, qr.py
```
