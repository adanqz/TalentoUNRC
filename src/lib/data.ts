
import type { User, Business, Opportunity, University, Conversation } from '@/lib/types';

export const users: User[] = [
  { id: 'user-1', name: 'Ana Torres', email: 'ana.t@example.com', avatarUrl: 'https://picsum.photos/seed/user1/100/100', skills: ['React', 'Node.js', 'TypeScript'], interests: ['Desarrollo Web', 'IA'] },
  { id: 'user-2', name: 'Carlos Gomez', email: 'carlos.g@example.com', avatarUrl: 'https://picsum.photos/seed/user2/100/100', skills: ['Python', 'Análisis de Datos', 'Machine Learning'], interests: ['Ciencia de Datos', 'Fintech'] },
  { id: 'user-3', name: 'Sofia Diaz', email: 'sofia.d@example.com', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
  { id: 'user-4', name: 'Javier Peña', email: 'javier.p@example.com', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
  { id: 'user-5', name: 'Isabel Luna', email: 'isabel.l@example.com', avatarUrl: 'https://picsum.photos/seed/user5/100/100' },
  { id: 'user-6', name: 'Maria Rodriguez', email: 'maria.r@example.com', avatarUrl: 'https://picsum.photos/seed/user6/100/100', skills: ['Diseño UI/UX', 'Figma', 'Adobe XD'], interests: ['Diseño de Producto', 'Experiencia de Usuario'] },
  { id: 'user-7', name: 'David Chen', email: 'david.c@example.com', avatarUrl: 'https://picsum.photos/seed/user7/100/100', skills: ['AWS', 'Docker', 'Kubernetes'], interests: ['DevOps', 'Cloud Computing'] },
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Pasantía de Desarrollador Frontend',
    businessName: 'Tech Innovators Inc.',
    businessId: 'biz-1',
    businessLogoUrl: 'https://picsum.photos/seed/logo1/40/40',
    type: 'Internship',
    description: 'Únete a nuestro equipo para trabajar en una aplicación web de vanguardia usando React y TypeScript.',
    longDescription: 'Esta pasantía ofrece una experiencia práctica en el desarrollo, prueba y despliegue de una aplicación web moderna. Colaborarás con desarrolladores senior y gerentes de producto para entregar características de alta calidad. Aprenderás sobre metodologías ágiles, revisiones de código e integración continua.',
    location: 'Remoto',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
  },
  {
    id: 'opp-2',
    title: 'Proyecto de Investigación en Ciencia de Datos',
    businessName: 'Data Insights Co.',
    businessId: 'biz-2',
    businessLogoUrl: 'https://picsum.photos/seed/logo2/40/40',
    type: 'Research',
    description: 'Analiza grandes conjuntos de datos para extraer insights significativos y construir modelos predictivos.',
    longDescription: 'Como socio de investigación, te sumergirás en conjuntos de datos complejos, aplicarás análisis estadístico y técnicas de machine learning para descubrir tendencias y presentarás tus hallazgos a los stakeholders. Este proyecto requiere una base sólida en estadística y programación.',
    location: 'Río Cuarto, Córdoba',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Visualización de Datos'],
  },
  {
    id: 'opp-3',
    title: 'Desarrollo de Aplicación Móvil',
    businessName: 'Agro-Solutions',
    businessId: 'biz-3',
    businessLogoUrl: 'https://picsum.photos/seed/logo3/40/40',
    type: 'Project',
    description: 'Desarrolla una aplicación móvil multiplataforma para el sector agrícola usando Flutter.',
    longDescription: 'Este proyecto implica el ciclo de vida completo del desarrollo de una aplicación móvil, desde el diseño UI/UX hasta la integración con el backend y la publicación en las tiendas de aplicaciones. Trabajarás con un equipo dinámico para crear una solución innovadora para los agricultores.',
    location: 'Remoto',
    skills: ['Flutter', 'Dart', 'Firebase', 'Diseño UI/UX'],
  },
  {
    id: 'opp-4',
    title: 'Pasantía de Ingeniero Backend',
    businessName: 'Tech Innovators Inc.',
    businessId: 'biz-1',
    businessLogoUrl: 'https://picsum.photos/seed/logo1/40/40',
    type: 'Internship',
    description: 'Ayuda a construir y mantener nuestros servicios de backend y APIs escalables.',
    longDescription: 'En este rol, trabajarás con Node.js, Express y bases de datos como PostgreSQL y MongoDB. Serás responsable de diseñar e implementar APIs RESTful, asegurando un alto rendimiento y confiabilidad. La experiencia con plataformas en la nube como AWS o Google Cloud es una ventaja.',
    location: 'Río Cuarto, Córdoba',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'APIs REST'],
  },
  {
    id: 'opp-5',
    title: 'Pasantía de Diseño UI/UX',
    businessName: 'Innovatech',
    businessId: 'biz-4',
    businessLogoUrl: 'https://picsum.photos/seed/logo4/40/40',
    type: 'Internship',
    description: 'Crea interfaces de usuario intuitivas y atractivas para nuestras aplicaciones web y móviles.',
    longDescription: 'Como pasante de UI/UX, serás responsable de realizar investigaciones de usuarios, crear wireframes y prototipos, y diseñar interfaces de usuario visualmente atractivas. Trabajarás en estrecha colaboración con los gerentes de producto y desarrolladores para garantizar una experiencia de usuario perfecta.',
    location: 'Remoto',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Investigación de Usuarios'],
  },
  {
    id: 'opp-6',
    title: 'Ingeniero de la Nube',
    businessName: 'QuantumLeap',
    businessId: 'biz-5',
    businessLogoUrl: 'https://picsum.photos/seed/logo5/40/40',
    type: 'Project',
    description: 'Diseña y gestiona nuestra infraestructura en la nube en AWS.',
    longDescription: 'Buscamos un ingeniero de la nube experimentado para unirse a nuestro equipo. Serás responsable de diseñar, implementar y mantener nuestra infraestructura en la nube en AWS. Debes tener una sólida experiencia con servicios de AWS como EC2, S3, RDS y Lambda.',
    location: 'Río Cuarto, Córdoba',
    skills: ['AWS', 'Terraform', 'Docker', 'CI/CD'],
  },
  {
    id: 'opp-7',
    title: 'Pasantía de Marketing',
    businessName: 'Agro-Solutions',
    businessId: 'biz-3',
    businessLogoUrl: 'https://picsum.photos/seed/logo3/40/40',
    type: 'Internship',
    description: 'Apoya a nuestro equipo de marketing con campañas en redes sociales, creación de contenido y estudios de mercado.',
    longDescription: 'Esta es una excelente oportunidad para que un estudiante de marketing gane experiencia práctica. Ayudarás a desarrollar y ejecutar campañas en redes sociales, escribirás entradas de blog y contenido para el sitio web, y realizarás estudios de mercado para identificar nuevas oportunidades.',
    location: 'Remoto',
    skills: ['Redes Sociales', 'Marketing de Contenidos', 'SEO', 'Google Analytics'],
  },
];

