// Single source for skill category order, icon IDs, descriptions, colors, and personal ratings.
// Keep this array in the requested order; every display derives from it without sorting.
export const skillGroups = [
  {
    title: 'Languages & styling',
    skills: [
      {
        id: 'html',
        name: 'HTML5',
        score: 8,
        color: '#ee9776',
        description:
          'Structures web pages with headings, links, forms, images, and semantic content.',
      },
      {
        id: 'css',
        name: 'CSS3',
        score: 8,
        color: '#76baff',
        description:
          'Styles web pages, including colors, layouts, responsive designs, and animations.',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        score: 7,
        color: '#e6cf79',
        description: 'Adds browser interactions and application logic to websites.',
      },
      {
        id: 'python',
        name: 'Python',
        score: 7,
        color: '#8ab9df',
        description:
          'A general-purpose language used for scripting, automation, data processing, and web development.',
      },
      {
        id: 'java',
        name: 'Java',
        score: 6,
        color: '#e8a38b',
        description: 'An object-oriented language used for applications and server-side systems.',
      },
      {
        id: 'cpp',
        name: 'C++',
        score: 8,
        color: '#9fbaf2',
        description:
          'A compiled language used for performance-focused applications and systems programming.',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        score: 7,
        color: '#8bc4f4',
        description:
          'Adds static types to JavaScript to help describe data and catch mistakes during development.',
      },
      {
        id: 'php',
        name: 'PHP',
        score: 6.5,
        color: '#b4a9e5',
        description:
          'A server-side scripting language used to create dynamic websites and handle web requests.',
      },
      {
        id: 'c',
        name: 'C',
        score: 6,
        color: '#a4bfd9',
        description:
          'A compiled language used for low-level programming, operating systems, and embedded software.',
      },
      {
        id: 'csharp',
        name: 'C#',
        score: 6.8,
        color: '#c4a4ef',
        description:
          'A language in the .NET ecosystem used for web services, desktop applications, and games.',
      },
    ],
  },
  {
    title: 'Frameworks & platforms',
    skills: [
      {
        id: 'react',
        name: 'React',
        score: 8,
        color: '#7dcfff',
        description: 'A JavaScript library for building interfaces from reusable components.',
      },
      {
        id: 'vue',
        name: 'Vue',
        score: 9,
        color: '#8acdae',
        description:
          'A JavaScript framework for building reactive interfaces and web applications.',
      },
      {
        id: 'angular',
        name: 'Angular',
        score: 8,
        color: '#e898a8',
        description:
          'A web framework with tools for components, routing, forms, and application structure.',
      },
      {
        id: 'node',
        name: 'Node.js',
        score: 6,
        color: '#a0cc87',
        description:
          'A JavaScript runtime used to run code outside the browser, including servers and development tools.',
      },
      {
        id: 'express',
        name: 'Express.js',
        score: 7,
        color: '#becbd8',
        description: 'A lightweight Node.js framework for defining server routes and web APIs.',
      },
      {
        id: 'wix',
        name: 'Wix',
        score: 8,
        color: '#c6b5ec',
        description:
          'A visual website-building platform with design, content, and site-management tools.',
      },
      {
        id: 'next',
        name: 'Next.js',
        score: 7,
        color: '#d4dde8',
        description:
          'A React framework that adds routing and options for server rendering and static pages.',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        score: 8.7,
        color: '#81d6dc',
        description: 'A CSS framework that uses utility classes to compose responsive designs.',
      },
    ],
  },
  {
    title: 'Databases',
    skills: [
      {
        id: 'mysql',
        name: 'MySQL',
        score: 6,
        color: '#8cc7df',
        description:
          'A relational database that stores structured information in tables and uses SQL queries.',
      },
      {
        id: 'mongo',
        name: 'MongoDB',
        score: 6,
        color: '#95c899',
        description: 'A document database that stores flexible records in a JSON-like format.',
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        score: 5,
        color: '#a1c0e6',
        description: 'An open-source relational database used for structured data and SQL queries.',
      },
    ],
  },
  {
    title: 'Design & development tools',
    skills: [
      {
        id: 'canva',
        name: 'Canva',
        score: 8,
        color: '#90dbe0',
        description:
          'A visual design tool for creating graphics, presentations, and other visual content.',
      },
      {
        id: 'figma',
        name: 'Figma',
        score: 6,
        color: '#d2afea',
        description:
          'A collaborative interface design tool for layouts, components, and prototypes.',
      },
      {
        id: 'github',
        name: 'GitHub',
        score: 6.8,
        color: '#c1ccdc',
        description:
          'A platform for hosting Git repositories, tracking changes, and collaborating on code.',
      },
    ],
  },
  {
    title: 'Web optimization',
    skills: [
      {
        id: 'seo',
        name: 'SEO',
        score: 4,
        color: '#89d4bf',
        description:
          'Search engine optimization helps search engines understand web pages and people discover them through search, using clear content, page titles, metadata, and site structure.',
      },
    ],
  },
  {
    title: 'Practical IT skills',
    skills: [
      {
        id: 'pc',
        name: 'PC Assembly',
        score: 10,
        color: '#9bbbd7',
        description:
          'Assembling PC components, connecting hardware, managing cables, and preparing a computer for use. This skill also includes Ethernet cable crimping.',
      },
      {
        id: 'diagnostics',
        name: 'Hardware Diagnostics',
        score: 7,
        color: '#d6b78c',
        description: 'Checking computer components and symptoms to help identify hardware faults.',
      },
      {
        id: 'network',
        name: 'Network Device Configuration',
        score: 3,
        color: '#9cbee9',
        description: 'Setting up network equipment and its connectivity settings.',
      },
      {
        id: 'support',
        name: 'System & Network Troubleshooting',
        score: 5,
        color: '#b9acd9',
        description:
          'Investigating operating-system and network issues to identify causes and restore functionality.',
      },
    ],
  },
]

// Flat ordered view for toolboxes, charts, and lookups; no separate priority ordering.
export const allSkills = skillGroups.flatMap((group) => group.skills)
