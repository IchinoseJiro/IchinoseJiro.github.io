# LunR Code: where to edit each part

Open this folder in VS Code: WebPortfolio. Start with this guide, then open the matching file below.

## Find a website section

| What you want to change | Content / behavior | Appearance |
| --- | --- | --- |
| Code view window, Reload, menus, left icons, Explorer | src/App.jsx | src/App.css, src/HomeWorkspace.css |
| Editable information shown to website visitors | src/profileContent.js | Editor rules in src/App.css |
| File tabs, split editor, typing, undo/redo | src/App.jsx | src/App.css, src/HomeWorkspace.css |
| Bottom typing-only terminal | src/App.jsx | Terminal blocks in src/App.css |
| Draggable introduction popup | src/App.jsx | Intro blocks in src/App.css |
| Simple view header and profile sections | src/SimpleView.jsx | src/SimpleView.css |
| Name, About text, Education, work history, certifications | src/profileContent.js | src/SimpleView.css |
| HAU logo in Education | src/SimpleView.jsx, public/images/HAU-logo.png | Education blocks in src/SimpleView.css |
| Project gallery, current Re-spawnpoint project, and college cards | src/Portfolio.jsx | src/Portfolio.css |
| Re-spawnpoint website link | currentProject.url in src/Portfolio.jsx | Live-preview button in src/Portfolio.css |
| Project screenshots | public/projects/ | Image blocks in src/Portfolio.css |
| Skills names, categories, and colors | src/skillsData.js | src/Skills.css |
| Skills vectors, sidebar toolbox, and full cards | src/Skills.jsx | src/Skills.css |
| LinkedIn and GitHub links | src/SocialLinks.jsx; addresses in src/profileContent.js | src/SocialLinks.css |
| Orange project/view instruction box | src/NavigationHint.jsx | Hint blocks in src/App.css and src/SimpleView.css |
| Help > About this Portfolio popup | src/AboutPortfolio.jsx | About blocks in src/App.css, src/HomeWorkspace.css, src/SimpleView.css |
| Portrait | public/images/jireh-portrait.jpg | Portrait blocks in src/SimpleView.css and src/HomeWorkspace.css |
| LunR Code logo | src/BrandLogo.jsx, public/lunr-code.svg | src/BrandLogo.css |
| Browser-tab favicon | public/favicon.svg; link in both HTML files | SVG colors inside the file |
| Default Code/Simple mode and saved selection | src/useViewMode.js | The selected view uses its own CSS |
| Standalone view menu retained for reuse; not displayed in current gallery | src/ViewModeMenu.jsx | src/ViewModeMenu.css |
| Global background, fonts, and minimum page width | src/index.css | Same file |

## HTML and startup files

- index.html: home-page browser title, favicon, search/social descriptions, mobile viewport, and React mount point.
- src/main.jsx: starts the home-page React app. Its visible content lives in App.jsx and SimpleView.jsx.
- portfolio.html: gallery browser title, description, favicon, viewport, and mount point.
- src/portfolio-main.jsx: starts the gallery React app. Its visible content lives in Portfolio.jsx.
- vite.config.js: build settings for the two HTML pages.
- public/robots.txt: crawler instructions; this does not guarantee search indexing.
- public/icons.svg: reusable SVG symbol collection. src/assets contains leftover starter assets; current branding uses public/lunr-code.svg.

## How to read the notes

- JavaScript uses // comments.
- Inside React markup, comments use {/* ... */}.
- CSS uses /* ... */. Each rule is now expanded with a label naming its website area and selectors.
- HTML and SVG use <!-- ... --> comments.
- CSS color changes text, background changes a surface, padding adds inner space, margin adds outer space, and gap separates flex/grid items.
- A CSS @media block changes rules for a screen size or user preference. Later matching rules can override earlier rules; preserve their order.
- Search a section label with Ctrl+F in the open file, or Ctrl+Shift+F across the project.

## Configuration files that cannot contain comments

package.json, package-lock.json, and .oxlintrc.json are JSON. Adding // comments would break them, so their explanation belongs here:

- package.json: project dependencies and scripts. npm run dev starts a local preview, npm run build creates the deployable dist folder, and npm run lint checks code.
- package-lock.json: generated dependency versions. Let npm maintain this file.
- .oxlintrc.json: lint rules used by npm run lint.
- .gitignore: lists local files and generated folders that Git should ignore.

## Source versus published output

Edit these source files, then run npm run build. Do not manually edit dist or bundled assets: rebuilding replaces them. The GitHub repository stores editable files under source/ and serves the production build from its root.

VS Code can restore an old unsaved tab after restarting. If a tab has a dot, do not blindly save or discard it. Compare its unsaved contents with the saved file first using File: Compare Active File with Saved from the Command Palette. The website and browser editor are different from these real source files.
