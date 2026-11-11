# Galazio in Figma

Notes on the Galazio Figma library: what's in it, how it was built with the Figma MCP, and what changed. Code is the source of truth: Galazio's light tokens live in the portfolio's `src/styles/theme.css`, and this kit's version of the theme is [`src/themes/galazio.css`](../src/themes/galazio.css).

- **Figma file (editable):** https://www.figma.com/design/Sfzj3JW9Da71TzzWnwqwuF/Galazio
- **Figma Community (public):** https://www.figma.com/community/file/1700202870034532065

Galazio was called Azure Arcade until Nov 1, 2026.

## What's in the file

**Variable collections**

| Collection | Modes | What it holds |
|---|---|---|
| Primitives | Value | The palette: `color/ink`, `color/blue-deep`, `color/periwinkle-pale`… |
| Semantic | Light, Dark | Roles like `color/bg`, `color/fg-1`, `color/action`. Light values point at Primitives |
| Shape | Value | `radius/*` and `spacing/*` (4px grid) |
| Type | Value | `font-size/*` |

Every variable's web code syntax is its real CSS variable (for example `var(--color-bg)`), so Figma's Dev Mode shows the code name.

**Styles:** text styles (Heading/Hero, Heading/Section, Body/*, Label/Button, Label/Caps, Display/Serif, Brand/Logo, Code/Mono) and Shadow/* effect styles.

**Pages:** Cover, Foundations, then Icons, Buttons, Chips & nav, Alerts, Cards, Forms & feedback.

**Components:** 18 Lucide icons, Button (Style × State), Chip, Nav tab, Alert (4 tones), Accordion, At a glance, Feedback card, Field (Default / Focus / Error), Error banner, Toast.

## History

### Nov 1, 2026: built from theme.css

The library was built from `theme.css` with the Figma MCP: variables, styles, then components bound to the variables. `radius/lg` (8px) was added the same day, in code and Figma.

### Nov 11, 2026: dark mode

**1. A Dark mode for Semantic.** Galazio is a light-only system in the portfolio, so the dark values come from this kit's Galazio theme ([`src/themes/galazio.css`](../src/themes/galazio.css)).

| Role | Light | Dark |
|---|---|---|
| `color/bg` | paper | `#141618` |
| `color/bg-alt` | blue-pale | `#1a2a3c` |
| `color/bg-bright` | bone | `#1b1e21` |
| `color/bg-inverse` | ink | `#eceef1` |
| `color/fg-1` | ink | `#eceef1` |
| `color/fg-2` | ink-soft | `#c4c8cd` * |
| `color/fg-3` | ink-faint | `#9da2a9` |
| `color/fg-inverse` | paper | `#141618` |
| `color/action` | blue-deep | `#6aaef5` |
| `color/action-hover` | blue-deeper | `#93c4f8` * |
| `color/action-fg` | bone | `#141618` |
| `color/link` | blue-deep | `#6aaef5` |
| `color/link-hover` | blue-deep | `#6aaef5` |
| `color/focus` | blue-bright | `#6aaef5` |
| `color/focus-ring` | → focus | → focus |
| `color/success` | green-deep | `#5fcf9f` |
| `color/warning` | rust | `#f08a68` |
| `color/info` | blue | `#6aaef5` |
| `color/input` | `#909498` | `#687079` |

\* No match in the starter kit, so these were picked by hand: `fg-2` sits between `fg-1` and `fg-3`, and `action-hover` gets lighter on dark, the usual pattern.

**2. Light mode brought back in line with theme.css.** It had drifted:

- `color/link-hover`: blue → blue-deep
- `color/focus`: blue → blue-bright
- `color/focus-ring`: blue at 50% → the same as `color/focus`, solid (code keeps it solid for 3:1 contrast, WCAG 1.4.11)
- `color/input`: added (ink-faint at 75% on paper, the lightest field border that keeps 3:1)

**3. Components switched from Primitives to Semantic,** so they turn dark with the mode. About 70 colors across the five component pages. Some roles didn't exist yet, so these were added. Each one's light value is the palette color it replaced, so light mode looks the same:

| New role | Light | Dark | Used on |
|---|---|---|---|
| `color/border` | rule | `#30353a` | Outline button, cards, toast |
| `color/accent` | periwinkle-pale | `#252a45` | Periwinkle chip, icon tiles |
| `color/success-bg` | green-pale | `#16332a` | Done status bar |
| `color/success-fg` | green-deeper | `#5fcf9f` | Done status text |
| `color/info-fg` | blue-deeper | `#93c4f8` | Ongoing status text |

Plus 18 **tint** variables, `color/tint/<role>-<percent>`, for see-through colors: tinted alert and chip backgrounds, hover overlays, tinted borders. For example, `color/tint/warning-8` is warning at 8%. The transparency lives in the variable (see the Figma MCP gotcha below). Their dark values are the dark role color at the same transparency. Purple and red have no dark role, so their tints use `#a98be0` and `#f07a7f`, also picked by hand.

The Field border now uses `color/input` instead of rule, matching `.field input` in the portfolio's code. The Field focus border uses `color/action` (same blue in light).

**Left on Primitives on purpose:**

- **Glow button:** stays an ink button in both modes. A light version would make its green hover label unreadable.
- **Purple and red solid text and icons:** no theme role for them yet. Purple text is low contrast on dark.
- **Blue-bright icons, the see-through periwinkle and mist chip and alert borders, the toast countdown:** they read fine on dark as they are.

## Open items

- The new roles (`border`, `accent`, `success-bg`, `success-fg`, `info-fg`) and the `tint/*` variables exist only in Figma. Add them to the portfolio's `theme.css` and this kit's `galazio.css` if the portfolio ever gets dark mode, or rename them in Figma to match whatever code uses.
- The hand-picked dark values (marked above, plus the purple and red tints) haven't been reviewed.
- Purple and red need dark-mode roles before the Purple alert and Red feedback card fully support Dark.

## Working on the file with the Figma MCP

- **See-through colors don't survive saving.** When a script reassigns a layer's fills or strokes, every variable-linked color in that list saves at full opacity, even ones the script didn't change, and even in a follow-up call. Reading the value back in the same call shows the old opacity, which is wrong. Unlinked colors keep their opacity. That's why tints use transparency baked into the variable, with the layer's own opacity at 100%. Before reassigning a list, check it for see-through linked colors, and verify opacity in a separate call.
- **Previewing Dark mode:** set a component set's Semantic mode to Dark (`setExplicitVariableModeForCollection`), screenshot it, then clear the mode again.
- **Small caps:** Figma can't do Archivo small caps, so Label/Caps is uppercase at 11px with 7% tracking.
- **Re-syncing:** when tokens change in `theme.css`, update the matching Primitives or Semantic variable. Keep the code syntax as the real CSS variable.
