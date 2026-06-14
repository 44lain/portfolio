import type { Service } from "@/types/content";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="flex min-h-[22rem] flex-col rounded-card bg-accent p-8 text-foreground transition-transform duration-300 hover:rotate-0 md:[transform:rotate(var(--rotate))]"
      style={{ "--rotate": `${service.rotation}deg` } as React.CSSProperties}
    >
      <h3 className="text-card-title -skew-y-1">{service.title}</h3>
      <p className="text-small-body mt-4 text-foreground/85">{service.description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="caps inline-flex items-center rounded-full border border-foreground/40 px-3 py-1 text-foreground/90"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
