interface SkillCategory {
  category: string;
  skills: string[];
}

interface CVSkillsProps {
  skills: SkillCategory[];
  locale: "en" | "es";
}

export function CVSkills({ skills, locale }: CVSkillsProps) {
  return (
    <section className="mb-8 print:mb-6">
      <h2 className="text-2xl font-bold mb-4 print:text-xl print:mb-3">
        {locale === "en" ? "Technical Skills" : "Habilidades Técnicas"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
        {skills.map((skillGroup, index) => (
          <div key={index} className="break-inside-avoid">
            <h3 className="text-sm font-semibold mb-2 print:text-xs print:mb-1">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2 print:gap-1.5">
              {skillGroup.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-muted text-sm rounded-md print:px-2 print:py-0.5 print:text-xs print:bg-gray-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
