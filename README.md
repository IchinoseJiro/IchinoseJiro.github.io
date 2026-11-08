# LunR Code

Personal portfolio of Lowell Jireh P. Chantengco.

Live website: https://ichinosejiro.github.io/

This repository contains one GitHub Pages website. The root `index.html`, `portfolio.html`, and `assets/` directory are its published build. The `source/` directory holds the editable React + Vite project, including the existing images and project screenshots.

## Local development

```sh
cd source
npm ci
npm run dev
```

## Build

```sh
cd source
npm run build
```

The build is written to `source/dist/`. Publish that directory's contents at the repository root, keeping the source folder and documentation. GitHub Pages continues to deploy from the existing `main` branch and root folder.

Visitors can select Simple view or Code view from the View menu. Simple view opens by default on new visits and browser refreshes. The selected view carries between the home page and project gallery in the same tab.

Gallery navigation uses a release query generated at build time to avoid reusing cached HTML. Keep previous hashed assets during routine publishing so cached pages and already-open tabs can still load their dependencies. Both page entry points include a readable recovery screen for rendering errors.

## Editing the organized source

Open source/ in VS Code, then start with source/FILE_GUIDE.md or source/src/README.md. Pages, features, shared components, data, hooks, and utilities have separate folders. Run npm run check inside source/ for the regression tests, lint, formatting checks, and production build.
