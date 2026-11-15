// Shared skill categories, descriptions, icons, and colors. Every display uses this order.
export const skillGroups = [
  {
    title: 'Web languages & styling',
    skills: [
      {
        id: 'html',
        name: 'HTML5',
        color: '#ee9776',
        description:
          'Structures web pages with headings, links, forms, images, and semantic content.',
      },
      {
        id: 'css',
        name: 'CSS3',
        color: '#76baff',
        description:
          'Styles web pages, including colors, layouts, responsive designs, and animations.',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        color: '#e6cf79',
        description: 'Adds browser interactions and application logic to websites.',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        color: '#8bc4f4',
        description:
          'Adds static types to JavaScript to help describe data and catch mistakes during development.',
      },
    ],
  },
  {
    title: 'Backend development',
    skills: [
      {
        id: 'php',
        name: 'PHP',
        color: '#b4a9e5',
        description:
          'A server-side scripting language used to create dynamic websites and handle web requests.',
      },
      {
        id: 'node',
        name: 'Node.js',
        color: '#a0cc87',
        description:
          'A JavaScript runtime used to run code outside the browser, including servers and development tools.',
      },
      {
        id: 'express',
        name: 'Express.js',
        color: '#becbd8',
        description: 'A lightweight Node.js framework for defining server routes and web APIs.',
      },
      {
        id: 'django',
        name: 'Django',
        color: '#8ac7ad',
        description:
          'A Python web framework for building backend applications with URL routing, database models, forms, and an administration interface.',
      },
    ],
  },
  {
    title: 'Frontend frameworks',
    skills: [
      {
        id: 'react',
        name: 'React',
        color: '#7dcfff',
        description: 'A JavaScript library for building interfaces from reusable components.',
      },
      {
        id: 'vue',
        name: 'Vue',
        color: '#8acdae',
        description:
          'A JavaScript framework for building reactive interfaces and web applications.',
      },
      {
        id: 'angular',
        name: 'Angular',
        color: '#e898a8',
        description:
          'A web framework with tools for components, routing, forms, and application structure.',
      },
      {
        id: 'next',
        name: 'Next.js',
        color: '#d4dde8',
        description:
          'A React framework that adds routing and options for server rendering and static pages.',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        color: '#81d6dc',
        description: 'A CSS framework that uses utility classes to compose responsive designs.',
        note: 'Tailwind CSS is my favorite framework.',
      },
    ],
  },
  {
    title: 'Programming languages',
    skills: [
      {
        id: 'python',
        name: 'Python',
        color: '#8ab9df',
        description:
          'A general-purpose language used for scripting, automation, data processing, and web development.',
      },
      {
        id: 'java',
        name: 'Java',
        color: '#e8a38b',
        description: 'An object-oriented language used for applications and server-side systems.',
      },
      {
        id: 'cpp',
        name: 'C++',
        color: '#9fbaf2',
        description:
          'A compiled language used for performance-focused applications and systems programming.',
      },
      {
        id: 'c',
        name: 'C',
        color: '#a4bfd9',
        description:
          'A compiled language used for low-level programming, operating systems, and embedded software.',
      },
      {
        id: 'csharp',
        name: 'C#',
        color: '#c4a4ef',
        description:
          'A language in the .NET ecosystem used for web services, desktop applications, and games.',
      },
    ],
  },
  {
    title: 'Databases',
    skills: [
      {
        id: 'mysql',
        name: 'MySQL',
        color: '#8cc7df',
        description:
          'A relational database that stores structured information in tables and uses SQL queries.',
      },
      {
        id: 'mongo',
        name: 'MongoDB',
        color: '#95c899',
        description: 'A document database that stores flexible records in a JSON-like format.',
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        color: '#a1c0e6',
        description: 'An open-source relational database used for structured data and SQL queries.',
      },
    ],
  },
  {
    title: 'Design & development tools',
    skills: [
      {
        id: 'wix',
        name: 'Wix',
        color: '#c6b5ec',
        description:
          'A visual website-building platform with design, content, and site-management tools.',
      },
      {
        id: 'canva',
        name: 'Canva',
        color: '#90dbe0',
        description:
          'A visual design tool for creating graphics, presentations, and other visual content.',
      },
      {
        id: 'figma',
        name: 'Figma',
        color: '#d2afea',
        description:
          'A collaborative interface design tool for layouts, components, and prototypes.',
      },
      {
        id: 'github',
        name: 'GitHub',
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
        color: '#9bbbd7',
        description:
          'Assembling PC components, connecting hardware, managing cables, and preparing a computer for use. This skill also includes Ethernet cable crimping.',
      },
      {
        id: 'diagnostics',
        name: 'Hardware Diagnostics',
        color: '#d6b78c',
        description: 'Checking computer components and symptoms to help identify hardware faults.',
      },
      {
        id: 'network',
        name: 'Network Device Configuration',
        color: '#9cbee9',
        description: 'Setting up network equipment and its connectivity settings.',
      },
      {
        id: 'support',
        name: 'System & Network Troubleshooting',
        color: '#b9acd9',
        description:
          'Investigating operating-system and network issues to identify causes and restore functionality.',
      },
    ],
  },
]

export const allSkills = skillGroups.flatMap((group) => group.skills)
