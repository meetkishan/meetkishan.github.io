// Portfolio content ported from the 2025 site (public/index.html).
// Single source of truth for everything that is not markdown content.

export const profile = {
  name: 'Kishan Kachchhi',
  role: 'Full-Stack Developer & SaaS Product Builder',
  tagline: 'Building SaaS from concept to production',
  subtitle: 'Delivering intuitive, secure, and high-performance web systems.',
  location: 'Berlin, Germany',
  email: 'kishankachchhi@gmail.com',
  phone: '+49 1605753378',
  photo: '/images/kishan_kachchhi.jpg',
  introVideoId: 'oLqO7zBwVyE',
  resume: {
    en: 'https://drive.google.com/file/d/1NYRo1_ON6Yt-GzAuU2OlZrsfxfl9leSU/view?usp=kishank.in',
    de: 'https://drive.google.com/file/d/1TsLBEA2aLSUdJ8B02MgrCIO8XpOkzRP-/view?usp=kishank.in',
  },
  socials: [
    { label: 'GitHub', url: 'https://github.com/meetkishan', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kishankachchhi', icon: 'linkedin' },
    { label: 'Medium', url: 'https://kishankachchhi.medium.com', icon: 'medium' },
    { label: 'Twitter / X', url: 'https://twitter.com/meet_kishan', icon: 'twitter' },
  ],
}

export const metrics = [
  { value: '8+', label: 'Years of Work' },
  { value: '50K+', label: 'Users Served' },
  { value: '20+', label: 'Projects' },
  { value: '10+', label: 'Team Members' },
]

export const about = {
  whyGermany:
    "I moved to Germany to contribute to its strong engineering and startup culture and learn from its culture of precision, planning, and engineering excellence. I'm building my long-term career here, learning German (A2 & B1 ongoing), and actively participating in local tech meetups and developer communities.",
  howIBuild: [
    'I focus on performance, reliability, and maintainable architecture.',
    'I believe in small, fast iterations that deliver value early.',
    'I enjoy translating ideas into scalable systems that produce measurable outcomes and long-term impact.',
  ],
}

export const skills = [
  {
    category: 'Languages & Frameworks',
    items: ['PHP', 'Laravel', 'Vue.js', 'Node.js', 'Nuxt.js', 'JavaScript', 'MySQL'],
  },
  {
    category: 'DevOps & Tools',
    items: ['AWS', 'Docker', 'GitHub Actions', 'CI/CD', 'Nginx', 'Git', 'Linux'],
  },
  {
    category: 'Other Expertise',
    items: [
      'UI/UX Research',
      'Google-certified',
      'Agile (Scrum)',
      'Sprints',
      'Product Management',
      'API Design',
      'Security Compliance',
    ],
  },
]

export const experience = [
  {
    period: 'Jan 2025 - Present',
    title: 'Senior Full-Stack Developer',
    company: 'IT Futurz (AmDocs-USA), Remote, USA',
    points: [
      'Build and maintain full-stack applications with Vue.js, Node.js, PHP, and Python.',
      'Automated server tasks are improving process efficiency by 20%.',
      'Integrate third-party services and security patches to enhance system stability.',
      'Conducted software log audits and upgrades to the latest tech stacks.',
    ],
  },
  {
    period: 'Apr 2021 - Dec 2024',
    title: 'Full-Stack Developer & Product Owner',
    company: 'ByVisit.com, India',
    points: [
      'Developed and maintained scalable web applications, handling 50000+ users.',
      'Led user research and technical planning, ensuring optimal product-market fit.',
      'Managed a team of 10 developers, designers, and interns, delivering 50+ updates.',
      'Organized brand identity and visibility through the digital landscape.',
    ],
  },
  {
    period: 'May 2018 - Dec 2024',
    title: 'Lead Full-Stack Engineer (Technical Co-founder)',
    company: 'Izzard Tech Solutions Pvt. Ltd., India',
    points: [
      'Designed and launched 5+ SaaS applications, improving business efficiency.',
      '(Inwoice.com, 4DKitty, Test Proper, Live Register, Twimy)',
      'Built and managed a high-performing team, ensuring 1.5x faster project delivery.',
      'Consulted on product strategy, UI/UX, and development roadmap for businesses.',
    ],
  },
  {
    period: 'Feb 2016 - Apr 2018',
    title: 'Web Developer',
    company: 'Self Employed - Izzardtech, India',
    points: [
      'Operational process optimization and enhancing consumer reach through internet platforms and e-commerce.',
      'Consulted SMEs on digital transformation strategies, enabling 40%+ improvement in online engagement and customer acquisition.',
      'Delivered REST APIs and CMS backed portals on Node.js, MongoDB, and October CMS.',
    ],
  },
  {
    period: 'Apr 2015 - Feb 2016',
    title: 'Junior Backend Developer',
    company: 'Avinashi Ventures, India',
    points: [
      'Developed and maintained middleware systems using Node.js and MongoDB.',
      'Research & implied new technology, improving operational efficiency by 2x.',
    ],
  },
]

export const projects = [
  {
    name: 'ByVisit.com',
    image: '/images/ByVisit.com.png',
    metric: '4,500+ active users | 45+ product updates',
    description:
      'A digital business card platform that allows professionals to create and share their business cards digitally. Features include analytics, multi-role navigation, and CRM integration.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'AWS', 'Flutter'],
    url: 'https://site.byvisit.com/',
    featured: true,
  },
  {
    name: 'Inwoice.com',
    image: '/images/inwoice.com.png',
    metric: '28% faster load times | 18,000+ product codes',
    description:
      'A comprehensive invoicing platform built with Node.js and Express.js. Features include GST-compliant invoicing, product database with 18,000+ HSN codes, and automated tax calculations.',
    tech: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Bootstrap'],
    url: 'https://inwoice.com/',
    featured: true,
  },
  {
    name: '4DKitty Lottery Aggregator',
    image: '/images/4dkitty.png',
    metric: '10,000+ daily interactions | Real-time results',
    description:
      'A real-time lottery results aggregation platform for the Malaysian market. Features include scheduled scraping, live notifications, and mobile apps with real-time updates via Socket.io.',
    tech: ['Node.js', 'Socket.io', 'MongoDB', 'Flutter', 'OneSignal'],
    url: 'https://apkpure.com/4dkitty-4d-live-results-for-magnum-sportstoto/com.globalline.kitty',
    featured: true,
  },
  {
    name: 'Twimy',
    image: '/images/Twimy.in.png',
    metric: '10,000+ downloads | 100+ paid subscribers',
    description:
      'A mobile app that converts tweets into beautiful, customizable images for sharing on other social platforms.',
    tech: ['Flutter', 'Firebase', 'Nuxt.js'],
    url: 'https://apps.apple.com/sa/app/twimy/id1597274966',
    featured: false,
  },
  {
    name: 'Live Register',
    image: '/images/LiveRegister.png',
    metric: 'Digital visitor management | Real-time notifications',
    description:
      'A digital visitor management system for tracking people visiting places, shops, or apartments with real-time notifications.',
    tech: ['Flutter', 'Firebase', 'Figma'],
    url: 'https://codecanyon.net/item/live-register-visitor-entry-register-and-qr-attendance-flutter-mobile-application-with-firebase/35811518',
    featured: false,
  },
  {
    name: 'DotEnvJs',
    image: '/images/DotEnvJs.png',
    metric: 'Open-source NPM package | JSON support',
    description:
      'A small NPM package to help manage environment files with JSON object support and colored console logging.',
    tech: ['Node.js', 'JavaScript', 'NPM'],
    url: 'https://www.npmjs.com/package/dotenvjs',
    featured: false,
  },
]
