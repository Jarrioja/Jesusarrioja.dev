import { motion } from "framer-motion";
import { Github, Sparkles } from "lucide-react";

interface BentoFooterProps {
  locale: "en" | "es";
}

export function BentoFooter({ locale }: BentoFooterProps) {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-12 mt-16"
    >
      <div className="rounded-3xl bg-secondary/40 border border-border/50 p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left side */}
          <div className="space-y-2">
            <p
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {locale === "en" ? "Let's connect." : "Conectemos."}
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              {locale === "en"
                ? "Open to new opportunities and collaborations. Feel free to reach out."
                : "Abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme."}
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/jarrioja/jesusarrioja.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border hover:bg-foreground hover:text-background transition-colors text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              {locale === "en" ? "Source" : "Código"}
            </a>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <p>&copy; {year} Jesús Arrioja</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              {locale === "en"
                ? "Built exploring agentic programming"
                : "Construido explorando programación agéntica"}
            </span>
            <span>·</span>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Claude Code
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
