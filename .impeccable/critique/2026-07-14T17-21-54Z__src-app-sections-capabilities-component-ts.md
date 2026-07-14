---
target: capabilities section (Government and public sector)
total_score: 35
p0_count: 0
p1_count: 1
timestamp: 2026-07-14T17-21-54Z
slug: src-app-sections-capabilities-component-ts
---
Method: dual-agent (A: general-purpose design-review · B: general-purpose detector+browser)

# Critique — "Government and public sector" capability section

## Design Health Score — 35/40 (Good, top of band)

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | 4 | "Pending"/notes honestly communicate registration state |
| 2 | Match to real world | 4 | Textbook CO vocabulary (capability statement, SDVOSB, UEI, CAGE, NAICS) |
| 3 | User control & freedom | 3 | Download fires immediately; no fallback if the file is missing |
| 4 | Consistency & standards | 3 | NAICS label alone drops the accent icon and sits outside its grid |
| 5 | Error prevention | 3 | Link integrity depends on exact filename parity with the shipped asset |
| 6 | Recognition over recall | 4 | Codes shown with plain-language titles |
| 7 | Flexibility & efficiency | 3 | Single path (download); fine for the genre |
| 8 | Aesthetic & minimalist | 4 | Restrained, no ornament; dense but genre-justified |
| 9 | Error recognition/recovery | 3 | A 404 download drops to a raw browser error, no in-page recovery |
| 10 | Help & documentation | 4 | The section IS documentation; profileNote explains the pending items |
| **Total** | | **35/40** | **Good, near-Excellent** |

## Anti-Patterns Verdict — does this look AI-generated? No.

**LLM review:** Passes the slop test. It reuses the house vocabulary (Services' gapless `gap-px bg-line` matrix, the mono micro-label + accent icon, the tick-header, the secondary bordered button) and dodges the obvious govcon-AI clichés: no vanity stat-tile grid for "17+ agencies / $500K / Top Secret" (those live inline as past-performance detail), no faux seals/badges, no uppercase eyebrow. Honesty is engineered into the UI ("Pending assignment", "Reinstatement-eligible", the explanatory note) — the opposite of generated filler.

**Deterministic scan:** 4 warnings, 2 rules. `side-tab` ×2 (`border-l-2 border-accent` on the past-performance items, capabilities.component.ts:93 + the identical sibling at work-client.component.ts:49) — borderline; it's a 2px pull-quote rule, not a thick card side-tab, and matches an already-shipping sibling, so both agents rate it acceptable. `overused-font` ×2 (Geist / Geist Mono, styles.css:24-25) — a real match against the detector's converged-face list, but it's the site's already-committed brand identity, so identity-preservation wins; out of scope for this section.

**Browser evidence (1440 + 390):** No horizontal overflow, no broken layout, no clipped content at either width. Fact sheet collapses 2→1 cleanly; NAICS matrix reflows 4→1 without overflow. Measured contrast all passes WCAG AA: muted labels ≈6.6:1, PDF tag ≈6.1:1, accent "in process" @11px ≈5.7:1.

## Overall Impression
The strongest kind of section to review: disciplined, on-system, and wrong only in a few concrete, cheap-to-fix places. It reads as house, not as a template drop-in. The single biggest opportunity is protecting the one action the whole section exists to earn — the PDF download — from a filename/parity failure, plus tightening the mobile spec rows and sub-label semantics.

## What's Working
1. **Native to the system.** Gapless matrix, mono micro-labels, tick-header, secondary button — all lifted from Services/Credentials/Contact. The hardest thing to get right in an added section, done cleanly.
2. **Honesty as a credibility signal.** Per-value accent notes and "Pending assignment" + the explanatory profileNote qualify claims without clutter — exactly what a contracting officer rewards.
3. **Genre-appropriate restraint.** Codes-as-data, download-the-artifact affordance; no vanity tiles or faux badges. Matches how capability statements are actually consumed.

## Priority Issues

**[P1] Download filename parity (trust-critical, pre-deploy).** The href is `draugel-engineering-capability-statement.pdf` and `public/` now matches it, but the last-built `dist/` still ships the old `Draugel_Engineering_Capability_Statement.pdf` — a stale artifact. A rebuild resolves it, but it MUST be verified before deploy (this repo's own CDN rule means a 404 gets edge-cached long). Fix: rebuild so public/ is the source of truth and confirm byte-for-byte filename parity; consider an in-page email fallback for a missing file.

**[P2] Long spec values wrap ragged-right on mobile.** `dd class="text-right"` holding "Service-disabled veteran-owned small business (SDVOSB)" (46 chars) wraps to ~3 right-aligned lines with a ragged left edge next to a 2-word `dt`. No overflow, but it's the one element that reads as "broken" on a phone. Fix: stack dt/dd to `flex-col` below a breakpoint (or left-align the value when it wraps), or move "(SDVOSB)" into the accent note slot so the value line stays short.

**[P2] Smallest type tiers run 10–11px for a 508-scrutinizing audience.** Contrast passes AA (measured), but the PDF tag (10px) and profileNote/accent notes (11px) are small for the one audience that actively tests WCAG/508. Fix: nudge the smallest tiers toward ≥12px; keep 10px only for the non-essential PDF label.

**[P3] Sub-label semantics + NAICS parity.** The four panel labels ("Company data", "Core competencies", "Federal past performance", "NAICS codes") are non-heading `<span>`s — a flat single-h2 section with no navigable subheadings (Services uses real `<h3>`). And NAICS alone has no accent icon and sits outside its grid while the other three sit inside their panels. Fix: promote the four labels to identically-styled `<h3>`; give NAICS the accent-icon treatment; pick one label-placement rule and apply to all four.

## Persona Red Flags
- **Jordan (non-govcon visitor):** densest, most acronym-heavy block on an otherwise warm founder-led page, sitting right before the Contact CTA — a momentum speed bump at the worst position. Mitigated by the clear h2 that lets Jordan self-select out.
- **Riley (stress tester):** the ragged right-aligned dd wrap (above); two "Pending assignment" rows = 40% of the company-data list reading as placeholder (honest, but visually flat).
- **Casey (one-handed mobile):** download target is a solid ~44px; linear scroll, no sticky traps; fine one-handed.

## Minor Observations
- NAICS is a bordered card wrapping a bordered grid — a mild card-in-card, the one place the section nests where the fact-sheet panels don't.
- Two "Pending assignment" values could take a subtle non-accent treatment so they read as "tracked" rather than "empty."
- Three filename conventions now coexist (href hyphen-case, `download` attr TitleCase-hyphen, old dist underscore) — pick one canonical string.

## Questions to Consider
- With UEI/CAGE **pending** and VetCert **in process**, is publishing the fact sheet inline now an asset, or do two "Pending assignment" rows read as "not ready"? Would a subtle "tracked" treatment change that?
- For the ~90% non-govcon visitor, does this dense block interrupt the close right before the CTA? Would a linked `/government` page serve both audiences better than an inline block?
- Who owns keeping the artifact filename, the href, the `download` name, and the eventual SAM.gov registration in sync as UEI/CAGE go live?
