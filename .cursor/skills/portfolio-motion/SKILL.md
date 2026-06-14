---
name: portfolio-motion
description: Implementa animações GSAP, ScrollTrigger, Lenis e View Transitions API no portfólio Lain replicando cydstumpel.nl. Use ao criar Hero animado, paralaxe, stagger de cards, loader, transições de página ou hooks de scroll.
---

# Motion — Portfólio Lain

Referência visual: https://cydstumpel.nl/
Docs: `docs/design-system.md` (mapeamento de animações), `docs/sprints.md` (Sprints 3–4)

## Stack obrigatória

- GSAP + ScrollTrigger — timelines em `/src/animations`
- `@studio-freight/react-lenis` — scroll suave no layout raiz
- View Transitions API — navegação entre rotas (fallback GSAP)
- CSS Scroll-Driven Animations — progressive enhancement apenas

**Não usar** Framer Motion como lib principal.

## Workflow

1. Confirmar sprint atual (`docs/sprints.md`) — animações só após Sprint 2
2. Criar timeline em `/src/animations/{nome}.ts`
3. Client Component fino consome via `useGSAP` (`@gsap/react`)
4. Registrar `gsap.matchMedia()` para desktop/tablet/mobile
5. Chamar `ScrollTrigger.refresh()` após navegação e resize

## Padrões por animação

### Page Load (`Loader`)

```typescript
// Fade out ao window load ou Lenis ready
gsap.to(loaderRef.current, { opacity: 0, duration: 0.8, onComplete: () => setLoaded(true) });
```

### Hero duplicado

- 5–8 cópias do `<h1>` via `Array.from({ length: N })`
- Cada cópia: `rotate` (-5° a 5°) + `translate` via inline style
- ScrollTrigger `scrub: true` para paralaxe Y

### Project cards (stagger)

```typescript
gsap.from(cards, {
  scrollTrigger: { trigger: sectionRef, start: 'top 80%' },
  opacity: 0,
  rotate: 3,
  stagger: 0.15,
  duration: 0.8,
});
```

### View Transitions

```typescript
function navigateWithTransition(path: string) {
  if (!document.startViewTransition) {
    router.push(path);
    return;
  }
  document.startViewTransition(() => router.push(path));
}
```

Pós-transição: pausar Lenis → navegar → `ScrollTrigger.refresh()` → retomar Lenis.

## Responsividade (obrigatório)

```typescript
const mm = gsap.matchMedia();
mm.add('(min-width: 1024px)', () => { /* paralaxe completa, tooltips */ });
mm.add('(max-width: 1023px)', () => { /* paralaxe reduzida, sem tooltips vídeo */ });
return () => mm.revert();
```

## Acessibilidade

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return; // skip animação
```

## Checklist antes de concluir

- [ ] Timelines em `/animations`, não inline no componente
- [ ] Lenis integrado com ScrollTrigger (scrollerProxy se necessário)
- [ ] `ScrollTrigger.refresh()` após route change
- [ ] Mobile sem paralaxe pesada
- [ ] `prefers-reduced-motion` respeitado
- [ ] Sem import global de plugins GSAP não utilizados
