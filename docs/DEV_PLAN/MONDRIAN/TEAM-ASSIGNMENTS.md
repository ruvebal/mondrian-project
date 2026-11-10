<!--
Mondrian Project — seven-seat cohort map and student task specs (not the product brief).
Author: Rubén Vega Balbás, PhD · 27 October 2026
Handles are assigned in M0/M1; this file is the lane contract.
Amended 29 Oct 2026: seats 5–7 random draw (reorder later if needed).
-->

# Team assignments — cohort of 7

**Product marque:** Neoplastix · **Programme:** Mondrian Project · [`D-33`](DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md)  
**Product contract:** [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md)  
**Stack amend:** [`DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md`](DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md)  
**Export / QR / generative:** [`DECISIONS/D26-2026-10-27-EXPORT-QR-GENERATIVE.md`](DECISIONS/D26-2026-10-27-EXPORT-QR-GENERATIVE.md)  
**Scaffold (pre-repo code):** [`scaffold/`](scaffold/)

Everyone measures one work (M8), writes plans under `docs/plans/<handle>/`,
keeps an AI ACCEPT/REJECT log on assisted PRs, and defends one bound in M9.
Seats below are **path ownership**, not “you only touch that folder.”

### Handles (sow-tonight cohort → Mondrian seats)

Seats **1–4** assigned 27 Oct 2026; seats **5–7** random shuffle 29 Oct 2026
from `~/src/web-qa-toolkit/cohorts/sow-tonight/cohort.json`. Reorder later if
needed — this draw is provisional, not locked.

