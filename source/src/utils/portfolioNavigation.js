// Keep every home-to-gallery route on the same deployed release.
// The query changes with each build; section anchors continue to select the right skill.
export function portfolioUrl(anchor = '', detailSkill = '') {
  const release = import.meta.env?.VITE_BUILD_ID || 'current'
  return (
    '/portfolio.html?v=' +
    encodeURIComponent(release) +
    (detailSkill ? '&details=' + encodeURIComponent(detailSkill) : '') +
    (anchor ? '#' + anchor : '')
  )
}

// Validate deep links against the shared catalog; unknown/mismatched IDs never open a popup.
export function getSkillDestination(location, skills) {
  const skill = skills.find((item) => '#skill-' + item.id === location.hash)
  return {
    skill,
    openDetails: Boolean(skill && new URLSearchParams(location.search).get('details') === skill.id),
  }
}
