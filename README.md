# LUMA Landing Page

Landing page for LUMA, built with React and Vite.

## Stack

- React 19
- Vite
- Tailwind CSS
- Motion

## Local Development

Requirements:

- Node.js 20+
- npm

Run locally:

```bash
npm install
npm run dev
```

Default dev server:

- http://localhost:3000

## Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploying To Vercel

This project is a standard Vite app, so Vercel can build it without extra configuration.

Recommended settings:

- Build command: `npm run build`
- Output directory: `dist`

## Asset Paths

Static images are served from `public/screenshots`.

Do not hardcode public asset URLs with a leading slash like `/screenshots/...` when the app may be deployed under a non-root base path. In this project, asset URLs are resolved through `import.meta.env.BASE_URL`, which keeps images and favicon paths working correctly after deployment.
