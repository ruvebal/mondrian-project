<!--
Mondrian Project — cascade pack index (two faces: product owner / technical director).
Author: Rubén Vega Balbás, PhD · 25 October 2026 · amended 27 October 2026
  (D-21…D-32; M0 DONE; M1 DONE; M2 DONE 8 Nov 2026).
  Amended 28 October 2026: flag quote 1920 + teach-next.
Canonical home: product repo docs/DEV_PLAN/MONDRIAN/ (moved at M1).
Forge pointer: web-atelier-udit/frontend-pedagogy/forge/mondrian-project/INDEX.md
-->

# The Mondrian Project — cascade pack

**Status:** ACTIVE cascade (M0–M9). Adopted 25 Oct 2026 as the Front-End I 2026–27 semester-1 integrator. This is **not** the student brief (M9 writes it, EN + ES, last) and **not** a course page (nothing here is published by `web-foundations`).
**Author:** Rubén Vega Balbás, PhD · `ruvebal@crea-comm.net`
**Readers:** department / research group / instructor → rationale first; implementing agent → cascade second.
**Canonical path:** `~/projects/ruvebal/scholar/udit/courses-repos/mondrian-project/docs/DEV_PLAN/MONDRIAN/` · remote `ruvebal/mondrian-project`.

## Flag quote (board / About)

> **La Plastique nouvelle met ses rapports en équilibre esthétique et exprime par là l'harmonie nouvelle.**
>
> — *Le Néoplasticisme*. Paris: Éditions de l'Effort Moderne (Léonce Rosenberg), 1920.

Full anchor + expansion: [`grounding/FLAG-QUOTE-1920.md`](grounding/FLAG-QUOTE-1920.md) · imprint lock: [`grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md`](grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md).

## Teach next (29 Oct 2026 class)

| | |
| --- | --- |
| **Open with** | Flag quote on the board (French) + imprint · one sentence: *rapports* = the ratios the app liquid-fills |
| **Programme step** | **M3 scaffold DONE** — Wave A seats polish shell; M4/M8 OPEN for cohort |
| **Product marque** | **Neoplastix** ([D-33](DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md)) · programme remains Mondrian Project · canonical `https://neoplastix.crea-comm.net` (live = github.io until cutover) |
| **Do not start** | Instructor agent finishing seat-graded analyzer/measurements; do not invent `(Mondrian 1920)` author-date |
| **Live demo** | https://ruvebal.github.io/mondrian-project/ (legacy path; Neoplastix chrome) · seats on [`TEAM-ASSIGNMENTS.md`](TEAM-ASSIGNMENTS.md) |
| **If time left** | Seat 1–2 skim Andrzejewski grounding; Seat 3 hears flag → About scene spine |

## How to read this pack

