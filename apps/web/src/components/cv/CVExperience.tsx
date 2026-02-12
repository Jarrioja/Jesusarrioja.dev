import { Calendar } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  projects?: Array<{
    name: string;
    description: string;
    techStack: string;
    responsibilities?: string;
  }>;
}

interface CVExperienceProps {
  experiences: Experience[];
  locale: "en" | "es";
}

function formatDate(dateStr: string, locale: "en" | "es"): string {
  const date = new Date(dateStr);
  const monthNames = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  };

  const month = monthNames[locale][date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export function CVExperience({ experiences, locale }: CVExperienceProps) {
  const currentLabel = locale === "en" ? "Present" : "Presente";

  return (
    <section className="mb-8 print:mb-6">
      <h2 className="text-2xl font-bold mb-4 print:text-xl print:mb-3">
        {locale === "en" ? "Work Experience" : "Experiencia Laboral"}
      </h2>

      <div className="space-y-6 print:space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="break-inside-avoid">
            {/* Job Header */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold print:text-base">{exp.title}</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground print:text-xs print:text-foreground">
                <span className="font-medium text-foreground">{exp.company}</span>
                <span>•</span>
                <span>{exp.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1 print:text-xs print:text-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(exp.startDate, locale)} -{" "}
                  {exp.isCurrent ? currentLabel : exp.endDate ? formatDate(exp.endDate, locale) : ""}
                </span>
              </div>
            </div>

            {/* Description */}
            {exp.description && (
              <p className="text-sm mb-2 print:text-xs">{exp.description}</p>
            )}

            {/* Responsibilities */}
            {exp.responsibilities.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-sm mb-3 print:text-xs print:space-y-0.5 print:mb-2">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-muted-foreground print:text-foreground">
                    {resp}
                  </li>
                ))}
              </ul>
            )}

            {/* Projects */}
            {exp.projects && exp.projects.length > 0 && (
              <div className="ml-4 space-y-2 print:ml-3 print:space-y-1.5">
                {exp.projects.map((project, pIdx) => (
                  <div key={pIdx} className="break-inside-avoid">
                    <h4 className="text-sm font-semibold print:text-xs">
                      {locale === "en" ? "Project:" : "Proyecto:"} {project.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1 print:text-xs print:text-foreground">
                      {project.description}
                    </p>
                    <p className="text-xs text-muted-foreground print:text-foreground">
                      <span className="font-medium">
                        {locale === "en" ? "Tech Stack:" : "Tecnologías:"}
                      </span>{" "}
                      {project.techStack}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
