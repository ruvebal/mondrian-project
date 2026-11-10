<!--
Mondrian Project — student-ready assignment handout (not the M9 bilingual brief).
Distilled from TEAM-ASSIGNMENTS.md · 9 November 2026
-->

# Student assignment list — cohort of 7

**Product marque:** Neoplastix · **Programme / repo:** Mondrian Project (`ruvebal/mondrian-project`)  
**Canonical domain (medium-term):** https://neoplastix.crea-comm.net · **Live now:** https://ruvebal.github.io/mondrian-project/  
**Naming ADR:** [`DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md`](DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md)  
**Source of truth for seat IDs:** [`TEAM-ASSIGNMENTS.md`](TEAM-ASSIGNMENTS.md)  
**Not this file:** EN/ES student brief → **M9** only.

## Status gate (read first)

| Item | State |
| --- | --- |
| M2 / M3 scaffold | **On `main`** (#3, #5, #6) — shell runnable |
| Wave A polish | **Your seats** — see [`ISSUE-SEEDS.md`](ISSUE-SEEDS.md) |
| M4 / M8 | **OPEN** for seats 1 + everyone — scaffold only |
| Plans / PRs | Branch from current `main` as `lane/<handle>-issue-<n>-<slug>` |
| Brand freeze | Prefer not to fight instructor PRs on `SiteNav`, `public/brand/*`, layout titles — use **Neoplastix** in new user-facing copy |

---

## Everyone (all seats)

1. Node **≥24.22.1**; `pnpm check` green locally.  
2. Branch `lane/<handle>-issue-<n>-<slug>` from current `main`.  
3. Plan under `docs/plans/<handle>/`; AI Review Log on assisted PRs.  
4. Measure **one** work in **M8** (`work.yml` + `MEASUREMENT.md` + rights).  
5. Defend **one** bound in **M9**.

**Never:** museum photos in git · FastAPI from Pages/kiosk · Svelte outside editor routes · invented proportions · SVG/work JSON in URL query.

---

## Wave A — after M2 merges (M3 shell)

Instructor opens [`PHASE-M3.md`](PHASE-M3.md). **No Svelte island** on these routes.

| Seat | Handle | Tasks (IDs) | Outcome |
| --- | --- | --- | --- |
| **3** About | `medinaxd29` | S3-T1, S3-T2, S3-T3, S3-T5 | Seven About scenes; GSAP parallax on `/about/` only; reduced-motion / no-JS complete; safe cites |
| **4** Gallery / method | `Yassin-Skirej` | S4-T1, S4-T2, S4-T3 | Live CSS Grid gallery; `/method/` (no JS); container-query chrome |
| **5** About-us / contribute | `itzy-4Qunn7` | S5-T1, S5-T4 | `/about-us/` credits + research/AI notice; `/contribute/` lanes |
| **7** Tokens (slice) | `PauLAanDReEa-Ai` | U7-T1, U7-T6 | Token barrel + type specimen preview ([`TOKEN-SYSTEM.md`](../../style/TOKEN-SYSTEM.md), D-34); visual QA on chrome PRs |

Shared M3 gates: Playwright fit + θ fallbacks; axe clean; base-aware URLs; no painting photos.

---

## Wave B — parallel after M2 (no wait on shell UI)

| Seat | Handle | Focus |
| --- | --- | --- |
| **1** Analyzer | `ATIaas` | M4 analyzer + evaluation; M8 personal work; weight remaps only with closed-form proofs |
| **2** Contract / API | `diegomartinezh` | Conformance ownership; M5 LAN API; prove Pages never fetches API |

---

## Wave C — after M3 DONE

| Seat | Handle | Focus |
| --- | --- | --- |
| **6** Editor | `galarp2005` | M6 Svelte+SVG `/create/` + `/kiosk/`; liquid-fill; format chips; live URL; no node drag |
| **7** Export / PWA | `PauLAanDReEa-Ai` | M6 export/print/QR recipe URL; M7 PWA offline + wake lock |

---

## Full specs

Open [`TEAM-ASSIGNMENTS.md`](TEAM-ASSIGNMENTS.md) for every `B*-T*` / `S*-T*` / `U*-T*` acceptance line. Product contract: [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md). Git rules: repo root `CONTRIBUTING.md`.
