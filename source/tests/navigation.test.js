// Regression coverage for normal toolbox navigation and the selected-skill handoff.
import test from 'node:test'
import assert from 'node:assert/strict'
import { portfolioUrl, getSkillDestination } from '../src/utils/portfolioNavigation.js'
import { allSkills } from '../src/data/skillsData.js'

const destination = (href) =>
  getSkillDestination(new URL(href, 'https://portfolio.test'), allSkills)
test('ordinary toolbox links open the list without a details popup', () => {
  const url = new URL(portfolioUrl('skills'), 'https://portfolio.test')
  assert.equal(url.pathname, '/portfolio.html')
  assert.ok(url.searchParams.get('v'))
  assert.equal(url.hash, '#skills')
  assert.equal(destination(url).openDetails, false)
})
test('every catalog skill survives the Simple view to toolbox handoff', () => {
  for (const skill of allSkills) {
    const result = destination(portfolioUrl('skill-' + skill.id, skill.id))
    assert.equal(result.skill, skill)
    assert.equal(result.openDetails, true)
  }
})
test('Code view links highlight the card without forcing its popup', () => {
  const result = destination(portfolioUrl('skill-react'))
  assert.equal(result.skill.id, 'react')
  assert.equal(result.openDetails, false)
})
test('unknown or mismatched requests never open another skill', () => {
  assert.equal(destination('/portfolio.html?details=react#skill-css').openDetails, false)
  assert.equal(destination('/portfolio.html?details=unknown#skill-unknown').skill, undefined)
  assert.equal(destination('/portfolio.html?details=react#skills').openDetails, false)
})
test('navigation safely encodes query values', () => {
  const url = new URL(portfolioUrl('skills', 'react&unexpected=true'), 'https://portfolio.test')
  assert.equal(url.searchParams.get('details'), 'react&unexpected=true')
  assert.equal(url.searchParams.has('unexpected'), false)
})
