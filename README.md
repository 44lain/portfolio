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

| Comando        | Descrição              |
|----------------|------------------------|
| `npm run dev`  | Servidor de desenvolvimento |
| `npm run build`| Build de produção      |
| `npm run start`| Servidor de produção   |
| `npm run lint` | ESLint                 |

## Conteúdo

| Tipo     | Local                    |
|----------|--------------------------|
| Config   | `content/site.json`      |
| Projetos | `content/projects/*.mdx` |
| Posts    | `content/posts/*.mdx`    |
| Imagens  | `public/`                |

Novo arquivo MDX com `published: true` gera página automaticamente no build.

## Formulário de contato

Configure **uma** das opções em `.env.local`:

1. **n8n** — `N8N_CONTACT_WEBHOOK_URL` (POST JSON com `name`, `email`, `message`)
2. **Resend** — `RESEND_API_KEY` + `CONTACT_EMAIL`

Sem variáveis, o formulário valida os campos mas orienta o uso do e-mail direto.

## Deploy (Vercel)

1. Importe o repositório na [Vercel](https://vercel.com)
2. Defina `NEXT_PUBLIC_SITE_URL` com a URL de produção
3. Configure webhook ou Resend se quiser formulário ativo
4. Deploy automático a cada push em `main`

## Documentação

- `docs/sprints.md` — planejamento por sprint
- `docs/design-system.md` — tokens e componentes
- `docs/data-layer.md` — MDX/JSON
- `docs/view-transitions.md` — navegação animada
- `docs/seo.md` — SEO e metadata

## Stack

Next.js · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis · gray-matter · Zod · next-mdx-remote