| Face | File | Question it answers |
| --- | --- | --- |
| Product owner | [`MONDRIAN-RATIONALE.md`](MONDRIAN-RATIONALE.md) | Why this project, for whom it is worth what, the sitemap from the visitor's side, kiosk vs handheld, why the Python lane is front-end work, how the cohort is organised, what the ethics position requires. |
| Product contract | [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md) | Exact user journey, liquid-fill free-aspect frame (D-30), catalog variations, SVG editor, export/print, MVP acceptance. Wins over older game descriptions. |
| Stack / MVP amend | [`DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md`](DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md) | Canonical blend of the 27 Oct thread: Astro host, Svelte island, SVG canvas, build-time Python catalog, Addendum B (no node dragging, no runtime FastAPI), cohort git surfaces. |
| Export / QR / generative | [`DECISIONS/D26-2026-10-27-EXPORT-QR-GENERATIVE.md`](DECISIONS/D26-2026-10-27-EXPORT-QR-GENERATIVE.md) | Client HTML+SVG download; QR = recipe URL (not HTML-in-QR); FastAPI “Make your own Mondrian” as last Phase-2 feature; token barrel. |
| Print / stickers / URL form | [`DECISIONS/D27-2026-10-27-PRINT-STICKERS-URL-RECIPE.md`](DECISIONS/D27-2026-10-27-PRINT-STICKERS-URL-RECIPE.md) | Sticker-first presets; stage = paper; Print giveaway; query params ≈150 B Recipe (never SVG/JSON work in `?`). |
| Node security pin | [`DECISIONS/D28-2026-10-27-NODE-SECURITY-PIN.md`](DECISIONS/D28-2026-10-27-NODE-SECURITY-PIN.md) | **Node ≥24.22.1** (Oct 2026 CVEs); `.nvmrc` / `engines` / CI; no EOL ≤20. |
| About GSAP parallax | [`DECISIONS/D29-2026-10-27-ABOUT-GSAP-PARALLAX.md`](DECISIONS/D29-2026-10-27-ABOUT-GSAP-PARALLAX.md) | `/about/` ScrollTrigger parallax (S11); reduced-motion kill; no GSAP on editor/kiosk. |
| Liquid frame refactor | [`DECISIONS/D30-2026-10-27-LIQUID-FRAME-REFACTOR.md`](DECISIONS/D30-2026-10-27-LIQUID-FRAME-REFACTOR.md) | Free-aspect corners; pattern **liquid-fills** the frame (same fractions → new Mondrian). Supersedes preserve-ratio MVP. |
| Format aspect presets | [`DECISIONS/D31-2026-10-27-FORMAT-ASPECT-PRESETS.md`](DECISIONS/D31-2026-10-27-FORMAT-ASPECT-PRESETS.md) | Aspect chips + maximise-in-paper; game = texture → format → variations → version. |
| SVG study ≠ photo | [`DECISIONS/D32-2026-10-27-SVG-STUDY-NOT-PHOTO.md`](DECISIONS/D32-2026-10-27-SVG-STUDY-NOT-PHOTO.md) | Distributed artefact = measured SVG study, not museum photo; composition rights still per-work. |
| Neoplastix marque | [`DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md`](DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md) | Visitor product = Neoplastix; programme/repo stay Mondrian Project this AY; Athanor slug unchanged. |
| Style tokens | [`DECISIONS/D34-2026-11-10-STYLE-TOKEN-TYPOGRAPHY.md`](DECISIONS/D34-2026-11-10-STYLE-TOKEN-TYPOGRAPHY.md) · [`../../style/TOKEN-SYSTEM.md`](../../style/TOKEN-SYSTEM.md) · [`../../style/De_Stijl_Typography_Report.md`](../../style/De_Stijl_Typography_Report.md) · [`../../style/OPEN-TYPE-ALTERNATIVES.md`](../../style/OPEN-TYPE-ALTERNATIVES.md) | Barrel `packages/tokens/`; Van Doesburg / Futura / Neue Haas / Univers; OFL classroom stacks; form radius 0; Seat 7 preview. |
| Favicon + Canvas 2.5D | [`DECISIONS/D35-2026-11-10-FAVICON-CANVAS-25D.md`](DECISIONS/D35-2026-11-10-FAVICON-CANVAS-25D.md) | Canonical `brand/mark.svg`; favicon family; `@mondrian/mark-canvas`; landing hero field + foveal mark. |
| Cohort seats | [`TEAM-ASSIGNMENTS.md`](TEAM-ASSIGNMENTS.md) · [`STUDENT-ASSIGNMENT-LIST.md`](STUDENT-ASSIGNMENT-LIST.md) · [`ISSUE-SEEDS.md`](ISSUE-SEEDS.md) | Seats 1–7; waves; paste-ready issue titles. |
| Technical director | [`MONDRIAN-CASCADE.md`](MONDRIAN-CASCADE.md) | D-01…D-32, ordered programme with falsifiable gates, master paste, hard constraints, layer map, closing protocol, resume rule, amendments to the pitch, repository layout. |
| Private correspondence | `_private/` (gitignored; forge only) | Student preflight and department/ECSIT emails. Only status/dates enter tracked reports; addresses, replies and signed material remain private. |
| Grounding | [`FLAG-QUOTE-1920`](grounding/FLAG-QUOTE-1920.md) · [`FIRST-SOURCES-1920`](grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md) · [`ANDRZEJEWSKI-2010`](grounding/ANDRZEJEWSKI-2010.md) · [`JSON`](grounding/ANDRZEJEWSKI-2010.json) · [`prior-art`](grounding/PRIOR-ART-DISCOVERY.md) · [`corpus overnight`](grounding/CORPUS-OVERNIGHT.md) · [`GraphRAG queries`](grounding/GRAPHRAG-PHASE-QUERIES.md) · [`About value`](grounding/ABOUT-MONDRIAN-VALUE.md) | Flag quote + 1920 imprint; Andrzejewski geometry; overnight voice corpus under Athanor slug `mondrian-project`. |
| Origin | [`PITCH.md`](PITCH.md) | The 22 Oct decision document: matrix, hue formula, frame contract, art-historical contract, rights, 50 risks. Still authoritative where the cascade §7 does not amend it. |
| AI grading sufficiency | [`AI-EVALUATION-SUFFICIENCY-REVIEW.md`](AI-EVALUATION-SUFFICIENCY-REVIEW.md) | Instructor-only: spine vs operational gaps vs TTOD close-out; what to add before M1 templates freeze. |
| AI operating contract | [`AI-CRITICAL-OPERATING-ADDENDUM.md`](AI-CRITICAL-OPERATING-ADDENDUM.md) | Required PR log, human/assistant verification boundary, formative checkpoint and instructor signs; shared rubric remains the only summative instrument. |
| Git / contribution sufficiency | [`GIT-HYGIENE-AND-CONTRIBUTION-SUFFICIENCY-REVIEW.md`](GIT-HYGIENE-AND-CONTRIBUTION-SUFFICIENCY-REVIEW.md) | Instructor-only: port TTOD Git hygiene + PR-review automation; rewrite CONTRIBUTING from student M1 feedback. |
| Parallel work queue | [`WORK-QUEUE.md`](WORK-QUEUE.md) | Non-blocking items (Q-FA1…Q-FA4 DONE). Visual kits remain under forge `assets/` — not product chrome. |
| Phases | [M0](PHASE-M0.md) preflight · [M1](PHASE-M1.md) `git init` → Pages + Svelte probe · [M2](PHASE-M2.md) contracts + catalog · [M3](PHASE-M3.md) shell/story · [M4](PHASE-M4.md) analyzer · [M5](PHASE-M5.md) LAN API · [M6](PHASE-M6.md) Svelte+SVG editor · [M7](PHASE-M7.md) kiosk · [M8](PHASE-M8.md) corpus (parallel) · [M9](PHASE-M9.md) research + brief | One paste-ready runbook each. Do not invert. |

