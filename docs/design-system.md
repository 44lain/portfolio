# Design System — Portfólio Lain

Adaptação fiel do layout de [cydstumpel.nl](https://cydstumpel.nl/). A **estrutura, espaçamentos, hierarquia e proporções** seguem o modelo de referência (ver screenshots em `/docs`). Mudam apenas três coisas:

1. **Conteúdo** — textos, projetos, navegação e dados pessoais do Lain
2. **Cores** — paleta Lain (ver tabela) substituindo seashell/vermelho do original
3. **Imagens** — fotos e capas próprias

> Esta versão do documento detalha Header, Footer e Home com base nas screenshots de referência, para a Sprint 1 replicar o design com fidelidade.

---

## Mapeamento de cores: referência → Lain

O site original usa **tema claro** (fundo seashell `#FFF5EE`, texto quase preto, accent vermelho `#DF4F2A`). O Lain usa **tema escuro**. A conversão preserva a relação figura/fundo e o uso do accent:

| Papel no original          | Cor original     | Equivalente Lain        |
|----------------------------|------------------|-------------------------|
| Fundo principal (claro)    | seashell `#FFF5EE` | `#100A08` (background)  |
| Texto sobre fundo principal| quase preto      | `#F4F4F4` (foreground)  |
| Accent (nome gigante, botões, blob) | vermelho `#DF4F2A` | `#8F2F06` (accent) |
| Bloco footer/serviços (fundo accent) | vermelho cheio | `#8F2F06` (accent) |
| Texto sobre bloco accent   | seashell/branco  | `#F4F4F4` (foreground)  |
| Detalhes/hover/captions    | tons quentes     | `#975025` (hover), `#624B35` (muted) |
| Borders, superfícies sutis | —                | `#5A280D` (secondary)   |

**Regra prática:** onde o original é "vermelho sobre claro", o Lain fica "laranja queimado sobre preto"; onde o original é "claro sobre vermelho" (footer/serviços), o Lain fica "branco sobre laranja queimado".

---

## Paleta de cores

| Token CSS              | Hex       | Tailwind          | Uso                              |
|------------------------|-----------|-------------------|----------------------------------|
| `--color-background`   | `#100A08` | `bg-background`   | Background principal             |
| `--color-secondary`    | `#5A280D` | `bg-secondary`    | Borders, superfícies sutis       |
| `--color-accent`       | `#8F2F06` | `text-accent`     | Nome gigante, botões, blocos     |
| `--color-hover`        | `#975025` | `text-hover`      | Hover states, detalhes           |
| `--color-muted`        | `#624B35` | `text-muted`      | Texto secundário, captions, datas|
| `--color-text`         | `#F4F4F4` | `text-foreground` | Texto principal                  |
| `--highlight-color`    | `#975025` | `bg-highlight`    | Highlights sutis (opcional)      |

### Tokens (globals.css — Tailwind v4 `@theme inline`)

```css
:root {
  --background: #100a08;
  --foreground: #f4f4f4;
  --secondary: #5a280d;
  --accent: #8f2f06;
  --hover: #975025;
  --muted: #624b35;
  --highlight: #975025;

  --grid-gap: 1.5rem;
  --content-max-width: 90rem;
  --border-radius: 0.75rem;   /* cards de blog */
  --card-radius: 1.5rem;      /* cards de projeto */
  --hover-radius: 2rem;       /* hover dos cards */
}
```

Override de accent por página/projeto via `data-accent-color` no wrapper da rota.

---

## Tipografia

Dois estilos de display convivem no modelo de referência:

| Estilo                  | Fonte                | Uso no layout                                            |
|-------------------------|----------------------|----------------------------------------------------------|
| **Serif editorial**     | Instrument Serif     | Nav, "Available…", título de papel (About), corpo de destaque, headings de seção como "Latest blogs" |
| **Sans display pesado** | Geist (peso 800/900) UPPERCASE | Nome gigante do Hero (marquee), títulos de cards de projeto, títulos de blog, títulos de serviços |
| **Sans corpo**          | Geist (400–500)      | Parágrafos, labels, datas, tags                          |

### Hierarquia

| Classe                | Tamanho (desktop)         | Fonte / peso          | Uso                                  |
|-----------------------|---------------------------|-----------------------|--------------------------------------|
| `.text-marquee`       | clamp(5rem, 16vw, 18rem)  | Geist 900, uppercase  | Nome gigante repetido (Hero/footer band) |
| `.text-huge-hero`     | clamp(4rem, 12vw, 14rem)  | Instrument Serif      | Títulos editoriais grandes           |
| `.text-large-heading` | clamp(2rem, 5vw, 4rem)    | Instrument Serif      | "Latest blogs", título de papel      |
| `.text-card-title`    | clamp(1.25rem, 2vw, 2rem) | Geist 800, uppercase  | Títulos de project/blog/service card |
| `.text-small-heading` | clamp(1.25rem, 2vw, 2rem) | Instrument Serif      | Subtítulos, logo                     |
| `.text-large-body`    | 1.125–1.25rem             | Geist 400             | Intro/destaque                       |
| `.text-small-body`    | 0.875–1rem                | Geist 400             | Texto corrido                        |
| `.caps`               | 0.75rem, uppercase, tracking 0.1em | Geist 500    | Labels, tags, datas, social          |

```css
.text-marquee {
  font-family: var(--font-geist-sans);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.85;
  letter-spacing: -0.01em;
}
.text-huge-hero,
.text-large-heading,
.text-small-heading {
  font-family: var(--font-instrument-serif);
  line-height: 0.95;
  letter-spacing: -0.02em;
}
.text-card-title {
  font-family: var(--font-geist-sans);
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.05;
}
```

---

## Grid e layout

### Breakpoints

| Nome    | Min-width | Colunas | Gap     |
|---------|-----------|---------|---------|
| mobile  | —         | 1       | 1rem    |
| tablet  | 768px     | 6       | 1.25rem |
| desktop | 1024px    | 12      | 1.5rem  |

### Container

```css
.content-container {
  width: 100%;
  max-width: var(--content-max-width);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
}
```

O **nome gigante (marquee)** e o **bloco do footer** sangram até a borda da viewport (full-bleed), ignorando o container.

---

## Header

Referência: barra superior fina, fundo claro com borda inferior sutil; logo à esquerda, cluster central de status, nav à direita.

```
┌──────────────────────────────────────────────────────────────────────┐
│ LAIN  lain.fork@gmail.com ✦ Disponível [mês ano]        Sobre Projetos Blog Contato │
└──────────────────────────────────────────────────────────────────────┘
   └──────── grupo esquerdo ────────┘                      └──── nav (dir.) ────┘
```

Fiel ao modelo: **logo e status agrupados à esquerda**, nav à direita. Sem grupo central — isso evita o espaço extra que aparecia com 3 blocos espalhados (`justify-between` entre 3 grupos).

| Elemento        | Conteúdo / estilo                                                        |
|-----------------|--------------------------------------------------------------------------|
| **Posição**     | `sticky top-0`, z-alto, fundo `background/90` + `backdrop-blur`, borda inferior `secondary/40` |
| **Altura**      | compacta; padding vertical `py-3`, horizontal = container                 |
| **Grupo esquerdo** | logo + cluster de status juntos (`gap-5`)                              |
| **Logo**        | "Lain" — Geist **black** (`font-black`), `text-xl`, cor `accent`, link para `/` |
| **Status (lg+)**| email `mailto:` sublinhado + ✦ sparkle + "Disponível [mês ano]" em itálico `muted`. Oculto < lg |
| **Nav (dir.)**  | Links `muted` → `foreground` no hover, `gap-7`, sublinhado animado (`.link-underline`) |
| **Nav items**   | Sobre · Projetos · Blog · Contato                                        |

- **Layout:** `justify-between` entre o **grupo esquerdo** e a **nav** — barra compacta, sem vão central.
- **Mobile:** logo + link curto "Contato"; status e nav completa ocultos (< md/lg).
- **Implementação:** Server Component; o email do header é constante no componente (não vem de `site.json`).

---

## Footer

Referência: bloco **full-bleed em accent** (no Lain, `#8F2F06` com texto `#F4F4F4`), com bloco de informações à esquerda, disponibilidade à direita, divisória, e duas colunas (nav + social). Logo abaixo, a **faixa do nome gigante** atravessa a tela.

```
┌──────────────────────────  bloco accent  ──────────────────────────────┐
│ LAIN                                              Disponível [mês ano]    │
│ Dias de trabalho                                  Tem um projeto em mente?│
│ Segunda – Sexta                                   lain.fork@gmail.com     │
│                                                                           │
│ ───────────────────────────────────────────────────────────────────────│
│ About  Work  Blog  Contact          GitHub Codepen Bluesky … LinkedIn RSS │
└───────────────────────────────────────────────────────────────────────┘
        L A I N   L A I N   L A I N   (faixa marquee, accent sobre dark)
```

| Zona                 | Conteúdo / estilo                                                       |
|----------------------|-------------------------------------------------------------------------|
| **Fundo**            | `bg-accent`, texto `foreground`; padding vertical ~64px; full-bleed     |
| **Topo esquerda**    | Logo "Lain" grande (serif/sans bold) + blocos info: label em **serif itálico** (`Dias de trabalho`) + valor em **serif** |
| **Topo direita**     | "Disponível [mês ano]" em **serif grande**, "Tem um projeto em mente?" + email sublinhado; alinhado à direita |
| **Divisória**        | linha 1px `foreground/30` ocupando a largura                            |
| **Base esquerda**    | Nav (About · Work · Blog · Contact) em **serif**                        |
| **Base direita**     | Social links de `content/site.json` (apenas os não-nulos): GitHub, Codepen, Bluesky, Mastodon, Instagram, LinkedIn, RSS — **serif**, sublinhado no hover |
| **Faixa do nome**    | "LAIN" repetido em `.text-marquee`, cor `accent` sobre `background`, abaixo do bloco (transição para o fim da página) |

- **Layout colunas:** desktop 2 colunas (info esq. / disponibilidade dir.); base 2 colunas (nav esq. / social dir.). Mobile empilha tudo.
- **Implementação:** Server Component; social com `rel="noopener noreferrer"` e `target="_blank"` para URLs externas.

---

## Estrutura da Home

Ordem das seções (topo → base), conforme screenshots:

1. **Header** (sticky)
2. **Hero — nome gigante**
3. **About / Intro**
4. **Work — cards de projeto**
5. **Latest blogs**
6. **Services — cards inclinados**
7. **Footer + faixa do nome**

### 1. Hero — nome gigante (marquee)

- Nome "LAIN" repetido em `.text-marquee` (≈6×), **accent** sobre `background`, ocupando largura total (full-bleed)
- Como o nome é curto, repetir o suficiente para **preencher a largura** da tela (evita o nome flutuando em espaço vazio)
- **Espaçamento enxuto** (`pt-8 pb-10` / `lg:pt-12 lg:pb-14`) — junto com `pt` reduzido do About, elimina o vão excessivo entre header e conteúdo
- **Animação (Sprint 3):** marquee/paralaxe horizontal (translateX scrubbed) e/ou cópias com leve rotação; no original o nome desliza no scroll

### 2. About / Intro — 2 colunas

```
┌─────────────────────────────┬───────────────────────────────────────┐
│  [foto com blob accent]      │  Título de papel (serif grande)         │
│   máscara orgânica           │  + badges decorativos (skills)          │
│                              │  parágrafos de bio (serif/sans) c/ links│
│                              │              [badge: próximo evento]    │
└─────────────────────────────┴───────────────────────────────────────┘
```

| Elemento     | Detalhe                                                                    |
|--------------|----------------------------------------------------------------------------|
| **Foto**     | Retrato do Lain (`/public/foto-lain.jpeg` via `next/image`) à esquerda (~cols 1–5), com **blob orgânico em accent** atrás/máscara |
| **Título**   | Papel em **serif** grande: "Software" (itálico menor) / "Engineer" (destaque), levemente sobrepostas |
| **Badges**   | "Stickers" decorativos rotacionados com áreas: "Full Stack", "Mobile", "System Architecture", "Cybersecurity", "TypeScript" |
| **Bio**      | 1–2 parágrafos `large-body`/`small-body`, com **links sublinhados** (`hover` accent) |
| **Badge evento** | Caixa pequena com borda `accent` no canto inferior direito: "Próximo evento / [data]" + pílula |
| **Grid**     | desktop: foto cols 1–5, conteúdo cols 6–12                                  |

### 3. Work — cards de projeto (grid assimétrico)

Home: título editorial + pílula "Todos os projetos", seguido do grid assimétrico (2 cards na 1ª linha, 1 card largo full-width na 2ª — `lg:col-span-7`, `lg:col-span-5`, `lg:col-span-12`).

```
┌────────────────┐  ┌──────────┐   título (serif): "De marketplaces a
│     proj 1     │  │  proj 2  │    sistemas de gestão, construo
│   (col 7)      │  │ (col 5)  │    produtos digitais sob medida."
└────────────────┘  └──────────┘   [ TODOS OS PROJETOS ] (pílula)
┌─────────────────────────────────┐
│           proj 3 (col 12)        │
└─────────────────────────────────┘
```

| Elemento        | Detalhe                                                                 |
|-----------------|-------------------------------------------------------------------------|
| **Card**        | Cantos `--card-radius`, **capa via `next/image`** (`object-cover`) + gradiente, título `.text-card-title` **branco** sobreposto na base |
| **Capas reais** | `/public/*-project.png` (CrinaApp, NetAtlas, Vermolin.ux)               |
| **Conteúdo card** | Capa + título (UPPERCASE) + ano e tags (stack) em `caps`              |
| **Pílula**      | "Todos os projetos" — borda `accent`, `caps`, `rounded-full`            |
| **Hover**       | border-radius `--card-radius` → `--hover-radius` + scale leve da imagem |
| **Dados**       | `getProjects()` — title, slug, year, tags (stack), coverImage, link     |
| **Detalhe**     | `/work/[slug]`: capa, summary, tags e botão externo ("Acessar projeto" / "Ver repositório" se GitHub) |
| **Animação (Sprint 3)** | entrada staggered (rotate ~3°, opacity 0→1, delay por índice)         |

### 4. Latest blogs — grid 3×2

```
Latest blogs   (heading serif, à esquerda)

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ DATA  tags  │ │ DATA  tags  │ │ DATA  tags  │
│ TÍTULO BOLD │ │ TÍTULO BOLD │ │ TÍTULO BOLD │
│ ····· meta  │ │ ····· meta  │ │ ····· meta  │
└─────────────┘ └─────────────┘ └─────────────┘
 (repete 2ª linha)
```

| Elemento     | Detalhe                                                                     |
|--------------|-----------------------------------------------------------------------------|
| **Heading**  | "Latest blogs" em **serif** (`large-heading`), topo-esquerda                |
| **Grid**     | 3 colunas × 2 linhas (desktop) · 2 col (tablet) · 1 col (mobile); gap ~`grid-gap` |
| **Card**     | Cantos `--border-radius` (~16px), fundo **tint** sutil do accent (`secondary`/sobre dark), padding ~24px |
| **Conteúdo** | Data em `caps` `muted` → tags (pílulas pequenas) → título `.text-card-title` (cor variável por card) → meta inferior (avatares + pílula "X webmentions") |
| **Cor do título** | No original cada card usa uma cor diferente; no Lain manter `foreground` com variação pontual de `accent`/`hover` (sem poluir) |
| **Dados**    | `getPosts()` — title, slug, date, tags, excerpt                             |

### 5. Services — 3 cards inclinados

```
   ┌────────┐  ┌────────────┐  ┌──────────┐
   │ WEB    │  │ CONSULTORIA│  │  PALESTRAS│
   │ DEV    │  │            │  │           │
   │  [icon]│  │   [icon]   │  │   [icon]  │
   │ ·tags· │  │  ·tags·    │  │  ·tags·   │
   └────────┘  └────────────┘  └──────────┘
   (cards levemente rotacionados, fundo accent)
```

| Elemento     | Detalhe                                                                  |
|--------------|--------------------------------------------------------------------------|
| **Card**     | Fundo `accent`, texto `foreground`, cantos arredondados, **rotação leve** (-2° / +1° / -1°), leve sobreposição entre eles |
| **Título**   | `.text-card-title` **branco**, levemente "skewed"/inclinado, no topo do card |
| **Gráfico**  | Ilustração/ícone grande (no original, cursor pixel-art) — substituível por asset próprio |
| **Tags**     | Linha de pílulas `caps` na base do card (serviços/tecnologias)            |
| **Grid**     | 3 colunas iguais (desktop) · 1 col empilhado (mobile, sem rotação)        |
| **Conteúdo Lain** | "Desenvolvimento Web", "Mobile", "CyberSec"                              |

---

## Componentes principais (resumo)

### Header
Server Component. Logo accent + cluster de status (opcional) + nav serif à direita. Sticky com blur. Ver seção **Header** acima.

### Hero
Client Component (`HeroMarquee`). Nome gigante repetido em `.text-marquee`. Animação de marquee/paralaxe na Sprint 3.

### ProjectCard
Imagem full-bleed + título uppercase sobreposto, cantos arredondados grandes, hover de border-radius. Dados de `getProjects()`. Grid assimétrico.

### BlogCard
Card com tint, data `caps`, tags, título `.text-card-title`, meta inferior. Dados de `getPosts()`.

### ServiceCard
Card accent rotacionado, título skewed, ícone/asset, pílulas de tags.

### LinkHover
Underline animado + tooltip com preview (imagem/vídeo). GSAP fade/scale. Desktop only. (Sprint 4)

### Footer
Server Component. Bloco accent full-bleed: info + disponibilidade + divisória + nav/social, seguido da faixa do nome. Ver seção **Footer** acima.

### Loader
Overlay fullscreen `background`, nome centralizado, fade out no load. Respeita reduced motion. (Sprint 3)

### Pílula (Button)
`rounded-full`, borda `accent`, texto `caps`. Usada em "Todos os projetos", "Falar", tags.

---

## Mapeamento de animações

Mantido conforme documentação anterior (Sprints 3–4). Resumo:

### 1. Page Load
| Elemento | Técnica                | Parâmetros                          |
|----------|------------------------|-------------------------------------|
| Loader   | GSAP ou CSS transition | opacity 1→0, ~0.8s                  |
| Hero     | GSAP timeline          | entrada do nome gigante             |

### 2. Scroll
| Elemento        | Técnica                 | Parâmetros                         |
|-----------------|-------------------------|------------------------------------|
| Nome marquee    | ScrollTrigger scrub     | translateX paralaxe / rotação leve |
| Project cards   | ScrollTrigger + stagger | rotate ~3°, opacity 0→1            |
| Backgrounds     | ScrollTrigger pin/scrub | interpola `--bg-progress`          |
| Services tilt   | Scroll-driven / GSAP    | reforço da rotação ao entrar       |

### 3. Hover
| Elemento     | Técnica                | Detalhe                       |
|--------------|------------------------|-------------------------------|
| Links nav    | CSS underline scaleX   | origin-left                   |
| LinkHover    | GSAP tooltip           | fade + scale 0.95→1           |
| ProjectCard  | CSS vars border-radius | `--card-radius`→`--hover-radius`, 0.4s |

### 4. Text
| Elemento       | Técnica                   | Detalhe                          |
|----------------|---------------------------|----------------------------------|
| Nome marquee   | translateX loop / scrub   | horizontal contínuo              |
| Serviços/headings | texto duplicado          | paralaxe/marquee                 |

### 5. Transições de página
View Transitions API + fallback GSAP; `ScrollTrigger.refresh()` pós-navegação.

### 6. Microinterações
Copiar email (clipboard + "Copiado!" 2s); tags com shift `accent`→`hover`.

---

## Temas por página

Projetos podem sobrescrever `--color-accent` via frontmatter (`accentColor`) aplicado em `data-accent-color`:

```tsx
// app/work/[slug]/layout.tsx
<div style={{ "--color-accent": project.accentColor } as React.CSSProperties}>
  {children}
</div>
```

---

## Acessibilidade visual

- Contraste `#F4F4F4` sobre `#100A08`: ~15:1 ✓
- Texto sobre bloco accent (`#F4F4F4` sobre `#8F2F06`): verificar AA para corpo; usar peso/tamanho adequados
- `muted` (`#624B35`) apenas em captions/datas, não em texto longo crítico
- `prefers-reduced-motion`: desativar marquee, paralaxe, loader longo e smoothing agressivo do Lenis
- Badges/stickers decorativos: `aria-hidden` quando puramente visuais
