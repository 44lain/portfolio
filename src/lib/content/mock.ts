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
    title: "CrinaApp",
    slug: "crinaapp",
    year: 2026,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    coverImage: "/crinaapp-project.png",
    accentColor: "#8F2F06",
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
    accentColor: "#5A280D",
    published: true,
    summary:
      "Plataforma open source para descoberta e inventário de redes com dashboard, agente local e insights de segurança.",
    link: "https://netatlas.vercel.app",
  },
  {
    title: "Vermolin.ux",
    slug: "vermolinux",
    year: 2025,
    tags: ["Java", "Spring Boot", "Angular", "PostgreSQL"],
    coverImage: "/vermolinux-project.png",
    accentColor: "#975025",
    published: true,
    summary:
      "Sistema de gestão para hortifruti com PDV, controle de estoque, fornecedores e autenticação multi-nível.",
    link: "https://github.com/44lain/vermolin.ux",
  },
];

export const posts: PostMeta[] = [
  {
    title: "Por que o Linux virou meu sistema principal",
    slug: "linux-sistema-principal",
    excerpt: "Desenvolvimento, segurança, performance e os motivos que me fizeram abandonar o Windows.",
    tags: ["Linux", "Productivity"],
    published: true,
    createdAt: "2025-12-13",
  },
  {
    title: "Meu setup ideal para projetos Next.js em 2026",
    slug: "setup-ideal-nextjs-2026",
    excerpt: "As ferramentas, extensões e configurações que uso para começar qualquer projeto Next.js hoje.",
    tags: ["Next.js", "Setup"],
    published: true,
    createdAt: "2025-12-20",
  },
  {
    title: "A estrutura de pastas que uso em projetos Next.js",
    slug: "estrutura-pastas-nextjs",
    excerpt: "Como organizo componentes, rotas e lógica de negócio para manter o projeto escalável.",
    tags: ["Next.js", "Arquitetura"],
    published: true,
    createdAt: "2026-01-05",
  },
  {
    title: "Ferramentas que sobreviveram ao meu workflow",
    slug: "ferramentas-que-sobreviveram",
    excerpt: "As ferramentas que testei, usei e continuam fazendo parte do meu dia a dia até hoje.",
    tags: ["Productivity", "Ferramentas"],
    published: true,
    createdAt: "2026-01-18",
  },
  {
    title: "Como configuro um projeto novo em menos de 15 minutos",
    slug: "configurando-projeto-em-15-minutos",
    excerpt: "Meu processo direto para sair do zero a um ambiente funcional pronto para codar.",
    tags: ["Next.js", "Produtividade"],
    published: true,
    createdAt: "2026-02-02",
  },
  {
    title: "Criando um design system para projetos pessoais",
    slug: "design-system-projetos-pessoais",
    excerpt: "Como defino cores, tipografia e componentes reutilizáveis sem perder tempo.",
    tags: ["Design", "Frontend"],
    published: true,
    createdAt: "2026-02-19",
  },
  {
    title: "Como analiso um site antes de recriá-lo",
    slug: "analisando-site-antes-de-recriar",
    excerpt: "O processo que sigo para entender estrutura, performance e UX antes de começar do zero.",
    tags: ["UX", "Análise"],
    published: true,
    createdAt: "2026-03-08",
  },
  {
    title: "Checklist de performance antes de colocar um site no ar",
    slug: "checklist-performance-deploy",
    excerpt: "Os pontos que verifico para garantir velocidade e boa experiência antes do lançamento.",
    tags: ["Performance", "Checklist"],
    published: true,
    createdAt: "2026-03-25",
  },
  {
    title: "Checklist de segurança antes do deploy",
    slug: "checklist-seguranca-deploy",
    excerpt: "Itens essenciais de segurança que confiro antes de qualquer site ir para produção.",
    tags: ["Segurança", "Checklist"],
    published: true,
    createdAt: "2026-04-10",
  }
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
