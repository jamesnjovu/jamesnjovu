/**
 * Every piece of copy and résumé data on the site lives here, so the components
 * stay presentational and facts are stated in exactly one place.
 */

export const profile = {
  name: 'James Njovu',
  role: 'Senior Software Engineer',
  location: 'Lusaka, Zambia',
  startYear: 2020,
  email: 'njovujames@gmail.com',
  phone: '+260 978 921730',
  resume: '/jamesnjovu/resume.pdf',
  summary:
    'I build and maintain mission-critical financial systems in the Elixir/Phoenix ecosystem — mobile-money integrations, high-throughput APIs, and the internal tooling teams rely on. I care about well-factored interfaces, measurable performance work, and libraries other engineers can pick up without reading the source.',
  links: {
    github: 'https://github.com/jamesnjovu',
    linkedin: 'https://www.linkedin.com/in/james-njovu-0a71181b2/',
    hex: 'https://hex.pm/users/jamesnjovu',
  },
};

export const work = [
  {
    role: 'Senior Software Engineer',
    company: 'Probase Limited Zambia',
    period: 'Aug 2020 — Present',
    summary:
      'Lead development on mission-critical financial systems. Own API design and code review practice, and mentor junior engineers.',
    highlights: [
      'Designed and shipped RESTful APIs across 10+ endpoints, improving mobile-app query flexibility by 40%',
      'Authored an Elixir dependency for mobile-network-operator integration, cutting integration code complexity by 30% and increasing delivery speed by 20%',
      'Optimised database access paths for a 50% improvement in application response time',
      'Mentored 3 junior engineers who now ship independently, and established code review and CI/CD standards across team projects',
    ],
    tech: ['Elixir', 'Phoenix', 'PostgreSQL', 'REST APIs', 'Docker', 'JavaScript'],
  },
  {
    role: 'Software Developer',
    company: 'Freelance',
    period: 'Sep 2019 — Jul 2020',
    summary:
      'Delivered full-stack web and mobile projects end to end: requirements, schema design, build, handover documentation and support.',
    highlights: [
      'Built a secure e-banking mobile application with biometric authentication',
      'Designed a normalised SQL schema of 20+ tables for an admin portal',
      'Delivered every client engagement on time',
    ],
    tech: ['PHP', 'Java', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    role: 'Student Teacher',
    company: 'Chilenje South Secondary School',
    period: 'Jan 2018 — Apr 2018',
    summary: 'Taught ICT and Mathematics, and maintained the school records database.',
    highlights: [
      'Built an automated grading system that cut administrative workload by 15%',
      'Developed a simplified programming curriculum that measurably raised student engagement',
    ],
    tech: ['Database Management', 'Teaching'],
  },
];

export const projects = [
  {
    name: 'Pine UI',
    package: 'pine_ui_phoenix',
    description:
      'A library of 15+ interactive UI components for Phoenix — animated text, cards, form elements, loading buttons, tooltips and badges.',
    tech: ['Elixir', 'Phoenix', 'TailwindCSS', 'AlpineJS'],
    links: {
      github: 'https://github.com/jamesnjovu/pine_ui_phoenix',
      package: 'https://hex.pm/packages/pine_ui_phoenix',
    },
  },
  {
    name: 'ex_mtn_momo',
    package: 'ex_mtn_momo',
    description:
      'MTN Mobile Money API client for Elixir — collections, disbursements and remittances with robust error handling and configuration.',
    tech: ['Elixir', 'Payments', 'REST'],
    links: {
      github: 'https://github.com/jamesnjovu/ex_mtn_momo',
      package: 'https://hexdocs.pm/ex_mtn_momo/readme.html',
    },
  },
  {
    name: 'ex_mpesa',
    package: 'elixir_mpesa',
    description:
      'Vodacom M-Pesa OpenAPI client — session management, C2B/B2C/B2B payments, transaction status queries and direct debit.',
    tech: ['Elixir', 'Payments', 'REST'],
    links: {
      github: 'https://github.com/jamesnjovu/ex_mpesa',
      package: 'https://hex.pm/packages/elixir_mpesa',
    },
  },
  {
    name: 'ex_live_table',
    package: 'ex_live_table',
    description:
      'Interactive data table for Phoenix LiveView — sorting, pagination, search and custom formatting with minimal configuration.',
    tech: ['Elixir', 'Phoenix LiveView'],
    links: {
      github: 'https://github.com/jamesnjovu/ex_live_table',
      package: 'https://hexdocs.pm/ex_live_table/readme.html',
    },
  },
  {
    name: 'number_f',
    package: 'number_f',
    description:
      'Numeric formatting and conversion utilities for Elixir — number-to-words, currency formatting and maths helpers.',
    tech: ['Elixir'],
    links: {
      github: 'https://github.com/jamesnjovu/elixir_number_functions',
      package: 'https://hex.pm/packages/number_f',
    },
  },
  {
    name: 'USSD Emulator',
    description:
      'React application that simulates USSD session flows against a backend API, so developers can test without a handset.',
    tech: ['React', 'Vite', 'JavaScript'],
    links: {
      github: 'https://github.com/jamesnjovu/ussd-emulator',
      live: 'https://jamesnjovu.github.io/ussd-emulator/',
    },
  },
];

/*
 * Grouped, not rated. Self-assigned percentages ("Elixir 95%") invite a
 * question no portfolio can answer; what a skill is used for is the useful part.
 */
export const skills = [
  { group: 'Languages', items: ['Elixir', 'JavaScript (ES6+)', 'SQL', 'Java', 'PHP', 'HTML5 & CSS3'] },
  { group: 'Backend', items: ['Phoenix', 'Phoenix LiveView', 'REST API design', 'Node.js'] },
  { group: 'Frontend', items: ['React', 'TailwindCSS', 'Vite', 'GSAP'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MS SQL Server', 'Oracle'] },
  { group: 'Practice', items: ['Docker', 'Git', 'CI/CD', 'Code review', 'Technical mentoring', 'System documentation'] },
];

export const education = [
  {
    credential: 'Secondary Teachers Diploma — Computer Science',
    institution: 'Evelyn Hone College of Applied Arts and Commerce',
    period: '2017 — 2019',
    note: 'Programming fundamentals, web development, database systems, network security.',
  },
  {
    credential: 'CCNA Routing and Switching: Introduction to Networks',
    institution: 'Cisco Networking Academy',
    period: 'Nov 2019',
    note: 'Network device configuration, routing protocols, IP addressing schemes.',
  },
  {
    credential: 'IT Essentials',
    institution: 'Cisco Networking Academy',
    period: 'Aug 2019',
    note: 'Hardware troubleshooting, operating systems, system configuration.',
  },
];

export const languages = ['English', 'Nyanja', 'Bemba'];

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Open Source' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
