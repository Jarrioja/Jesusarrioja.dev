/**
 * Extract CV Data
 *
 * This script extracts and structures CV data from the legacy HTML file
 * with proper Spanish/English translations
 * Run with: pnpm tsx scripts/extract-cv-data.ts
 */

import * as fs from "fs";
import * as path from "path";

// CV Profile Data
const cvProfileData = {
  fullName: "Jesús Noel Arrioja Pérez",
  title: {
    en: "TypeScript Backend Engineer | Node.js, Hono, Drizzle, Supabase | DevOps & Cloud Architecture",
    es: "TypeScript Backend Engineer | Node.js, Hono, Drizzle, Supabase | DevOps & Cloud Architecture",
  },
  summary: {
    en: "Backend Engineer specialized in TypeScript with over 8 years of experience building scalable and high-performance solutions. Expert in modern architectures with Node.js, Hono, Drizzle ORM, and Supabase. I have designed and developed real-time systems for AI video processing, marketplace platforms, and high-concurrency applications. My approach combines robust backend development with cloud infrastructure, CI/CD, and DevOps best practices to create products that scale.",
    es: "Backend Engineer especializado en TypeScript con más de 8 años de experiencia construyendo soluciones escalables y de alto rendimiento. Experto en arquitecturas modernas con Node.js, Hono, Drizzle ORM y Supabase. He diseñado y desarrollado sistemas de tiempo real para procesamiento de video con AI, plataformas tipo marketplace, y aplicaciones de alta concurrencia. Mi enfoque combina desarrollo backend robusto con infraestructura cloud, CI/CD y mejores prácticas de DevOps para crear productos que escalan.",
  },
  email: "hello@jesusarrioja.dev",
  location: "Montevideo, Uruguay",
  website: "https://jesusarrioja.com",
  linkedIn: "https://linkedin.com/in/jarrioja",
};

