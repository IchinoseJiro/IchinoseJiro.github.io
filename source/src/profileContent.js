import { skillGroups } from './skillsData.js'

export const profile = {
  name: 'Lowell Jireh P. Chantengco', goesBy: 'Jireh', role: 'Web Developer',
  location: 'Porac, Pampanga', education: 'Holy Angel University',
  degree: 'BS Information Technology', specialization: 'Web Development',
  graduated: 'November 2025',
  summary: 'Fresh graduate with entry-level front-end and back-end experience, and project-based website development using React.js and Python.',
}
export const experience = [
  { role: 'Customer Service Representative', company: 'Sutherland · Clark', dates: 'May 18, 2026 – August 8, 2026', details: [
    'Handled incoming calls for Amazon Audible customers; resolved account, billing, app, download, and playback issues.',
    'Provided friendly support, followed service guidelines, and protected customer data.',
    'Delivered reliable service each shift.',
  ] },
  { role: 'ISD Intern', company: 'Clark Outsourcing', dates: 'July – October 2025', details: [
    'Maintained and troubleshot computer systems, workstations, and network components.',
    'Set up PCs, performed routine maintenance and hardware diagnostics, managed cables, crimped Ethernet cables, configured basic network equipment, and monitored performance.',
    'Provided day-to-day technical support to employees.',
  ] },
]
export const certifications = ['Agile Project Management', 'AI for Beginners', 'JavaScript Algorithms & Data Structures', 'Responsive Web Design']
export const contact = {
  email: 'ljp.chantengco@gmail.com', phone: '+63 919 387 2346', location: profile.location,
  linkedIn: 'https://www.linkedin.com/in/lowell-jireh-chantengco-22957936b', github: 'https://github.com/IchinoseJiro',
}
export const files = ['about.jsx', 'experience.jsx', 'skills.jsx', 'contact.jsx']
export const sectionForFile = { About: files[0], Experience: files[1], Skills: files[2], Contact: files[3] }
const format = value => JSON.stringify(value, null, 2)
const web = skillGroups.filter(group => group.title !== 'Hands-on IT').flatMap(group => group.skills.map(skill => skill.name))
const IT = skillGroups.find(group => group.title === 'Hands-on IT').skills.map(skill => skill.name)
export const initialDocuments = {
  'about.jsx': `// A little about me\nconst developer = ${format(profile)}\n\nexport default developer`,
  'experience.jsx': `// Work experience & certifications\nconst experience = ${format(experience)}\n\nconst certifications = ${format(certifications)}\n\nexport default { experience, certifications }`,
  'skills.jsx': `// Web development & technical skills\nconst web = ${format(web)}\n\nconst IT = ${format(IT)}\n\nexport default { web, IT }`,
  'contact.jsx': `// Contact details\nconst contact = ${format(contact)}\n\nexport default contact`,
}
