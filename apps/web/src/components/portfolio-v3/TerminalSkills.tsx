import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { motion } from "framer-motion";

interface TerminalSkillsProps {
  locale: "en" | "es";
}

const barChars = "█▓▒░";

export function TerminalSkills({ locale }: TerminalSkillsProps) {
  const skills = useQuery(api.profile.getSkills, { locale });

  if (!skills || skills.length === 0) return null;

  // Group skills by category
  const grouped: Record<string, typeof skills> = {};
  for (const skill of skills) {
    const cat = skill.category || "other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  }

  const categoryLabels: Record<string, { en: string; es: string }> = {
    frontend: { en: "Frontend", es: "Frontend" },
    backend: { en: "Backend / CMS", es: "Backend / CMS" },
    cloud: { en: "Cloud / DevOps", es: "Cloud / DevOps" },
    tools: { en: "Tools", es: "Herramientas" },
    other: { en: "Other", es: "Otros" },
  };

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Command */}
        <div className="flex items-center gap-2 mb-4">
          <Prompt />
          <span style={{ color: "#e0e0e0" }}>neofetch --skills</span>
        </div>

        {/* ASCII box output */}
        <div className="mt-3">
          <div className="text-xs whitespace-pre" style={{ color: "#28c840" }}>
{`  ╭──────────────────────────────────────╮
  │         SKILL REGISTRY v2.0          │
  ╰──────────────────────────────────────╯`}
          </div>

          <div className="mt-4 space-y-5">
            {Object.entries(grouped).map(([category, items], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.4 }}
              >
                {/* Category header */}
                <div className="text-xs mb-2 flex items-center gap-2">
                  <span style={{ color: "#febc2e" }}>
                    ▸ {categoryLabels[category]?.[locale] || category}
                  </span>
                  <span style={{ color: "#2a2a2a" }}>
                    {"─".repeat(30)}
                  </span>
                </div>

                {/* Skills as inline tags */}
                <div className="flex flex-wrap gap-x-1 gap-y-1 pl-4">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill._id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + i * 0.03 }}
                      className="text-xs px-2 py-0.5 rounded transition-colors cursor-default"
                      style={{
                        color: "#8a8a8a",
                        border: "1px solid #1a1a1a",
                        background: "#0a0a0a",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#28c840";
                        e.currentTarget.style.borderColor = "#28c840";
                        e.currentTarget.style.background = "rgba(40,200,64,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#8a8a8a";
                        e.currentTarget.style.borderColor = "#1a1a1a";
                        e.currentTarget.style.background = "#0a0a0a";
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary line */}
          <div className="mt-5 text-xs" style={{ color: "#3a3a3a" }}>
            <span style={{ color: "#4a4a4a" }}>// </span>
            {skills.length} {locale === "en" ? "technologies loaded" : "tecnologías cargadas"}
            <span style={{ color: "#28c840" }}> ✓</span>
          </div>
        </div>
      </motion.div>
    </section>
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
