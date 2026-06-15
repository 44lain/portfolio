import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Software Engineer — Full Stack, Mobile, Arquitetura de Sistemas e Cibersegurança.",
};

export default function AboutPage() {
  return (
    <>
      <MarqueeBanner text="Sobre" asHeading />
      <div className="page-surface">
        <About />
        <Services />
      </div>
    </>
  );
}
