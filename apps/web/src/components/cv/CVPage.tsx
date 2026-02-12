"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { ConvexProvider } from "../shared/ConvexProvider";
import { CVHeader } from "./CVHeader";
import { CVExperience } from "./CVExperience";
import { CVSkills } from "./CVSkills";
import { CVCertifications } from "./CVCertifications";
import { CVEducation } from "./CVEducation";
import { CVLanguages } from "./CVLanguages";
import { LanguageSwitcher } from "../shared/LanguageSwitcher";
import { ThemeToggle } from "../shared/ThemeToggle";
import { Printer, ArrowLeft } from "lucide-react";

interface CVPageProps {
  locale: "en" | "es";
}

function CVContent({ locale }: CVPageProps) {
  const cvData = useQuery(api.cv.getCompleteCV, { locale });

  if (!cvData || !cvData.profile) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <p className="text-center text-muted-foreground">
          {locale === "en" ? "Loading CV..." : "Cargando CV..."}
        </p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Header Actions - Hidden when printing */}
      <div className="container mx-auto px-4 py-4 max-w-4xl flex justify-between items-center print:hidden">
        <a
          href={locale === "en" ? "/en" : "/"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "en" ? "Back to Portfolio" : "Volver al Portfolio"}</span>
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === "en" ? "Print CV" : "Imprimir CV"}</span>
          </button>
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} cvPage />
        </div>
      </div>

      {/* CV Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl print:py-0">
        <CVHeader profile={cvData.profile} />
        <CVExperience experiences={cvData.experiences} locale={locale} />
        <CVSkills skills={cvData.skills} locale={locale} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-6">
          <CVCertifications certifications={cvData.certifications} locale={locale} />
          <CVEducation education={cvData.education} locale={locale} />
        </div>

        <CVLanguages languages={cvData.languages} locale={locale} />
      </main>
    </>
  );
}

export function CVPage({ locale }: CVPageProps) {
  return (
    <ConvexProvider>
      <CVContent locale={locale} />
    </ConvexProvider>
  );
}
