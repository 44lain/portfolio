# Design System — Portfólio Lain

Adaptação do design de [cydstumpel.nl](https://cydstumpel.nl/) com paleta, conteúdo e imagens personalizados. Mantém a mesma hierarquia visual, grid editorial e sistema de animações do original.

## Referência visual

O site de referência apresenta:

- Tipografia editorial: serifada gigante no Hero + sans-serif limpa no corpo
- Hero com nome duplicado N vezes, cada cópia rotacionada/deslocada
- Navegação sticky minimalista (logo + links + email)
- Cards de projeto com imagem, ano, tags e hover com border-radius animado
- Links com sublinhado animado e tooltip com preview (imagem/vídeo)
- Seções de serviços com títulos duplicados (efeito marquee/paralaxe)
- Blog com lista de posts recentes
- Footer com nav duplicada + ícones de redes sociais
- Loader fullscreen no page load
- Scroll suave (Lenis), animações scrubbed (ScrollTrigger), transições de página (View Transitions API)

---

## Paleta de cores

Substitui a paleta original (seashell/verde vibrante) pela identidade Lain:

| Token CSS              | Hex       | Tailwind          | Uso                              |
|------------------------|-----------|-------------------|----------------------------------|
| `--color-background`   | `#100A08` | `bg-background`   | Background principal             |
| `--color-secondary`    | `#5A280D` | `bg-secondary`    | Elementos secundários, borders   |
| `--color-accent`       | `#8F2F06` | `text-accent`     | Destaques, links ativos, CTAs    |
| `--color-hover`        | `#975025` | `text-hover`      | Hover states, detalhes           |
| `--color-muted`        | `#624B35` | `text-muted`      | Texto secundário, captions       |
| `--color-text`         | `#F4F4F4` | `text-foreground` | Texto principal                  |
| `--highlight-color`    | `#975025` | `bg-highlight`    | Highlights sutis (opcional)      |

### Implementação CSS

```css
:root {
  --color-background: #100A08;
  --color-secondary: #5A280D;
  --color-accent: #8F2F06;
  --color-hover: #975025;
  --color-muted: #624B35;
  --color-text: #F4F4F4;
  --highlight-color: #975025;

  /* Layout */
  --grid-gap: 1.5rem;
  --content-max-width: 90rem;
  --border-radius: 0.75rem;
  --hover-radius: 2rem;
}

/* Override por página/projeto */
[data-accent-color='warm'] { --color-accent: #8F2F06; }
[data-accent-color='earth'] { --color-accent: #5A280D; }
```

### Tailwind config

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: 'var(--color-background)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-accent)',
      hover: 'var(--color-hover)',
      muted: 'var(--color-muted)',
      foreground: 'var(--color-text)',
      highlight: 'var(--highlight-color)',
    },
    borderRadius: {
      card: 'var(--border-radius)',
      'card-hover': 'var(--hover-radius)',
    },
  },
}
```

---

## Tipografia

| Papel        | Fonte              | Carregamento    | Uso                          |
|--------------|--------------------|-----------------|------------------------------|
| Títulos      | Instrument Serif   | `next/font/google` | Hero, headings de seção   |
| Corpo        | Geist Sans         | `next/font/local` ou `geist` | Parágrafos, nav, labels |

### Hierarquia tipográfica

| Classe Tailwind       | Tamanho aprox. (desktop) | Uso                                    |
|-----------------------|--------------------------|----------------------------------------|
| `.text-huge-hero`     | clamp(4rem, 12vw, 14rem) | Nome/marca no Hero — maior elemento    |
| `.text-large-heading` | clamp(2rem, 5vw, 4rem)   | Títulos de seção                       |
| `.text-small-heading` | clamp(1.25rem, 2vw, 2rem)| Subtítulos, títulos de cards           |
| `.text-large-body`    | 1.125–1.25rem            | Intro/destaque                         |
| `.text-small-body`    | 0.875–1rem               | Texto corrido                          |
| `.caps`               | 0.75rem, uppercase, tracking-wide | Labels, tags, nav links      |

```css
.text-huge-hero {
  font-family: var(--font-serif);
  line-height: 0.9;
  letter-spacing: -0.02em;
}
.caps {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## Grid e layout

### Breakpoints

| Nome    | Min-width | Colunas | Gap          |
|---------|-----------|---------|--------------|
| mobile  | —         | 1       | 1rem         |
| tablet  | 768px     | 6       | 1.25rem      |
| desktop | 1024px    | 12      | 1.5rem       |

### Container

```css
.content-container {
  width: 100%;
  max-width: var(--content-max-width);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
}
```

### Padrões de coluna (desktop 12 cols)

| Seção          | Layout                                      |
|----------------|---------------------------------------------|
| Hero           | Título full-width, texto intro cols 7–12    |
| About          | Texto cols 1–6, skills/tags cols 7–12       |
| Project cards  | Alternância: ímpares cols 1–7, pares 6–12 |
| Blog list      | Título cols 1–4, lista cols 5–12            |
| Contact        | Form cols 1–6, info cols 7–12               |
| Footer         | Nav cols 1–6, social cols 7–12              |

---

## Componentes principais

### Header

- **Posição:** sticky top, z-index alto, backdrop opcional
- **Conteúdo:** logo/nome (link home) + nav (About, Work, Blog, Contact) + email `mailto:`
- **Comportamento:** links com underline animado no hover; caps para labels
- **Implementação:** Server Component estático; LinkHover Client wrapper nos links com tooltip

### Hero

- **Visual:** fundo `--color-background`, título serifada gigante duplicada (5–8 cópias)
- **Conteúdo:** nome "Lain" + tagline curta (dev fullstack / creative developer)
- **Animação:** cada cópia com `--custom-rotate-N` e translate; paralaxe no scroll via ScrollTrigger scrub
- **Implementação:** Client Component (`HeroAnimated`)

### ProjectCard

- **Visual:** imagem cover (aspect ratio ~4:3), título, ano, tags (caps)
- **Hover:** border-radius de `var(--border-radius)` → `var(--hover-radius)`, leve scale/opacity
- **Dados:** frontmatter MDX via `getProjects()` — title, slug, year, tags, coverImage
- **Link:** navega para `/work/[slug]` com View Transition

### LinkHover

- **Visual:** texto com underline que expande da esquerda; tooltip flutuante com preview
- **Tooltip:** imagem ou vídeo loop, posicionado próximo ao cursor
- **Animação:** GSAP fade + scale no mouseenter/mouseleave
- **Mobile:** tooltip desabilitado (`matchMedia`); underline CSS simples

### Footer

- **Visual:** nav duplicada (mesmos links do header) + ícones de redes sociais
- Footer com nav duplicada + ícones de redes sociais de `content/site.json`
- **Implementação:** Server Component; links externos com `rel="noopener noreferrer"`

### Loader

- **Visual:** overlay fullscreen `--color-background`, logo ou nome centralizado
- **Animação:** opacity 1→0 após load; `pointer-events: none` quando oculto
- **A11y:** `aria-hidden="true"` quando invisível; respeitar reduced motion

---

## Mapeamento de animações

Baseado na análise de cydstumpel.nl:

### 1. Page Load

| Elemento | Técnica              | Parâmetros                          |
|----------|----------------------|-------------------------------------|
| Loader   | GSAP ou CSS transition | opacity 1→0, duration ~0.8s       |
| Hero     | GSAP timeline        | stagger entrada das cópias do título |

### 2. Scroll Animations

| Elemento           | Técnica                    | Parâmetros                        |
|--------------------|----------------------------|-----------------------------------|
| Hero título        | ScrollTrigger scrub        | paralaxe Y + rotação leve         |
| Project cards      | ScrollTrigger + stagger    | rotate ~3°, opacity 0→1, delay por índice |
| Seção backgrounds  | ScrollTrigger pin/scrub    | interpola `--bg-progress`         |
| Títulos de serviço | CSS Scroll-Driven (fallback GSAP) | translateX paralaxe        |

### 3. Hover Effects

| Elemento      | Técnica                         | Detalhe                           |
|---------------|---------------------------------|-----------------------------------|
| Links nav     | CSS transition width underline  | `scaleX` origin left              |
| LinkHover     | GSAP tooltip                    | fade + scale 0.95→1               |
| ProjectCard   | CSS vars border-radius          | transition 0.4s ease              |

### 4. Text Animations

| Elemento         | Técnica              | Detalhe                              |
|------------------|----------------------|--------------------------------------|
| Hero duplicado   | Array map + inline styles | rotate(-5deg a 5deg), translate offsets |
| Serviços marquee | Texto duplicado 3x   | translateX infinito ou scroll-linked |

### 5. Transições de página

| Fluxo            | Técnica                    | Detalhe                           |
|------------------|----------------------------|-----------------------------------|
| Navegação interna| View Transitions API       | `document.startViewTransition()`  |
| Fallback         | GSAP crossfade             | old page fade out, new fade in    |
| Pós-navegação    | ScrollTrigger.refresh()    | obrigatório                       |

### 6. Microinterações

| Elemento        | Técnica              | Detalhe                           |
|-----------------|----------------------|-----------------------------------|
| Copiar email    | clipboard API + state | texto "Copiado!" por 2s          |
| Tags projeto    | hover color shift    | `--color-accent` → `--color-hover` |

---

## Temas por página

Projetos individuais podem override `--color-accent` via campo `accentColor` no Prisma ou `data-accent-color` no layout da rota:

```tsx
// app/work/[slug]/layout.tsx
<div data-accent-color="warm" style={{ '--color-accent': project.accentColor }}>
  {children}
</div>
```

---

## Acessibilidade visual

- Contraste texto principal (#F4F4F4) sobre background (#100A08): ~15:1 ✓
- Texto muted (#624B35) sobre background: verificar uso apenas em elementos grandes ou decorativos; para texto legível usar `--color-text` com opacity reduzida
- `prefers-reduced-motion`: desativar paralaxe, loader longo, Lenis smoothing agressivo