// Experience Data
const experiencesData = [
  {
    title: {
      en: "TypeScript Backend Engineer & Project Lead",
      es: "TypeScript Backend Engineer & Líder de Proyectos",
    },
    company: "mood • digital agency",
    location: "Ciudad de México, México (Remoto)",
    startDate: "2017-03-01",
    endDate: null,
    isCurrent: true,
    description: {
      en: "Development of scalable backends with TypeScript and leadership of high technical complexity projects. Design of serverless architectures, implementation of real-time systems and cloud infrastructure management.",
      es: "Desarrollo de backends escalables con TypeScript y liderazgo de proyectos de alta complejidad técnica. Diseño de arquitecturas serverless, implementación de sistemas de tiempo real y gestión de infraestructura cloud.",
    },
    responsibilities: [
      {
        en: "Backend development with TypeScript, Hono, Drizzle ORM and Supabase in modern architectures",
        es: "Desarrollo backend con TypeScript, Hono, Drizzle ORM y Supabase en arquitecturas modernas",
      },
      {
        en: "Design and implementation of real-time processing systems with AI",
        es: "Diseño e implementación de sistemas de procesamiento en tiempo real con AI",
      },
      {
        en: "Serverless and microservices architecture with Railway and Cloud Functions",
        es: "Arquitectura de soluciones serverless y microservicios con Railway y Cloud Functions",
      },
      {
        en: "Technical leadership of development team and delivery oversight",
        es: "Liderazgo técnico de equipo de desarrollo y supervisión de entregas",
      },
      {
        en: "Monorepo configuration with Turborepo for large-scale projects",
        es: "Configuración de monorepos con Turborepo para proyectos de gran escala",
      },
      {
        en: "Implementation of CI/CD pipelines with GitHub Actions and deployment automation",
        es: "Implementación de CI/CD pipelines con GitHub Actions y automatización de deploys",
      },
    ],
    projects: [
      {
        name: "Braindog - Real-Time Video Transcription and Analysis System",
        description: {
          en: "Platform for live content processing for television productions. System that receives videos from R2 bucket, performs real-time transcription, detects speakers and generates indexed logs. Includes AI analysis to identify relevant moments and facilitate post-production work.",
          es: "Plataforma para procesamiento de contenido en vivo para producciones televisivas. Sistema que recibe videos desde R2 bucket, realiza transcripción en tiempo real, detecta hablantes y genera logs indexados. Incluye análisis con AI para identificar momentos relevantes y facilitar el trabajo de post-producción.",
        },
        tech: "TypeScript, Hono, Drizzle ORM, Supabase, Turborepo, Railway, Cloudflare R2, AI/ML APIs",
      },
      {
        name: "pfsrealty.com",
        description: {
          en: "Headless WordPress backend development with WP GraphQL and Advanced Custom Fields for high-traffic real estate site",
          es: "Desarrollo de backend headless WordPress con WP GraphQL y Advanced Custom Fields para sitio inmobiliario de alto tráfico",
        },
        tech: "WordPress, WP GraphQL, ACF, React, TypeScript",
      },
      {
        name: "miastral.com",
        description: {
          en: "Complete membership and subscription system with recurring payment processing",
          es: "Sistema completo de membresías y suscripciones con procesamiento de pagos recurrentes",
        },
        tech: "WordPress, WooCommerce, PHP, TypeScript, Custom Plugins",
      },
      {
        name: "runaHR.com",
        description: {
          en: "Performance optimization (WPO), custom plugin development and Elementor widgets",
          es: "Optimización de performance (WPO), desarrollo de plugins personalizados y widgets de Elementor",
        },
        tech: "WordPress, Elementor, PHP, Performance Optimization",
      },
    ],
    order: 1,
  },
  {
    title: {
      en: "Infrastructure Developer (DevOps/SRE)",
      es: "Desarrollador de Infraestructura (DevOps/SRE)",
    },
    company: "Boitas.com (YC W21)",
    location: "Monterrey, México (Remoto)",
    startDate: "2021-07-01",
    endDate: "2022-10-01",
    isCurrent: false,
    description: {
      en: "",
      es: "",
    },
    responsibilities: [
      {
        en: "Migration of workflows to Kubernetes with GitOps approach",
        es: "Migración de workflows hacia Kubernetes con enfoque GitOps",
      },
      {
        en: "Management of serverless platforms (Netlify) and cloud resources (AWS, GCP)",
        es: "Gestión de plataformas serverless (Netlify) y cloud resources (AWS, GCP)",
      },
      {
        en: "Implementation of CI/CD pipelines with GitHub Actions and Buddy.works",
        es: "Implementación de CI/CD pipelines con GitHub Actions y Buddy.works",
      },
      {
        en: "Maintenance and update of WordPress infrastructure",
        es: "Mantenimiento y actualización de infraestructura WordPress",
      },
    ],
    order: 2,
  },
  {
    title: {
      en: "DevOps Engineer",
      es: "DevOps Engineer",
    },
    company: "Capp Technologies",
    location: "Colombia (Remoto)",
    startDate: "2022-11-01",
    endDate: "2023-02-01",
    isCurrent: false,
    description: {
      en: "",
      es: "",
    },
    responsibilities: [
      {
        en: "Creation of CI/CD pipelines for automated deployment to Play Store",
        es: "Creación de pipelines CI/CD para despliegue automatizado a Play Store",
      },
      {
        en: "Development of Cloud Functions for data transfer between databases",
        es: "Desarrollo de Cloud Functions para transferencia de datos entre bases de datos",
      },
      {
        en: "Data modeling for visualization with CubeJS and MongoDB",
        es: "Modelado de data para visualización con CubeJS y MongoDB",
      },
    ],
    order: 3,
  },
  {
    title: {
      en: "TypeScript Backend Engineer - Independent Projects",
      es: "TypeScript Backend Engineer - Proyectos Independientes",
    },
    company: "Freelance",
    location: "Remoto",
    startDate: "2019-01-01",
    endDate: null,
    isCurrent: true,
    description: {
      en: "Development of full-stack applications and scalable backends with TypeScript for high-impact projects.",
      es: "Desarrollo de aplicaciones full-stack y backends escalables con TypeScript para proyectos de alto impacto.",
    },
    responsibilities: [],
    projects: [
      {
        name: "Ride-Sharing Platform - Maracaibo, Venezuela",
        description: {
          en: "Uber-like application for urban transportation. Complete backend system for driver-passenger matching, payment processing, commission system and automated driver payment scheduling.",
          es: "Aplicación tipo Uber para transporte urbano. Sistema completo de backend para matching de conductores y pasajeros, procesamiento de pagos, sistema de comisiones y agendamiento automatizado de pagos a conductores.",
        },
        tech: "TypeScript, Hono, Drizzle ORM, Supabase, Turborepo, Motia, Payment Gateway Integration",
      },
      {
        name: "Gaming Blog with Steam Synchronizer",
        description: {
          en: "WordPress blog specialized in gaming with automated Steam data synchronization system. Scraper that extracts game information and reviews from Steam, stores them in PostgreSQL and automatically publishes them as Custom Post Types in WordPress. Includes deals API integration to display game offers and maintain price history.",
          es: "Blog WordPress especializado en gaming con sistema automatizado de sincronización de datos de Steam. Scraper que extrae información de juegos y reseñas de Steam, los almacena en PostgreSQL y los publica automáticamente como Custom Post Types en WordPress. Incluye integración con API de deals para mostrar ofertas de juegos y mantener historial de precios.",
        },
        tech: "WordPress, Elementor, TypeScript, Motia, PostgreSQL, Steam API, Deals API, Web Scraping, Custom Post Types",
      },
    ],
    order: 4,
  },
];

