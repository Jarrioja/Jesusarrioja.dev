"use client";

import { ThemeProvider } from "../shared/ThemeProvider";
import { CVHeader } from "./CVHeader";
import { CVExperience } from "./CVExperience";
import { CVSkills } from "./CVSkills";
import { CVCertifications } from "./CVCertifications";
import { CVEducation } from "./CVEducation";
import { CVLanguages } from "./CVLanguages";
import { LanguageSwitcher } from "../shared/LanguageSwitcher";
import { ThemeToggle } from "../shared/ThemeToggle";
import { Printer, ArrowLeft } from "lucide-react";
import cvJson from "@/data/cv.json";

interface CVPageProps {
  locale: "en" | "es";
}

function CVContent({ locale }: CVPageProps) {
  const profile = {
    ...cvJson.profile,
    title: cvJson.profile.title[locale],
    summary: cvJson.profile.summary[locale],
  };

  const experiences = cvJson.experiences.map((exp) => ({
    ...exp,
    title: exp.title[locale],
    description: exp.description[locale],
    responsibilities: exp.responsibilities.map((r) => r[locale]),
    projects: exp.projects?.map((p) => ({
      ...p,
      name: p.name[locale],
      description: p.description[locale],
    })),
  }));

  const skills = cvJson.skills.map((s) => ({
    ...s,
    category: s.category[locale],
  }));

  const certifications = cvJson.certifications.map((c) => ({
    ...c,
    name: c.name[locale],
  }));

  const education = cvJson.education.map((e) => ({
    ...e,
    degree: e.degree[locale],
  }));

  const languages = cvJson.languages.map((l) => ({
    ...l,
    proficiency: l.proficiency[locale],
  }));

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
            className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">{locale === "en" ? "Print CV" : "Imprimir CV"}</span>
          </button>
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} cvPage />
        </div>
      </div>

      {/* CV Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl print:py-0 print:px-0 print:text-sm">
        <CVHeader profile={profile} />
        <CVExperience experiences={experiences} locale={locale} />
        <CVSkills skills={skills} locale={locale} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-6">
          <CVCertifications certifications={certifications} locale={locale} />
          <div>
            <CVEducation education={education} locale={locale} />
            <CVLanguages languages={languages} locale={locale} />
          </div>
        </div>
      </main>
    </>
  );
}

export function CVPage({ locale }: CVPageProps) {
  return (
    <ThemeProvider>
      <CVContent locale={locale} />
    </ThemeProvider>
  );
}
