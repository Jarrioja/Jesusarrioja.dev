import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";

type Locale = "en" | "es";

const TYPE_LABELS = {
  product: { en: "Products", es: "Productos" },
  ecommerce: { en: "E-commerce", es: "E-commerce" },
  community: { en: "Communities & LMS", es: "Comunidades y LMS" },
  website: { en: "Websites", es: "Sitios web" },
  infra: { en: "Infra & rescue", es: "Infra y rescate" },
} as const;

type ProjectType = keyof typeof TYPE_LABELS;

const t = {
  en: { all: "All", via: "via", visit: "Visit site", prev: "Previous", next: "Next", close: "Close" },
  es: { all: "Todos", via: "vía", visit: "Ver sitio", prev: "Anterior", next: "Siguiente", close: "Cerrar" },
};

const projects = projectsData
  .filter((p) => !p.isFeatured && "type" in p)
  .sort((a, b) => a.order - b.order);

type Project = (typeof projects)[number];

const gradientOf = (p: Project) =>
  `linear-gradient(135deg, ${p.gradient.from} 0%, ${p.gradient.to} 100%)`;

function Logo({ project, className }: { project: Project; className?: string }) {
  return (
    <img
      src={project.logoUrl}
      alt=""
      loading="lazy"
      className={cn("object-contain brightness-0 invert", className)}
    />
  );
}

/** Every project is a tile in its own gradient; the type filter hides the rest. */
export function ProjectWall({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<ProjectType | null>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const s = t[locale];

  const visible = filter ? projects.filter((p) => p.type === filter) : projects;

  const filters: [ProjectType | null, string, number][] = [
    [null, s.all, projects.length],
    ...(Object.keys(TYPE_LABELS) as ProjectType[]).map(
      (type): [ProjectType, string, number] => [
        type,
        TYPE_LABELS[type][locale],
        projects.filter((p) => p.type === type).length,
      ],
    ),
  ];

  const goTo = (i: number, behavior: ScrollBehavior = "smooth") => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(visible.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior });
  };

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
    // Called after showModal: the track only has a width once the dialog is open.
    goTo(i, "instant");
  };

  // Swipe is native scroll-snap; read the current slide back from the scroll position.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-sm" role="group">
        {filters.map(([type, label, count]) => (
          <button
            key={label}
            type="button"
            aria-pressed={filter === type}
            onClick={() => setFilter(type)}
            className={cn(
              "border-b-2 py-0.5 transition-colors",
              filter === type
                ? "border-current text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
            <span className="ml-1 text-xs opacity-60">{count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9">
        {visible.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label={p.name[locale]}
            aria-haspopup="dialog"
            onClick={() => open(i)}
            style={{ backgroundImage: gradientOf(p) }}
            className="relative aspect-square overflow-hidden rounded-md transition-transform duration-200 hover:scale-[0.96] motion-reduce:transition-none"
          >
            <span className="absolute inset-0 bg-black/15" />
            <Logo project={p} className="absolute inset-[18%] h-[64%] w-[64%]" />
          </button>
        ))}
      </div>

      {/* Bottom sheet on mobile, centered modal from sm up. */}
      <dialog
        ref={dialog}
        aria-label={visible[index]?.name[locale]}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(index + 1);
          if (e.key === "ArrowLeft") goTo(index - 1);
        }}
        className="m-0 mt-auto w-full max-w-none overflow-hidden rounded-t-2xl border border-neutral-200 bg-white p-0 text-neutral-900 backdrop:bg-black/60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 backdrop:backdrop-blur-[2px] sm:m-auto sm:max-w-md sm:rounded-2xl"
      >
        <div
          ref={track}
          className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none]"
        >
          {visible.map((p) => (
            <article key={p.slug} className="w-full shrink-0 snap-center">
              <div className="relative h-36" style={{ backgroundImage: gradientOf(p) }}>
                <span className="absolute inset-0 bg-black/15" />
                <Logo project={p} className="absolute inset-x-[25%] inset-y-[18%] h-[64%] w-[50%]" />
              </div>
              <div className="px-5 pt-4 pb-2">
                <h3 className="text-lg font-semibold tracking-tight">{p.name[locale]}</h3>
                <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {[
                    TYPE_LABELS[p.type as ProjectType][locale],
                    p.agency && `${s.via} ${p.agency.name}`,
                    ...(p.stack ?? []),
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <ul className="list-disc space-y-0.5 pl-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {p.features.map((f) => (
                    <li key={f.en}>{f[locale]}</li>
                  ))}
                </ul>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    {s.visit}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between px-3 pt-1 pb-3">
          <button
            type="button"
            aria-label={s.prev}
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
            className="rounded-full p-2 hover:bg-neutral-100 disabled:opacity-30 dark:hover:bg-neutral-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
            {index + 1} / {visible.length}
          </span>
          <button
            type="button"
            aria-label={s.next}
            disabled={index === visible.length - 1}
            onClick={() => goTo(index + 1)}
            className="rounded-full p-2 hover:bg-neutral-100 disabled:opacity-30 dark:hover:bg-neutral-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          aria-label={s.close}
          onClick={() => dialog.current?.close()}
          className="absolute top-3 right-3 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50"
        >
          <X className="h-4 w-4" />
        </button>
      </dialog>
    </div>
  );
}
