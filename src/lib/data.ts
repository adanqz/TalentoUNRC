
import type { User, Business, Opportunity, University, Conversation } from '@/lib/types';

export const users: User[] = [
  { id: 'user-1', name: 'Ana Torres', email: 'ana.t@example.com', avatarUrl: 'https://picsum.photos/seed/user1/100/100', skills: ['React', 'Node.js', 'TypeScript'], interests: ['Web Development', 'AI'] },
  { id: 'user-2', name: 'Carlos Gomez', email: 'carlos.g@example.com', avatarUrl: 'https://picsum.photos/seed/user2/100/100', skills: ['Python', 'Data Analysis', 'Machine Learning'], interests: ['Data Science', 'Fintech'] },
  { id: 'user-3', name: 'Sofia Diaz', email: 'sofia.d@example.com', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
  { id: 'user-4', name: 'Javier Peña', email: 'javier.p@example.com', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
  { id: 'user-5', name: 'Isabel Luna', email: 'isabel.l@example.com', avatarUrl: 'https://picsum.photos/seed/user5/100/100' },
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Frontend Developer Intern',
    businessName: 'Tech Innovators Inc.',
    businessId: 'biz-1',
    businessLogoUrl: 'https://picsum.photos/seed/logo1/40/40',
    type: 'Internship',
    description: 'Join our team to work on a cutting-edge web application using React and TypeScript.',
    longDescription: 'This internship offers a hands-on experience in developing, testing, and deploying a modern web application. You will collaborate with senior developers and product managers to deliver high-quality features. You will learn about agile methodologies, code reviews, and continuous integration.',
    location: 'Remote',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
  },
  {
    id: 'opp-2',
    title: 'Data Science Research Project',
    businessName: 'Data Insights Co.',
    businessId: 'biz-2',
    businessLogoUrl: 'https://picsum.photos/seed/logo2/40/40',
    type: 'Research',
    description: 'Analyze large datasets to extract meaningful insights and build predictive models.',
    longDescription: 'As a research partner, you will dive deep into complex datasets, apply statistical analysis and machine learning techniques to uncover trends, and present your findings to stakeholders. This project requires a strong foundation in statistics and programming.',
    location: 'Río Cuarto, Córdoba',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization'],
  },
  {
    id: 'opp-3',
    title: 'Mobile App Development',
    businessName: 'Agro-Solutions',
    businessId: 'biz-3',
    businessLogoUrl: 'https://picsum.photos/seed/logo3/40/40',
    type: 'Project',
    description: 'Develop a cross-platform mobile app for the agricultural sector using Flutter.',
    longDescription: 'This project involves the full lifecycle of mobile app development, from UI/UX design to backend integration and publishing on app stores. You will work with a dynamic team to create an innovative solution for farmers.',
    location: 'Remote',
    skills: ['Flutter', 'Dart', 'Firebase', 'UI/UX Design'],
  },
  {
    id: 'opp-4',
    title: 'Backend Engineer Intern',
    businessName: 'Tech Innovators Inc.',
    businessId: 'biz-1',
    businessLogoUrl: 'https://picsum.photos/seed/logo1/40/40',
    type: 'Internship',
    description: 'Help build and maintain our scalable backend services and APIs.',
    longDescription: 'In this role, you will work with Node.js, Express, and databases like PostgreSQL and MongoDB. You will be responsible for designing and implementing RESTful APIs, ensuring high performance and reliability. Experience with cloud platforms like AWS or Google Cloud is a plus.',
    location: 'Río Cuarto, Córdoba',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
  },
];

export const businesses: Business[] = [
  {
    id: 'biz-1',
    name: 'Tech Innovators Inc.',
    logoUrl: 'https://picsum.photos/seed/logo1/200/200',
    mission: 'To drive progress by creating revolutionary technology solutions that empower businesses and individuals alike. We believe in the power of innovation to shape a better future.',
    team: [users[2], users[3]],
    projects: ['Project Phoenix', 'Project Nova'],
    opportunities: ['opp-1', 'opp-4'],
  },
  {
    id: 'biz-2',
    name: 'Data Insights Co.',
    logoUrl: 'https://picsum.photos/seed/logo2/200/200',
    mission: 'Unlocking the potential of data to provide actionable insights and drive strategic decision-making. Our goal is to transform raw data into a valuable asset for our clients.',
    team: [users[4]],
    projects: ['Market Trend Analysis', 'Customer Segmentation Model'],
    opportunities: ['opp-2'],
  },
  {
    id: 'biz-3',
    name: 'Agro-Solutions',
    logoUrl: 'https://picsum.photos/seed/logo3/200/200',
    mission: 'Modernizing agriculture through technology. We develop innovative tools to help farmers increase efficiency, sustainability, and profitability.',
    team: [],
    projects: ['Smart Irrigation System', 'Crop Health Monitoring App'],
    opportunities: ['opp-3'],
  },
];

export const university: University = {
    id: 'unrc-1',
    name: 'Universidad Nacional Rosario Castellanos',
    logoUrl: 'https://sanmartindelaspiramides.gob.mx/img/virtual/urc.jpg',
    description: 'The Rosario Castellanos National University is a public university in Mexico City. It is a deconcentrated body of the Ministry of Education, Science, Technology and Innovation of Mexico City, with technical, teaching and management autonomy.',
    expertise: ['Computer Science', 'Environmental Science', 'Urban Development', 'Public Health', 'Social Sciences'],
    contact: {
        email: 'info@rcastellanos.cdmx.gob.mx',
        phone: '+52 55 1234 5678',
        address: 'San Juan de Aragón II Secc, Gustavo A. Madero, 07979 Ciudad de México, CDMX',
        website: 'rcastellanos.cdmx.gob.mx'
    },
};

export const conversations: Conversation[] = [
    {
        id: 'conv-1',
        participant: businesses[0].team[0],
        messages: [
            { id: 'msg-1', senderId: 'user-1', text: 'Hello! I am very interested in the Frontend Developer Internship.', timestamp: '10:30 AM' },
            { id: 'msg-2', senderId: 'user-3', text: 'Hi Ana, thanks for reaching out! We are glad to hear that. Could you please send us your resume?', timestamp: '10:32 AM' },
        ],
        lastMessage: 'Hi Ana, thanks for reaching out! We are glad...',
        lastMessageTimestamp: '10:32 AM',
        unreadCount: 0,
    },
    {
        id: 'conv-2',
        participant: businesses[1].team[0],
        messages: [
             { id: 'msg-3', senderId: 'user-5', text: 'Hello, I saw your profile and wanted to connect.', timestamp: 'Yesterday' },
        ],
        lastMessage: 'Hello, I saw your profile and wanted to connect.',
        lastMessageTimestamp: 'Yesterday',
        unreadCount: 1,
    }
]

// Helper functions to get data by ID
export const getBusinessById = (id: string) => businesses.find(b => b.id === id);
export const getOpportunityById = (id: string) => opportunities.find(o => o.id === id);
export const getUserById = (id: string) => users.find(u => u.id === id);
