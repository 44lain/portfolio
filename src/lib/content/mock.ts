import type { PostMeta, ProjectMeta, Service, Skill } from "@/types/content";

// Dados mock da Sprint 1 — substituídos por conteúdo MDX/JSON na Sprint 2.

export const introContent = {
  roleTop: "Software",
  roleBottom: "Engineer",
  paragraphs: [
    "Software Engineer com atuação em Full Stack Development, aplicativos mobile, arquitetura de sistemas e cibersegurança.",
    "Construo produtos do front ao back — interfaces acessíveis e performáticas, APIs e arquiteturas escaláveis — com mentalidade de segurança em cada etapa.",
  ],
  nextEvent: {
    label: "Disponível para projetos",
    date: "A partir de Julho 2026",
  },
};

export const skills: Skill[] = [
  { label: "Full Stack", tone: "accent", rotation: -6 },
  { label: "Mobile", tone: "hover", rotation: 4 },
  { label: "System Architecture", tone: "muted", rotation: -3 },
  { label: "Cybersecurity", tone: "accent", rotation: 5 },
  { label: "TypeScript", tone: "hover", rotation: -4 },
];

export const projects: ProjectMeta[] = [
  {
    title: "CrinaApp — Marketplace de Cavalos",
    slug: "crinaapp",
    year: 2026,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    coverImage: "/crinaapp-project.png",
    accentColor: "#5A280D",
    published: true,
    summary:
      "Plataforma para compra, venda e destaque de anúncios de cavalos no Brasil.",
    link: "https://crina-app.vercel.app",
  },
  {
    title: "NetAtlas",
    slug: "netatlas",
    year: 2026,
    tags: ["Next.js", "Python", "nmap"],
    coverImage: "/netatlas-project.png",
    accentColor: "#0d2b2b",
    published: true,
    summary:
      "Plataforma open source para descoberta e inventário de redes com dashboard, agente local e insights de segurança.",
    link: "https://netatlas.vercel.app",
  },
  {
    title: "Vermolin.ux",
    slug: "vermolinux",
    year: 2025,
    tags: ["Java 17", "Spring Boot 3.2", "Angular 17", "PostgreSQL 14"],
    coverImage: "/vermolinux-project.png",
    accentColor: "#1b2333",
    published: true,
    summary:
      "Sistema de gestão para hortifruti com PDV, controle de estoque, fornecedores e autenticação multi-nível.",
    link: "https://github.com/44lain/vermolin.ux",
  },
];

export const posts: PostMeta[] = [
  {
    title: "Por que adotei conteúdo file-based com MDX",
    slug: "conteudo-file-based-mdx",
    excerpt:
      "Como estruturei projetos e posts em MDX + JSON sem depender de banco de dados.",
    tags: ["Next.js", "MDX"],
    published: true,
    createdAt: "2025-12-13",
  },
  {
    title: "Transformando designs estáticos em experiências ricas",
    slug: "designs-estaticos-experiencias-ricas",
    excerpt:
      "Meu processo para sair do layout estático e chegar em animações guiadas por scroll.",
    tags: ["Animation", "GSAP"],
    published: true,
    createdAt: "2025-11-02",
  },
  {
    title: "Depurando em público",
    slug: "depurando-em-publico",
    excerpt: "Notas de debugging que viraram aprendizado compartilhável.",
    tags: ["CSS", "Experimental"],
    published: true,
    createdAt: "2025-10-03",
  },
  {
    title: "Comece a usar Scroll-Driven Animations hoje",
    slug: "scroll-driven-animations-hoje",
    excerpt: "Animações nativas de scroll como complemento progressivo ao GSAP.",
    tags: ["CSS", "Scroll-Driven"],
    published: true,
    createdAt: "2025-09-17",
  },
  {
    title: "View Transitions no App Router na prática",
    slug: "view-transitions-app-router",
    excerpt: "Integrando a View Transitions API com roteamento do Next.js.",
    tags: ["Next.js", "View Transitions"],
    published: true,
    createdAt: "2025-07-13",
  },
  {
    title: "Mentalidade de pentest no front-end",
    slug: "mentalidade-pentest-frontend",
    excerpt: "Validação, sanitização e edge cases vistos pela ótica de segurança.",
    tags: ["CyberSec", "QA"],
    published: true,
    createdAt: "2025-07-07",
  },
];

export const services: Service[] = [
  {
    title: "Desenvolvimento Web",
    description:
      "Sites e aplicações sob medida em Next.js, do front ao back, acessíveis e performáticos.",
    tags: ["Next.js", "TypeScript", "Design System", "Acessibilidade"],
    rotation: -2,
  },
  {
    title: "Mobile",
    description:
      "Experiências mobile fluidas e responsivas, com foco em performance e toque.",
    tags: ["React Native", "PWA", "Motion", "Offline-first"],
    rotation: 1,
  },
  {
    title: "CyberSec",
    description:
      "Auditoria, pentest e QA — endurecendo aplicações com mentalidade de segurança.",
    tags: ["Pentest", "QA", "Hardening", "Automação"],
    rotation: -1,
  },
];

export function getProjects(): ProjectMeta[] {
  return projects.filter((p) => p.published).sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug && p.published);
}

export function getPosts(): PostMeta[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug && p.published);
}
