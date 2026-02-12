import { Languages as LanguagesIcon } from "lucide-react";

interface Language {
  language: string;
  proficiency: string;
}

interface CVLanguagesProps {
  languages: Language[];
  locale: "en" | "es";
}

export function CVLanguages({ languages, locale }: CVLanguagesProps) {
  return (
    <section className="mb-8 print:mb-6">
      <h2 className="text-2xl font-bold mb-4 print:text-xl print:mb-3">
        {locale === "en" ? "Languages" : "Idiomas"}
      </h2>

      <div className="space-y-3 print:space-y-2">
        {languages.map((lang, index) => (
          <div key={index} className="flex gap-3 break-inside-avoid print:gap-2">
            <LanguagesIcon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 print:w-4 print:h-4" />
            <div>
              <h3 className="text-base font-semibold print:text-sm">{lang.language}</h3>
              <p className="text-sm text-muted-foreground print:text-xs print:text-foreground">
                {lang.proficiency}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
