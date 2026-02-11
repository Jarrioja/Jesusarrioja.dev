/**
 * Data Migration Script
 *
 * This script migrates content from legacy HTML files to Convex database.
 * Run with: pnpm tsx scripts/migrate-data.ts
 *
 * Make sure Convex is initialized and running (pnpm convex dev)
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../packages/convex/convex/_generated/api";

// Get Convex URL from environment
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("❌ CONVEX_URL not found in environment variables");
  console.log("Make sure you've run 'pnpm convex dev' in packages/convex");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

// ===================
// DATA DEFINITIONS
// ===================

const profileData = {
  name: "Jesús Arrioja",
  title: {
    en: "DevOps, SysAdmin, Web Developer",
    es: "DevOps, SysAdmin, Desarrollador Web",
  },
  bio: {
    en: "I introduce myself as a Web Developer specialized in WordPress, web servers and cloud computing services (DigitalOcean, AWS, Google Cloud Platform).",
    es: "Me presento como Desarrollador Web especializado en WordPress, servidores web y servicios de computación en la nube (DigitalOcean, AWS, Google Cloud Platform).",
  },
  email: "hello@jesusarrioja.dev",
  location: "Montevideo, Uruguay",
  profileImageUrl: "/images/jarrioja.jpg",
};

const socialLinksData = [
  {
    platform: "twitter",
    url: "https://twitter.com/jarrioja",
    icon: "twitter",
    order: 1,
  },
  {
    platform: "medium",
    url: "https://medium.com/@jarrioja",
    icon: "medium",
    order: 2,
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/jarrioja/",
    icon: "linkedin",
    order: 3,
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/jesusarrioja.dev/",
    icon: "instagram",
    order: 4,
  },
];

const skillsData = [
  { name: "HTML 5", icon: "html5", order: 1 },
  { name: "CSS", icon: "css3", order: 2 },
  { name: "SASS", icon: "sass", order: 3 },
  { name: "Javascript", icon: "javascript", order: 4 },
  { name: "WordPress", icon: "wordpress", order: 5 },
  { name: "Solidity", icon: "ethereum", order: 6 },
  { name: "Mailchimp", icon: "mailchimp", order: 7 },
  { name: "Windows Servers", icon: "windows", order: 8 },
  { name: "Amazon Web Services", icon: "aws", order: 9 },
  { name: "CPanel", icon: "cpanel", order: 10 },
  { name: "Digital Ocean", icon: "digital-ocean", order: 11 },
  { name: "Docker", icon: "docker", order: 12 },
  { name: "G Suite", icon: "google", order: 13 },
  { name: "Azure Active Directory", icon: "microsoft", order: 14 },
  { name: "Slack", icon: "slack", order: 15 },
  { name: "Linux Servers", icon: "linux", order: 16 },
];

const projectsData = [
  {
    name: { en: "Mia Astral", es: "Mia Astral" },
    slug: "miastral",
    logoUrl: "/images/miastral.svg",
    features: [
      { en: "Astrology Website", es: "Sitio Web de Astrología" },
      { en: "Woocommerce Store", es: "Tienda Woocommerce" },
      { en: "WC Subscription & Memberships", es: "Suscripciones y Membresías WC" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#ff6b6b", to: "#ee5a6f" },
    isActive: true,
    isFeatured: false,
    order: 1,
    createdAt: Date.now(),
  },
  {
    name: { en: "Bevione", es: "Bevione" },
    slug: "bevione",
    logoUrl: "/images/bevione.png",
    features: [
      { en: "Community Website", es: "Sitio Web de Comunidad" },
      { en: "Learning Management System", es: "Sistema de Gestión de Aprendizaje" },
      { en: "Woocommerce Subscription and Membership", es: "Suscripciones y Membresías Woocommerce" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#4facfe", to: "#00f2fe" },
    isActive: true,
    isFeatured: false,
    order: 2,
    createdAt: Date.now(),
  },
  {
    name: { en: "Recetas Lily", es: "Recetas Lily" },
    slug: "recetaslily",
    logoUrl: "/images/recetaslily.png",
    features: [
      { en: "Healthy food blog", es: "Blog de comida saludable" },
      { en: "Migrate Wix to Wordpress", es: "Migración de Wix a Wordpress" },
      { en: "Recipe Filter", es: "Filtro de Recetas" },
      { en: "Woocommerce Store", es: "Tienda Woocommerce" },
    ],
    gradient: { from: "#43e97b", to: "#38f9d7" },
    isActive: true,
    isFeatured: false,
    order: 3,
    createdAt: Date.now(),
  },
  {
    name: { en: "The Growth Keys", es: "The Growth Keys" },
    slug: "tgk",
    logoUrl: "/images/tgk.svg",
    features: [
      { en: "Brand Consulting website", es: "Sitio de Consultoría de Marca" },
      { en: "Learning management system", es: "Sistema de Gestión de Aprendizaje" },
      { en: "Booking system", es: "Sistema de Reservas" },
    ],
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#fa709a", to: "#fee140" },
    isActive: true,
    isFeatured: true,
    order: 4,
    createdAt: Date.now(),
  },
  {
    name: { en: "ConBoca Blanco", es: "ConBoca Blanco" },
    slug: "conboca-blanco",
    logoUrl: "/images/conboca-blanco.svg",
    features: [
      { en: "Gastronomic Studio website", es: "Sitio Web de Estudio Gastronómico" },
      { en: "Woocommerce Store", es: "Tienda Woocommerce" },
      { en: "Built with Elementor", es: "Construido con Elementor" },
    ],
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#30cfd0", to: "#330867" },
    isActive: true,
    isFeatured: true,
    order: 5,
    createdAt: Date.now(),
  },
  {
    name: { en: "Easy Technology NY", es: "Easy Technology NY" },
    slug: "easytechnologyny",
    logoUrl: "/images/easytechnologyny.png",
    features: [
      { en: "Community One Page", es: "Página de Comunidad" },
      { en: "Built with Divi", es: "Construido con Divi" },
    ],
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#667eea", to: "#764ba2" },
    isActive: true,
    isFeatured: false,
    order: 6,
    createdAt: Date.now(),
  },
  {
    name: { en: "Parenting With Grace", es: "Parenting With Grace" },
    slug: "parentingwithgrace",
    logoUrl: "/images/parentingwithgrace.svg",
    features: [
      { en: "Community One Page", es: "Página de Comunidad" },
      { en: "Built with Divi", es: "Construido con Divi" },
    ],
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#f093fb", to: "#f5576c" },
    isActive: true,
    isFeatured: false,
    order: 7,
    createdAt: Date.now(),
  },
  {
    name: { en: "Foodit", es: "Foodit" },
    slug: "foodit",
    logoUrl: "/images/foodit.svg",
    features: [
      { en: "SaaS Landing Page", es: "Página de SaaS" },
      { en: "Built with Elementor", es: "Construido con Elementor" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#ffecd2", to: "#fcb69f" },
    isActive: true,
    isFeatured: false,
    order: 8,
    createdAt: Date.now(),
  },
  {
    name: { en: "Cykadas Rewards", es: "Cykadas Rewards" },
    slug: "cykadas-rewards",
    logoUrl: "/images/cykadas_rewards.svg",
    features: [
      { en: "Rewards website", es: "Sitio Web de Recompensas" },
      { en: "Gamification on WordPress", es: "Gamificación en WordPress" },
      { en: "Built with Elementor", es: "Construido con Elementor" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#a8edea", to: "#fed6e3" },
    isActive: true,
    isFeatured: false,
    order: 9,
    createdAt: Date.now(),
  },
  {
    name: { en: "Una Pieza Maestra Red", es: "Una Pieza Maestra Red" },
    slug: "una-pieza-maestra-red",
    logoUrl: "/images/una-pieza-maestra-red.svg",
    features: [
      { en: "Community website", es: "Sitio Web de Comunidad" },
      { en: "Learning management system", es: "Sistema de Gestión de Aprendizaje" },
      { en: "WC Subscription & Memberships", es: "Suscripciones y Membresías WC" },
    ],
    url: "https://unapiezamaestra.com/",
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#ff9a9e", to: "#fecfef" },
    isActive: true,
    isFeatured: true,
    order: 10,
    createdAt: Date.now(),
  },
  {
    name: { en: "Instapower21", es: "Instapower21" },
    slug: "instapower21",
    logoUrl: "/images/instapower21.png",
    features: [
      { en: "GYM Membership website", es: "Sitio Web de Membresía de GYM" },
      { en: "Woocommerce Store", es: "Tienda Woocommerce" },
      { en: "WC Subscription & Memberships", es: "Suscripciones y Membresías WC" },
    ],
    url: "https://instapower21.club/",
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#fa8bff", to: "#2bd2ff" },
    isActive: true,
    isFeatured: true,
    order: 11,
    createdAt: Date.now(),
  },
  {
    name: { en: "Mile", es: "Mile" },
    slug: "mile",
    logoUrl: "/images/mile.svg",
    features: [
      { en: "Personal Blog", es: "Blog Personal" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
    ],
    url: "https://mileconde.com/",
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#a1c4fd", to: "#c2e9fb" },
    isActive: true,
    isFeatured: true,
    order: 12,
    createdAt: Date.now(),
  },
  {
    name: { en: "Xcape", es: "Xcape" },
    slug: "xcape",
    logoUrl: "/images/xcape.png",
    features: [
      { en: "Student Travel Agency Website", es: "Sitio Web de Agencia de Viajes Estudiantil" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#ffeaa7", to: "#fdcb6e" },
    isActive: true,
    isFeatured: false,
    order: 13,
    createdAt: Date.now(),
  },
  {
    name: { en: "Clic Negro", es: "Clic Negro" },
    slug: "clic-negro",
    logoUrl: "/images/clic-negro.png",
    features: [
      { en: "Student Travel Agency Website", es: "Sitio Web de Agencia de Viajes Estudiantil" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#74b9ff", to: "#0984e3" },
    isActive: true,
    isFeatured: false,
    order: 14,
    createdAt: Date.now(),
  },
  {
    name: { en: "Kabu", es: "Kabu" },
    slug: "kabu",
    logoUrl: "/images/kabu.png",
    features: [
      { en: "Fitness Web Store", es: "Tienda Web de Fitness" },
      { en: "Migrate Wordpress to Shopify", es: "Migración de Wordpress a Shopify" },
      { en: "Shopify Configuration", es: "Configuración de Shopify" },
    ],
    gradient: { from: "#fd79a8", to: "#e84393" },
    isActive: true,
    isFeatured: false,
    order: 15,
    createdAt: Date.now(),
  },
  {
    name: { en: "MoneyWise", es: "MoneyWise" },
    slug: "moneywise",
    logoUrl: "/images/moneywise.png",
    features: [
      { en: "Business Coaching Website", es: "Sitio Web de Coaching Empresarial" },
      { en: "Wordpress Theme ReBuild", es: "Reconstrucción de Tema WordPress" },
      { en: "Recover Hacked Website", es: "Recuperación de Sitio Hackeado" },
    ],
    gradient: { from: "#81ecec", to: "#00b894" },
    isActive: true,
    isFeatured: false,
    order: 16,
    createdAt: Date.now(),
  },
  {
    name: { en: "SebasMom", es: "SebasMom" },
    slug: "sebasmom",
    logoUrl: "/images/sebasmom.png",
    features: [
      { en: "Healthy Food Blog", es: "Blog de Comida Saludable" },
      { en: "Wix Customization", es: "Personalización de Wix" },
    ],
    url: "https://www.sebasmom.com/",
    gradient: { from: "#fab1a0", to: "#ff7675" },
    isActive: true,
    isFeatured: false,
    order: 17,
    createdAt: Date.now(),
  },
  {
    name: { en: "EVDLT", es: "EVDLT" },
    slug: "evdlt",
    logoUrl: "/images/EVDLT.png",
    features: [
      { en: "Podcast Website", es: "Sitio Web de Podcast" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Libsyn configuration", es: "Configuración de Libsyn" },
      { en: "Advanced Custom Fields", es: "Campos Personalizados Avanzados" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#a29bfe", to: "#6c5ce7" },
    isActive: true,
    isFeatured: false,
    order: 18,
    createdAt: Date.now(),
  },
  {
    name: { en: "TSDN", es: "TSDN" },
    slug: "tsdn",
    logoUrl: "/images/TSDN.png",
    features: [
      { en: "Personal Bussines Website", es: "Sitio Web de Negocio Personal" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Woocommerce", es: "Woocommerce" },
      { en: "Lite 3rd party Booking system", es: "Sistema de Reservas Lite de Terceros" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#fdcbf1", to: "#e6dee9" },
    isActive: true,
    isFeatured: false,
    order: 19,
    createdAt: Date.now(),
  },
  {
    name: { en: "Kabu Colombia", es: "Kabu Colombia" },
    slug: "kabu-colombia",
    logoUrl: "/images/kabu.png",
    features: [
      { en: "Fitness Web Store", es: "Tienda Web de Fitness" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Woocommerce", es: "Woocommerce" },
    ],
    gradient: { from: "#ff7f50", to: "#ff6348" },
    isActive: true,
    isFeatured: false,
    order: 20,
    createdAt: Date.now(),
  },
  {
    name: { en: "Boitas Horizontal", es: "Boitas Horizontal" },
    slug: "boitas-horizontal",
    logoUrl: "/images/boitas-horizontal.png",
    features: [
      { en: "Wholesale/Marketplace", es: "Mayorista/Marketplace" },
      { en: "Woocommerce Store", es: "Tienda Woocommerce" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#55efc4", to: "#00b894" },
    isActive: true,
    isFeatured: false,
    order: 21,
    createdAt: Date.now(),
  },
  {
    name: { en: "Yo Soy Mi Meta", es: "Yo Soy Mi Meta" },
    slug: "yo-soy-mi-meta",
    logoUrl: "/images/yo-soy-mi-meta.png",
    features: [
      { en: "Landing Page", es: "Página de Aterrizaje" },
      { en: "Eventbrite Integration", es: "Integración con Eventbrite" },
    ],
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#ffeaa7", to: "#fdcb6e" },
    isActive: true,
    isFeatured: false,
    order: 22,
    createdAt: Date.now(),
  },
  {
    name: { en: "Sindy Negro", es: "Sindy Negro" },
    slug: "sindy-negro",
    logoUrl: "/images/Sindy-negro.png",
    features: [
      { en: "Personal Website", es: "Sitio Web Personal" },
    ],
    agency: {
      name: "The Growth Keys",
      logoUrl: "/images/tgk.svg",
      url: "https://thegrowthkeys.com",
    },
    gradient: { from: "#fab1a0", to: "#e17055" },
    isActive: true,
    isFeatured: false,
    order: 23,
    createdAt: Date.now(),
  },
  {
    name: { en: "Higado Sano", es: "Higado Sano" },
    slug: "higadosano",
    logoUrl: "/images/higadosano.png",
    features: [
      { en: "Health blog", es: "Blog de Salud" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Woocommerce Store", es: "Tienda Woocommerce" },
    ],
    gradient: { from: "#74b9ff", to: "#0984e3" },
    isActive: true,
    isFeatured: false,
    order: 24,
    createdAt: Date.now(),
  },
  {
    name: { en: "Bonnier ZM", es: "Bonnier ZM" },
    slug: "bonnierzm",
    logoUrl: "/images/bonnierzm.png",
    features: [
      { en: "Photography Blog", es: "Blog de Fotografía" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Woocommerce Store", es: "Tienda Woocommerce" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#a8e6cf", to: "#3dc1d3" },
    isActive: true,
    isFeatured: false,
    order: 25,
    createdAt: Date.now(),
  },
  {
    name: { en: "Flores", es: "Flores" },
    slug: "flores",
    logoUrl: "/images/flores.png",
    features: [
      { en: "Dermatology Clinic Website", es: "Sitio Web de Clínica Dermatológica" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Invoice Generator", es: "Generador de Facturas" },
      { en: "Booking System", es: "Sistema de Reservas" },
    ],
    gradient: { from: "#ffeaa7", to: "#fdcb6e" },
    isActive: true,
    isFeatured: false,
    order: 26,
    createdAt: Date.now(),
  },
  {
    name: { en: "Como Salir", es: "Como Salir" },
    slug: "como-salir",
    logoUrl: "/images/Como-salir.png",
    features: [
      { en: "Community Website", es: "Sitio Web de Comunidad" },
      { en: "Forum", es: "Foro" },
      { en: "WC Subscripcion and Membership", es: "Suscripción y Membresía WC" },
      { en: "Advanced Custom Fields", es: "Campos Personalizados Avanzados" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#fd79a8", to: "#e84393" },
    isActive: true,
    isFeatured: false,
    order: 27,
    createdAt: Date.now(),
  },
  {
    name: { en: "Simposio Miami", es: "Simposio Miami" },
    slug: "simposiomiami",
    logoUrl: "/images/simposiomiami.png",
    features: [
      { en: "Symposium Website", es: "Sitio Web de Simposio" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Contact Form", es: "Formulario de Contacto" },
      { en: "Eventbrite Integration", es: "Integración con Eventbrite" },
    ],
    gradient: { from: "#a29bfe", to: "#6c5ce7" },
    isActive: true,
    isFeatured: false,
    order: 28,
    createdAt: Date.now(),
  },
  {
    name: { en: "PN Logo Launch", es: "PN Logo Launch" },
    slug: "pn-logo-launch",
    logoUrl: "/images/PN_logo_launch_ACO_002_174x44_V001.png",
    features: [
      { en: "Server & DNS configuration", es: "Configuración de Servidor y DNS" },
      { en: "IPFS", es: "IPFS" },
      { en: "BigChainDB", es: "BigChainDB" },
      { en: "Match Reverse Search image", es: "Búsqueda Inversa de Imagen" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#fab1a0", to: "#ff7675" },
    isActive: true,
    isFeatured: false,
    order: 29,
    createdAt: Date.now(),
  },
  {
    name: { en: "Alrhea", es: "Alrhea" },
    slug: "logo-alrhea-ok",
    logoUrl: "/images/logo_alrhea_ok.png",
    features: [
      { en: "Hosting & DNS Configuration", es: "Configuración de Hosting y DNS" },
      { en: "Wordpress Website", es: "Sitio Web WordPress" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#81ecec", to: "#00cec9" },
    isActive: true,
    isFeatured: false,
    order: 30,
    createdAt: Date.now(),
  },
  {
    name: { en: "Althouse", es: "Althouse" },
    slug: "althouse-logo2",
    logoUrl: "/images/Althouse_logo2.png",
    features: [
      { en: "Hosting & DNS Configuration", es: "Configuración de Hosting y DNS" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Google Maps Customization", es: "Personalización de Google Maps" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#55efc4", to: "#00b894" },
    isActive: true,
    isFeatured: false,
    order: 31,
    createdAt: Date.now(),
  },
  {
    name: { en: "Cocoa", es: "Cocoa" },
    slug: "cocoa",
    logoUrl: "/images/cocoa.png",
    features: [
      { en: "Recover Hacked Website", es: "Recuperación de Sitio Hackeado" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
    ],
    agency: {
      name: "Mood Agency",
      logoUrl: "/images/mood-oscuro.png",
      url: "https://mood-agency.com",
    },
    gradient: { from: "#ffecd2", to: "#fcb69f" },
    isActive: true,
    isFeatured: false,
    order: 32,
    createdAt: Date.now(),
  },
  {
    name: { en: "GSA", es: "GSA" },
    slug: "gsa",
    logoUrl: "/images/GSA.png",
    features: [
      { en: "Air Cargo Website", es: "Sitio Web de Carga Aérea" },
      { en: "Wordpress Theme Customization", es: "Personalización de Tema WordPress" },
      { en: "Google Maps Customization", es: "Personalización de Google Maps" },
    ],
    gradient: { from: "#f093fb", to: "#f5576c" },
    isActive: true,
    isFeatured: false,
    order: 33,
    createdAt: Date.now(),
  },
];

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
    endDate: undefined,
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
        name: {
          en: "Braindog",
          es: "Braindog",
        },
        description: {
          en: "Platform for live content processing for television productions. Real-time video transcription system with speaker detection and AI analysis.",
          es: "Plataforma para procesamiento de contenido en vivo para producciones televisivas. Sistema de transcripción en tiempo real con detección de hablantes y análisis con AI.",
        },
        techStack: "TypeScript, Hono, Drizzle ORM, Supabase, Turborepo, Railway, Cloudflare R2, AI/ML APIs",
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
    endDate: undefined,
    isCurrent: true,
    description: {
      en: "Development of full-stack applications and scalable backends with TypeScript for high-impact projects.",
      es: "Desarrollo de aplicaciones full-stack y backends escalables con TypeScript para proyectos de alto impacto.",
    },
    responsibilities: [],
    projects: [
      {
        name: {
          en: "Ride-Sharing Platform",
          es: "Plataforma de Ride-Sharing",
        },
        description: {
          en: "Uber-like application for urban transportation with complete backend system for driver-passenger matching and payment processing.",
          es: "Aplicación tipo Uber para transporte urbano con sistema completo de backend para matching de conductores y pasajeros.",
        },
        techStack: "TypeScript, Hono, Drizzle ORM, Supabase, Turborepo, Payment Gateway Integration",
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
    startYear: "2008",
    endYear: "2012",
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

// ===================
// MIGRATION FUNCTIONS
// ===================

async function migrateProfile() {
  console.log("📝 Migrating profile...");
  try {
    await client.mutation(api.mutations.insertProfile, profileData);
    console.log("  ✓ Profile inserted:", profileData.name);
  } catch (error) {
    console.error("  ✗ Error migrating profile:", error);
    throw error;
  }
}

async function migrateSocialLinks() {
  console.log("🔗 Migrating social links...");
  try {
    for (const link of socialLinksData) {
      await client.mutation(api.mutations.insertSocialLink, link);
      console.log(`  ✓ ${link.platform}: ${link.url}`);
    }
    console.log(`  ✓ Migrated ${socialLinksData.length} social links`);
  } catch (error) {
    console.error("  ✗ Error migrating social links:", error);
    throw error;
  }
}

async function migrateSkills() {
  console.log("⚡ Migrating skills...");
  try {
    for (const skill of skillsData) {
      await client.mutation(api.mutations.insertSkill, skill);
      console.log(`  ✓ ${skill.name}`);
    }
    console.log(`  ✓ Migrated ${skillsData.length} skills`);
  } catch (error) {
    console.error("  ✗ Error migrating skills:", error);
    throw error;
  }
}

async function migrateProjects() {
  console.log("🚀 Migrating projects...");
  try {
    for (const project of projectsData) {
      await client.mutation(api.mutations.insertProject, project);
      console.log(`  ✓ ${project.name.en} (${project.slug})`);
    }
    console.log(`  ✓ Migrated all ${projectsData.length} projects successfully!`);
  } catch (error) {
    console.error("  ✗ Error migrating projects:", error);
    throw error;
  }
}

async function migrateCVProfile() {
  console.log("👤 Migrating CV profile...");
  try {
    await client.mutation(api.mutations.insertCVProfile, cvProfileData);
    console.log("  ✓ CV Profile inserted:", cvProfileData.fullName);
  } catch (error) {
    console.error("  ✗ Error migrating CV profile:", error);
    throw error;
  }
}

async function migrateExperiences() {
  console.log("💼 Migrating work experiences...");
  try {
    for (const experience of experiencesData) {
      await client.mutation(api.mutations.insertExperience, experience);
      console.log(`  ✓ ${experience.company} (${experience.title.en})`);
    }
    console.log(`  ✓ Migrated ${experiencesData.length} experiences`);
  } catch (error) {
    console.error("  ✗ Error migrating experiences:", error);
    throw error;
  }
}

async function migrateCVSkills() {
  console.log("🛠️  Migrating CV skills...");
  try {
    for (const skillCategory of cvSkillsData) {
      await client.mutation(api.mutations.insertCVSkills, skillCategory);
      console.log(`  ✓ ${skillCategory.category.en}`);
    }
    console.log(`  ✓ Migrated ${cvSkillsData.length} skill categories`);
  } catch (error) {
    console.error("  ✗ Error migrating CV skills:", error);
    throw error;
  }
}

async function migrateCertifications() {
  console.log("🎓 Migrating certifications...");
  try {
    for (const cert of certificationsData) {
      await client.mutation(api.mutations.insertCertification, cert);
      console.log(`  ✓ ${cert.name.en}`);
    }
    console.log(`  ✓ Migrated ${certificationsData.length} certifications`);
  } catch (error) {
    console.error("  ✗ Error migrating certifications:", error);
    throw error;
  }
}

async function migrateEducation() {
  console.log("🎓 Migrating education...");
  try {
    for (const edu of educationData) {
      await client.mutation(api.mutations.insertEducation, edu);
      console.log(`  ✓ ${edu.degree.en} - ${edu.institution}`);
    }
    console.log(`  ✓ Migrated ${educationData.length} education record`);
  } catch (error) {
    console.error("  ✗ Error migrating education:", error);
    throw error;
  }
}

async function migrateLanguages() {
  console.log("🌍 Migrating languages...");
  try {
    for (const lang of languagesData) {
      await client.mutation(api.mutations.insertLanguage, lang);
      console.log(`  ✓ ${lang.language} - ${lang.proficiency.en}`);
    }
    console.log(`  ✓ Migrated ${languagesData.length} languages`);
  } catch (error) {
    console.error("  ✗ Error migrating languages:", error);
    throw error;
  }
}

// ===================
// MAIN MIGRATION
// ===================

async function main() {
  console.log("🎯 Starting data migration to Convex...\n");
  console.log(`📡 Convex URL: ${CONVEX_URL}\n`);

  try {
    // Portfolio data
    await migrateProfile();
    await migrateSocialLinks();
    await migrateSkills();
    await migrateProjects();

    console.log("\n"); // Separator

    // CV data
    await migrateCVProfile();
    await migrateExperiences();
    await migrateCVSkills();
    await migrateCertifications();
    await migrateEducation();
    await migrateLanguages();

    console.log("\n✅ Migration completed successfully!");
    console.log("\n📊 Summary:");
    console.log("Portfolio Data:");
    console.log(`  - Profile: 1 document`);
    console.log(`  - Social Links: ${socialLinksData.length} documents`);
    console.log(`  - Skills: ${skillsData.length} documents`);
    console.log(`  - Projects: ${projectsData.length} documents`);
    console.log("\nCV Data:");
    console.log(`  - CV Profile: 1 document`);
    console.log(`  - Work Experiences: ${experiencesData.length} documents`);
    console.log(`  - CV Skills: ${cvSkillsData.length} categories`);
    console.log(`  - Certifications: ${certificationsData.length} documents`);
    console.log(`  - Education: ${educationData.length} document`);
    console.log(`  - Languages: ${languagesData.length} documents`);
    console.log(`\n💡 Next step: Implement CV page components with print optimization`);

  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run migration
main();
