# LunR Code: where to edit what

## How to navigate in VS Code

1. Open the **WebPortfolio** folder, not only a single file.
2. Use **Ctrl+P** and type a filename from the tables below.
3. Use **Ctrl+Shift+F** to search text across the project.
4. Use **Ctrl+Shift+O** to find a function/component in the current file.
5. Open VS Code’s Outline to see the functions and components in that file.

Start with [the source folder map](src/README.md). Each source file has comments explaining its responsibility.

## Project layout

| Folder/file                | Responsibility                                                         |
| -------------------------- | ---------------------------------------------------------------------- |
| src/App.jsx                | Home-page coordinator: state, menu commands, feature composition       |
| src/main.jsx               | Home HTML entry point                                                  |
| src/portfolio-main.jsx     | Gallery HTML entry point                                               |
| src/pages/simple/          | Readable Simple view layout and CSS                                    |
| src/pages/portfolio/       | Current/college project gallery layout and CSS                         |
| src/pages/code/            | Code workspace styling and responsive rules                            |
| src/features/editor/       | Editable panes, syntax renderer, tabs, split editor, text/history hook |
| src/features/workspace/    | Activity rail, Explorer, search, titlebar                              |
| src/features/introduction/ | Moon-button popup and drag-position hook                               |
| src/features/terminal/     | Typing-only CMD-style terminal                                         |
| src/features/skills/       | Shared cards, icons, popups, chart, and toolbox selection behavior     |
| src/components/branding/   | LunR Code logo and its styles                                          |
| src/components/contact/    | Contact copy button and social links                                   |
| src/components/navigation/ | Menus, orange hint, transition overlay                                 |
| src/components/dialogs/    | About, website guide, keyboard help, page recovery                     |
| src/data/                  | Profile, skills, project content shared across pages                   |
| src/hooks/                 | View selection, transition timing, clipboard confirmation              |
| src/utils/                 | Versioned gallery navigation and validated skill deep links            |
| src/styles/                | Global reset and shared cross-page enhancements                        |
| src/assets/                | Existing bundled assets retained from the project                      |
| public/images/             | Profile photo and HAU logo                                             |
| public/projects/           | Project screenshots                                                    |
| tests/                     | Navigation/content regression checks                                   |

## Change your content

- **Profile, jobs, education, contact information:** src/data/profileContent.js.
- **Certificates:** certificationDetails in profileContent.js. Existing public links open in a new tab; certificates without links point visitors to LinkedIn.
- **Skills:** src/data/skillsData.js. This single ordered dataset feeds Code view text, Simple view, toolbox icons, skill windows, and chart. Keep the existing category/item order rather than sorting by score or alphabetically.
- **Skill icons:** src/features/skills/SkillIcon.jsx. Each vector matches the skill’s id.
- **Projects:** src/data/projects.js. currentProject is the ongoing personal project; projects contains the college work and availability notes.
- **Photo/logos/screenshots:** public/. Use a leading slash for public asset paths, such as /images/HAU-logo.png.

PC Assembly includes Ethernet cable crimping in its description. System & Network Troubleshooting stays immediately after Network Device Configuration. The resume tab and downloadable PDF are intentionally absent.

## Code view controls

- **Menu layout:** components/navigation/ApplicationMenu.jsx. The actions supplied to it live in App.jsx.
- **Editor/history:** features/editor/usePortfolioDocuments.js. The Edit reset restores only document text/history; the orange Reload also resets the workspace and introduction.
- **Primary pane:** features/editor/CodeEditor.jsx. It synchronizes the textarea, syntax overlay, and line numbers.
- **Tabs/split pane:** features/editor/EditorTabs.jsx and SplitEditor.jsx.
- **Syntax tokens:** features/editor/highlightCode.jsx. Token colors are in pages/code/CodeView.css.
- **Sidebar/activity icons:** features/workspace/WorkspaceSidebar.jsx.
- **Terminal:** features/terminal/TerminalPanel.jsx. Text/history stays in App so switching views does not discard it. Commands are never executed.
- **Introduction popup:** features/introduction/IntroductionPanel.jsx. Its pointer behavior and bounds are in useIntroPanel.js.

