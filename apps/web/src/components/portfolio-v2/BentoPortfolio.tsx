import { ThemeProvider } from "../shared/ThemeProvider";
import { BentoHero } from "./BentoHero";
import { BentoProjects } from "./BentoProjects";
import { BentoSkills } from "./BentoSkills";
import { BentoFooter } from "./BentoFooter";
import { LanguageSwitcher } from "../shared/LanguageSwitcher";
import { ThemeToggle } from "../shared/ThemeToggle";
import { motion } from "framer-motion";

interface BentoPortfolioProps {
  locale: "en" | "es";
}

export function BentoPortfolio({ locale }: BentoPortfolioProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Subtle grain texture overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href={locale === "en" ? "/en" : "/"} className="group flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">JA</span>
              </div>
              <span className="text-sm font-medium tracking-wide uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                Portfolio v2
              </span>
            </a>
            <div className="flex items-center gap-3">
              <a
                href={locale === "en" ? "/en/cv" : "/cv"}
                className="text-sm font-medium tracking-wide uppercase opacity-60 hover:opacity-100 transition-opacity hidden sm:block"
              >
                {locale === "en" ? "Resume" : "CV"}
              </a>
              <div className="w-px h-5 bg-border hidden sm:block" />
              <ThemeToggle />
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </motion.nav>

        {/* Main Bento Grid Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <BentoHero locale={locale} />
          <BentoSkills locale={locale} />
          <BentoProjects locale={locale} />
        </main>

        <BentoFooter locale={locale} />
      </div>
    </ThemeProvider>
  );
}
