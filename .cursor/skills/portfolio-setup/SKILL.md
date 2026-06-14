---
name: portfolio-setup
description: Inicializa o projeto greenfield do portfólio Lain (Sprint 0) — create-next-app, Tailwind, fontes, design tokens, Lenis e shell Header/Footer. Use ao criar o projeto do zero ou configurar fundação técnica.
---

# Setup — Portfólio Lain (Sprint 0)

Docs: `docs/tech-stack.md`, `docs/design-system.md`, `docs/sprints.md`

## Comando inicial

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

## Estrutura pós-init

```
content/               → Sprint 2 (site.json, MDX)
src/
  app/(site)/
  components/ui/       → Header, Footer
  components/providers/→ SmoothScroll (Lenis)
  lib/content/         → Sprint 2
public/images/
```

## Design tokens (globals.css)

Paleta Lain: `#100A08`, `#5A280D`, `#8F2F06`, `#975025`, `#624B35`, `#F4F4F4`

## Fontes

- Instrument Serif → `next/font/google`
- Geist Sans → pacote `geist`

## Lenis

```bash
npm install lenis
```

```tsx
import { ReactLenis } from 'lenis/react';
```

## Dependências Sprint 0

```bash
npm install lenis geist
```

Sprint 2: `gray-matter @next/mdx @mdx-js/react zod`
Sprint 3: `gsap @gsap/react`

## .env.example

```env
N8N_CONTACT_WEBHOOK_URL=
RESEND_API_KEY=
CONTACT_EMAIL=
```

## Checklist Sprint 0

- [ ] `npm run dev` ok
- [ ] Paleta + tipografia
- [ ] Lenis ativo
- [ ] Header/Footer estáticos
- [ ] Zero erros TS
