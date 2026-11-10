<!--
Mondrian Project — decision record.
-->

# D-34 — Style token system (typography · colour · form)

**Status:** `adopted` · **Date:** 2026-11-10 · **Owner**  
**Amends / clarifies:** D-26.4 (barrel file list + ownership); D-33 D8 (`--nx-*` prefer); does **not** reopen D-07 painting fills.  
**Student ownership:** Seat 7 — `U7-T1` / `U7-T6` ([`TEAM-ASSIGNMENTS.md`](../TEAM-ASSIGNMENTS.md)).  
**Research brief:** [`../../../style/De_Stijl_Typography_Report.md`](../../../style/De_Stijl_Typography_Report.md) · contract: [`../../../style/TOKEN-SYSTEM.md`](../../../style/TOKEN-SYSTEM.md).

## Decision

| Layer | Lock |
| --- | --- |
| Barrel path | `packages/tokens/` — apps import **only** `index.css` |
| Prefix | Prefer `--nx-*`; keep `--mp-*` aliases this term (D-33 D8) |
| Painting fills | Still from work JSON + relative HSL (D-07) — **not** chrome tokens |
| Headlines | **Architype Van Doesburg** (Foundry commercial; license before production webfont) |
| Subheads | **Futura** |
| Body | **Neue Haas Grotesk** |
| Captions / labels | **Univers** |
| Form language | Orthogonal only: **`border-radius: 0`**, no chrome diagonals, hairline armature |

## Colour doctrine (grounded — chrome vs painting)

From *Le Néoplasticisme* (Effort Moderne, 1920) — imprint + Ahmes nodes in [`../grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md`](../grounding/FIRST-SOURCES-1920-NEOPLASTICISM.md):

| Claim | Use in tokens | Cite surface |
| --- | --- | --- |
| Rectangular colour planes express **rapports**, not natural appearance | Chrome stays quiet; chromatic **roles** are teaching chips only | Flag expansion · nodes `78ad4e44…` / `06184a3b…` · `page_index=7` |
| Three fundamental colours: rouge, jaune, bleu (not spectral appearance) | `--nx-role-{red,yellow,blue}` = HSL teaching approximations; yellow light / blue deep (pitch §7) | §6.4 · nodes `6fa6d176…` · `page_index=15` |
| Black / white / gray = armature | `--nx-role-{black,white}` + `--nx-color-line` never enter hue rotation | Pitch §7 · D-07 |

**Athanor:** project slug `mondrian-project` (D-33 D11). Live CLI search may be offline; cite-grade claims use the Ahmes vault receipts above, not vector snippets.

## Form doctrine

| Rule | Token / CSS |
| --- | --- |
| No curves in chrome | `--nx-radius-chrome: 0` (`form.css`) |
| No diagonals in UI chrome | Layouts stay axis-aligned (van Doesburg diagonal stays historical warning — pitch §5) |
| Modular rhythm | Space scale stays 4-based; type display may echo 5×5 modular alphabet only as comment / optional grid unit — not a new layout engine |
| Elevation | Prefer hairline / ink edge over soft drop shadows (`elevation.css`) |

## Student preview deliverable (Seat 7)

Wave A issue seed: `[design] Token barrel consumption + visual QA checklist`.

Acceptance (extends U7-T1):

1. Barrel files match [`TOKEN-SYSTEM.md`](../../../style/TOKEN-SYSTEM.md).
2. Shell + editor consume `--nx-*` (or documented `--mp-*` aliases); no raw hex outside `packages/tokens/`.
3. Optional `/design/tokens/` (or equivalent) preview page: type specimen + role swatches + radius=0 proof — **student-owned**, not instructor finish.
4. License note visible in preview or README: Architype requires Foundry license; classroom may use listed free digitization **only** with EULA check.

## Out of this decision

- Procuring Foundry webfonts (human / department)
- Changing measured painting swatches in work JSON
- Renaming npm scope to `@neoplastix` (D-33 D3, after Wave A)
