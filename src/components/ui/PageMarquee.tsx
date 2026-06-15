type PageMarqueeProps = {
  /** Texto repetido no marquee (será exibido em uppercase via CSS) */
  text: string;
  /** Quantidade de repetições para preencher a largura da tela */
  repeat?: number;
  /** Heading acessível — omitir se a página já tiver h1 abaixo */
  ariaLabel?: string;
};

// Marquee de título de página (full-bleed) — rola com o conteúdo, por baixo do header fixo.
// Referência: "BLOG ARCHIVE BLOG", "SOFTWARE ENGINEER", "LAIN LAIN LAIN" etc.
export function PageMarquee({ text, repeat = 4, ariaLabel }: PageMarqueeProps) {
  const repeated = `${text} `.repeat(repeat).trim();

  return (
    <div className="overflow-hidden pb-3 pt-[var(--edge-padding)] lg:pb-5">
      {ariaLabel ? <h1 className="sr-only">{ariaLabel}</h1> : null}
      <div
        aria-hidden={ariaLabel ? true : undefined}
        className="text-marquee whitespace-nowrap px-[var(--edge-padding)] text-accent"
      >
        {repeated}
      </div>
    </div>
  );
}
