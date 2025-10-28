
import type { User, Business, Opportunity, University, Conversation } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image ? image.imageUrl : 'https://placehold.co/600x400';
}

export const users: User[] = [
  { id: 'user-1', name: 'Ana Torres', email: 'ana.t@example.com', avatarUrl: getImage('user-avatar-1'), skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'], interests: ['Desarrollo Web', 'IA', 'Diseño UI/UX'], 
    semesterProjects: [
      { semester: 'Semestre 1', projects: [
        { id: 'proj-1-1', name: 'Introducción a la Programación con Python', pdfUrl: '#' },
        { id: 'proj-1-2', name: 'Fundamentos de Diseño Web HTML/CSS', pdfUrl: '#' },
      ]},
      { semester: 'Semestre 2', projects: [
        { id: 'proj-2-1', name: 'Programación Orientada a Objetos con Java', pdfUrl: '#' },
        { id: 'proj-2-2', name: 'Bases de Datos Relacionales y SQL', pdfUrl: '#' },
      ]},
      { semester: 'Semestre 3', projects: [
        { id: 'proj-3-1', name: 'Desarrollo Frontend con JavaScript', pdfUrl: '#' },
      ]}
    ],
    languages: [
        { name: 'Español', proficiency: 100 },
        { name: 'Inglés', proficiency: 85 },
        { name: 'Francés', proficiency: 40 },
    ]
  },
  { id: 'user-2', name: 'Carlos Gomez', email: 'carlos.g@example.com', avatarUrl: getImage('user-avatar-2'), skills: ['Python', 'Análisis de Datos', 'Machine Learning', 'TensorFlow', 'Scikit-learn'], interests: ['Ciencia de Datos', 'Fintech', 'Inversiones'],
    languages: [
        { name: 'Español', proficiency: 100 },
        { name: 'Inglés', proficiency: 95 },
    ]
  },
  { id: 'user-3', name: 'Sofia Diaz', email: 'sofia.d@example.com', avatarUrl: getImage('user-avatar-3'), skills: ['Java', 'Spring Boot', 'Microservicios', 'Hibernate'], interests: ['Desarrollo Backend', 'Sistemas Distribuidos'] },
  { id: 'user-4', name: 'Javier Peña', email: 'javier.p@example.com', avatarUrl: getImage('user-avatar-4'), skills: ['Go', 'Kubernetes', 'Docker', 'CI/CD'], interests: ['DevOps', 'Infraestructura de Nube'] },
  { id: 'user-5', name: 'Isabel Luna', email: 'isabel.l@example.com', avatarUrl: getImage('user-avatar-5'), skills: ['JavaScript', 'Vue.js', 'Nuxt.js', 'TailwindCSS'], interests: ['Desarrollo Frontend', 'E-commerce'],
    languages: [
        { name: 'Español', proficiency: 100 },
        { name: 'Inglés', proficiency: 70 },
    ]
  },
  { id: 'user-6', name: 'Maria Rodriguez', email: 'maria.r@example.com', avatarUrl: getImage('user-avatar-6'), skills: ['Diseño UI/UX', 'Figma', 'Adobe XD', 'Investigación de Usuarios'], interests: ['Diseño de Producto', 'Experiencia de Usuario', 'Accesibilidad'] },
  { id: 'user-7', name: 'David Chen', email: 'david.c@example.com', avatarUrl: getImage('user-avatar-7'), skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], interests: ['DevOps', 'Cloud Computing', 'Ciberseguridad'],
    languages: [
        { name: 'Inglés', proficiency: 100 },
        { name: 'Mandarín', proficiency: 100 },
        { name: 'Español', proficiency: 75 },
    ]
  },
  { id: 'user-8', name: 'Laura Martinez', email: 'laura.m@example.com', avatarUrl: 'https://picsum.photos/seed/user8/100/100', skills: ['C#', '.NET', 'Azure', 'SQL Server'], interests: ['Desarrollo de Software Empresarial', 'Videojuegos'] },
  { id: 'user-9', name: 'Ricardo Sanchez', email: 'ricardo.s@example.com', avatarUrl: 'https://picsum.photos/seed/user9/100/100', skills: ['PHP', 'Laravel', 'MySQL', 'Vue.js'], interests: ['Desarrollo Web Full-Stack', 'APIs REST'] },
  { id: 'user-10', name: 'Fernanda Rojas', email: 'fernanda.r@example.com', avatarUrl: 'https://picsum.photos/seed/user10/100/100', skills: ['Swift', 'UIKit', 'Core Data', 'iOS'], interests: ['Desarrollo Móvil', 'Realidad Aumentada'] },
  { id: 'user-11', name: 'Jorge Campos', email: 'jorge.c@example.com', avatarUrl: 'https://picsum.photos/seed/user11/100/100', skills: ['Kotlin', 'Android Jetpack', 'Coroutines', 'Room'], interests: ['Desarrollo Móvil', 'Android', 'Wearables'] },
  { id: 'user-12', name: 'Patricia Vera', email: 'patricia.v@example.com', avatarUrl: 'https://picsum.photos/seed/user12/100/100', skills: ['Ruby on Rails', 'PostgreSQL', 'Heroku', 'TDD'], interests: ['Desarrollo Backend', 'Startups', 'EdTech'] }
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Prácticas de Desarrollador Frontend',
    businessName: 'Tech Innovators Inc.',
    businessId: 'biz-1',
    businessLogoUrl: getImage('business-logo-1'),
    type: 'Prácticas Profesionales',
    description: 'Únete a nuestro equipo para trabajar en una aplicación web de vanguardia usando React y TypeScript.',
    longDescription: 'Esta práctica profesional ofrece una experiencia práctica en el desarrollo, prueba y despliegue de una aplicación web moderna. Colaborarás con desarrolladores senior y gerentes de producto para entregar características de alta calidad. Aprenderás sobre metodologías ágiles, revisiones de código e integración continua.',
    location: 'Cuauhtémoc',
    modality: 'Remoto',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'Git'],
  },
  {
    id: 'opp-2',
    title: 'Proyecto de Investigación en Ciencia de Datos',
    businessName: 'Data Insights Co.',
    businessId: 'biz-2',
    businessLogoUrl: getImage('business-logo-2'),
    type: 'Research',
    description: 'Analiza grandes conjuntos de datos para extraer insights significativos y construir modelos predictivos.',
    longDescription: 'Como socio de investigación, te sumergirás en conjuntos de datos complejos, aplicarás análisis estadístico y técnicas de machine learning para descubrir tendencias y presentarás tus hallazgos a los stakeholders. Este proyecto requiere una base sólida en estadística y programación.',
    location: 'Coyoacán',
    modality: 'Híbrido',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Visualización de Datos'],
  },
  {
    id: 'opp-3',
    title: 'Desarrollo de Aplicación Móvil',
    businessName: 'Agro-Solutions',
    businessId: 'biz-3',
    businessLogoUrl: getImage('business-logo-3'),
    type: 'Project',
    description: 'Desarrolla una aplicación móvil multiplataforma para el sector agrícola usando Flutter.',
    longDescription: 'Este proyecto implica el ciclo de vida completo del desarrollo de una aplicación móvil, desde el diseño UI/UX hasta la integración con el backend y la publicación en las tiendas de aplicaciones. Trabajarás con un equipo dinámico para crear una solución innovadora para los agricultores.',
    location: 'Álvaro Obregón',
    modality: 'Remoto',
    skills: ['Flutter', 'Dart', 'Firebase', 'Diseño UI/UX'],
  },
  {
    id: 'opp-4',
    title: 'Servicio Social como Ingeniero Backend',
    businessName: 'Tech Innovators Inc.',
    businessId: 'biz-1',
    businessLogoUrl: getImage('business-logo-1'),
    type: 'Servicio Social',
    description: 'Ayuda a construir y mantener nuestros servicios de backend y APIs escalables.',
    longDescription: 'En este rol, trabajarás con Node.js, Express y bases de datos como PostgreSQL y MongoDB. Serás responsable de diseñar e implementar APIs RESTful, asegurando un alto rendimiento y confiabilidad. La experiencia con plataformas en la nube como AWS o Google Cloud es una ventaja.',
    location: 'Cuauhtémoc',
    modality: 'Presencial',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'APIs REST', 'Docker'],
  },
  {
    id: 'opp-5',
    title: 'Prácticas Profesionales en Diseño UI/UX',
    businessName: 'Innovatech',
    businessId: 'biz-4',
    businessLogoUrl: getImage('business-logo-4'),
    type: 'Prácticas Profesionales',
    description: 'Crea interfaces de usuario intuitivas y atractivas para nuestras aplicaciones web y móviles.',
    longDescription: 'Como practicante de UI/UX, serás responsable de realizar investigaciones de usuarios, crear wireframes y prototipos, y diseñar interfaces de usuario visualmente atractivas. Trabajarás en estrecha colaboración con los gerentes de producto y desarrolladores para garantizar una experiencia de usuario perfecta.',
    location: 'Polanco',
    modality: 'Remoto',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Investigación de Usuarios'],
  },
  {
    id: 'opp-6',
    title: 'Ingeniero de la Nube',
    businessName: 'QuantumLeap',
    businessId: 'biz-5',
    businessLogoUrl: getImage('business-logo-5'),
    type: 'Project',
    description: 'Diseña y gestiona nuestra infraestructura en la nube en AWS.',
    longDescription: 'Buscamos un ingeniero de la nube experimentado para unirse a nuestro equipo. Serás responsable de diseñar, implementar y mantener nuestra infraestructura en la nube en AWS. Debes tener una sólida experiencia con servicios de AWS como EC2, S3, RDS y Lambda.',
    location: 'Benito Juárez',
    modality: 'Híbrido',
    skills: ['AWS', 'Terraform', 'Docker', 'CI/CD', 'Ansible'],
  },
  {
    id: 'opp-7',
    title: 'Servicio Social en Marketing',
    businessName: 'Agro-Solutions',
    businessId: 'biz-3',
    businessLogoUrl: getImage('business-logo-3'),
    type: 'Servicio Social',
    description: 'Apoya a nuestro equipo de marketing con campañas en redes sociales, creación de contenido y estudios de mercado.',
    longDescription: 'Esta es una excelente oportunidad para que un estudiante de marketing gane experiencia práctica. Ayudarás a desarrollar y ejecutar campañas en redes sociales, escribirás entradas de blog y contenido para el sitio web, y realizarás estudios de mercado para identificar nuevas oportunidades.',
    location: 'Álvaro Obregón',
    modality: 'Remoto',
    skills: ['Redes Sociales', 'Marketing de Contenidos', 'SEO', 'Google Analytics'],
  },
  {
    id: 'opp-8',
    title: 'Desarrollador de Videojuegos (Prácticas)',
    businessName: 'PixelPlay',
    businessId: 'biz-6',
    businessLogoUrl: 'https://picsum.photos/seed/logo6/40/40',
    type: 'Prácticas Profesionales',
    description: 'Únete a nuestro estudio para crear la próxima generación de videojuegos para móviles.',
    longDescription: 'Trabajarás con el motor de juego Unity y C# para desarrollar mecánicas de juego, implementar características y corregir errores. Esta es una oportunidad para aprender de veteranos de la industria y contribuir a un título comercial.',
    location: 'La Condesa',
    modality: 'Remoto',
    skills: ['Unity', 'C#', 'Desarrollo de Videojuegos', '3D'],
  },
  {
    id: 'opp-9',
    title: 'Analista de Ciberseguridad Jr.',
    businessName: 'SecureNet',
    businessId: 'biz-7',
    businessLogoUrl: 'https://picsum.photos/seed/logo7/40/40',
    type: 'Project',
    description: 'Ayuda a proteger los activos digitales de nuestros clientes contra las ciberamenazas.',
    longDescription: 'En este rol de proyecto, realizarás evaluaciones de vulnerabilidad, monitorearás incidentes de seguridad y ayudarás a implementar políticas de seguridad. Obtendrás experiencia práctica con herramientas de seguridad líderes en la industria.',
    location: 'Miguel Hidalgo',
    modality: 'Presencial',
    skills: ['Ciberseguridad', 'Análisis de Redes', 'Pentesting', 'SIEM'],
  },
  {
    id: 'opp-10',
    title: 'Servicio Social de Desarrollador Full-Stack',
    businessName: 'Innovatech',
    businessId: 'biz-4',
    businessLogoUrl: getImage('business-logo-4'),
    type: 'Servicio Social',
    description: 'Trabaja en el frontend y backend de nuestras aplicaciones SaaS.',
    longDescription: 'Buscamos un estudiante versátil que se sienta cómodo trabajando con tecnologías tanto del lado del cliente como del lado del servidor. Nuestra pila tecnológica incluye React, Node.js, Python y AWS. Es una gran oportunidad para convertirse en un desarrollador completo.',
    location: 'Polanco',
    modality: 'Remoto',
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
  },
   {
    id: 'opp-11',
    title: 'Investigador en Energías Renovables',
    businessName: 'EcoPower',
    businessId: 'biz-8',
    businessLogoUrl: 'https://picsum.photos/seed/logo8/40/40',
    type: 'Research',
    description: 'Investiga y desarrolla nuevas tecnologías en el campo de la energía solar y eólica.',
    longDescription: 'Este proyecto de investigación se centra en mejorar la eficiencia de los paneles solares y las turbinas eólicas. El candidato ideal tendrá una sólida formación en física o ingeniería y pasión por la sostenibilidad.',
    location: 'Iztapalapa',
    modality: 'Presencial',
    skills: ['Energías Renovables', 'Investigación', 'Análisis de Datos', 'Matlab'],
  },
  {
    id: 'opp-12',
    title: 'Desarrollador de Blockchain',
    businessName: 'QuantumLeap',
    businessId: 'biz-5',
    businessLogoUrl: getImage('business-logo-5'),
    type: 'Project',
    description: 'Ayuda a construir una plataforma descentralizada utilizando la tecnología blockchain.',
    longDescription: 'Estamos buscando un desarrollador con experiencia en Ethereum y contratos inteligentes para unirse a nuestro innovador proyecto de blockchain. Serás responsable de diseñar y desarrollar aplicaciones descentralizadas (dApps).',
    location: 'Benito Juárez',
    modality: 'Híbrido',
    skills: ['Blockchain', 'Ethereum', 'Solidity', 'Smart Contracts'],
  },
];

