import { ProjectCard } from "./ProjectCard";
import projectsData from "@/data/projects.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface ProjectCarouselProps {
  locale: "en" | "es";
}

export function ProjectCarousel({ locale }: ProjectCarouselProps) {
  const projects = projectsData
    .filter((p) => !p.isFeatured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({
      ...p,
      name: p.name[locale],
      features: p.features.map((f) => f[locale]),
    }));

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative group">
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-4 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-4 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Prev button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-16 md:px-24"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex-shrink-0 w-[280px] md:w-[300px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProjectCard project={project} locale={locale} />
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
