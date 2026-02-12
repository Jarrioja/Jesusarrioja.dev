import { SkillBadge } from "./SkillBadge";

interface Skill {
  _id: string;
  name: string;
  icon: string;
  category?: string;
  order: number;
  tooltip?: string;
}

interface SkillsMarqueeProps {
  skills: Skill[];
  speed?: number; // Duration in seconds for one complete loop
}

export function SkillsMarquee({ skills, speed = 30 }: SkillsMarqueeProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/95 via-30% via-background/70 via-60% to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/95 via-30% via-background/70 via-60% to-transparent z-10 pointer-events-none" />

      {/* Marquee container - gap uniforme en todo */}
      <div className="flex gap-3">
        {/* First set of skills */}
        <div
          className="flex gap-3 animate-marquee shrink-0"
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {skills.map((skill) => (
            <div key={`${skill._id}-1`} className="flex-shrink-0">
              <SkillBadge skill={skill} />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div
          className="flex gap-3 animate-marquee shrink-0"
          style={{
            animationDuration: `${speed}s`,
          }}
          aria-hidden="true"
        >
          {skills.map((skill) => (
            <div key={`${skill._id}-2`} className="flex-shrink-0">
              <SkillBadge skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
