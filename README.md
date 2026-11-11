<div align="center">

# Starter Kit

**A small, opinionated starting point for front-end projects.**<br />
React, TypeScript, Tailwind CSS and shadcn/ui on Radix. Comes with design tokens and supports two themes + light/dark mode.

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-111?logo=shadcnui&logoColor=white)

</div>

---

## What's inside

| | Tool | What it does |
|---|---|---|
| ⚛️ | [React](https://react.dev) | Builds the UI out of reusable components |
| 🔷 | [TypeScript](https://www.typescriptlang.org) | Catches mistakes before the code runs |
| ⚡ | [Vite](https://vite.dev) | Runs the local dev server with instant updates, and builds for production |
| 🎨 | [Tailwind CSS](https://tailwindcss.com) | Styles elements with utility classes, driven by design tokens |
| 🧩 | [shadcn/ui](https://ui.shadcn.com) | Copy-in components you own and can restyle |
| ♿ | [Radix](https://www.radix-ui.com) | Handles accessibility, keyboard support and focus inside each component |
| ✨ | [Lucide](https://lucide.dev) | Icon set |
| 🍞 | [Sonner](https://sonner.emilkowal.ski) | Toast notifications that stack, pause on hover and can be dismissed, with a countdown bar |
| 🌊 | Two themes | Default (neutral grays) and Galazio, switchable from the demo page |
| 🌓 | Light and dark mode | Both themes support light and dark mode. |

**Included components:** Alert, Avatar, Badge, Button, Card, Checkbox, Dialog, Dropdown Menu, Input, Label, Select, Separator, Skeleton, Switch, Tabs, Toast (via [Sonner](https://sonner.emilkowal.ski)), Tooltip<br />
**Also set up:** light and dark mode (starts in light, with a toggle), a theme picker, the `@/` import shortcut, and linting with Oxlint

### The demo page

`npm run dev` opens a demo page that shows the kit in use:

- **A sample screen:** Ocean Settings in Oceanos AI, Poseidon's app for running the sea. It's built only from the kit's components (tabs, selects, switches, checkboxes, a profile menu, a tooltip, loading skeletons, a dialog and toasts).
- **Typography:** the theme's heading, serif and body fonts, and Tailwind's text sizes.
- **Color tokens, buttons, badges, alerts and toasts,** each in every variant.

A theme picker and a light/dark toggle sit in the top corner, so you can compare the themes side by side. Everything on the page is there to delete when you start (step 5 below).

## Getting started

### Start a new project from this template

1. Click **Use this template → Create a new repository** at the top of this page.
2. Clone your new repository and install:

   ```bash
   git clone https://github.com/<your-username>/<your-new-repo>.git
   cd <your-new-repo>
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open **http://localhost:5173**. Edits show up in the browser as soon as you save.

4. Rename the project in `package.json` (`"name"`) and `index.html` (`<title>`).
5. Clear out the demo: replace the contents of `src/App.tsx` with your app, and delete `src/components/demo/`.

**Requires** [Node.js](https://nodejs.org) 20.19 or newer.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local dev server |
| `npm run build` | Type-checks, then builds a production version into `dist/` |
| `npm run preview` | Serves the production build locally to check it |
| `npm run lint` | Checks the code for common mistakes |

## Project structure

```
src/
├── components/
│   ├── demo/         ← the demo page's sample screen; delete when you start
│   └── ui/           ← shadcn components (yours to edit)
├── hooks/
│   └── use-theme.ts  ← light/dark mode and the active theme
├── lib/
│   └── utils.ts      ← cn() helper for combining classes
├── themes/
│   ├── default.css   ← neutral grays + Geist (the base theme)
│   └── galazio.css   ← the Galazio design system
├── App.tsx           ← the demo page; replace with your app
├── index.css         ← Tailwind setup; loads the themes
└── main.tsx          ← entry point; mounts the app
components.json       ← shadcn settings (style, icons, paths)
vite.config.ts        ← build setup, Tailwind plugin, @/ shortcut
```

## Customizing

### Themes

A theme is one file in [`src/themes/`](src/themes/) holding every color, the corner radius and the fonts. [`src/index.css`](src/index.css) loads them, and an attribute on the page's `<html>` tag picks which one shows. The starting theme is set in [`index.html`](index.html):

```html
<html lang="en" data-theme="galazio">
```

The theme picker on the demo page changes that attribute while the page is open, and remembers the choice for next time.

Two come included:

- **Default:** shadcn's neutral grays with the Geist font.
- **Galazio:** the blues, greens, Archivo and Newsreader of [Galazio](https://www.figma.com/community/file/1700202870034532065). 

`default.css` is the base: any token another theme doesn't set falls back to it. Inside a theme file:

- the first block holds **light mode** values (`:root` in the default theme, `[data-theme="galazio"]` in Galazio)
- the `.dark` block holds **dark mode** values
- `--radius` sets corner rounding across every component
- `--theme-font-sans`, `--theme-font-heading` and `--theme-font-serif` set the fonts

Change a token once and every component that uses it updates. For example, set `--primary` to your brand color and every primary button follows.

**To make your own theme,** copy `galazio.css` and rename it (say, `ocean.css`). Change `[data-theme="galazio"]` to `[data-theme="ocean"]` throughout, change the values, then:

1. Add `@import "./themes/ocean.css";` to `index.css`, below the default theme.
2. Add `'ocean'` to the `themes` list in [`src/hooks/use-theme.ts`](src/hooks/use-theme.ts), so the picker shows it.

The demo page shows each token as a swatch, so you can see changes right away.

**To use just one theme,** set it in `index.html` and delete the other themes' import lines in `index.css`.

### Adding components

Browse the [shadcn/ui component list](https://ui.shadcn.com/docs/components), then add one by name:

```bash
npx shadcn@latest add accordion
```

The component's code is copied into `src/components/ui/`. From then on it's a regular file in your project, so you can change it however you like.

### Using a component

```tsx
import { Button } from '@/components/ui/button'

<Button variant="outline" size="sm">Save</Button>
```

## Principles

- **Own the code.** Components are copied in, not hidden in a package, so nothing is locked.
- **Tokens first.** Style through tokens rather than one-off values, so design and code stay in step.
- **Accessible by default.** Radix handles keyboard, focus and screen reader behavior.
- **Add when needed.** Routing, data fetching, forms and testing are left out on purpose. Add them per project.

---

<div align="center">
<sub>Built with Claude ~ Ann Marie</sub>
</div>
