# Sprints — Portfólio Lain

Planejamento sequencial do projeto. Cada sprint só deve iniciar quando os critérios de "pronto" da sprint anterior forem atendidos.

**Estimativa total:** 2–3 semanas (desenvolvedor com experiência em Next.js + MDX)

---

## Mapa de dependências

```
Sprint 0 ──► Sprint 1 ──► Sprint 2 ──► Sprint 3 ──► Sprint 4 ──► Sprint 5
 (setup)     (estático)   (mdx)        (scroll)     (transições)  (polish)
```

| Sprint | Estimativa | Depende de |
|--------|------------|------------|
| 0      | 1–2 dias   | —          |
| 1      | 2–3 dias   | Sprint 0   |
| 2      | 1–2 dias   | Sprint 1   |
| 3      | 3–4 dias   | Sprint 2   |
| 4      | 3–5 dias   | Sprint 3   |
| 5      | 2–3 dias   | Sprint 4   |

---

## Sprint 0 — Setup e Fundação

**Objetivo:** Projeto Next.js inicializado com design tokens, fontes, Lenis e shell estático (Header/Footer).

**Estimativa:** 1–2 dias

### Entregáveis

- [x] `npx create-next-app@latest` com App Router, TypeScript, Tailwind, `src/` dir
- [x] Estrutura de pastas conforme `docs/tech-stack.md`
- [x] `globals.css` com variáveis CSS da paleta Lain
- [x] `@theme inline` mapeando tokens de cor, radius e fontes (Tailwind v4)
- [x] Fontes via `next/font`: Instrument Serif (títulos) + Geist (corpo)
- [x] Layout raiz com `lenis/react` configurado
- [x] Componentes estáticos `<Header />` e `<Footer />` (sem animação)
- [x] `content/site.json` + `getSiteSettings()` (base da camada MDX)
- [x] `.env.example` com variáveis opcionais (webhook contato)

### Critério de pronto

- `npm run dev` renderiza página com Header/Footer, tipografia correta e paleta aplicada
- Scroll suave Lenis funcional
- Zero erros TypeScript

---

## Sprint 1 — Conteúdo e Estrutura Estática

**Objetivo:** Todas as seções da home e rotas internas com conteúdo mock/estático, layout responsivo, sem animações GSAP.

**Estimativa:** 2–3 dias  
**Depende de:** Sprint 0

### Entregáveis

