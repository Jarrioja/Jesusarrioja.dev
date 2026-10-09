import { Calendar } from "lucide-react";
import type { ReactNode } from "react";

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
    url?: string;
    /** Ongoing client relationship, labeled "Client" instead of "Project". */
    isClient?: boolean;
    description: string;
    techStack: string;
    responsibilities?: string;
  }>;
}

interface CVExperienceProps {
  experiences: Experience[];
  locale: "en" | "es";
}

// Underlined so the link stays visible in the printed PDF.
const linkClass = "underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground";

function ExternalLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <>{children}</>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

function formatDate(dateStr: string, locale: "en" | "es"): string {
  // Read "YYYY-MM-DD" as a calendar date: new Date() parses it as UTC and shifts the month back in negative offsets.
  const [year, month] = dateStr.split("-").map(Number);
  const monthNames = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  };

  return `${monthNames[locale][month - 1]} ${year}`;
}

export function CVExperience({ experiences, locale }: CVExperienceProps) {
  const currentLabel = locale === "en" ? "Present" : "Presente";

  return (
    <section className="mb-8 print:mb-3">
      <h2 className="text-2xl font-bold mb-4 print:text-base print:font-bold print:mb-2">
        {locale === "en" ? "Work Experience" : "Experiencia Laboral"}
      </h2>

      <div className="space-y-6 print:space-y-2">
        {experiences.map((exp, index) => (
          <div key={index}>
            {/* Job Header */}
            <div className="mb-2 print:mb-0.5">
              <h3 className="text-lg font-semibold print:text-sm print:font-semibold">{exp.title}</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground print:text-xs print:text-foreground print:gap-1">
                <span className="font-medium text-foreground">
                  <ExternalLink href={exp.companyUrl}>{exp.company}</ExternalLink>
                </span>
                <span>•</span>
                <span>{exp.location}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(exp.startDate, locale)} -{" "}
                  {exp.isCurrent ? currentLabel : exp.endDate ? formatDate(exp.endDate, locale) : ""}
                </span>
              </div>
            </div>

            {/* Description */}
            {exp.description && (
              <p className="text-sm mb-2 print:text-xs print:mb-0.5">{exp.description}</p>
            )}

            {/* Responsibilities */}
            {exp.responsibilities.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-sm mb-3 print:text-xs print:space-y-0.5 print:mb-1">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-muted-foreground print:text-foreground">
                    {resp}
                  </li>
                ))}
              </ul>
            )}

            {/* Projects */}
            {exp.projects && exp.projects.length > 0 && (
              <div className="ml-4 space-y-2 print:ml-2 print:space-y-0.5">
                {exp.projects.map((project, pIdx) => (
                  <div key={pIdx}>
                    <h4 className="text-sm font-semibold print:text-xs">
                      {project.isClient
                        ? locale === "en" ? "Client:" : "Cliente:"
                        : locale === "en" ? "Project:" : "Proyecto:"}{" "}
                      <ExternalLink href={project.url}>{project.name}</ExternalLink>
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1 print:text-xs print:text-foreground print:mb-0">
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
