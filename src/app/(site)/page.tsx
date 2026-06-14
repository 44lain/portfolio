import { getSiteSettings } from "@/lib/content/site";

export default function HomePage() {
  const site = getSiteSettings();

  return (
    <section className="content-container grid grid-cols-1 gap-8 py-24 lg:grid-cols-12 lg:py-32">
      <div className="lg:col-span-12">
        <h1 className="text-huge-hero text-foreground">{site.siteName}</h1>
      </div>
      <p className="text-large-body text-muted lg:col-span-7 lg:col-start-6">
        {site.tagline}. Portfólio em construção — Sprint 0 concluída.
      </p>
    </section>
  );
}