export const businesses: Business[] = [
  {
    id: 'biz-1',
    name: 'Tech Innovators Inc.',
    logoUrl: getImage('business-logo-1'),
    mission: 'Impulsar el progreso creando soluciones tecnológicas revolucionarias que empoderen tanto a empresas como a individuos. Creemos en el poder de la innovación para dar forma a un futuro mejor.',
    team: [users[2], users[3]],
    projects: ['Proyecto Fénix (Plataforma SaaS)', 'Proyecto Nova (App Móvil de IA)'],
    opportunities: ['opp-1', 'opp-4'],
  },
  {
    id: 'biz-2',
    name: 'Data Insights Co.',
    logoUrl: getImage('business-logo-2'),
    mission: 'Desbloquear el potencial de los datos para proporcionar insights accionables e impulsar la toma de decisiones estratégicas. Nuestro objetivo es transformar los datos brutos en un activo valioso para nuestros clientes.',
    team: [users[4]],
    projects: ['Análisis de Tendencias de Mercado', 'Modelo de Segmentación de Clientes'],
    opportunities: ['opp-2'],
  },
  {
    id: 'biz-3',
    name: 'Agro-Solutions',
    logoUrl: getImage('business-logo-3'),
    mission: 'Modernizar la agricultura a través de la tecnología. Desarrollamos herramientas innovadoras para ayudar a los agricultores a aumentar la eficiencia, la sostenibilidad y la rentabilidad.',
    team: [users[8]],
    projects: ['Sistema de Riego Inteligente v2', 'App de Monitoreo de Salud de Cultivos con IA'],
    opportunities: ['opp-3', 'opp-7'],
  },
  {
    id: 'biz-4',
    name: 'Innovatech',
    logoUrl: getImage('business-logo-4'),
    mission: 'Pioneros en el futuro de la tecnología con soluciones de software de vanguardia. Nos especializamos en IA y machine learning.',
    team: [users[5], users[9]],
    projects: ['Plataforma de IA conversacional', 'Motor de Recomendaciones en tiempo real'],
    opportunities: ['opp-5', 'opp-10'],
  },
  {
    id: 'biz-5',
    name: 'QuantumLeap',
    logoUrl: getImage('business-logo-5'),
    mission: 'Dando un salto cuántico en la computación. Nuestra misión es construir la primera computadora cuántica comercialmente viable del mundo.',
    team: [users[6], users[10]],
    projects: ['Simulador Cuántico en la Nube', 'Desarrollo de Hardware Cuántico de 16-qubit'],
    opportunities: ['opp-6', 'opp-12'],
  },
  {
    id: 'biz-6',
    name: 'PixelPlay',
    logoUrl: 'https://picsum.photos/seed/logo6/200/200',
    mission: 'Crear mundos inmersivos y experiencias de juego inolvidables que conecten a jugadores de todo el mundo.',
    team: [users[7]],
    projects: ['Juego de Estrategia "Galaxy Empires"', 'Plataforma Social para Gamers'],
    opportunities: ['opp-8'],
  },
  {
    id: 'biz-7',
    name: 'SecureNet',
    logoUrl: 'https://picsum.photos/seed/logo7/200/200',
    mission: 'Proteger el mundo digital con soluciones de ciberseguridad de última generación y consultoría experta.',
    team: [],
    projects: ['Plataforma de Detección de Amenazas', 'Auditorías de Seguridad para Empresas Fortune 500'],
    opportunities: ['opp-9'],
  },
  {
    id: 'biz-8',
    name: 'EcoPower',
    logoUrl: 'https://picsum.photos/seed/logo8/200/200',
    mission: 'Acelerar la transición mundial hacia la energía sostenible mediante el desarrollo de tecnologías renovables innovadoras y asequibles.',
    team: [users[11]],
    projects: ['Investigación de Baterías de Estado Sólido', 'Parque Eólico Inteligente'],
    opportunities: ['opp-11'],
  },
];

