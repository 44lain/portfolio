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
    <div className="mt-8 lg:mt-12">
      <About />
      <Services />
    </div>
  );
}
