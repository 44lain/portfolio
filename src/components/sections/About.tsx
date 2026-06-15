import Image from "next/image";
import { Pill } from "@/components/ui/Pill";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { introContent, skills } from "@/lib/content/mock";

export function About() {
  const { roleTop, roleBottom, paragraphs, nextEvent } = introContent;

  return (
    <section
      id="about"
      className="content-container grid grid-cols-1 gap-12 pb-20 pt-4 lg:grid-cols-12 lg:pb-28 lg:pt-6"
      aria-label="Sobre"
    >
      {/* Foto com blob orgânico — reduzida a 60% (−40%) e centralizada na coluna */}
      <div className="relative mx-auto w-3/5 lg:col-span-5">
        <div className="absolute inset-0 -z-0 translate-x-3 translate-y-3 rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-accent/80" />
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-secondary">
          <Image
            src="/foto-lain.jpeg"
            alt="Foto do Lain"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
        <div className="relative">
          <span className="text-small-heading block italic text-muted">{roleTop}</span>
          <span className="text-large-heading block text-foreground">{roleBottom}</span>
          <div className="mt-4 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillBadge key={skill.label} skill={skill} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-large-body text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex w-fit flex-col gap-2 rounded-card border border-accent p-5">
          <span className="caps text-muted">{nextEvent.label}</span>
          <span className="text-small-heading text-foreground">{nextEvent.date}</span>
          <Pill href="/contact" className="mt-2 w-fit">
            Vamos conversar
          </Pill>
        </div>
      </div>
    </section>
  );
}
