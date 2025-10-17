# Shipping Box App — React + Vite

A small React app (Vite) for recording boxes to ship, calculating shipping cost per box by destination, and listing stored boxes.

This README contains step-by-step setup instructions, build & run commands, architecture notes, code-quality checklist, and implementation guidance for the assignment.

---

## Table of contents

- Prerequisites
- Quick start (run locally)
- Environment configuration (.env)
- Project structure and architecture
- How the shipping calculation works
- Accessibility & Responsiveness notes
- Tests / Linting (recommended)
- Implementation checklist & evaluation criteria
- How to extend / next steps

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (or yarn/pnpm) installed
- Recommended editor: VSCode (with Prettier + ESLint)

---

## Quick start (run locally)

1. Clone the repository

```bash
git clone <repo-url> shipping-box-app
cd shipping-box-app
```

2. Install dependencies

```bash
npm install
```

3. (Optional) Add environment overrides in a `.env` file (see the Environment Configuration section below)

4. Run the dev server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

6. Preview the production build locally

```bash
npm run preview
```

---

## Environment configuration (.env)

This project uses Vite. Environment variables must be prefixed with `VITE_` to be exposed to the client.

Supported variables (optional):

- `VITE_RATE_SWEDEN` (defaults to `7.35`)
- `VITE_CUR_SWEDEN` (defaults to `INR`)
- `VITE_RATE_CHINA` (defaults to `11.53`)
- `VITE_CUR_CHINA` (defaults to `INR`)
- `VITE_RATE_BRAZIL` (defaults to `15.63`)
- `VITE_CUR_BRAZIL` (defaults to `INR`)
- `VITE_RATE_AUSTRALIA` (defaults to `50.09`)
- `VITE_CUR_AUSTRALIA` (defaults to `INR`)

Create a `.env` file at project root with values like:

```text
VITE_RATE_SWEDEN=7.35
VITE_CUR_SWEDEN=INR
```

Restart the dev server after changing `.env`.

---

## Project structure

Top-level important files/folders:

- `index.html` — app entry
- `src/main.jsx` — React entry, imports global CSS
- `src/index.css` — global styles for layout and responsiveness
- `src/App.jsx` — root component and routing between views
- `src/state/BoxContext.jsx` — simple reducer + localStorage persistence
- `src/components/BoxForm.jsx` — form for adding boxes (validation + env-driven rates)
- `src/components/BoxTable.jsx` — list / table of stored boxes (responsive)
- `src/components/Navbar.jsx` — small navigation between views
- `src/views/*` — view containers used by `App.jsx`

## How shipping cost is calculated

- Each destination has a per-box rate (currency unit per box). Cost = weight \* rate.
- Rates are read from environment variables `import.meta.env` (Vite) when provided; otherwise fall back to in-code defaults.
- The stored box payload includes `cost` and `currency`. The table displays `cost` and currency (e.g. `7.35 INR`).

Example: sending 1 kg to Sweden with default rate 7.35 => cost 7.35 INR.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
