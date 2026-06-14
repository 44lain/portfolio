# Camada de Dados — Portfólio Lain

Conteúdo **100% file-based**: MDX para projetos/posts, JSON para configuração global. Sem banco de dados, sem serviço externo de dados.

## Visão geral

| Tipo            | Formato | Local                          |
|-----------------|---------|--------------------------------|
| Projetos        | MDX     | `/content/projects/*.mdx`      |
| Posts (blog)    | MDX     | `/content/posts/*.mdx`         |
| Config do site  | JSON    | `/content/site.json`           |
| Imagens         | estático| `/public/images/`              |

---

## Estrutura de arquivos

```
content/
  site.json
  projects/
    meu-app.mdx
    outro-projeto.mdx
  posts/
    meu-artigo.mdx
public/
  images/
    projects/
      meu-app-cover.webp
    posts/
      meu-artigo-og.webp
    about/
      profile.webp
```

---

## `site.json`

Configuração global — email, redes, tagline, accent padrão.

```json
{
  "siteName": "Lain",
  "tagline": "Desenvolvedor fullstack",
  "email": "hello@example.com",
  "defaultAccent": "#8F2F06",
  "socialLinks": {
    "github": "https://github.com/lain",
    "linkedin": "https://linkedin.com/in/lain",
    "instagram": null,
    "codepen": null,
    "bluesky": null,
    "mastodon": null,
    "rss": "/rss.xml"
  }
}
```

Lido via `getSiteSettings()` em `/src/lib/content/site.ts`.

---

## MDX — frontmatter

Cada `.mdx` exporta metadados via YAML frontmatter + corpo markdown/MDX.

### Projeto (`content/projects/meu-app.mdx`)

```mdx
---
title: "Meu App"
slug: "meu-app"
year: 2025
tags: ["Dev", "Next.js", "TypeScript"]
coverImage: "/images/projects/meu-app-cover.webp"
accentColor: "#8F2F06"
published: true
---

Descrição longa do projeto em **markdown**.

Pode incluir componentes React quando necessário.
```

### Post (`content/posts/meu-artigo.mdx`)

```mdx
---
title: "Como implementei scroll animations"
slug: "scroll-animations"
excerpt: "Resumo curto para listagens."
tags: ["CSS", "Animation"]
published: true
createdAt: "2025-12-13"
---

Conteúdo do artigo...
```

---

## Tipos TypeScript

```typescript
// src/types/content.ts
export interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  defaultAccent: string;
  socialLinks: SocialLinks;
}

export interface ProjectMeta {
  title: string;
  slug: string;
  year: number;
  tags: string[];
  coverImage: string;
  accentColor?: string;
  published: boolean;
}

export interface PostMeta {
  title: string;
  slug: string;
  excerpt?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}
```

---

## Helpers em `/src/lib/content/`

| Arquivo        | Função                                      |
|----------------|---------------------------------------------|
| `site.ts`      | `getSiteSettings()` — lê `site.json`        |
| `projects.ts`  | `getProjects()`, `getProjectBySlug(slug)`   |
| `posts.ts`     | `getPosts()`, `getPostBySlug(slug)`         |
| `mdx.ts`       | Parser de frontmatter (gray-matter)           |

Padrão de leitura:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export function getProjects(): ProjectMeta[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf-8');
      const { data } = matter(raw);
      return data as ProjectMeta;
    })
    .filter((p) => p.published)
    .sort((a, b) => b.year - a.year);
}
```

Renderização MDX: `@next/mdx` ou `next-mdx-remote/rsc` em Server Components.

---

## Rotas dinâmicas

```typescript
// app/work/[slug]/page.tsx
export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  // ...
}
```

Build-time static generation — sem ISR nem banco. Novo conteúdo = commit + redeploy.

---

## Formulário de contato

Sem banco para mensagens. Opções:

1. **n8n webhook** — Server Action POST para workflow (recomendado)
2. **Resend** — email transacional via API

```env
N8N_CONTACT_WEBHOOK_URL=https://...
# ou
RESEND_API_KEY=re_...
CONTACT_EMAIL=hello@example.com
```

---

## Fluxo de edição de conteúdo

1. Criar/editar `.mdx` ou `site.json` no editor
2. Adicionar imagem em `/public/images/` se necessário
3. `git commit` + push
4. Deploy (Vercel rebuild automático)

---

## O que NÃO usar neste projeto

- Prisma, Neon, Supabase ou qualquer ORM/banco
- CMS headless externo (Sanity, Contentful)
- Dados hardcoded em componentes (usar `/content/`)
