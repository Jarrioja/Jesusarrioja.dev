import { ThemeProvider } from "../shared/ThemeProvider";
import { Hero } from "./Hero";
import { AgenticSection } from "./AgenticSection";
import { FeaturedProjects } from "./FeaturedProjects";
import { ProjectWall } from "./ProjectWall";
import { LanguageSwitcher } from "../shared/LanguageSwitcher";
import { ThemeToggle } from "../shared/ThemeToggle";
import { FileText } from "lucide-react";

interface PortfolioPageProps {
  locale: "en" | "es";
  translations: {
    featuredTitle: string;
    featuredDescription: string;
    otherTitle: string;
    otherDescription: string;
    copyright: string;
  };
}

export function PortfolioPage({ locale, translations }: PortfolioPageProps) {
  return (
    <ThemeProvider>
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href={locale === "en" ? "/en/cv" : "/cv"}
          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium text-sm"
        >
          <FileText className="w-4 h-4" />
          <span>{locale === "en" ? "View Resume" : "Ver CV"}</span>
        </a>
        <div className="flex gap-2">
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </header>

      <main>
        <Hero locale={locale} />

        {/* Agentic engineering: GitHub activity snapshot */}
        <AgenticSection locale={locale} />

        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">{translations.featuredTitle}</h2>
              <p className="text-muted-foreground">
                {translations.featuredDescription}
              </p>
            </div>
            <FeaturedProjects locale={locale} />
          </div>
        </section>

        {/* Other Projects — full width */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-6xl mb-8">
            <h2 className="text-3xl font-bold mb-2">{translations.otherTitle}</h2>
            <p className="text-muted-foreground">{translations.otherDescription}</p>
          </div>
          <ProjectWall locale={locale} />
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 max-w-6xl border-t">
        <p className="text-center text-sm text-muted-foreground">
          {translations.copyright.replace('{year}', new Date().getFullYear().toString())}
        </p>
      </footer>
    </ThemeProvider>
  );
}
