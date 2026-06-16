export type RouteBannerConfig = {
  text: string;
  asHeading?: boolean;
  headingLabel?: string;
};

/** Resolve texto e semântica do banner gigante conforme a rota. */
export function resolveRouteBannerConfig(
  pathname: string,
  siteName: string,
): RouteBannerConfig {
  if (pathname === "/") {
    return { text: siteName, asHeading: true, headingLabel: siteName };
  }
  if (pathname === "/about") return { text: "Sobre", asHeading: true };
  if (pathname === "/contact") return { text: "Contato", asHeading: true };
  if (pathname === "/work") return { text: "Projetos", asHeading: true };
  if (pathname.startsWith("/work/")) return { text: "Projetos" };
  if (pathname === "/blog") return { text: "Blog", asHeading: true };
  if (pathname.startsWith("/blog/")) return { text: "Blog" };

  return { text: siteName };
}
