// ─────────────────────────────────────────────────────────────
// STATIC content — name, bio, education, skills, experience.
// Edit these objects/arrays directly, then rebuild the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Ruman Jamadder Rabby',
  certificateName: 'Md. Ruman',
  initials: 'RJ',
  title: "Master's Researcher",
  department: 'Department of Information Science and Library Management',
  university: 'University of Dhaka',
  tagline: 'Organizing knowledge for the people who need it.',
  roles: [
    'Documentation & Archiving Specialist',
    'Digital Library Researcher',
    'Information Specialist',
    'Archival Systems Enthusiast',
  ],
  about: `I'm Ruman Jamadder Rabby, a final-semester Master's student in the Department of
    Information Science and Library Management at the University of Dhaka, building on the
    honours degree I completed in the same department in October 2025. My work moves between
    the reading room and the archive — I've spent the past year documenting and archiving
    materials for the July Massacre Archive, interned with BANSDOC on a government-funded
    documentation project, and served as a Library Assistant at the Central Library of the
    University of Dhaka.`,
  aboutSecondary: `Outside coursework, I lead IT and archival operations at PIPRA — the
    Investigative Political Research Association — where I look after data systems and records
    for political research projects. I started down this path early, as a College Ambassador
    for Silswa during my HSC years, and it's shaped how I think about libraries now: not just
    as places that store information, but as infrastructure that keeps memory, evidence, and
    public knowledge intact and accessible.`,
  photo: './images/profile.jpg',
  email: 'ruman.rabby@example.com',
  phone: '+880 1XXX-XXXXXX',
  location: 'Dhaka, Bangladesh',
  cvPath: './cv/Ruman_Jamadder_Rabby_CV.pdf',
  social: {
    linkedin: 'https://linkedin.com/in/ruman-rabby',
    github: 'https://github.com/ruman-rabby',
    orcid: 'https://orcid.org/0000-0000-0000-0000',
    researchgate: 'https://researchgate.net/profile/Ruman-Rabby',
    scholar: 'https://scholar.google.com/citations?user=xxxxxx',
  },
}

export const navLinks = [
  { label: 'About', href: '#about', code: '01' },
  { label: 'Education', href: '#education', code: '02' },
  { label: 'Skills', href: '#skills', code: '03' },
  { label: 'Projects', href: '#projects', code: '04' },
  { label: 'Experience', href: '#experience', code: '05' },
  { label: 'Gallery', href: '#gallery', code: '06' },
  { label: 'Research', href: '#research', code: '07' },
  { label: 'Blog', href: '#blog', code: '08' },
  { label: 'Contact', href: '#contact', code: '09' },
]

export const education = [
  {
    id: 'edu-ma',
    degree: "Master's (MA) — Information Science and Library Management",
    institution: 'University of Dhaka',
    faculty: 'Faculty of Arts',
    dorm: 'Kabi Jasim Uddin Hall',
    period: 'Present',
    code: 'DU / MA.ISLM',
    status: "Currently in the final semester of Master's",
    highlightStatus: true,
    details: 'Department of Information Science and Library Management (ISLM), Faculty of Arts.',
  },
  {
    id: 'edu-ba',
    degree: 'Bachelor (BA) — Information Science and Library Management',
    institution: 'University of Dhaka',
    faculty: 'Faculty of Arts',
    dorm: 'Kabi Jasim Uddin Hall',
    period: 'Completed October 2025',
    code: 'DU / BA.ISLM',
    details: 'Department of Information Science and Library Management (ISLM), Faculty of Arts. Honours completed October 2025.',
  },
  {
    id: 'edu-college',
    degree: 'Higher Secondary Certificate (HSC) — Humanities',
    institution: 'Adamjee Cantonment College (ACC)',
    period: 'HSC — 2020',
    code: 'ACC / HSC.20',
    details: 'Group: Humanities.',
    result: 'GPA 5.00 / 5.00',
  },
  {
    id: 'edu-ssc',
    degree: 'Secondary School Certificate (SSC) — Science',
    institution: 'Tushkhali Secondary School (TSS)',
    period: 'SSC — 2018',
    code: 'TSS / SSC.18',
    details: 'Group: Science.',
    result: 'GPA 5.00 / 5.00',
  },
  {
    id: 'edu-jsc',
    degree: 'Junior School Certificate (JSC)',
    institution: 'Tushkhali Secondary School (TSS)',
    period: 'JSC — 2015',
    code: 'TSS / JSC.15',
    result: 'GPA 4.90 / 5.00',
  },
  {
    id: 'edu-psc',
    degree: 'Primary School Certificate (PSC)',
    institution: 'N.S Pre-Cadet School',
    period: 'PSC — 2012',
    code: 'NSPC / PSC.12',
    result: 'GPA 5.00 / 5.00',
  },
]

