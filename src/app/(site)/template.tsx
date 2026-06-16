import { ViewTransition } from "react";

type SiteTemplateProps = {
  children: React.ReactNode;
};

// Envolve o conteúdo de rota para animações via View Transitions API (Next.js + React 19).
export default function SiteTemplate({ children }: SiteTemplateProps) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "page-fade",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "page-fade",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