Closing: each phase → VERIFYING → `PHASE-Mn-COLD-REVIEW.md` → amend if needed → `PHASE-Mn-REPORT.md` → DONE. The implementer never self-certifies.

**Pre-M1 scaffold** lived in the forge (`frontend-pedagogy/forge/mondrian-project/scaffold/`). At M1 it was copied into `packages/tokens/`, `packages/matrix/export/`, `.nvmrc`, and CODEOWNERS — there is no `scaffold/` directory in this product repo.

## One-sentence claims

- **Product:** a kiosk-first and handheld editor where a measured Mondrian
  composition starts at its native aspect, then the containing frame is
  corner-resized (free aspect) so the pattern **liquid-fills** the frame
  (D-30); format chips maximise in paper (D-31); predefined variations apply;
  and the visitor saves SVG/HTML/CSV/PNG and prints—every source number
  preserved and every visitor change reproducible, offline, with no server.
- **Engineering:** immutable work data plus separate surface/state contracts;
  vanilla ESM + zod/pydantic conformance; Svelte island draws live SVG; CSS Grid
  remains gallery/About pedagogy from the same plan; Python catalog at build;
  FastAPI is LAN analysis (M5) and Phase-2 generative last; Astro 7 static/offline Pages app.

## Programme snapshot

| Step | Deliverable | Status |
| --- | --- | --- |
| M0 | Decisions ratified, probes, private communications, reference works + rights | **DONE** (27 Oct 2026 — owner flip after F1–F6 triage) |
| M1 | Repo from `git init`, Astro 7 + Svelte probe, `packages/editor`, CI/Pages, Git/PR/AI contract (D-25 CODEOWNERS) | **DONE** (27 Oct 2026 — cold FAIL F1–F3 triage closed; owner flip) |
| M2 | Andrzejewski primitives, SVG+Grid render plan, catalog generator, surface/state/`variationId`, conformance, reference work | **DONE** (8 Nov 2026 — [`REPORT`](PHASE-M2-REPORT.md) · [`COLD`](PHASE-M2-COLD-REVIEW.md)) |
| M3 | Product shell, gallery CSS Grid miniatures, About story/About Us/method | **DONE (scaffold)** 9 Nov 2026 — Wave A polish = seats 3–5/7 |
| M4 | Classical analyzer + line weights + evaluation (Python lane) | **OPEN** scaffold ([`PHASE-M4-SCAFFOLD`](PHASE-M4-SCAFFOLD.md)) |
| M5 | API JSON + HTML/CSS and SVG preview; no public runtime calls | BLOCKED (M4 for `/analyze`) |
| M6 | Svelte+SVG editor: frame, catalog variations, export, calibrated print | **READY** (shell scaffold DONE; seat 6) |
| M7 | Kiosk/PWA + QR handoff + real touch device | BLOCKED (M6) |
| M8 | Corpus: references 2–3 + one work per student (parallel lane) | **OPEN** scaffold ([`PHASE-M8-SCAFFOLD`](PHASE-M8-SCAFFOLD.md)) |
| M9 | Declaration, pseudonymisation, defence, brief EN/ES, dataset, abstract | BLOCKED (M7, M8) |

## Trigger readiness (28 Oct 2026 — evening; teach 29 Oct)

