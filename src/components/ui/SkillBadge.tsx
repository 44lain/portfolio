import type { Skill } from "@/types/content";

type SkillBadgeProps = {
  skill: Skill;
};

const tones = {
  accent: "bg-accent text-foreground",
  hover: "bg-hover text-foreground",
  muted: "bg-secondary text-foreground",
} as const;

// Sticker decorativo rotacionado (skills no About).
export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={`caps inline-flex items-center rounded-full px-4 py-2 ${tones[skill.tone]}`}
      style={{ transform: `rotate(${skill.rotation}deg)` }}
    >
      {skill.label}
    </span>
  );
}
