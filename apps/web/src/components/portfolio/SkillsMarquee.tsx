import { SkillBadge } from "./SkillBadge";

interface Skill {
  name: string;
  icon: string;
  category?: string;
  order: number;
  tooltip?: string;
}

interface SkillsMarqueeProps {
  skills: Skill[];
  speed?: number;
}

function MarqueeRow({
  skills,
  speed,
  reverse = false,
}: {
  skills: Skill[];
  speed: number;
  reverse?: boolean;
}) {
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";
  return (
    <div className="flex gap-3">
      <div
        className={`flex gap-3 ${animClass} shrink-0`}
        style={{ animationDuration: `${speed}s` }}
      >
        {skills.map((skill) => (
          <div key={`${skill.name}-a`} className="flex-shrink-0">
            <SkillBadge skill={skill} />
          </div>
        ))}
      </div>
      <div
        className={`flex gap-3 ${animClass} shrink-0`}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {skills.map((skill) => (
          <div key={`${skill.name}-b`} className="flex-shrink-0">
            <SkillBadge skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
}

function splitInto(skills: Skill[], n: number): Skill[][] {
  const size = Math.ceil(skills.length / n);
  return Array.from({ length: n }, (_, i) => skills.slice(i * size, (i + 1) * size));
}

export function SkillsMarquee({ skills, speed = 30 }: SkillsMarqueeProps) {
  if (!skills || skills.length === 0) return null;

  const rows4 = splitInto(skills, 4);
  const rows3 = splitInto(skills, 3);

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Mobile: 4 rows */}
      <div className="md:hidden space-y-3">
        {rows4.map((row, i) => (
          <MarqueeRow key={i} skills={row} speed={speed} reverse={i % 2 !== 0} />
        ))}
      </div>

      {/* Desktop: 3 rows */}
      <div className="hidden md:block space-y-3">
        {rows3.map((row, i) => (
          <MarqueeRow key={i} skills={row} speed={speed} reverse={i % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}
