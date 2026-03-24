import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoSkillsProps {
  locale: "en" | "es";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.2 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function BentoSkills({ locale }: BentoSkillsProps) {
  const skills = useQuery(api.profile.getSkills, { locale });

  if (!skills || skills.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl bg-secondary/40 border border-border/50 p-8 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground">
          {locale === "en" ? "Tech Stack" : "Tecnologías"}
        </p>
        <p className="text-xs text-muted-foreground/60">
          {skills.length} {locale === "en" ? "technologies" : "tecnologías"}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-2.5"
      >
        {skills.map((skill, i) => (
          <motion.span
            key={skill._id}
            variants={pillVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              "border transition-colors cursor-default",
              i % 4 === 0 && "bg-foreground/5 border-foreground/10 hover:bg-foreground/10",
              i % 4 === 1 && "bg-emerald-500/5 border-emerald-500/15 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
              i % 4 === 2 && "bg-amber-500/5 border-amber-500/15 hover:bg-amber-500/10 text-amber-700 dark:text-amber-400",
              i % 4 === 3 && "bg-sky-500/5 border-sky-500/15 hover:bg-sky-500/10 text-sky-700 dark:text-sky-400",
            )}
            title={skill.tooltip || skill.name}
          >
            {skill.name}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
