// Protect content shared by Code view, Simple view, the toolbox, and chart.
import test from 'node:test'
import assert from 'node:assert/strict'
import { allSkills, skillGroups } from '../src/data/skillsData.js'
import { files, initialDocuments } from '../src/data/profileContent.js'
import { currentProject, projects } from '../src/data/projects.js'

test('skill IDs are unique, descriptions exist, and ratings stay within the 0–10 scale', () => {
  assert.equal(new Set(allSkills.map((skill) => skill.id)).size, allSkills.length)
  for (const skill of allSkills) {
    assert.ok(Number.isFinite(skill.score) && skill.score >= 0 && skill.score <= 10)
    assert.ok(skill.name && skill.description && skill.color)
  }
  assert.deepEqual(
    allSkills,
    skillGroups.flatMap((group) => group.skills),
  )
})
test('network troubleshooting stays adjacent and Ethernet stays part of PC Assembly', () => {
  const ids = allSkills.map((skill) => skill.id)
  assert.equal(ids[ids.indexOf('network') + 1], 'support')
  assert.equal(ids.includes('ethernet'), false)
  assert.match(allSkills.find((skill) => skill.id === 'pc').description, /Ethernet/)
})
test('editable documents retain every shared skill in the agreed category order', () => {
  let position = -1
  for (const skill of allSkills) {
    const next = initialDocuments['skills.jsx'].indexOf(skill.name, position + 1)
    assert.ok(next > position, skill.name + ' missing or out of order')
    position = next
  }
})
test('only the four intended editor files exist; the removed resume stays removed', () => {
  assert.deepEqual(files, ['about.jsx', 'experience.jsx', 'skills.jsx', 'contact.jsx'])
  assert.deepEqual(Object.keys(initialDocuments), files)
})
test('current and college project content retains its existing destinations and screenshots', () => {
  assert.equal(new URL(currentProject.url).hostname, 're-spawnpoint.vercel.app')
  assert.deepEqual(
    projects.map((project) => project.id),
    ['coffeego', 'autoworld'],
  )
  for (const project of [currentProject, ...projects]) assert.ok(project.image && project.alt)
})
