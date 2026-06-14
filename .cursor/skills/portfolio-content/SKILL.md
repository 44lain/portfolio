---
name: portfolio-content
description: Gerencia conteúdo MDX e JSON do portfólio Lain — site.json, frontmatter, helpers em lib/content, generateStaticParams e renderização MDX. Use ao criar projetos/posts ou integrar conteúdo file-based.
---

# Content Layer — Portfólio Lain

Docs: `docs/data-layer.md`, `.cursor/rules/backend.mdc`

> Conteúdo **file-based**. Sem Prisma, Neon ou Supabase.

## Estrutura

```
content/site.json
content/projects/*.mdx
content/posts/*.mdx
src/lib/content/{site,projects,posts,mdx}.ts
src/types/content.ts
```

## site.json

Email, tagline, socialLinks, defaultAccent — fonte única de config global.

## Frontmatter projeto

```yaml
title, slug, year, tags, coverImage, accentColor?, published
```

## Helpers obrigatórios

- `getSiteSettings()` → `SiteSettings`
- `getProjects()` → `ProjectMeta[]` (published, sort by year desc)
- `getProjectBySlug(slug)` → `ProjectMeta & { content: string } | null`
- `getPosts()` / `getPostBySlug(slug)` — idem para blog

## Parser

```typescript
import matter from 'gray-matter';
const { data, content } = matter(fileContents);
```

Validar frontmatter com Zod (recomendado).

## Rotas

```typescript
export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}
```

## Imagens

`coverImage: "/images/projects/slug-cover.webp"` → `public/images/projects/`

## Checklist

- [ ] Slug = nome do arquivo
- [ ] `published: false` oculta da listagem
- [ ] Footer lê `site.json`
- [ ] Sem mock data nos componentes após Sprint 2
- [ ] `notFound()` para slug inválido
