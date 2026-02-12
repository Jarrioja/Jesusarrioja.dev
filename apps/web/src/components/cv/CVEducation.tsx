import { GraduationCap } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
}

interface CVEducationProps {
  education: Education[];
  locale: "en" | "es";
}

export function CVEducation({ education, locale }: CVEducationProps) {
  return (
    <section className="mb-8 print:mb-6">
      <h2 className="text-2xl font-bold mb-4 print:text-xl print:mb-3">
        {locale === "en" ? "Education" : "Educación"}
      </h2>

      <div className="space-y-3 print:space-y-2">
        {education.map((edu, index) => (
          <div key={index} className="flex gap-3 break-inside-avoid print:gap-2">
            <GraduationCap className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 print:w-4 print:h-4" />
            <div>
              <h3 className="text-base font-semibold print:text-sm">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground print:text-xs print:text-foreground">
                {edu.institution} • {edu.location}
              </p>
              <p className="text-sm text-muted-foreground print:text-xs print:text-foreground">
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