- [ ] Seção **Hero** — título estático (sem duplicação animada ainda), tagline
- [ ] Seção **About** — bio, skills tags, experiência resumida
- [ ] Seção **Work** — grid de `<ProjectCard />` com dados mock (3–6 projetos)
- [ ] Seção **Blog** — lista de posts mock com data, tags, excerpt
- [ ] Seção **Contact** — formulário visual (sem submit funcional) + info de contato
- [ ] Rotas `/about`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/contact`
- [ ] Grid responsivo: 12 cols desktop, 6 tablet, 1 mobile
- [ ] `<LinkHover />` markup estático (underline CSS, sem tooltip animado)
- [ ] `<ProjectCard />` com hover CSS básico (border-radius transition)
- [ ] Conteúdo alinhado ao perfil em `docs/skills.md`

### Critério de pronto

- Navegação entre todas as rotas funciona (sem View Transitions ainda)
- Layout fiel à hierarquia de cydstumpel.nl adaptado à paleta Lain
- Responsivo testado em 375px, 768px, 1280px
- Lighthouse Accessibility ≥ 90

---

## Sprint 2 — Conteúdo MDX + JSON

**Objetivo:** Projetos, posts e config do site vindos de arquivos em `/content/`, consumidos via helpers em `/lib/content/`.

**Estimativa:** 1–2 dias  
**Depende de:** Sprint 1

### Entregáveis

- [ ] `content/site.json` com email, social links, tagline
- [ ] 3–6 arquivos MDX em `content/projects/` com frontmatter completo
- [ ] 2–4 arquivos MDX em `content/posts/`
- [ ] Tipos em `src/types/content.ts`
- [ ] Helpers: `getSiteSettings()`, `getProjects()`, `getProjectBySlug()`, `getPosts()`, `getPostBySlug()`
- [ ] `gray-matter` para parse de frontmatter
- [ ] Home e rotas `/work`, `/blog` consumindo dados reais via Server Components
- [ ] Footer com social links de `site.json`
- [ ] Imagens em `/public/images/` referenciadas no frontmatter
- [ ] `generateStaticParams` para slugs MDX
- [ ] Renderização MDX nas páginas de detalhe (`/work/[slug]`, `/blog/[slug]`)

### Critério de pronto

- Novo arquivo `.mdx` + commit gera página no build
- Slug inexistente retorna 404
- Nenhum dado mock restante nas seções dinâmicas
- `site.json` é única fonte de config global

---

## Sprint 3 — Animações de Texto e Scroll

**Objetivo:** Implementar o sistema de motion do site de referência — Hero duplicado, ScrollTrigger, paralaxe, stagger.

**Estimativa:** 3–4 dias  
**Depende de:** Sprint 2

### Entregáveis

- [ ] `<Loader />` com fade out no page load
- [ ] Hero: texto duplicado (5–8 cópias) com rotações/offsets via GSAP timeline
- [ ] ScrollTrigger paralaxe no título Hero (`scrub: true`)
- [ ] Entrada staggered dos ProjectCards (rotate + opacity)
- [ ] Background progress via `--bg-progress` no scroll
- [ ] Títulos de serviços/seções com texto duplicado e paralaxe
- [ ] CSS Scroll-Driven Animations como progressive enhancement
- [ ] `gsap.matchMedia()` — animações completas desktop, reduzidas tablet, mínimas mobile
- [ ] Timelines organizadas em `/animations`
- [ ] Hooks: `useScrollTrigger`, integração Lenis ↔ ScrollTrigger
- [ ] `prefers-reduced-motion`: fallback estático

### Critério de pronto

- Experiência de scroll comparável ao original em desktop
- Mobile sem tooltips de vídeo e paralaxe pesada
- ScrollTrigger.refresh() funciona após resize
- Sem jank perceptível (60fps em desktop mid-range)
- Reduced motion respeitado

---

## Sprint 4 — Transições de Página

**Objetivo:** Navegação fluida entre rotas via View Transitions API integrada ao App Router.

**Estimativa:** 3–5 dias (maior risco do projeto)  
**Depende de:** Sprint 3

### Entregáveis

- [ ] Hook `useViewTransition` + helper `navigateWithTransition()`
- [ ] `app/template.tsx` configurado para View Transitions
- [ ] CSS `@view-transition` rules para fade/slide entre páginas
- [ ] Fallback GSAP crossfade para browsers sem suporte
- [ ] Pausar Lenis + ScrollTrigger durante transição
- [ ] `ScrollTrigger.refresh()` após cada navegação concluída
- [ ] `<LinkHover />` tooltip animado (GSAP fade/scale) — desktop only
- [ ] Transição funcional em `/work/[slug]` e `/blog/[slug]`

### Critério de pronto

- Navegação home → projeto → blog → home sem flash ou scroll quebrado
- Fallback testado desabilitando VT API no DevTools
- Nenhum ScrollTrigger órfão após 10+ navegações consecutivas
- Transições ≤ 600ms

---

## Sprint 5 — Polimento, Performance e SEO

**Objetivo:** Refinar microinterações, otimizar performance, configurar SEO completo e validar responsividade final.

**Estimativa:** 2–3 dias  
**Depende de:** Sprint 4

### Entregáveis

- [ ] Hover effects finais: ProjectCard border-radius, LinkHover underline
- [ ] Microinteração "Copiar email" com feedback visual
- [ ] `next/image` otimizado (sizes, priority no Hero, lazy below fold)
- [ ] `dynamic()` para módulos pesados (Three.js se usado)
- [ ] `generateMetadata()` em todas as rotas dinâmicas
- [ ] `sitemap.ts` e `robots.ts`
- [ ] Open Graph images por projeto/post
- [ ] Lighthouse Performance ≥ 85, SEO ≥ 95, Accessibility ≥ 90
- [ ] Teste cross-browser: Chrome, Firefox, Safari
- [ ] Teste mobile real (iOS + Android)
- [ ] Formulário de contato funcional (Server Action + n8n webhook opcional)
- [ ] Deploy preview na Vercel

### Critério de pronto

- Site deployado e acessível via URL pública
- Core Web Vitals no verde (LCP < 2.5s, CLS < 0.1)
- SEO validado com ferramentas (meta tags, sitemap acessível)
- Checklist de a11y manual concluído
- README com instruções de setup local

---

## Checklist geral de conclusão do projeto

- [ ] Todas as 6 sprints concluídas
- [ ] Documentação `.cursor/rules/` e `docs/` refletem implementação final
- [ ] Repositório com `.env.example` (sem secrets)
- [ ] Conteúdo real (bio, projetos, posts) populado
- [ ] Domínio customizado configurado (opcional)

---

## Notas de risco

| Risco                              | Sprint | Mitigação                                    |
|------------------------------------|--------|----------------------------------------------|
| View Transitions + App Router      | 4      | Fallback GSAP; testar cedo                   |
| Lenis ↔ ScrollTrigger sync         | 3      | scrollerProxy documentado                    |
| Performance mobile com animações   | 3, 5   | matchMedia agressivo; reduced motion         |
| MDX frontmatter inválido           | 2      | Validar com Zod no parser de conteúdo        |
