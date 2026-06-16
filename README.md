# Portfólio Lain

Portfólio pessoal em **Next.js 16** (App Router), com conteúdo file-based (MDX + JSON), animações GSAP/Lenis e View Transitions API.

Referência visual: [cydstumpel.nl](https://cydstumpel.nl/)

## Pré-requisitos

- Node.js 20.9+
- npm

## Setup local

```bash
git clone https://github.com/44lain/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
```

Edite `.env.local` e defina `NEXT_PUBLIC_SITE_URL` (ex.: `http://localhost:3000` em dev).

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando         | Descrição                   |
|-----------------|-----------------------------|
| `npm run dev`   | Servidor de desenvolvimento |
| `npm run build` | Build de produção           |
| `npm run start` | Servidor de produção        |
| `npm run lint`  | ESLint                      |

## Estrutura do projeto

```
content/           → site.json, projects/*.mdx, posts/*.mdx
public/            → imagens estáticas
src/
  app/             → rotas App Router, sitemap, robots
  components/      → UI, seções, providers
  animations/      → timelines GSAP
  hooks/           → useViewTransition
  lib/             → content, seo, navigation, motion
  types/           → contratos TypeScript
docs/              → design system, sprints, SEO, contato
```

## Conteúdo

| Tipo     | Local                    |
|----------|--------------------------|
| Config   | `content/site.json`      |
| Projetos | `content/projects/*.mdx` |
| Posts    | `content/posts/*.mdx`    |
| Imagens  | `public/`                |

Novo arquivo MDX com `published: true` gera página automaticamente no build.

## Contato

A página `/contact` usa **mailto:** — botão CTA abre o app de e-mail do visitante. O e-mail vem de `content/site.json`. Detalhes em `docs/contact.md`.

## Deploy (Vercel)

1. Importe o repositório na [Vercel](https://vercel.com)
2. Defina `NEXT_PUBLIC_SITE_URL` com a URL de produção
3. Deploy automático a cada push em `main`

## Documentação

| Doc | Conteúdo |
|-----|----------|
| `docs/sprints.md` | Planejamento por sprint |
| `docs/design-system.md` | Tokens, componentes, motion |
| `docs/data-layer.md` | MDX, JSON, validação Zod |
| `docs/view-transitions.md` | Navegação animada (Sprint 4) |
| `docs/seo.md` | Metadata, sitemap, OG |
| `docs/contact.md` | Fluxo mailto na página de contato |

## Stack

Next.js · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis · gray-matter · Zod · next-mdx-remote

## Variáveis de ambiente

| Variável | Obrigatória | Uso |
|----------|-------------|-----|
| `NEXT_PUBLIC_SITE_URL` | Produção | URL canônica (sitemap, OG, robots) |

Sem banco de dados. Sem secrets obrigatórios para o formulário de contato.
