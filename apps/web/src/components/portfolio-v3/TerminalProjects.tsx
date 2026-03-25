import { motion } from "framer-motion";
import { useState } from "react";
import projectsData from "@/data/projects.json";

interface TerminalProjectsProps {
  locale: "en" | "es";
}

export function TerminalProjects({ locale }: TerminalProjectsProps) {
  const featured = projectsData
    .filter((p) => p.isFeatured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, name: p.name[locale], features: p.features.map((f) => f[locale]) }));

  const other = projectsData
    .filter((p) => !p.isFeatured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, name: p.name[locale], features: p.features.map((f) => f[locale]) }));

  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <section className="mb-16">
      {/* Featured projects */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <Prompt />
          <span style={{ color: "#e0e0e0" }}>
            find ./projects -type f -name "*.featured" | head -20
          </span>
        </div>

        <div className="mt-3">
          <div className="text-xs mb-3" style={{ color: "#4a4a4a" }}>
            {locale === "en" ? "Found" : "Encontrados"} {featured.length}{" "}
            {locale === "en" ? "results" : "resultados"}:
          </div>

          <div className="space-y-1">
            {featured.map((project, i) => (
              <ProjectLine
                key={project.slug}
                project={project}
                index={i}
                locale={locale}
                isExpanded={expandedSlug === project.slug}
                onToggle={() =>
                  setExpandedSlug(expandedSlug === project.slug ? null : project.slug)
                }
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Other projects */}
      {other.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Prompt />
            <span style={{ color: "#e0e0e0" }}>
              ls ./projects/archive/
            </span>
          </div>

          <div className="mt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0.5">
              {other.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  className="text-xs py-0.5 group"
                >
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors flex items-center gap-2"
                      style={{ color: "#5a5a5a" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#28c840";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#5a5a5a";
                      }}
                    >
                      <span style={{ color: "#3a3a3a" }}>
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span>{project.name}</span>
                      <span style={{ color: "#2a2a2a" }}>→</span>
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2"
                      style={{ color: "#4a4a4a" }}
                    >
                      <span style={{ color: "#3a3a3a" }}>
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span>{project.name}</span>
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

interface ProjectLineProps {
  project: {
    slug: string;
    name: string;
    features: string[];
    url?: string;
    gradient: { from: string; to: string };
    agency?: { name: string; logoUrl: string; url: string };
  };
  index: number;
  locale: "en" | "es";
  isExpanded: boolean;
  onToggle: () => void;
}

function ProjectLine({ project, index, locale, isExpanded, onToggle }: ProjectLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Main project line */}
      <button
        onClick={onToggle}
        className="w-full text-left text-xs py-1.5 px-3 rounded transition-colors flex items-center gap-3 group"
        style={{
          color: "#9a9a9a",
          background: isExpanded ? "rgba(40,200,64,0.04)" : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) e.currentTarget.style.background = "transparent";
        }}
      >
        {/* Expand indicator */}
        <span
          className="transition-transform inline-block"
          style={{
            color: "#28c840",
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          ▸
        </span>

        {/* Color swatch from gradient */}
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${project.gradient.from}, ${project.gradient.to})`,
          }}
        />

        {/* Project name */}
        <span
          className="font-medium"
          style={{ color: isExpanded ? "#28c840" : "#c0c0c0" }}
        >
          {project.name}
        </span>

        {/* Agency tag */}
        {project.agency && (
          <span style={{ color: "#3a3a3a" }}>
            via {project.agency.name}
          </span>
        )}

        {/* Link indicator */}
        {project.url && (
          <span style={{ color: "#2a2a2a" }} className="ml-auto">
            ↗
          </span>
        )}
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div
            className="pl-10 pr-3 pb-3 pt-1 text-xs"
            style={{ borderLeft: "1px solid #1a1a1a", marginLeft: "0.6rem" }}
          >
            {/* Features */}
            {project.features.length > 0 && (
              <div className="space-y-1">
                {project.features.map((feat, fi) => (
                  <div key={fi} style={{ color: "#6a6a6a" }}>
                    <span style={{ color: "#3a3a3a" }}>├─ </span>
                    {feat}
                  </div>
                ))}
              </div>
            )}

            {/* URL */}
            {project.url && (
              <div className="mt-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#5c9eff" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#8ab8ff";
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5c9eff";
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  <span style={{ color: "#3a3a3a" }}>└─ </span>
                  {project.url}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function Prompt() {
  return (
    <span className="text-xs flex-shrink-0">
      <span style={{ color: "#28c840" }}>jarrioja</span>
      <span style={{ color: "#4a4a4a" }}>@</span>
      <span style={{ color: "#febc2e" }}>dev</span>
      <span style={{ color: "#4a4a4a" }}>:</span>
      <span style={{ color: "#5c9eff" }}>~</span>
      <span style={{ color: "#4a4a4a" }}>$ </span>
    </span>
  );
}
