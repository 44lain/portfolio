import { MarqueeText } from "@/components/ui/MarqueeText";

type MarqueeBannerProps = {
  /** Palavra exibida em escala gigante e repetida ao longo da largura. */
  text: string;
  /** Quantidade de repetições por metade da faixa (loop sem salto). */
  repeat?: number;
  /** Quando true, expõe o texto como h1 acessível (uma vez), para SEO/leitores de tela. */
  asHeading?: boolean;
  /** Rótulo do h1 quando diferente do texto exibido (ex.: nome do site na home). */
  headingLabel?: string;
};

// Faixa do nome/título gigante fixada no topo (sticky top-0, z-0) — ÚNICA camada fixa.
// Letreiro contínuo esquerda → direita. Navbar e conteúdo (.page-surface) rolam por cima.
export function MarqueeBanner({
  text,
  repeat = 4,
  asHeading = false,
  headingLabel,
}: MarqueeBannerProps) {
  return (
    <div className="route-banner sticky top-0 z-0 overflow-hidden pt-2 pb-3 lg:pt-3 lg:pb-4">
      {asHeading && <h1 className="sr-only">{headingLabel ?? text}</h1>}
      <MarqueeText
        text={text}
        direction="ltr"
        repeat={repeat}
        className="px-[var(--edge-padding)] text-accent"
      />
    </div>
  );
}
