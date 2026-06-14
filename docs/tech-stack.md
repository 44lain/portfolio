# Tech Stack — Portfólio Lain

Arquitetura 100% Next.js, replicando [cydstumpel.nl](https://cydstumpel.nl/) com conteúdo file-based (MDX + JSON) e animações GSAP/Lenis/View Transitions.

## Visão geral

| Camada        | Tecnologia                          | Função                                      |
|---------------|-------------------------------------|---------------------------------------------|
| Framework     | Next.js 15+ (App Router)            | Rotas, SSG, layouts, Metadata API           |
| Linguagem     | TypeScript                          | Tipagem end-to-end                          |
| Conteúdo      | MDX + JSON                          | Projetos, posts, config do site             |
| Estilo        | Tailwind CSS 4 + CSS Variables      | Design system, temas dinâmicos              |
| Animações     | GSAP, ScrollTrigger, Lenis, VT API  | Motion design e transições                  |
| Assets        | `/public/images`                    | Capas, OG images, fotos                     |
| Deploy        | Vercel (sugerido)                   | CDN, preview deployments                    |

> Sem banco de dados. Conteúdo versionado no Git. Ver `docs/data-layer.md`.

---

## Next.js (App Router)

- **Server Components** por padrão — leitura de MDX/JSON, SEO, markup estático
- **Client Components** para GSAP, Lenis, hover, View Transitions
- **SSG** via `generateStaticParams` lendo slugs dos arquivos MDX

### Rotas

```
src/app/
  layout.tsx                 → Root (fontes, Lenis, Loader futuro)
  template.tsx               → View Transitions (Sprint 4)
  globals.css
  (site)/
    layout.tsx
    page.tsx                 → Home
    about/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    contact/page.tsx
  sitemap.ts
  robots.ts
```

---

## Conteúdo (MDX + JSON)

| Pacote           | Função                                    |
|------------------|-------------------------------------------|
| `@next/mdx`      | Suporte MDX nativo no App Router          |
| `gray-matter`    | Parse de frontmatter YAML                 |
| `@tailwindcss/typography` | Estilo prose para corpo MDX      |

### Pastas

```
content/
  site.json
  projects/*.mdx
  posts/*.mdx
src/lib/content/
  site.ts, projects.ts, posts.ts, mdx.ts
src/types/content.ts
```

Detalhes: `docs/data-layer.md`

---

## TypeScript

- `strict: true`
- Tipos manuais em `/src/types/content.ts` (sem ORM/codegen)
- Interfaces compartilhadas: `ProjectMeta`, `PostMeta`, `SiteSettings`, `SocialLinks`

---

## Tailwind CSS + CSS Variables

- Tailwind v4 via `@tailwindcss/postcss`
- Tokens em `globals.css` → `@theme inline` ou `tailwind.config.ts`
- Referência visual: `docs/design-system.md`
- Temas por página: `data-accent-color` no wrapper da rota

---

## Animações (Sprint 3+)

| Lib                    | Uso                                           |
|------------------------|-----------------------------------------------|
| `gsap` + ScrollTrigger | Hero, paralaxe, stagger, page load            |
| `lenis`                | Scroll suave (`lenis/react`)                  |
| View Transitions API   | Transições entre rotas                        |
| CSS Scroll-Driven Anim.| Complemento progressivo                       |

```
src/animations/     → timelines GSAP reutilizáveis
src/hooks/          → useLenis, useScrollTrigger, useViewTransition
```

Three.js: opcional via `dynamic()` em cards específicos.

---

## Tipografia

| Papel   | Fonte            | Carregamento        |
|---------|------------------|---------------------|
| Títulos | Instrument Serif | `next/font/google`  |
| Corpo   | Geist Sans       | pacote `geist`      |

---

## Estrutura de pastas completa

```
/
├── .cursor/
│   ├── rules/
│   └── skills/
├── content/
│   ├── site.json
│   ├── projects/
│   └── posts/
├── docs/
├── public/
│   └── images/
│       ├── projects/
│       ├── posts/
│       └── about/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   ├── sections/
│   │   └── providers/
│   ├── hooks/
│   ├── lib/
│   │   ├── content/
│   │   └── actions/
│   ├── animations/
│   └── types/
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Dependências

### Sprint 0

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lenis": "^1.0.0",
    "geist": "^1.3.0"
  }
}
```

### Sprint 2 (conteúdo)

```json
{
  "gray-matter": "^4.0.0",
  "@next/mdx": "^15.0.0",
  "@mdx-js/react": "^3.0.0",
  "zod": "^3.0.0"
}
```

### Sprint 3+ (animações)

```json
{
  "gsap": "^3.12.0",
  "@gsap/react": "^2.0.0"
}
```

---

## Performance

| Estratégia             | Onde aplicar                         |
|------------------------|--------------------------------------|
| SSG                    | Todas as rotas com MDX               |
| `generateStaticParams` | `/work/[slug]`, `/blog/[slug]`     |
| `dynamic()` import     | Three.js, plugins GSAP pesados       |
| `next/image`           | Todas as imagens                     |
| CDN Vercel             | `/public` estático                   |

---

## SEO

- `generateMetadata()` por rota — dados do frontmatter MDX + `site.json`
- Title template: `%s | Lain`
- `sitemap.ts` gerado a partir dos slugs MDX
- Open Graph images de `/public/images/`

---

## Variáveis de ambiente

```env
# Opcional — Sprint 5 (formulário de contato)
N8N_CONTACT_WEBHOOK_URL=
RESEND_API_KEY=
CONTACT_EMAIL=
```

Sem `DATABASE_URL` — não há banco.

---

## O que NÃO usar

- Prisma, Neon, Supabase ou qualquer banco/ORM
- WordPress, PHP, Swup
- CMS headless externo (Sanity, Contentful)
- Framer Motion como lib principal de animação
- `@studio-freight/react-lenis` (deprecated — usar `lenis`)

---

## Complexidade e tempo

| Aspecto     | Estimativa                                   |
|-------------|----------------------------------------------|
| Nível geral | Médio a avançado                             |
| Maior risco | View Transitions + App Router (Sprint 4)     |
| Tempo total | 2–3 semanas (MDX simplifica Sprint 2)      |

Ver `docs/sprints.md`.
