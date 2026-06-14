# Skills — Lain

Perfil técnico do desenvolvedor por trás deste portfólio. Orienta decisões de stack, conteúdo da seção About/Skills e profundidade técnica do projeto.

## Stack principal (domínio sólido)

| Tecnologia   | Nível        | Uso no portfólio                                      |
|--------------|--------------|-------------------------------------------------------|
| TypeScript   | Avançado     | Tipagem em todo o projeto — front, content layer      |
| Next.js      | Avançado     | App Router, Server Components, Metadata API, SSG      |
| Tailwind CSS | Avançado     | Design system, responsividade, variáveis CSS          |
| MDX          | Intermediário| Projetos e posts como arquivos versionados no Git     |
| n8n          | Intermediário| Automações (formulário de contato, notificações)      |

## Frontend criativo

| Tecnologia              | Nível        | Uso no portfólio                              |
|-------------------------|--------------|-----------------------------------------------|
| GSAP + ScrollTrigger    | Em evolução  | Hero, paralaxe, stagger de cards, page load   |
| Lenis                   | Em evolução  | Scroll suave com inércia                      |
| View Transitions API    | Em evolução  | Transições entre rotas                        |
| CSS Scroll-Driven Anim. | Em evolução  | Complemento progressivo ao ScrollTrigger      |
| Three.js                | Básico       | Opcional em cards de projetos 3D (lazy load)  |

## Backend e dados

| Tecnologia | Nível        | Uso no portfólio                              |
|------------|--------------|-----------------------------------------------|
| MDX + JSON | Intermediário| Camada de conteúdo file-based (sem banco)     |
| Fastify    | Intermediário| Experiência backend Node.js (referência)      |
| Node.js    | Intermediário| Runtime do ecossistema TS                     |
| Prisma     | Avançado     | Experiência prévia — **não usado neste projeto** |

> **Nota:** Conteúdo via arquivos MDX/JSON + Server Actions para contato. Sem banco de dados. Fastify é experiência complementar, não faz parte desta stack.

## Segurança e qualidade

| Área              | Nível        | Relevância no portfólio                        |
|-------------------|--------------|-------------------------------------------------|
| Pentest           | Experiência  | Validação de forms, sanitização de MDX          |
| QA / Testes       | Experiência  | Responsividade, a11y, edge cases                |
| Acessibilidade    | Consciência  | prefers-reduced-motion, semântica, contraste    |

## Como isso aparece no site

### Seção About
Bio de dev fullstack com base em TypeScript/Next.js, conteúdo file-based (MDX) e interesse em motion design criativo.

### Seção Skills (tags visuais)

- **Core:** TypeScript, Next.js, React, Tailwind CSS
- **Content:** MDX, JSON, Git
- **Motion:** GSAP, ScrollTrigger, Lenis, View Transitions API
- **Tools:** n8n, Git, Vercel
- **Outros:** Pentest, QA, Acessibilidade

### Projetos em destaque
Priorizar trabalhos que demonstrem:
1. Next.js + MDX/content layer
2. Animações e interações criativas
3. Automações com n8n (se aplicável)
4. Foco em segurança/QA quando relevante

## Diretrizes para o Agent

- Conteúdo sempre em `/content/` — nunca hardcoded em componentes
- Preferir Next.js, Tailwind, MDX — não introduzir banco ou CMS externo
- Animações GSAP/Lenis: implementar incrementalmente (Sprints 3–4)
- Não oversell skills em evolução no site
- Aplicar mindset pentest/QA em formulários e renderização de MDX