export const businesses: Business[] = [
  {
    id: 'biz-1',
    name: 'Tech Innovators Inc.',
    logoUrl: 'https://picsum.photos/seed/logo1/200/200',
    mission: 'Impulsar el progreso creando soluciones tecnológicas revolucionarias que empoderen tanto a empresas como a individuos. Creemos en el poder de la innovación para dar forma a un futuro mejor.',
    team: [users[2], users[3]],
    projects: ['Proyecto Fénix', 'Proyecto Nova'],
    opportunities: ['opp-1', 'opp-4'],
  },
  {
    id: 'biz-2',
    name: 'Data Insights Co.',
    logoUrl: 'https://picsum.photos/seed/logo2/200/200',
    mission: 'Desbloquear el potencial de los datos para proporcionar insights accionables e impulsar la toma de decisiones estratégicas. Nuestro objetivo es transformar los datos brutos en un activo valioso para nuestros clientes.',
    team: [users[4]],
    projects: ['Análisis de Tendencias de Mercado', 'Modelo de Segmentación de Clientes'],
    opportunities: ['opp-2'],
  },
  {
    id: 'biz-3',
    name: 'Agro-Solutions',
    logoUrl: 'https://picsum.photos/seed/logo3/200/200',
    mission: 'Modernizar la agricultura a través de la tecnología. Desarrollamos herramientas innovadoras para ayudar a los agricultores a aumentar la eficiencia, la sostenibilidad y la rentabilidad.',
    team: [],
    projects: ['Sistema de Riego Inteligente', 'App de Monitoreo de Salud de Cultivos'],
    opportunities: ['opp-3', 'opp-7'],
  },
  {
    id: 'biz-4',
    name: 'Innovatech',
    logoUrl: 'https://picsum.photos/seed/logo4/200/200',
    mission: 'Pioneros en el futuro de la tecnología con soluciones de software de vanguardia. Nos especializamos en IA y machine learning.',
    team: [users[5]],
    projects: ['Plataforma de IA', 'Motor de Recomendaciones'],
    opportunities: ['opp-5'],
  },
  {
    id: 'biz-5',
    name: 'QuantumLeap',
    logoUrl: 'https://picsum.photos/seed/logo5/200/200',
    mission: 'Dando un salto cuántico en la computación. Nuestra misión es construir la primera computadora cuántica comercialmente viable del mundo.',
    team: [users[6]],
    projects: ['Simulador Cuántico', 'Hardware Cuántico'],
    opportunities: ['opp-6'],
  },
];

export const university: University = {
    id: 'unrc-1',
    name: 'Universidad Nacional Rosario Castellanos',
    logoUrl: 'https://sanmartindelaspiramides.gob.mx/img/virtual/urc.jpg',
    description: 'La Universidad Rosario Castellanos es una universidad pública de la Ciudad de México. Es un órgano desconcentrado de la Secretaría de Educación, Ciencia, Tecnología e Innovación de la Ciudad de México, con autonomía técnica, docente y de gestión.',
    expertise: ['Ciencias de la Computación', 'Ciencias Ambientales', 'Desarrollo Urbano', 'Salud Pública', 'Ciencias Sociales'],
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
            { id: 'msg-1', senderId: 'user-1', text: '¡Hola! Estoy muy interesada en la Pasantía de Desarrollador Frontend.', timestamp: '10:30 AM' },
            { id: 'msg-2', senderId: 'user-3', text: 'Hola Ana, ¡gracias por contactarnos! Nos alegra saberlo. ¿Podrías enviarnos tu CV?', timestamp: '10:32 AM' },
        ],
        lastMessage: 'Hola Ana, ¡gracias por contactarnos! Nos alegra...',
        lastMessageTimestamp: '10:32 AM',
        unreadCount: 0,
    },
    {
        id: 'conv-2',
        participant: businesses[1].team[0],
        messages: [
             { id: 'msg-3', senderId: 'user-5', text: 'Hola, vi tu perfil y quería conectar.', timestamp: 'Ayer' },
        ],
        lastMessage: 'Hola, vi tu perfil y quería conectar.',
        lastMessageTimestamp: 'Ayer',
        unreadCount: 1,
    }
]

// Helper functions to get data by ID
export const getBusinessById = (id: string) => businesses.find(b => b.id === id);
export const getOpportunityById = (id: string) => opportunities.find(o => o.id === id);
export const getUserById = (id: string) => users.find(u => u.id === id);
