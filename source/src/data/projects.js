// Current project: screenshot metadata and live Vercel address.
export const currentProject = {
  id: 'carecircle',
  title: 'CareCircle',
  image: '/projects/carecircle.jpg',
  width: 1440,
  height: 1000,
  alt: 'CareCircle household dashboard showing shared chores, weekly progress, household members, and recent activity.',
  url: 'https://re-spawnpoint.vercel.app/?demo=1',
  focus: 'A little more in sync, one chore at a time.',
  description:
    'An ongoing personal SaaS project that helps households share chores, coordinate responsibilities, and keep track of everyday routines. Built with Supabase authentication and PostgreSQL for shared household data.',
  features: [
    'Create, assign, and complete chores with daily or weekly recurrence',
    'Track household progress, recent activity, and due or overdue chores',
    'Manage household members and roles, with a separate interactive portfolio demo',
  ],
  technologies: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'PostgreSQL'],
  previewNote:
    'The live preview uses sample household data saved in your browser. Real households use Supabase authentication and shared storage.',
}

// College projects: descriptions, technologies, screenshots, and availability notes.
export const projects = [
  {
    id: 'coffeego',
    number: '01',
    title: 'COFFEEGO',
    folder: 'coffeego',
    course: 'Advanced Database Systems',
    database: 'MongoDB',
    description:
      'A project under Advanced Database Systems. The website we made uses HTML, CSS, and MongoDB.',
    availability: "Unfortunately, I've lost the copy of our project for this one.",
    image: '/projects/coffeego.png',
    width: 1897,
    height: 896,
    alt: 'COFFEEGO college website with an orange navigation bar, coffee bean artwork, and an Order Now button.',
    accent: '#d9a465',
  },
  {
    id: 'autoworld',
    number: '02',
    title: 'Autoworld Carwash',
    folder: 'autoworld-carwash',
    course: 'WebServer',
    database: 'MySQL',
    description:
      'A project under WebServer. The website we made consists of HTML and CSS, with MySQL for the backend.',
    availability:
      "This one was requested to be dissolved by the owner and didn't approve to let us have a copy.",
    image: '/projects/autoworld-carwash.png',
    width: 1864,
    height: 1470,
    alt: 'Autoworld Carwash college website showing a car workshop, a car wash request form, and an About Us section.',
    accent: '#e9868b',
  },
]
