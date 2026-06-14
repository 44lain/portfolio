import type { Metadata } from "next";
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
      <section className="content-container py-16 lg:py-20">
        <h1 className="text-huge-hero text-foreground">Sobre</h1>
      </section>
      <About />
      <Services />
    </>
  );
}
