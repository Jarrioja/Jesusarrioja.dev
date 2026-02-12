import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  locale: "en" | "es";
  featured?: boolean;
}

export function ProjectGrid({ locale, featured }: ProjectGridProps) {
  const projects = useQuery(api.projects.getProjects, { locale, featured });

  const gridCols = featured
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  if (!projects) {
    return (
      <div className={`grid ${gridCols} gap-6`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[320px] rounded-2xl bg-secondary/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {locale === "en"
            ? "No projects found. Run the migration script to populate data."
            : "No se encontraron proyectos. Ejecuta el script de migración para poblar datos."}
        </p>
        <code className="block mt-4 text-sm bg-secondary p-4 rounded-lg">
          pnpm migrate
        </code>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} locale={locale} />
      ))}
    </div>
  );
}
