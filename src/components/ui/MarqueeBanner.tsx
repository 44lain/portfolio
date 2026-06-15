type MarqueeBannerProps = {
  /** Palavra exibida em escala gigante e repetida ao longo da largura. */
  text: string;
  /** Quantidade de repetições para atravessar a viewport (palavras curtas = mais repetições). */
  repeat?: number;
  /** Quando true, expõe o texto como h1 acessível (uma vez), para SEO/leitores de tela. */
  asHeading?: boolean;
  /** Rótulo do h1 quando diferente do texto exibido (ex.: nome do site na home). */
  headingLabel?: string;
};

// Faixa do nome/título gigante fixada no topo (sticky top-0, z-0) — ÚNICA camada fixa.
// É o primeiro elemento do DOM; a navbar e o conteúdo (.page-surface, z-10) rolam POR CIMA
// e o cobrem, sem deslocá-lo. Ver "Camadas fixas" no design-system.
export function MarqueeBanner({
  text,
  repeat = 6,
  asHeading = false,
  headingLabel,
}: MarqueeBannerProps) {
  const repeated = `${text} `.repeat(repeat).trim();

  return (
    <div className="sticky top-0 z-0 overflow-hidden pt-2 pb-3 lg:pt-3 lg:pb-4">
      {asHeading && <h1 className="sr-only">{headingLabel ?? text}</h1>}
      <div
        aria-hidden="true"
        className="text-marquee whitespace-nowrap px-[var(--edge-padding)] text-accent"
      >
        {repeated}
      </div>
    </div>
  );
}