| Seat | GitHub handle | Cohort id | Pages (if any) |
| --- | --- | --- | --- |
| **1** Analyzer | [`ATIaas`](https://github.com/ATIaas/Front_end_Outstanding_webs) | 5 | https://atiaas.github.io/Front_end_Outstanding_webs/ |
| **2** API + contract | [`diegomartinezh`](https://github.com/diegomartinezh/FE_Atelier) | 3 | https://diegomartinezh.github.io/FE_Atelier/ |
| **3** About story | [`medinaxd29`](https://github.com/medinaxd29/An-lisis-Dise-o-Web-) | 2 | https://medinaxd29.github.io/An-lisis-Dise-o-Web-/sow/ |
| **4** Gallery & method | [`Yassin-Skirej`](https://github.com/Yassin-Skirej/front-end-1) | 7 | *(empty in cohort.json)* |
| **5** About-us / i18n | [`itzy-4Qunn7`](https://github.com/itzy-4Qunn7/SOW_practica_1) | 6 | https://itzy-4qunn7.github.io/SOW_practica_1/ |
| **6** Editor | [`galarp2005`](https://github.com/galarp2005/Front-End-I) | 1 | https://galarp2005.github.io/Front-End-I/ |
| **7** Export / PWA / tokens | [`PauLAanDReEa-Ai`](https://github.com/PauLAanDReEa-Ai/pagina-web-front-end) | 4 | https://paulaandreea-ai.github.io/pagina-web-front-end/sow/ |

---

## Seat map

| Seat | Track | Lane | Owns | Must not own alone |
| --- | --- | --- | --- | --- |
| **1** | Backend | Analyzer | Classical analyzer, line weights, Python derive/vary, catalog CLI | Svelte UI; Astro story pages |
| **2** | Backend | API + contract | Schema/OpenAPI mirror, JS↔Python conformance, FastAPI LAN (M5), Phase-2 generate | Pages runtime imports of API; Svelte UI |
| **3** | Storytelling | Shell | `/about/` scroll story, scene copy, reduced-motion path | Schema / matrix math |
| **4** | Storytelling | Shell | `/gallery/`, CSS Grid miniatures, `/method/` pedagogy | Editor island internals |
| **5** | Storytelling | Shell | `/about-us/`, `/declaration/`, `/contribute/` prose, ES mirrors, credits | Token forks; analyzer |
| **6** | App UI | Editor | Svelte+SVG editor, frame corner handles, variation UI, undo/reset | Schema PRs without dual review |
| **7** | App UI + Design | Editor / Design | Export HTML/SVG/CSV/PNG, print, PWA/QR recipe URL, **token barrel**, visual QA | Unilateral geometry edits |

**Shared dual-review (seats 1–2 ∩ 6–7):** `packages/works/schema/`, `packages/matrix/`.

---

## Task specs (student-facing; professor ships starter, students complete)

### Seat 1 — Analyzer & catalog (Backend)

**Deliverables (phases):** M2 catalog emission · M4 analyzer · M8 measured work.

| ID | Spec (what “done” means) | Phase |
| --- | --- | --- |
| B1-T1 | Implement `derive_render_plan` in Python identical to JS fixtures (SVG + CSS Grid serialisation). | M2 |
| B1-T2 | Catalog CLI writes `public/patterns/<id>.json|.svg` and variation artefacts; CI invokes it before Astro build. | M2 |
| B1-T3 | Classical analyzer: points / planes / lines → `work.yml` draft with uncertainty fields; evaluation report against labelled cells. | M4 |
| B1-T4 | Closed-form weight variations (`invert_rank`, `complement`, `reciprocal`, `equalize`) with sum-to-frame invariant tests. | M2/M4 |
| B1-T5 | Personal measured work under `packages/works/<slug>/` with rights + method notes. | M8 |

**Starter already in pack:** schema draft + catalog sketch under `scaffold/`.

---

### Seat 2 — Contract, conformance & LAN API (Backend)

**Why this seat is not “empty until Phase 2”:** FastAPI is **not** an MVP
visitor dependency (D-09/D-23), and `/patterns/generate` is explicitly
**last**. Seat 2’s **MVP-calendar** load is the **contract + conformance**
lane that seats 1 and 6–7 depend on, plus the LAN teaching service (M5).
Phase-2 generate is *extra*, not the only job.

**Deliverables:** M1 API stub · M2 pydantic/OpenAPI + JS↔Python parity · M5
LAN service · M7 “no Pages→API” gate · Phase-2 generate (post-MVP).

| ID | Spec | Phase |
| --- | --- | --- |
| B2-T1 | `services/api` package green from M1: FastAPI hello + health; uv member imports in CI; README “LAN only — never Pages”. | M1 |
| B2-T2 | Pydantic models mirroring `work` / `SurfaceSpec` / `CompositionState` / `Recipe` JSON Schema; OpenAPI sketch checked into `services/api`. Dual-review every schema PR with seat 1. | M2 |
| B2-T3 | Own the **JS ↔ Python conformance** harness: same golden fixtures → identical render-plan JSON (and SVG/Grid serialisation hashes). CI job fails on drift. Coordinates with seat 1’s `derive_render_plan`. | M2 |
| B2-T4 | Catalog/CI glue with seat 1: document how `pnpm build` consumes Python-emitted `public/patterns/**`; fail CI if patterns missing. | M2 |
| B2-T5 | FastAPI LAN app: `GET /works`, `GET /works/{id}`, `GET /works/{id}/preview` (HTML/CSS **and** SVG), `POST /analyze` wired to analyzer. | M5 |
| B2-T6 | Semantic snapshot: API preview plan deep-equals Astro/matrix plan for golden fixtures. | M5 |
| B2-T7 | Public Astro build has **zero** fetch to the API; Playwright network assertion on `/`, `/gallery/`, `/create/`, `/kiosk/`. | M5/M7 |
| B2-T8 | Recipe / generate **seed** contract draft (query params for Phase-2: `complexity`, `density`, `colorimetry`, `seed`) aligned with D-27 URL rules — design only in MVP; no live generate. | M2/M6 |
| B2-T9 | **Phase 2 (last):** `POST /api/v1/patterns/generate` → schema-valid algorithmic study; credit “algorithmic study”. | Post-MVP |
| B2-T10 | Personal measured work + defence of one **contract** bound (schema parity, “API never on Pages”, or generate seeds). | M8/M9 |

**Not MVP (visitor):** generate endpoint, server PDF, cloud save.  
**Is MVP-calendar work:** T1–T4, T7–T8, dual-review; T5–T6 = LAN teaching product parallel to M3/M6.

---

### Seat 3 — About story (Storytelling)

| ID | Spec | Phase |
| --- | --- | --- |
| S3-T1 | Seven About scenes from MVP §6; each readable with `prefers-reduced-motion: reduce` (all visible, static). | M3 |
| S3-T2 | **GSAP + ScrollTrigger parallax** on `/about/` only (D-29): `data-speed` layers, scrubbed scroll; kill triggers under reduced motion; no-JS complete. No Framer Motion. | M3 |
| S3-T3 | Cite Andrzejewski (2010) and Mondrian plastic means with evaluator-safe Chicago author-date; no vault IDs in public HTML. | M3 |
| S3-T4 | Personal measured work + one story Δ sentence in defence. | M8/M9 |
| S3-T5 | Document in defence / method note how S11 GSAP maps to About parallax (one paragraph). | M3/M9 |

---

### Seat 4 — Gallery & method (Storytelling)

| ID | Spec | Phase |
| --- | --- | --- |
| S4-T1 | Gallery miniatures are **CSS Grid** from the shared render plan (not screenshots of SVG). | M3 |
| S4-T2 | `/method/` explains analyzer → schema → catalog build → uncertainty → rights. | M3 |
| S4-T3 | Container queries reveal chrome/captions; painting study stays ratio-true. | M3 |
| S4-T4 | Personal measured work. | M8 |

---

### Seat 5 — About Us, declaration, i18n (Storytelling)

| ID | Spec | Phase |
| --- | --- | --- |
| S5-T1 | `/about-us/`: proposition, seat credits (1–7), research notice, AI disclosure. | M3/M9 |
| S5-T2 | `/declaration/` visitor + research + AI + data statements (counts-only kiosk telemetry). | M9 |
| S5-T3 | Spanish prose mirrors for shell routes; editor state keys shared (not duplicated). | M3+ |
| S5-T4 | `/contribute/` documents CODEOWNERS lanes and branch naming for classmates. | M1/M3 |
| S5-T5 | Personal measured work. | M8 |

---

### Seat 6 — Editor island (App UI)

| ID | Spec | Phase |
| --- | --- | --- |
| U6-T1 | Svelte 5 island on `/create/` and `/kiosk/` only; loads catalog JSON; draws live SVG. | M1 probe → M6 |
| U6-T2 | Containing-frame **corner** handles; **free aspect** + **liquid-fill** (D-30); frame stays in printable area; min size enforced. | M6 |
| U6-T2b | **Format** chip row (D-31): `original`, `1:1`, `5:4`, `4:5`, `16:9`, `9:16`; `maximizeFrame` into printableArea; `fmt` in live URL; corner-drag → `custom`. | M6 |
| U6-T3 | Variation buttons load build-time artefacts or pure matrix transforms — **no** FastAPI. | M6 |
| U6-T4 | Internal dividers/junctions are **not** draggable (Addendum B / D-24). | M6 |
| U6-T5 | Undo, reset, compare; **live URL sync** (every UI edit → query params); `localStorage` draft. | M6 |
| U6-T6 | Personal measured work + defence of one interaction bound. | M8/M9 |

---

### Seat 7 — Export, PWA, tokens (App UI + Design)

| ID | Spec | Phase |
| --- | --- | --- |
| U7-T1 | Own `packages/tokens/` barrel (D-26.4 + **D-34**); type roles Van Doesburg / Futura / Neue Haas / Univers; form `radius: 0`; no raw colours outside token files; shell + editor consume `--nx-*`; student type-specimen preview per [`TOKEN-SYSTEM.md`](../../style/TOKEN-SYSTEM.md). | M1/M3 |
| U7-T2 | Client export: SVG, **standalone HTML** (full-size SVG embedded), CSV, PNG-from-SVG. | M6 |
| U7-T3 | QR = **recipe URL** only (D-26/D-27); never SVG or work JSON in query; keep MVP recipe query ≈150 chars. | M6/M7 |
| U7-T4 | Paper presets (**sticker-50 default**); stage = silhouette; **Print** giveaway; `@page` per preset; calibrate 50 mm + 100 mm. | M6 |
| U7-T5 | PWA offline cache of catalog + island; kiosk wake lock; idle reset. | M7 |
| U7-T6 | Visual QA checklist on every PR that touches chrome. | Ongoing |
| U7-T7 | Personal measured work. | M8 |

---

## Professor checklist before assigning handles

1. M0 cold review → DONE.
2. M1 opens product repo; copy `scaffold/` → packages; paste CODEOWNERS from D-25/D-26.
3. Assign GitHub handles to seats 1–7; open starter issues from the tables above.
4. Remind: FastAPI **generate** = **last** feature; seat 2 is **not** idle until then — they own contract/conformance (B2-T1–T4, T7–T8) on the MVP calendar.
5. Toolchain: **Node ≥24.22.1** (D-28) before `pnpm install`; `.nvmrc` in product repo.
6. Workload sanity: if a seat looks thin after assign, prefer **adding dual-review / CI / docs** over inventing visitor features that contradict MVP.
