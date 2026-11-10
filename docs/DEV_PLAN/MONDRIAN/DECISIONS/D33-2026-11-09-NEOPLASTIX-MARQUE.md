<!--
Mondrian Project — decision record.
-->

# D-33 — Neoplastix visitor marque (`neoplastix.crea-comm.net`)

**Status:** `adopted` · **Date:** 2026-11-09 · **Owner**  
**Amends / clarifies:** dual naming (Liquid Mondrian marque vs Mondrian Project programme); does **not** amend D-15 corpus nomenclature or D-01 repo slug this term.  
**Amended:** 9 Nov 2026 — canonical domain → `neoplastix.crea-comm.net` (vanity `.io` / `.art` deferred).  
**Plan:** Project store `docs/neoplastix-rebrand-plan.md` (owner §9 locked 9 Nov 2026; D4 amended).

## Decision

| Layer | Name |
| --- | --- |
| Visitor product / marque | **Neoplastix** |
| Canonical domain (medium-term) | **https://neoplastix.crea-comm.net** |
| Programme / cascade / repo this AY | **Mondrian Project** · `ruvebal/mondrian-project` |
| Corpus (D-15) | **Mondrian / Neoplasticism** — unchanged |
| Feature (D-30) | **liquid-fill** — keep; not a marque |

Policy sentence:

> **Neoplastix** is the visitor-facing product and domain (`https://neoplastix.crea-comm.net`). **Mondrian Project** remains the FE I cohort programme, cascade pack, and GitHub repository identity for this academic year. Corpus nomenclature stays **Mondrian / Neoplasticism** (D-15). Studies are attributed “after Mondrian”; the product is not a Mondrian estate product.

## Owner locks (§9)

| ID | Lock |
| --- | --- |
| D1 | Keep programme name **Mondrian Project** |
| D2 | Keep repo slug **now**; revisit post-term |
| D3 | `@neoplastix` package scope **after Wave A** (P5) |
| D4 | Canonical domain = **neoplastix.crea-comm.net** (medium-term). Vanity TLDs `neoplastix.io` / `.art` = deferred optional, not canonical. Live site remains github.io until DNS + host cutover. |
| D5 | `BASE=/` when neoplastix.crea-comm.net is live (apex path on subdomain) |
| D6 | Legacy github.io = **doc-only** (no redirect stub required) |
| D7 | **Hard-delete** user-visible “Liquid Mondrian” strings |
| D8 | CSS `--nx-*` + keep `--mp-*` aliases |
| D9 | CLI preferred name **hard-cut** to `neoplastix-analyzer` |
| D10 | Instructor wordmark v1; seat 7 QA |
| D11 | Athanor slug **`mondrian-project`** kept |
| D12 | Cascade folder `docs/DEV_PLAN/MONDRIAN/` **not** renamed this term |
| D13 | Announce via **class LMS** |

## Deploy / DNS cutover (human; not this ADR)

| Path | When | Notes |
| --- | --- | --- |
| **Live now** | Until cutover | `https://ruvebal.github.io/mondrian-project/` · `SITE=https://ruvebal.github.io` · `BASE=/mondrian-project` |
| **GitHub Pages custom domain** | DNS ready, no own listener required | CNAME `neoplastix.crea-comm.net` → `ruvebal.github.io`; add repo `CNAME` / Pages setting; flip `SITE`/`BASE=/` |
| **Studio host (Lilith / Traefik)** | A/AAAA only when a host listens | Point A/AAAA at Lilith once Traefik terminates TLS for `neoplastix.crea-comm.net` |

Do **not** add a `CNAME` file or change deploy `SITE`/`BASE` until DNS is confirmed live.

## Out of this decision

- DNS / registrar writes (human)
- Lilith / Traefik config (human)
- npm `@mondrian` → `@neoplastix` (Wave A first)
- GitHub repo rename
- Athanor / Ahmes path or slug changes
- Rewriting graded student seat prose
- TTOD product identity (out of scope)

## Live state (probed 10 Nov 2026 — see D-36 H1)

The cutover is **half done**. The Pages custom domain is set (`cname: neoplastix.crea-comm.net`, cert approved,
HTTPS enforced) and github.io 301s to it, but the deploy still builds `SITE=https://ruvebal.github.io`
`BASE=/mondrian-project`. On the canonical domain the stylesheet, brand mark, favicon and every nav link 404.
DNS is therefore live. Lock D5 (`BASE=/`) is now due: flip `SITE`/`BASE` in `deploy-pages.yml` and re-probe
[`../LOCATORS.md`](../LOCATORS.md). With `build_type: workflow`, no `CNAME` file is needed (the domain lives in the
Pages setting).

## Fallback

Until cutover, keep serving `https://ruvebal.github.io/mondrian-project/` with Neoplastix chrome and document `https://neoplastix.crea-comm.net` as the medium-term canonical name.
