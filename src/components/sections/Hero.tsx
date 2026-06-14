type HeroProps = {
  name: string;
};

// Hero: nome gigante full-bleed preenchendo a largura (como "CYD STUMPEL" na referência).
// Espaçamento enxuto para não deixar vazio entre header e a seção About.
// A duplicação/marquee animado entra na Sprint 3.
export function Hero({ name }: HeroProps) {
  // Repete o nome o suficiente para atravessar a largura da tela (nome curto = mais repetições).
  const repeated = `${name} `.repeat(6).trim();

  return (
    <section className="overflow-hidden pt-8 pb-10 lg:pt-12 lg:pb-14" aria-label="Hero">
      <h1 className="sr-only">{name}</h1>
      <div
        aria-hidden="true"
        className="text-marquee whitespace-nowrap text-accent"
      >
        {repeated}
      </div>
    </section>
  );
}
