import type { Service, Skill } from "@/types/content";

// Dados mock da Sprint 1 — About/Services até migrarem para JSON/MDX.

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
