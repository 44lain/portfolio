---
name: portfolio-design-system
description: Implementa componentes visuais e tokens do design system do portfólio Lain (paleta, tipografia, grid, Header, Hero, ProjectCard, LinkHover, Footer). Use ao criar ou estilizar componentes UI e seções.
---

# Design System — Portfólio Lain

Referência: https://cydstumpel.nl/ (layout) + paleta Lain (cores)
Doc completa: `docs/design-system.md`

## Paleta (nunca hardcodar hex no JSX)

| Token Tailwind   | CSS var              | Hex       |
|------------------|----------------------|-----------|
| `bg-background`  | `--color-background` | `#100A08` |
| `bg-secondary`   | `--color-secondary`  | `#5A280D` |
| `text-accent`    | `--color-accent`     | `#8F2F06` |
| `text-hover`     | `--color-hover`      | `#975025` |
| `text-muted`     | `--color-muted`      | `#624B35` |
| `text-foreground`| `--color-text`       | `#F4F4F4` |

Override por página: `data-accent-color` no wrapper da rota.

## Tipografia

| Classe              | Fonte             | Uso                |
|---------------------|-------------------|--------------------|
| `.text-huge-hero`   | Instrument Serif  | Hero               |
| `.text-large-heading` | Instrument Serif | Títulos de seção |
| `.text-small-heading` | Instrument Serif | Subtítulos       |
| `.text-large-body`  | Geist             | Intro/destaque     |
| `.text-small-body`  | Geist             | Corpo              |
| `.caps`             | Geist             | Labels, tags, nav  |

Carregar via `next/font/google` (Instrument Serif) + Geist.

## Grid

- Desktop (`lg+`): `grid-cols-12`, gap `--grid-gap: 1.5rem`
- Tablet (`md`): `grid-cols-6`
- Mobile: `grid-cols-1`
- Container: `.content-container` com `max-width: 90rem`

## Onde criar componentes

| Componente   | Pasta                    | Tipo           |
|--------------|--------------------------|----------------|
| Header       | `/components/ui`         | Server         |
| Footer       | `/components/ui`         | Server         |
| ProjectCard  | `/components/ui`         | Server + hover CSS |
| LinkHover    | `/components/ui`         | Client (hover) |
| Loader       | `/components/ui`         | Client         |
| Hero         | `/components/sections`   | Client (Sprint 3+) |
| About, Work… | `/components/sections`   | Server         |

## Comportamento visual por componente

### Header
Sticky top, logo + nav (About, Work, Blog, Contact) + email `mailto:`. Links em `.caps`.

### ProjectCard
Imagem 4:3, título, ano, tags. Hover: `--border-radius` → `--hover-radius` via CSS transition.

### LinkHover
Underline animado (scaleX origin left). Tooltip com preview — desktop only (Sprint 4).

### Footer
Nav duplicada + ícones sociais de `site_settings.socialLinks`.

## Regras

- Server Component por padrão; `'use client'` só para interatividade/animação
- Imagens via `next/image` com `alt` descritivo
- Contraste: texto `#F4F4F4` sobre `#100A08` (WCAG AA ✓)
- Consultar cydstumpel.nl se dúvida sobre hierarquia/layout

## Checklist

- [ ] Cores via classes Tailwind mapeadas a CSS vars
- [ ] Tipografia usa classes do design system
- [ ] Grid responsivo (12/6/1 colunas)
- [ ] Componente na pasta correta (`ui` vs `sections`)
- [ ] Sem hex literal no TSX
