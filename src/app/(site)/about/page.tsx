import type { Metadata } from "next";
import { PageMarquee } from "@/components/ui/PageMarquee";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Software Engineer — Full Stack, Mobile, Arquitetura de Sistemas e Cibersegurança.",
};

export default function AboutPage() {
  return (
    <>
      <PageMarquee text="Software Engineer" repeat={3} ariaLabel="Sobre" />
      <About />
      <Services />
    </>
  );
}
