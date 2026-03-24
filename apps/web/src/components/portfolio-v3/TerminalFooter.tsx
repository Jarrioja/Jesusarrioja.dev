import { motion } from "framer-motion";

interface TerminalFooterProps {
  locale: "en" | "es";
}

export function TerminalFooter({ locale }: TerminalFooterProps) {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-6 pb-12"
    >
      {/* Separator */}
      <div className="text-xs mb-6" style={{ color: "#1a1a1a" }}>
        {"─".repeat(60)}
      </div>

      {/* Exit command */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs flex-shrink-0">
          <span style={{ color: "#28c840" }}>jarrioja</span>
          <span style={{ color: "#4a4a4a" }}>@</span>
          <span style={{ color: "#febc2e" }}>dev</span>
          <span style={{ color: "#4a4a4a" }}>:</span>
          <span style={{ color: "#5c9eff" }}>~</span>
          <span style={{ color: "#4a4a4a" }}>$ </span>
        </span>
        <span className="text-xs" style={{ color: "#e0e0e0" }}>echo $CREDITS</span>
      </div>

      <div className="space-y-1.5 text-xs" style={{ color: "#3a3a3a" }}>
        <p>
          <span style={{ color: "#4a4a4a" }}># </span>
          &copy; {year} Jesús Arrioja
        </p>
        <p>
          <span style={{ color: "#4a4a4a" }}># </span>
          {locale === "en"
            ? "Built exploring agentic programming patterns"
            : "Construido explorando patrones de programación agéntica"}
        </p>
        <p>
          <span style={{ color: "#4a4a4a" }}># </span>
          {locale === "en" ? "Developed with " : "Desarrollado con "}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "#5c9eff" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#8ab8ff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5c9eff"; }}
          >
            Claude Code
          </a>
          {" + "}
          <a
            href="https://github.com/jarrioja/jesusarrioja.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "#5c9eff" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#8ab8ff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5c9eff"; }}
          >
            GitHub
          </a>
        </p>
      </div>

      {/* Final blinking cursor */}
      <div className="mt-6 flex items-center gap-2">
        <span className="text-xs flex-shrink-0">
          <span style={{ color: "#28c840" }}>jarrioja</span>
          <span style={{ color: "#4a4a4a" }}>@</span>
          <span style={{ color: "#febc2e" }}>dev</span>
          <span style={{ color: "#4a4a4a" }}>:</span>
          <span style={{ color: "#5c9eff" }}>~</span>
          <span style={{ color: "#4a4a4a" }}>$ </span>
        </span>
        <span
          className="terminal-cursor inline-block w-2 h-4"
          style={{ background: "#28c840" }}
        />
      </div>
    </motion.footer>
  );
}
