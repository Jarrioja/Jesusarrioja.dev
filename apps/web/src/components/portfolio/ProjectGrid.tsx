import { ProjectCard } from "./ProjectCard";
import projectsData from "@/data/projects.json";

interface ProjectGridProps {
  locale: "en" | "es";
  featured?: boolean;
}

export function ProjectGrid({ locale, featured }: ProjectGridProps) {
  const projects = projectsData
    .filter((p) => featured === undefined || p.isFeatured === featured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({
      ...p,
      name: p.name[locale],
      features: p.features.map((f) => f[locale]),
    }));

  const gridCols = featured
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {locale === "en" ? "No projects found." : "No se encontraron proyectos."}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} locale={locale} />
      ))}
    </div>
  );
}
