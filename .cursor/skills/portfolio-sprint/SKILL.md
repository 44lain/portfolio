---
name: portfolio-sprint
description: Executa fases do portfólio Lain seguindo docs/sprints.md — setup, estático, MDX/JSON, animações, transições e polish. Use ao iniciar sprint, planejar entregas ou verificar critérios de pronto.
---

# Sprint Workflow — Portfólio Lain

Doc: `docs/sprints.md` | Content: `docs/data-layer.md`

## Mapa

```
S0 Setup → S1 Estático → S2 MDX/JSON → S3 Animações → S4 Transições → S5 Polish
```

| Sprint | Estimativa | Foco |
|--------|------------|------|
| 0 | 1–2d | Next.js, tokens, Lenis, Header/Footer |
| 1 | 2–3d | Seções mock, rotas, grid responsivo |
| 2 | 1–2d | content/, lib/content, MDX real |
| 3 | 3–4d | GSAP, ScrollTrigger, Hero duplicado |
| 4 | 3–5d | View Transitions API |
| 5 | 2–3d | SEO, polish, contato, deploy |

## Skills por sprint

- S0–S1: `portfolio-setup`, `portfolio-design-system`
- S2: `portfolio-content`
- S3–S4: `portfolio-motion`
- S5: todas

## Decisões

- Conteúdo em MDX/JSON — sem banco
- Stack: Next.js, Tailwind, TypeScript, Lenis, GSAP
- Não introduzir Prisma/CMS externo

## Ao concluir sprint

- [ ] Checkboxes em `docs/sprints.md`
- [ ] `npm run build` ok
- [ ] Commits Conventional Commits PT-BR
