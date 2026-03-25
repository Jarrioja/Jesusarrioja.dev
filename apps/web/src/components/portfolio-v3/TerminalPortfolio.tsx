import { ThemeProvider } from "../shared/ThemeProvider";
import { TerminalBoot } from "./TerminalBoot";
import { TerminalHero } from "./TerminalHero";
import { TerminalSkills } from "./TerminalSkills";
import { TerminalProjects } from "./TerminalProjects";
import { TerminalFooter } from "./TerminalFooter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalPortfolioProps {
  locale: "en" | "es";
}

export function TerminalPortfolio({ locale }: TerminalPortfolioProps) {
  const [bootComplete, setBootComplete] = useState(false);

  // Load IBM Plex Mono font dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider>
      {/* Force dark background regardless of theme */}
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background: "#050505",
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        }}
      >
        {/* CRT scan line effect */}
        <div
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          }}
        />

        {/* Subtle CRT glow vignette */}
        <div
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Phosphor flicker — very subtle */}
        <div className="fixed inset-0 pointer-events-none z-30 terminal-flicker" />

        <AnimatePresence mode="wait">
          {!bootComplete ? (
            <TerminalBoot
              key="boot"
              locale={locale}
              onComplete={() => setBootComplete(true)}
            />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Terminal window chrome */}
              <div className="sticky top-0 z-40 border-b" style={{ borderColor: "#1a1a1a", background: "#0a0a0a" }}>
                <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Traffic light dots */}
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                    </div>
                    <span className="text-xs" style={{ color: "#4a4a4a" }}>
                      jarrioja@dev:~/portfolio
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href={locale === "en" ? "/en/cv" : "/cv"}
                      className="text-xs transition-colors"
                      style={{ color: "#4a4a4a" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#28c840")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4a4a")}
                    >
                      [CV]
                    </a>
                    <a
                      href={locale === "en" ? "/" : "/en"}
                      className="text-xs transition-colors"
                      style={{ color: "#4a4a4a" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#28c840")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4a4a")}
                    >
                      [{locale === "en" ? "ES" : "EN"}]
                    </a>
                    <a
                      href="/"
                      className="text-xs transition-colors"
                      style={{ color: "#4a4a4a" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#28c840")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4a4a")}
                    >
                      [v1]
                    </a>
                  </div>
                </div>
              </div>

              {/* Main terminal content */}
              <main className="max-w-5xl mx-auto px-6 py-8">
                <TerminalHero locale={locale} />
                <TerminalSkills locale={locale} />
                <TerminalProjects locale={locale} />
              </main>

              <TerminalFooter locale={locale} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
