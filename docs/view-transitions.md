# View Transitions — Portfólio Lain

Documentação da Sprint 4: navegação fluida entre rotas via **View Transitions API** (React 19 + Next.js 16), com fallback GSAP e integração Lenis/ScrollTrigger.

## Visão geral

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| Config | `next.config.ts` | `experimental.viewTransition: true` |
| Template | `src/app/(site)/template.tsx` | `<ViewTransition>` envolve conteúdo de rota |
| CSS | `src/app/globals.css` | Animações `page-fade`, `nav-forward`, `nav-back` |
| Link | `src/components/ui/TransitionLink.tsx` | `transitionTypes` no `<Link>` |
| Navegação | `src/lib/navigation.ts` | `navigateWithTransition()` |
| Hook | `src/hooks/useViewTransition.ts` | Navegação programática |
| Fallback | `src/animations/pageTransitionFallback.ts` | Crossfade GSAP sem VT API |
| Lenis | `src/lib/lenis-bridge.ts` + `SmoothScroll` | Pausa/retoma scroll na transição |

## Fluxo de navegação

```
Clique em TransitionLink (transitionTypes: nav-forward | nav-back)
        ↓
Next.js + React disparam View Transition
        ↓
template.tsx anima saída/entrada (CSS ::view-transition-*)
        ↓
ScrollBridge: scrollTo(0) + resumeLenis() + ScrollTrigger.refresh()
```

### Tipos de transição

| Tipo | Uso | Animação |
|------|-----|----------|
| `nav-forward` | Cards → detalhe, nav principal | Slide esquerda + fade |
| `nav-back` | Logo home, pills "← Todos", retorno | Slide direita + fade |
| `page-fade` (default) | Links sem direção explícita | Crossfade ~450ms |

## Fallback GSAP

Quando `document.startViewTransition` não existe ou `prefers-reduced-motion`:

1. `pauseLenis()`
2. Overlay `.page-transition-fallback-overlay` fade in (~280ms)
3. `router.push(href)`
4. Overlay fade out + `resumeLenis()`

## Header fixo na transição

Classe `.site-header` com `view-transition-name: site-header` — o navbar não participa do slide; permanece como âncora visual.

## LinkHover (desktop)

`LinkHover` usa `TransitionLink` internamente e tooltip GSAP (fade + scale) apenas em `≥1024px` sem reduced motion. Usado na nav desktop do `Header`.

## Pontos de atenção

- **Experimental:** `viewTransition` no Next.js pode mudar entre versões.
- **Back do browser:** navegação do histórico pode não carregar `transitionTypes` — morph/slide direcional pode não aplicar; conteúdo ainda troca normalmente.
- **ScrollTrigger:** `ScrollBridge` chama `refresh()` a cada `pathname` — essencial após 10+ navegações.
- **Duração:** animações ≤ 600ms (critério Sprint 4).

## Dependências

Nenhuma dependência nova — usa React 19 `ViewTransition`, GSAP já presente para fallback e tooltip.

## Testes manuais sugeridos

1. Home → projeto → blog → home sem flash branco
2. DevTools → desabilitar VT API → fallback crossfade
3. `prefers-reduced-motion: reduce` → troca instantânea
4. 10+ cliques consecutivos — scroll e animações de seção estáveis
