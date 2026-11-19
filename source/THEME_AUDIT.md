# Theme audit

## Corrections

- The college-project screenshot action inherited primary-button colors despite having no horizontal padding. It now uses a padded, bordered secondary action in Light, with its arrow aligned on the right.
- Inactive editor tabs, the closed-window card, screenshot close controls, and gallery Explorer hover states retained dark colors. Their light surfaces and readable foregrounds now match the rest of the interface.
- Added missing light hover, pressed, expanded-menu, focus, and disabled treatments. Harmonized dividers, screenshot/card shadows, sidebar icon opacity, and view-transition decoration.
- The error recovery screen now uses shared theme tokens. Minor dark text-contrast corrections retain the existing layout and palette.
- Shared variables cover elevated surfaces, muted text, controls, focus, overlays, shadows, syntax colors, semantic colors, and scrollbars. Photographs and project screenshots are not recolored.

## Theme confirmation

Both entries use one ThemeProvider and request context. A dark-to-light selection closes the menu and opens a native modal. Only confirmation saves Light. Cancel, Escape, and an outside click retain Dark and restore focus to View. Native modal behavior keeps background controls inert and contains keyboard focus.

Light-to-dark selection remains immediate. Loading a saved Light preference uses the existing head script and never prompts. Theme changes preserve the mounted workspace, documents, and tabs. Brief entrance/exit motion is skipped when reduced motion is requested.

## Verification

- Project checks: Node tests, lint, formatting, and both Vite entry builds.
- Browser checks: Simple view, Code view, and Projects & Skills at desktop, tablet, narrow phone, and short landscape dimensions.
- Both-theme text contrast sampled in all home sections, navigation menus, introduction, About, website guide, keyboard help, split editor, terminal, minimized/closed states, project cards, screenshot viewer, and skill dialogs.
- Hover checks cover visible home/gallery links and buttons, gallery Explorer, and Code view controls. Existing selected and pressed states use theme-appropriate tokens.
- Actual mouse, keyboard, and touch theme selection; confirmation/cancellation, Escape, outside click, focus containment/restoration, and no duplicate confirmation.
- Saved preference survives refresh and page navigation; startup instrumentation confirms the saved theme at DOMContentLoaded without a prompt. The blocking head script still precedes styles.
- Contact-copy feedback, carousel movement, screenshot and skill dialogs, editor/tab retention, split controls, terminal, and recovery screen exercised in the browser.

The contrast sampling checks rendered text against composited solid CSS surfaces; it is not a full accessibility certification or an assessment of text embedded inside project screenshots.
