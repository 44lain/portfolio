# Prompt para o Agent (Cursor) — Setup de Documentação do Projeto "Portfólio Lain"

Você vai criar a estrutura de documentação inicial de um projeto novo (greenfield) em Next.js (App Router) + TypeScript + Supabase + Prisma + Tailwind, que será o meu portfólio pessoal de desenvolvedor.

O design/layout deve replicar a estrutura, hierarquia e sistema de animações do site https://cydstumpel.nl/ — antes de criar os documentos, acesse esse site, analise sua estrutura de seções, tipografia, grid, animações (GSAP, ScrollTrigger, Lenis, View Transitions API) e componentes. Vamos manter o MESMO layout/modelo, mudando apenas: conteúdo (textos, projetos, sobre mim), paleta de cores e imagens/fotos.

## Paleta de cores do projeto (substitui a paleta original do site de referência)

| Cor              | Hex       | Uso                    |
|------------------|-----------|------------------------|
| Preto profundo   | #100A08   | Background principal   |
| Marrom escuro    | #5A280D   | Elementos secundários  |
| Laranja queimado | #8F2F06   | Destaques (accent)     |
| Caramelo         | #975025   | Hover/detalhes         |
| Bege quente      | #624B35   | Texto secundário       |
| Branco suave     | #F4F4F4   | Texto principal        |

## O que criar

Crie a seguinte estrutura, **sem ainda escrever código de implementação** — esta etapa é só de documentação/planejamento:

```
.cursor/rules/
  general.mdc
  frontend.mdc
  backend.mdc

docs/
  skills.md
  design-system.md
  tech-stack.md
  sprints.md
```

### 1. `.cursor/rules/general.mdc`
Regras gerais do projeto: convenções de commit (Conventional Commits em PT-BR), padrão de nomenclatura de arquivos/pastas, idioma do código (inglês) vs comentários/docs (PT-BR), princípios de organização (Server Components por padrão, Client Components só quando necessário para animação/interatividade).

### 2. `.cursor/rules/frontend.mdc`
Regras específicas de frontend: Tailwind + variáveis CSS para o design system (referenciar `docs/design-system.md`), convenções de componentes (`/components/ui`, `/components/sections`), padrão de animações (GSAP + ScrollTrigger + Lenis + View Transitions API conforme o modelo de referência), regras de responsividade (gsap.matchMedia para diferenciar mobile/desktop), acessibilidade básica (prefers-reduced-motion).

### 3. `.cursor/rules/backend.mdc`
Regras de backend: padrão de acesso a dados via Prisma + Supabase, organização de `/lib`, convenções de nomenclatura de tabelas/models, padrão de Server Actions vs Route Handlers, tratamento de erros.

### 4. `docs/skills.md`
Liste as competências/tecnologias que o desenvolvedor (eu, Lain) domina e que devem orientar as decisões técnicas do projeto: TypeScript, Next.js, Supabase, Fastify, Prisma, n8n, Tailwind, frontend forte/backend em evolução, experiência em pentest/QA (pode aparecer como seção "skills" no site).

### 5. `docs/design-system.md`
Documente o design system adaptado do site de referência (https://cydstumpel.nl/), incluindo:
- Paleta de cores (tabela acima) como variáveis CSS + mapeamento no `tailwind.config`
- Tipografia: fonte serifada para títulos (equivalente a Instrument Serif) + Geist para corpo, via `next/font`
- Hierarquia tipográfica (huge-hero, large-heading, small-heading, large-body, small-body, caps)
- Grid e breakpoints (12 colunas desktop, 6 tablet, 1 mobile)
- Componentes principais (Header, Hero, ProjectCard, LinkHover/tooltip, Footer) e como cada um deve se comportar visualmente
- Mapeamento de animações (page load, scroll animations, hover effects, text animations, transições de página, microinterações) baseado na análise do site de referência

### 6. `docs/tech-stack.md`
Documente a stack técnica do projeto: Next.js (App Router), TypeScript, Tailwind + CSS Variables, GSAP + ScrollTrigger, @studio-freight/react-lenis, View Transitions API, Supabase (Postgres + Storage), Prisma, estrutura de pastas (`/src/app`, `/components`, `/hooks`, `/lib`, `/animations`, `/prisma`), e o schema inicial de dados (Project, Post, SiteSettings).

### 7. `docs/sprints.md`
Divida o projeto em sprints/fases sequenciais para eu seguir como planejamento, no formato de checklist (markdown checkboxes), cada sprint com objetivo, entregáveis e critério de "pronto":

- **Sprint 0 — Setup e Fundalçação**: init do projeto, Tailwind, fontes, design tokens, Lenis configurado, Header/Footer estáticos
- **Sprint 1 — Conteúdo e Estrutura Estática**: todas as seções (Hero, About, Work, Blog, Contact, Footer) com conteúdo real estático/mock, layout responsivo sem animações
- **Sprint 2 — Integração Supabase/Prisma**: schema, conexão, fetch de projects/posts/site_settings, popular seções dinâmicas
- **Sprint 3 — Animações de Texto e Scroll**: Hero duplicado, ScrollTrigger, paralaxe, stagger nos cards, CSS Scroll-Driven Animations
- **Sprint 4 — Transições de Página**: View Transitions API integrada ao App Router, fallback GSAP
- **Sprint 5 — Polimento, Performance e SEO**: hover effects, microinterações, otimização de imagens, Metadata API, testes de responsividade/mobile

Para cada sprint, inclua uma estimativa de tempo e marque dependências entre sprints.

## Observações finais
- Não implemente código ainda — apenas crie os arquivos de documentação acima, completos e prontos para orientar o desenvolvimento.
- Use PT-BR no conteúdo dos docs.
- Sempre que precisar confirmar algo sobre o layout/animações originais, consulte https://cydstumpel.nl/ antes de decidir.