## Simple view and gallery navigation

- **Simple page:** pages/simple/SimpleView.jsx and SimpleView.css.
- **Gallery:** pages/portfolio/Portfolio.jsx and Portfolio.css.
- **Shared skill selection/UI:** features/skills/Skills.jsx.
- **Details and chart:** features/skills/SkillDialog.jsx.
- **Skill emphasis, blur, and chart styles:** features/skills/SkillsInteractions.css.
- **Gallery URL helper:** utils/portfolioNavigation.js. It uses the build release ID from vite.config.js to avoid cached gallery HTML.

A Simple-view skill click highlights the skill/toolbox link, applies light blur, and scrolls to the link if necessary. The highlighted link carries the matching skill ID to the gallery and opens its popup. Ordinary toolbox links open the list; Code-view skill links highlight the matching card. Invalid IDs never open an unrelated skill. Navigation stays above the spotlight while scrolling.

## Shared dialogs and view behavior

- **About/photo/progress note:** components/dialogs/AboutPortfolio.jsx.
- **Website instructions:** components/dialogs/WebsiteGuide.jsx and WebsiteGuide.css.
- **Keyboard help:** components/dialogs/KeyboardShortcuts.jsx.
- **Error recovery:** components/dialogs/PageErrorBoundary.jsx, wrapping both entry points.
- **View preference:** hooks/useViewMode.js. Refresh opens Code view; normal navigation carries the chosen mode.
- **Four-second transition:** hooks/useViewTransition.js. Reduced-motion timing remains shorter.
- **Loading wording/visual:** components/navigation/ViewTransition.jsx and ViewTransition.css.
- **Shared clipboard status:** hooks/useCopyContact.js and components/contact/ContactCopyButton.jsx.

## Styles and imports

Component/page CSS is colocated where practical. Code workspace compatibility rules remain together in pages/code/CodeView.css and Workspace.css. Shared enhancements are in styles/portfolio-shared.css. Existing selectors and import order are preserved so this refactor does not redesign the website.

When adding a component, use a relative import to its actual folder. Do not move public files into src unless you also change how they are imported. Main HTML files and package/Vite configuration stay at the project root.

## Checks before publishing

Run **npm run check** to run 10 focused tests, lint, formatting checks, and the production build. Use **npm run format** after editing.

Also preview and check Code/Simple switching, edited text/tabs, reset, menus, contact copying, intro/guide/About, terminal history, gallery links, all skill interactions, the chart, and phone/tablet layouts. Automated tests cover shared content and URL behavior; they do not replace browser interaction checks.

## Publishing and backups

The canonical editable project is this WebPortfolio folder. The existing GitHub Pages publishing checkout stores built files at its root and an editable project backup under source/. Sync source file moves as moves; do not leave stale duplicate source files behind.

Build with **npm run build**, copy dist/ to the existing deployment root, and keep previous hashed production assets so cached pages still have their dependencies. Update the source backup, commit the checked changes, and confirm GitHub Pages succeeds. Never publish node_modules or the local source backup directory.

The pre-refactor source snapshot was saved outside this project under the Codex workspace in portfolio-refactor-backup-20261106.

## Root files

| File                               | Purpose                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| index.html / portfolio.html        | Browser entry documents and metadata                                            |
| vite.config.js                     | React build, both pages, release ID                                             |
| package.json / package-lock.json   | Scripts and installed dependency versions; valid JSON does not support comments |
| .oxlintrc.json                     | Lint checks                                                                     |
| .prettierrc.json / .prettierignore | Consistent formatting; generated files excluded                                 |
| README.md                          | Setup commands and folder overview                                              |
| FILE_GUIDE.md                      | This detailed map                                                               |

No global VS Code preferences were changed. If VS Code shows an old unsaved buffer after the refactor, review it before saving it over the reorganized files.
