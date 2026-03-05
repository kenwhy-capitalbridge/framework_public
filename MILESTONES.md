# Milestones & restore points

Use these tags to restore the project to a known state:

```bash
git checkout <tag>
```

To return to the latest work after checking out a tag:

```bash
git checkout main
```

---

## v1.0.0 — Capital Bridge Advisory Platform (current)

**Tag:** `v1.0.0`  
**Date:** 2025-03-06

**Restore point:** Full platform UI with:
- Platform header (hero) with grid texture and glow
- Framework section with workflow progress, stage titles, connector line, indicators
- System status header and three analytical engine cards
- 6px module header bar, decision-engine framing, financial literacy micro-explanations
- Mobile: horizontal swipe cards, snap scroll, single-line buttons
- Institutional grid background, card activity shimmer, pulsating status dot
- Footer in Roboto Serif
- Vercel rewrite for root URL

**Restore to this version:**
```bash
git checkout v1.0.0
```