// CV Skills Data
const cvSkillsData = [
  {
    category: {
      en: "Backend & Runtime",
      es: "Backend & Runtime",
    },
    skills: ["TypeScript", "Node.js", "Hono", "Drizzle ORM", "PHP"],
    order: 1,
  },
  {
    category: {
      en: "Databases & Backend Services",
      es: "Bases de Datos & Backend Services",
    },
    skills: ["Supabase", "PostgreSQL", "MongoDB", "MySQL"],
    order: 2,
  },
  {
    category: {
      en: "Frontend",
      es: "Frontend",
    },
    skills: ["React.js", "Astro", "JavaScript"],
    order: 3,
  },
  {
    category: {
      en: "DevOps & Cloud",
      es: "DevOps & Cloud",
    },
    skills: ["Docker", "Railway", "AWS", "GCP", "Cloudflare R2"],
    order: 4,
  },
  {
    category: {
      en: "Architecture & Tooling",
      es: "Arquitectura & Tooling",
    },
    skills: [
      "Turborepo",
      "Monorepos",
      "CI/CD",
      "GitHub Actions",
      "REST APIs",
      "Web Scraping",
    ],
    order: 5,
  },
  {
    category: {
      en: "WordPress Ecosystem",
      es: "WordPress Ecosystem",
    },
    skills: [
      "WordPress",
      "WP GraphQL",
      "WooCommerce",
      "ACF",
      "Elementor",
      "Custom Post Types",
    ],
    order: 6,
  },
];

// Certifications Data
const certificationsData = [
  {
    name: {
      en: "AWS Certified Cloud Practitioner",
      es: "AWS Certified Cloud Practitioner",
    },
    organization: "Amazon Web Services",
    date: "2023",
    url: "https://www.credly.com/badges/aws-certified-cloud-practitioner",
    order: 1,
  },
  {
    name: {
      en: "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
      es: "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
    },
    organization: "Udemy",
    date: "2022",
    url: "",
    order: 2,
  },
  {
    name: {
      en: "DevOps Bootcamp",
      es: "Bootcamp DevOps",
    },
    organization: "Código Facilito",
    date: "2021",
    url: "",
    order: 3,
  },
  {
    name: {
      en: "Leadership Bootcamp",
      es: "Bootcamp de Liderazgo",
    },
    organization: "Código Facilito",
    date: "2021",
    url: "",
    order: 4,
  },
  {
    name: {
      en: "Docker Course",
      es: "Curso de Docker",
    },
    organization: "Platzi",
    date: "2020",
    url: "",
    order: 5,
  },
];

// Education Data
const educationData = [
  {
    degree: {
      en: "Computer Science Engineering",
      es: "Ingeniería en Informática",
    },
    institution: "Universidad Rafael Belloso Chacín",
    location: "Venezuela",
    startYear: 2008,
    endYear: 2012,
    order: 1,
  },
];

// Languages Data
const languagesData = [
  {
    language: "Español",
    proficiency: {
      en: "Native",
      es: "Nativo",
    },
    order: 1,
  },
  {
    language: "Inglés",
    proficiency: {
      en: "Professional",
      es: "Profesional",
    },
    order: 2,
  },
];

// Export all data
const cvData = {
  cvProfile: cvProfileData,
  experiences: experiencesData,
  cvSkills: cvSkillsData,
  certifications: certificationsData,
  education: educationData,
  languages: languagesData,
};

// Write to JSON file
const outputPath = path.join(__dirname, "extracted-cv-data.json");
fs.writeFileSync(outputPath, JSON.stringify(cvData, null, 2));

console.log("✅ CV data extracted successfully!");
console.log(`📄 Output: ${outputPath}`);
console.log("\n📊 Summary:");
console.log(`  - CV Profile: 1 document`);
console.log(`  - Experiences: ${experiencesData.length} documents`);
console.log(`  - CV Skills: ${cvSkillsData.length} categories`);
console.log(`  - Certifications: ${certificationsData.length} documents`);
console.log(`  - Education: ${educationData.length} document`);
console.log(`  - Languages: ${languagesData.length} documents`);
