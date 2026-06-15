import type { Metadata } from "next";
import { PageContent } from "@/components/ui/PageContent";
import { getSiteSettings } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Vamos conversar sobre seu próximo projeto.",
};

export default function ContactPage() {
  const site = getSiteSettings();

  return (
    <PageContent>
      <section className="content-container grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-6">
          <p className="text-large-body text-foreground/90">
            Tem um projeto em mente? Conte os detalhes — respondo o mais breve possível.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline text-small-heading mt-8 inline-block text-accent"
          >
            {site.email}
          </a>
        </div>

        {/* Formulário visual — submit funcional chega na Sprint 5 */}
        <form className="flex flex-col gap-5 lg:col-span-6">
          <label className="flex flex-col gap-2">
            <span className="caps text-muted">Nome</span>
            <input
              type="text"
              name="name"
              className="rounded-card border border-secondary bg-transparent px-4 py-3 text-foreground outline-none focus-visible:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="caps text-muted">E-mail</span>
            <input
              type="email"
              name="email"
              className="rounded-card border border-secondary bg-transparent px-4 py-3 text-foreground outline-none focus-visible:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="caps text-muted">Mensagem</span>
            <textarea
              name="message"
              rows={5}
              className="rounded-card border border-secondary bg-transparent px-4 py-3 text-foreground outline-none focus-visible:border-accent"
            />
          </label>
          <button
            type="submit"
            disabled
            className="caps w-fit rounded-full bg-accent px-6 py-3 text-foreground transition-colors hover:bg-hover disabled:opacity-60"
          >
            Enviar (em breve)
          </button>
        </form>
      </section>
    </PageContent>
  );
}
