# SEO — Portfólio Lain

## Arquivos

| Arquivo | Função |
|---------|--------|
| `src/lib/seo/url.ts` | `getSiteUrl()`, `absoluteUrl()` |
| `src/lib/seo/metadata.ts` | `buildPageMetadata()` — OG + Twitter |
| `src/app/sitemap.ts` | Sitemap dinâmico (rotas + MDX) |
| `src/app/robots.ts` | `robots.txt` |

## Variável de ambiente

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

Sem ela, o fallback em dev é `http://localhost:3000`.

## Open Graph

| Rota | Imagem OG |
|------|-----------|
| Home, estáticas, posts | `/foto-lain.jpeg` (default) |
| `/work/[slug]` | `coverImage` do projeto |

## Checklist manual (Lighthouse / validação)

- [ ] `metadataBase` resolve URLs absolutas
- [ ] `/sitemap.xml` acessível em produção
- [ ] `/robots.txt` aponta para o sitemap
- [ ] Título e description únicos por rota
- [ ] Imagens com `alt` descritivo
- [ ] `lang="pt-BR"` no `<html>`
- [ ] Links externos com `rel="noopener noreferrer"`

## Performance (Sprint 5)

- Foto do About: `priority` + `sizes`
- Capa de projeto: `fill` + `sizes`, `max-w-3xl`
- `Services`: `dynamic()` abaixo da dobra (home e about)
- `prefers-reduced-motion` desativa animações pesadas

## Contato

Sem impacto em SEO além da rota `/contact` no sitemap. Fluxo mailto documentado em `docs/contact.md`.
