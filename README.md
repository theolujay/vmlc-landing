# VMLC Landing

> Public landing page for the **Verboheit Mathematics League Competition** (VMLC), a free annual mathematics competition for senior secondary school students (SS1–SS3) across Nigeria.

This Vite + React application serves as the marketing and information hub for the competition. Visitors can learn about the competition stages, register their interest, apply as volunteers, and find support resources.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Build & Deploy](#build--deploy)
- [Contributing](#contributing)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, Vite |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Icons | Lucide React |
| Face Detection | @vladmandic/face-api |
| Linting | ESLint + Prettier |
| Analytics | Vercel Analytics, Speed Insights |

---

## Project Structure

```
src/
├── pages/              Route pages (Home, About, Register, Support, etc.)
├── components/         Reusable UI components (Header, Footer, Cards, etc.)
├── utils/              Utility functions
├── App.tsx             Application root with routing
├── index.tsx           Entry point
└── index.css           Global styles (Tailwind imports)

dist/                   Production build output
public/                 Static assets (images, favicon, etc.)
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm (or pnpm, yarn)

### Installation & Development

```bash
npm install
npm run dev
```

The development server starts at [http://localhost:5173](http://localhost:5173).

---

## Build & Deploy

### Production Build

```bash
npm run build
```

Static files are output to `dist/` and can be served by any web server or static hosting provider.

### Deployment

The application is deployed to **Vercel** via GitHub Actions. Pushes to `dev` trigger an automatic deployment.

---

## Contributing

Branch from `main`, make your changes, then open a pull request against `release`.

```bash
git checkout -b feat/your-feature-name
```

Before submitting:

```bash
npm run lint
npm run build
```

---

Built for Verboheit · [verboheit.org](https://verboheit.org)