export const skills = [
  {
    group: 'Cataloguing & Classification',
    code: '025',
    items: ['MARC 21', 'RDA', 'Dewey Decimal (DDC 23)', 'AACR2', 'Authority Control'],
  },
  {
    group: 'Digital Libraries & Repositories',
    code: '026',
    items: ['DSpace', 'Koha ILS', 'Greenstone', 'OAI-PMH', 'Dublin Core'],
  },
  {
    group: 'Research & Data',
    code: '020',
    items: ['SPSS', 'Qualitative Coding', 'Transcription Expert', 'Survey Design', 'Literature Review', 'Paper Writing', 'Bibliometrics'],
  },
  {
    group: 'Tools & Technical',
    code: '004',
    items: ['JavaScript (React.js)', 'CSS', 'HTML', 'Tailwind', 'Excel / Google Sheets', 'Zotero', 'Basic SQL', 'MongoDB'],
  },
  {
    group: 'Languages',
    code: '400',
    items: ['Bengali — Native', 'English — Fluent', 'Spanish — Learning (conversational)', 'Hindi — Conversational'],
  },
  {
    group: 'Professional',
    code: '650',
    items: ['Reference Interviewing', 'Information Literacy Instruction', 'Archival Appraisal', 'Public Speaking', 'Information Specialist', 'Documentation', 'Archiving'],
  },
]

export const experience = [
  {
    id: 'exp-01',
    code: 'EXP.25b',
    role: 'Head of IT & Archives',
    org: 'PIPRA — Investigative Political Research Association',
    period: '1 February 2025 — Present',
    points: [],
  },
  {
    id: 'exp-02',
    code: 'EXP.25a',
    role: 'Government Funds Intern',
    org: 'BANSDOC (Bangladesh National Scientific and Technical Documentation Centre)',
    period: '15 September 2025 — 14 October 2025',
    location: 'Agargaon, Dhaka, Bangladesh',
    points: [],
  },
  {
    id: 'exp-03',
    code: 'EXP.25c',
    role: 'Library Assistant',
    org: 'Central Library, University of Dhaka',
    period: '14 August 2025 — 14 September 2025',
    points: [],
  },
  {
    id: 'exp-04',
    code: 'EXP.24',
    role: 'Documentation & Archiving',
    org: 'July Massacre Archive',
    period: 'September 2024 — 25 July 2025',
    points: [],
  },
  {
    id: 'exp-05',
    code: 'EXP.19',
    role: 'College Ambassador',
    org: 'Silswa',
    period: '13 January 2019 — 24 March 2020',
    points: [],
  },
]

// ─────────────────────────────────────────────────────────────
// Projects, Research Interests, Gallery, Blog posts, and Contact
// details are no longer stored here — they live in your Supabase
// database and are managed from the admin panel at #/admin.
// See supabase/schema.sql to set up the tables, and the README's
// "Connect your database" section for the full walkthrough.
// ─────────────────────────────────────────────────────────────
