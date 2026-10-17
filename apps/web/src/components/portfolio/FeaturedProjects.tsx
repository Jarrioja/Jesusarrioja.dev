import { ExternalLink } from "lucide-react";
import type { IconType } from "react-icons";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import projectsData from "@/data/projects.json";

type Locale = "en" | "es";

const t = {
  en: { visit: "Visit site", via: "Via" },
  es: { visit: "Ver sitio", via: "Vía" },
};

const featured = projectsData.filter((p) => p.isFeatured).sort((a, b) => a.order - b.order);

type Project = (typeof featured)[number];

// Projects with a role are current product work and get the large layout.
const products = featured.filter((p) => "role" in p);
const sites = featured.filter((p) => !("role" in p));

const gradientOf = (p: Project) =>
  `linear-gradient(135deg, ${p.gradient.from} 0%, ${p.gradient.to} 100%)`;

const buttonClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900";

function LinkButton({ href, icon: Icon, label }: { href: string; icon: IconType; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}

function ProductCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-neutral-200 sm:grid-cols-[42%_1fr] dark:border-neutral-800">
      <div
        className="relative grid min-h-36 place-items-center sm:min-h-56"
        style={{ backgroundImage: gradientOf(project) }}
      >
        <span className="absolute inset-0 bg-black/15" />
        <img
          src={project.logoUrl}
          alt={project.name[locale]}
          className="relative max-h-16 w-3/5 object-contain brightness-0 invert"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-xl font-semibold tracking-tight">{project.name[locale]}</h3>
        {project.role && (
          <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">{project.role[locale]}</p>
        )}
        <ul className="list-disc space-y-1 pl-4 text-sm text-neutral-600 dark:text-neutral-300">
          {project.features.map((f) => (
            <li key={f.en}>{f[locale]}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stores ? (
            <>
              <LinkButton href={project.stores.appStore} icon={SiAppstore} label="App Store" />
              <LinkButton href={project.stores.googlePlay} icon={SiGoogleplay} label="Google Play" />
            </>
          ) : (
            project.url && <LinkButton href={project.url} icon={ExternalLink} label={t[locale].visit} />
          )}
        </div>
      </div>
    </article>
  );
}

function SiteCard({ project, locale }: { project: Project; locale: Locale }) {
  const s = t[locale];
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundImage: gradientOf(project) }}
      className="group relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl text-white"
    >
      <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/30" />
      {/* Darkens the caption area so white text holds contrast on light gradients */}
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      <img
        src={project.logoUrl}
        alt=""
        className="relative mb-6 max-h-12 w-3/5 object-contain brightness-0 invert"
      />
      <span className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2 [text-shadow:0_1px_3px_rgb(0_0_0/0.4)]">
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{project.name[locale]}</span>
          {project.agency && (
            <span className="text-xs opacity-85">
              {s.via} {project.agency.name}
            </span>
          )}
        </span>
        <ExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
    </a>
  );
}

/** Current product work in large cards, WordPress client sites as a compact row below. */
export function FeaturedProjects({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-3">
      {products.map((p) => (
        <ProductCard key={p.slug} project={p} locale={locale} />
      ))}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {sites.map((p) => (
          <SiteCard key={p.slug} project={p} locale={locale} />
        ))}
      </div>
    </div>
  );
}
