import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/content/mock";

export function Services() {
  return (
    <section
      id="services"
      className="content-container section-spacing"
      aria-label="Serviços"
    >
      <div className="grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}
