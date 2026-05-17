---
version: alpha
name: Field Dispatch
description: Yoel Andreas Manoppo personal portfolio — editorial monochrome with crimson signal accent. Newspaper-of-one aesthetic.
colors:
  ink: "#0c0c0b"
  ink-2: "#141311"
  ink-3: "#1c1b18"
  paper: "#ece6da"
  bone: "#b8b3a8"
  ash: "#6f6c64"
  ember: "#e8512a"
  ember-soft: "#f08056"
  char: "#28201b"
  rule: "rgba(236,230,218,0.10)"
  rule-strong: "rgba(236,230,218,0.22)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(48px, 9vw, 132px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
    fontFeature: "ss01, ss02"
  display-italic:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(40px, 8vw, 116px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
    fontStyle: "italic"
  section:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(28px, 4.5vw, 56px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontStyle: "italic"
  lead:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  mono-stat:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "22px"
  pill: "999px"
spacing:
  0: "0px"
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
  32: "128px"
components:
  card:
    backgroundColor: "{colors.ink-2}"
    rounded: "{rounded.lg}"
    padding: "{spacing.8}"
  card-bordered:
    backgroundColor: "transparent"
    rounded: "{rounded.lg}"
    padding: "{spacing.8}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
    typography: "{typography.mono}"
  signal-dot:
    backgroundColor: "{colors.ember}"
    size: "8px"
    rounded: "{rounded.pill}"
---

## Overview

Field Dispatch is a personal newspaper-of-one. The visitor lands on a war-room/editorial hybrid where Yoel's career is presented as numbered dispatches (№01 — №07). Every block reads like a story page, not a dashboard card.

The visual language has three voices: an italic serif **for declaration** (hero, section titles), a clean grotesque **for narration** (body), and a technical monospace **for evidence** (dates, stats, taxonomy labels).

## Colors

Monochrome dominant, crimson as signal. Crimson (`ember`) only appears on: italic display accent words, the live signal dot, link hover underlines, and exactly one button per page. Anything else stays in the warm-black/bone scale.

- `ink` — page background, true black with warm cast
- `ink-2` — card surface, lifted ~3%
- `ink-3` — secondary depth (insets, code)
- `paper` — primary text on dark
- `bone` — body text, muted
- `ash` — captions, meta, hints
- `ember` — signal & accent (use < 5% of pixel area)

## Typography

Display: **Newsreader** — high-contrast editorial serif chosen for its weighty roman + characterful italic. Used at clamp(48px, 9vw, 132px) on the hero so the type itself becomes the layout.

Body: **Onest** — fresh grotesque, less generic than Inter/Geist. Set tight (1.5–1.65 leading) at 16–20px.

Mono: **JetBrains Mono** — uppercase + tracked at 0.08em for labels like `№01`, `MAY · 2026`, `JAKARTA`. Functions like a newspaper kicker.

## Layout

12-column max-width grid (1100px) with asymmetric blocks. Numbered dispatches break the grid: some span full width, some inset to 7 columns. Generous whitespace between blocks (spacing.20 — spacing.24).

Border-radius is rounded but never soft-toy: `lg` (16px) for cards, `pill` only for chips and the signal dot. No drop shadows — depth is created by ink tone shifts (`ink` → `ink-2` → `ink-3`).

## Elevation & Depth

No box-shadows. Depth communicated via:
1. Background tone (ink scale)
2. 1px hairline rules at 10% paper opacity
3. Film grain overlay (SVG noise, 6% opacity, mix-blend overlay) for paper texture

## Shapes

- Cards: `rounded-lg` (16px)
- Portrait: `rounded-xl` (22px), aspect-square
- Chips & signal dot: `pill`
- Buttons: `rounded-md` (10px)
- Section dividers: 1px hairline, full-bleed within section

## Components

**Card** — `ink-2` background, no border, padded 32px.

**Card-bordered** — transparent background with 1px `rule` border, padded 32px. Hover: border becomes `rule-strong` and ember underline appears below title.

**Chip** — mono uppercase text, pill border at 10% paper opacity, padded 6×14px.

**Signal dot** — 8×8 ember circle with pulsing ring (1.5s cubic-bezier). Live state indicator.

**Dispatch number** — №XX in serif italic, 24px, ember when section is "active" (now), bone otherwise. Always paired with a mono label.

**Stat block** — large mono number (32px) over tiny mono caption. No card chrome, separated by hairline.

## Do's and Don'ts

DO commit to one accent color and reserve it for signal moments.
DO use italic display for emotional punch words ("the work", "Jakarta").
DO let whitespace breathe — never compress hero below 70vh.
DO number every major section visibly.

DON'T add gradient backgrounds (purple→blue is banned).
DON'T use Inter, Geist, or Space Grotesk — pick fresh.
DON'T scatter shadows; build depth with tone.
DON'T use emoji in body copy. They cheapen the editorial voice.
DON'T let the chat widget feel like Intercom — it must read as "tune in to Yoel's frequency".
