import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { BentoProjectCard } from "./BentoProjectCard";
import { motion } from "framer-motion";

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
  const featured = useQuery(api.projects.getProjects, { locale, featured: true });
  const other = useQuery(api.projects.getProjects, { locale, featured: false });

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
            {featured?.length ?? "—"} {locale === "en" ? "projects" : "proyectos"}
          </span>
        </div>

        {!featured ? (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {[4, 2, 2, 4].map((span, i) => (
              <div
                key={i}
                className={`md:col-span-${span} h-64 rounded-2xl bg-secondary/30 animate-pulse`}
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-6 gap-4"
          >
            {featured.map((project, i) => (
              <BentoProjectCard
                key={project._id}
                project={project}
                locale={locale}
                size={getBentoSize(i, featured.length)}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* Other Projects */}
      {other && other.length > 0 && (
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
                key={project._id}
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

/**
 * Determine bento card size based on position to create visual rhythm.
 * Pattern: large, medium, medium, large, medium, large, medium, medium...
 */
function getBentoSize(index: number, total: number): "large" | "medium" {
  const pattern = [4, 2, 2, 4, 3, 3, 4, 2];
  return (pattern[index % pattern.length] ?? 3) >= 4 ? "large" : "medium";
}
