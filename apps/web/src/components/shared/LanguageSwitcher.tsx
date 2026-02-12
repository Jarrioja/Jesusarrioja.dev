import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLocale: "en" | "es";
  cvPage?: boolean;
}

export function LanguageSwitcher({ currentLocale, cvPage = false }: LanguageSwitcherProps) {
  const otherLocale = currentLocale === "en" ? "es" : "en";

  let otherLocalePath: string;
  if (cvPage) {
    // CV page routing
    otherLocalePath = currentLocale === "en" ? "/cv" : "/en/cv";
  } else {
    // Portfolio page routing
    otherLocalePath = currentLocale === "en" ? "/" : "/en";
  }

  const otherLocaleLabel = currentLocale === "en" ? "Español" : "English";

  return (
    <a
      href={otherLocalePath}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
    >
      <Globe className="w-4 h-4" />
      <span>{otherLocaleLabel}</span>
    </a>
  );
}
