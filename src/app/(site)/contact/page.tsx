import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/ContactCta";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { PageContent } from "@/components/ui/PageContent";
import { getSiteSettings } from "@/lib/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contato",
  description: "Vamos conversar sobre seu próximo projeto.",
  path: "/contact",
});

export default function ContactPage() {
  const site = getSiteSettings();

  return (
    <PageContent>
      <section className="content-container grid grid-cols-1 gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="text-large-body text-foreground/90">
            Tem um projeto em mente? Me conte os detalhes — respondo o mais breve possível.
          </p>
          <div className="flex flex-col gap-2">
            <CopyEmailButton
              email={site.email}
              className="text-small-heading text-accent"
            />
            <span className="text-small-body text-muted">Clique no e-mail para copiar</span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactCta email={site.email} />
        </div>
      </section>
    </PageContent>
  );
}
