import { ConvexProvider } from "../shared/ConvexProvider";
import { Hero } from "./Hero";
import { ProjectGrid } from "./ProjectGrid";
import { LanguageSwitcher } from "../shared/LanguageSwitcher";
import { ThemeToggle } from "../shared/ThemeToggle";
import { Github, Sparkles } from "lucide-react";

interface PortfolioPageProps {
  locale: "en" | "es";
  translations: {
    featuredTitle: string;
    featuredDescription: string;
    otherTitle: string;
    otherDescription: string;
    copyright: string;
    builtWith: string;
  };
}

export function PortfolioPage({ locale, translations }: PortfolioPageProps) {
  return (
    <ConvexProvider>
      {/* Header with Language Switcher and Theme Toggle */}
      <div className="container mx-auto px-4 py-4 flex justify-end gap-2">
        <ThemeToggle />
        <LanguageSwitcher currentLocale={locale} />
      </div>

      {/* Hero Section */}
      <Hero locale={locale} />

      {/* Projects Section */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{translations.featuredTitle}</h2>
            <p className="text-muted-foreground">
              {translations.featuredDescription}
            </p>
          </div>
          <ProjectGrid locale={locale} featured={true} />
        </section>

        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{translations.otherTitle}</h2>
            <p className="text-muted-foreground">
              {translations.otherDescription}
            </p>
          </div>
          <ProjectGrid locale={locale} featured={false} />
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 max-w-6xl border-t">
        <div className="text-center space-y-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {translations.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>

          {/* Agentic Programming Note */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <p>
              {locale === "en"
                ? "Built to explore and learn agentic programming patterns"
                : "Construido para explorar y aprender patrones de programación agéntica"}
            </p>
          </div>

          {/* Credits and GitHub */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <p className="text-muted-foreground">
              {locale === "en"
                ? "Developed with"
                : "Desarrollado con"}{" "}
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Claude Code
              </a>
            </p>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://github.com/jarrioja/jesusarrioja.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>{locale === "en" ? "View Source" : "Ver Código"}</span>
            </a>
          </div>
        </div>
      </footer>
    </ConvexProvider>
  );
}
