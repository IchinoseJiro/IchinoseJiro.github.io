// Keep every home-to-gallery route on the same deployed release.
// The query changes with each build; section anchors continue to select the right skill.
export function portfolioUrl(anchor = '', detailSkill = '') {
  const release = import.meta.env.VITE_BUILD_ID || 'current'
  return '/portfolio.html?v=' + encodeURIComponent(release) + (detailSkill ? '&details=' + encodeURIComponent(detailSkill) : '') + (anchor ? '#' + anchor : '')
}
