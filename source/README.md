# LunR Code portfolio

Jireh’s React + Vite portfolio, with Code view, Simple view, and a separate project/skills gallery.

## Start here in VS Code

Open this **WebPortfolio** folder in VS Code. Start with [FILE_GUIDE.md](FILE_GUIDE.md) for a feature-by-feature map. The [src folder guide](src/README.md) gives a shorter overview.

- **src/data/**: edit your profile, jobs, certifications, skills/ratings, and projects here.
- **src/pages/**: layouts and styles for Simple view, the gallery, and the Code view workspace.
- **src/features/**: editor, tabs, terminal, introduction panel, skills, and sidebar controls.
- **src/components/**: shared branding, navigation, contact controls, and dialogs.
- **src/hooks/**: shared view preferences, transitions, and clipboard behavior.
- **src/utils/**: versioned gallery links and validated skill destinations.
- **src/App.jsx**: home-page state and commands. It keeps editor text/tabs alive while switching views.
- **public/**: public images, logos, project screenshots, favicon, and robots.txt.
- **tests/**: focused navigation and shared-content regression checks.

## Run locally

Open the VS Code terminal in this folder:

1. Run **npm install** if dependencies are not installed.
2. Run **npm run dev** and open the address it prints.
3. Press **Ctrl+C** in that terminal when you want to stop the preview.

## Check and format changes

- **npm run format**: format source code, styles, docs, and tests.
- **npm run check**: run tests, lint, formatting checks, and a production build.
- **npm run build**: generate the production website in **dist/**.
- **npm run preview**: view the built website locally.

Prettier is included as a development tool. You can install the Prettier VS Code extension if you want formatting from the editor; no global VS Code settings were changed.

## Publishing

The live site is hosted by the existing **IchinoseJiro/IchinoseJiro.github.io** repository. The separate publishing checkout contains built files at its root and an editable backup under **source/**.

Publish the contents of **dist/** to that repository’s root and sync the editable source backup. Keep previous hashed assets during routine releases so cached pages and already-open tabs can still load their dependencies. Gallery links include a build version to avoid reusing stale HTML.

The removed resume remains removed. Skill ratings are personal self-assessments, and every skill display follows the same ordered dataset.
