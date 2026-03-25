import { BentoProjectCard } from "./BentoProjectCard";
import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";

interface BentoProjectsProps {
  locale: "en" | "es";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export function BentoProjects({ locale }: BentoProjectsProps) {
  const featured = projectsData
    .filter((p) => p.isFeatured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, name: p.name[locale], features: p.features.map((f) => f[locale]) }));

  const other = projectsData
    .filter((p) => !p.isFeatured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, name: p.name[locale], features: p.features.map((f) => f[locale]) }));

  return (
    <div className="space-y-10">
      {/* Featured Projects */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {locale === "en" ? "Featured" : "Destacados"}
          </h2>
          <div className="flex-1 h-px bg-border/60" />
          <span className="text-sm text-muted-foreground font-medium tabular-nums">
            {featured.length} {locale === "en" ? "projects" : "proyectos"}
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          {featured.map((project, i) => (
            <BentoProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              size={getBentoSize(i, featured.length)}
              index={i}
            />
          ))}
        </motion.div>
      </section>

      {/* Other Projects */}
      {other.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {locale === "en" ? "More Work" : "Más Proyectos"}
            </h2>
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-sm text-muted-foreground font-medium tabular-nums">
              {other.length} {locale === "en" ? "projects" : "proyectos"}
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {other.map((project, i) => (
              <BentoProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                size="compact"
                index={i}
              />
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}

function getBentoSize(index: number, total: number): "large" | "medium" {
  const pattern = [4, 2, 2, 4, 3, 3, 4, 2];
  return (pattern[index % pattern.length] ?? 3) >= 4 ? "large" : "medium";
}
