# Find the code for a website feature

| What you want to change                                               | Start here                                                             |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Your name, education, work history, certificates, contact information | data/profileContent.js                                                 |
| Skill categories, colors, descriptions                                | data/skillsData.js                                                     |
| Current/college project details and live link                         | data/projects.js                                                       |
| Simple view layout                                                    | pages/simple/SimpleView.jsx                                            |
| Project gallery layout                                                | pages/portfolio/Portfolio.jsx                                          |
| Code view layout, commands, state                                     | App.jsx                                                                |
| Code view styles and responsive workspace rules                       | pages/code/                                                            |
| Top File / Edit / View / Help menus                                   | components/navigation/ApplicationMenu.jsx (layout), App.jsx (commands) |
| Left rail, Explorer, search, bottom toolbox                           | features/workspace/WorkspaceSidebar.jsx                                |
| Editable code and syntax colors                                       | features/editor/CodeEditor.jsx, highlightCode.jsx                      |
| Undo, redo, text reset, clipboard, selection tools                    | features/editor/usePortfolioDocuments.js                               |
| Tabs and split editor                                                 | features/editor/EditorTabs.jsx, SplitEditor.jsx                        |
| Moon-button introduction popup and dragging                           | features/introduction/                                                 |
| Typing-only terminal                                                  | features/terminal/TerminalPanel.jsx                                    |
| Skills cards, handoff/highlighting, sidebar icons                     | features/skills/Skills.jsx                                             |
| Gallery category carousels                                            | features/skills/SkillCarousel.jsx, SkillCarousel.css                   |
| Shared skill card                                                     | features/skills/SkillCard.jsx                                          |
| Skill icon vectors                                                    | features/skills/SkillIcon.jsx                                          |
| Skill description popup                                               | features/skills/SkillDialog.jsx                                        |
| Copy email/phone buttons                                              | components/contact/ContactCopyButton.jsx, hooks/useCopyContact.js      |
| LinkedIn / GitHub links                                               | components/contact/SocialLinks.jsx                                     |
| LunR Code branding                                                    | components/branding/                                                   |
| About, guide, shortcuts, error recovery                               | components/dialogs/                                                    |
| View preferences and transition duration                              | hooks/useViewMode.js, useViewTransition.js                             |
| Loading animation and wording                                         | components/navigation/ViewTransition.jsx                               |
| Theme startup and persistence                                         | public/theme-init.js, hooks/useTheme.js                                |
| Light-theme colors                                                    | styles/theme.css                                                       |
| View → Theme submenu                                                  | components/navigation/ThemeSubmenu.jsx, ThemeSubmenu.css               |
| Gallery View menu                                                     | components/navigation/ViewModeMenu.jsx                                 |
| Project/skill URLs                                                    | utils/portfolioNavigation.js                                           |

CSS stays beside its owning component/page where possible. Shared Code workspace rules remain together in pages/code/ to preserve their existing cascade. Shared cross-page additions live in styles/portfolio-shared.css. Avoid moving those imports casually; their order affects the design.

The two root entry files, main.jsx and portfolio-main.jsx, are loaded by the two HTML files at the project root.