export const university: University = {
    id: 'unrc-1',
    name: 'Universidad Nacional Rosario Castellanos',
    logoUrl: getImage('university-logo'),
    description: 'La Universidad Rosario Castellanos es una universidad pública de la Ciudad de México. Es un órgano desconcentrado de la Secretaría de Educación, Ciencia, Tecnología e Innovación de la Ciudad de México, con autonomía técnica, docente y de gestión.',
    expertise: ['Ciencias de la Computación', 'Ciencias Ambientales', 'Desarrollo Urbano', 'Salud Pública', 'Ciencias Sociales', 'Humanidades', 'Ingeniería'],
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
            { id: 'msg-1', senderId: 'user-1', text: '¡Hola! Estoy muy interesada en las Prácticas de Desarrollador Frontend.', timestamp: '10:30 AM' },
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
    },
    {
        id: 'conv-3',
        participant: users[6],
        messages: [
             { id: 'msg-4', senderId: 'user-1', text: 'Hola David, ¿tienes un momento para hablar sobre el proyecto de la nube?', timestamp: 'Hace 2 días' },
        ],
        lastMessage: 'Hola David, ¿tienes un momento para hablar sobre el...',
        lastMessageTimestamp: 'Hace 2 días',
        unreadCount: 0,
    }
]

// Helper functions to get data by ID
export const getBusinessById = (id: string) => businesses.find(b => b.id === id);
export const getOpportunityById = (id: string) => opportunities.find(o => o.id === id);
export const getUserById = (id: string) => users.find(u => u.id === id);

    