| Gate | State |
| --- | --- |
| Decisions D-01…D-32 | Adopted / ratified (through D-32 SVG study ≠ photo) |
| Product contract | [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md) matches Addendum B + D-26…D-32 |
| Flag quote 1920 | **LOCKED** — [`grounding/FLAG-QUOTE-1920.md`](grounding/FLAG-QUOTE-1920.md) |
| First source imprint | *Le Néoplasticisme* Effort Moderne 1920 — [`FIRST-SOURCES-1920`](grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md) |
| Student seats + task specs | [`TEAM-ASSIGNMENTS.md`](TEAM-ASSIGNMENTS.md) — all 7 seats filled (5–7 random 29 Oct; reorder OK) |
| Product repo | **Exists** — `ruvebal/mondrian-project`; cascade lives here |
| Live Pages | https://ruvebal.github.io/mondrian-project/ → **200** |
| M0 | **DONE** |
| M1 | **DONE** — `main` protected; F1–F3 closed; letters remain ops (non-blocking) |
| M2 | **DONE** — cold FAIL F1–F5 triage closed; M3 READY |

## Live snapshot (27 Oct 2026 — M0 DONE; M1 DONE)

| Fact | Value | Where checked |
| --- | --- | --- |
| Product branch | `main` @ `620f00a` (PR #1 M1 close) | `git log -1`, 27 Oct 2026 |
| Product remote | `git@github.com:ruvebal/mondrian-project.git` | `git remote -v` |
| Pages home / contribute | **200** / **200** | `curl -sI` https://ruvebal.github.io/mondrian-project/{,/contribute/} |
| Pages wrong path | **404** | `curl` `/this-path-does-not-exist` |
| Favicon (D-base) | **200** at `/mondrian-project/favicon.svg` (glued path 404) | live curl after PR #1 deploy |
| Svelte probe URL | `/probe/svelte/` (noindex; amend from spec `/_probe/`) | live 200; dist greps |
| Public `/` island | **none** (no Probe / `client:load`) | dist `index.html` / `contribute/` |
| Branch protection | **on** — ≥1 PR review + required check `check` (strict) | `gh api …/branches/main/protection`, 27 Oct 2026 evening |
| Collaborators | `ruvebal` only (students not yet added) | `gh api …/collaborators` |
| Node / pnpm / Python (system) | **v24.22.1** (nvm; D-28) / 10.30.0 / 3.14.7 | `node -v` 27 Oct 2026 |
| Python via uv (product pin) | **3.12.15** | `uv run --python 3.12` |
| `uv` installed | **yes: 0.13.5** | `uv --version` |
| CI | green on latest `main` push (Node **24.22.1**) | `gh run list` 27 Oct |
| Astro / Svelte | Astro 7 + `@astrojs/svelte` in `services/web` | package.json / probe |
| Andrzejewski paper grounding | 118 nodes; Athanor injection complete; evaluator-safe cites | [`grounding/ANDRZEJEWSKI-2010.md`](grounding/ANDRZEJEWSKI-2010.md) |
| Bibliographic gate | DOI `10.1117/12.840558`; evaluator_safe | Ahmes + Crossref |
| Remaining grounding limit | DevIAC GraphRAG cannot see `scholar` under current vault root | fail-closed receipt |
| Keyboard Lock | Chrome/Edge only; Firefox/Safari false | MDN BCD + M0 report §4 |
| Mondrian voice corpus overnight | **DONE** | [`grounding/CORPUS-OVERNIGHT.md`](grounding/CORPUS-OVERNIGHT.md) |
| Q-FA1…Q-FA4 | **DONE** (forge assets; trees ≠ MVP corpus) | forge `WORK-QUEUE.md` / `assets/` |
| D-21…D-32 | **adopted** 27 Oct 2026 | [`DECISIONS/`](DECISIONS/) |
| `svelte` / `@astrojs/svelte` (npm view) | **5.57.3** / **9.1.1** | 27 Oct 2026 |
| FE I session table | S1–S13; GSAP S11 absorbed for `/about/` only (D-29); no Bootstrap/Tailwind/Vite in product | track index + D-06 |
| Shared defence rubric | v2.0.3, frozen 2026-09-01 | web-foundations evaluation |

## Where things live (post-M1 move)

| Surface | Location |
| --- | --- |
| Canonical cascade | **This folder** — product repo `docs/DEV_PLAN/MONDRIAN/` |
| Forge pointer | `web-atelier-udit/frontend-pedagogy/forge/mondrian-project/INDEX.md` (+ `PITCH.md`, `scaffold/`, `assets/`, `_private/`) |
| `_private/` correspondence | Forge only (gitignored); never in the public product repo |
| Student brief | Product `docs/brief/` **and** `web-foundations` S13 lesson — **M9 only** |
