import { Award } from "lucide-react";

interface Certification {
  name: string;
  organization: string;
  date?: string;
  url?: string;
}

interface CVCertificationsProps {
  certifications: Certification[];
  locale: "en" | "es";
}

export function CVCertifications({ certifications, locale }: CVCertificationsProps) {
  return (
    <section className="mb-8 print:mb-6">
      <h2 className="text-2xl font-bold mb-4 print:text-xl print:mb-3">
        {locale === "en" ? "Certifications" : "Certificaciones"}
      </h2>

      <div className="space-y-3 print:space-y-2">
        {certifications.map((cert, index) => (
          <div key={index} className="flex gap-3 break-inside-avoid print:gap-2">
            <Award className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 print:w-4 print:h-4" />
            <div>
              <h3 className="text-base font-semibold print:text-sm">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors print:text-foreground"
                  >
                    {cert.name}
                  </a>
                ) : (
                  cert.name
                )}
              </h3>
              <p className="text-sm text-muted-foreground print:text-xs print:text-foreground">
                {cert.organization}
                {cert.date && <span> • {cert.date}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
