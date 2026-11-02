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

Visitors can select Simple view or Code view from the View menu. Their selected mode is remembered on the home page and project gallery.
