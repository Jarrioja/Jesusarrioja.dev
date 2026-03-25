import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  slug: string;
  name: string;
  logoUrl: string;
  features: string[];
  url?: string;
  agency?: {
    name: string;
    logoUrl: string;
    url: string;
  };
  gradient: {
    from: string;
    to: string;
  };
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: number;
}

interface BentoProjectCardProps {
  project: Project;
  locale: "en" | "es";
  size: "large" | "medium" | "compact";
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function BentoProjectCard({ project, locale, size, index }: BentoProjectCardProps) {
  const colSpan =
    size === "large" ? "md:col-span-4" :
    size === "medium" ? "md:col-span-2" :
    "col-span-1";

  const isCompact = size === "compact";
  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      variants={itemVariants}
      className={cn(colSpan, "group")}
    >
      <Wrapper
        {...wrapperProps}
        className={cn(
          "block relative rounded-2xl overflow-hidden transition-all duration-500",
          "hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30",
          isCompact ? "h-44" : "h-64 md:h-72",
        )}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.gradient.from} 0%, ${project.gradient.to} 100%)`,
          }}
        />

        {/* Subtle mesh pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-5 md:p-6 z-10">
          {/* Top: Logo */}
          <div className="flex items-start justify-between">
            <img
              src={project.logoUrl}
              alt={project.name}
              className={cn(
                "object-contain filter brightness-0 invert",
                isCompact ? "max-h-8 max-w-[120px]" : "max-h-12 max-w-[180px]",
              )}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {project.url && (
              <span
                className={cn(
                  "flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm",
                  "opacity-0 group-hover:opacity-100 transition-all duration-300",
                  "group-hover:translate-x-0 group-hover:translate-y-0 translate-x-1 -translate-y-1",
                  isCompact ? "w-7 h-7" : "w-9 h-9",
                )}
              >
                <ArrowUpRight className={cn("text-white", isCompact ? "w-3.5 h-3.5" : "w-4 h-4")} />
              </span>
            )}
          </div>

          {/* Bottom: Features */}
          <div>
            {!isCompact && project.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.features.slice(0, size === "large" ? 4 : 2).map((feature, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs"
                  >
                    {feature}
                  </span>
                ))}
                {project.features.length > (size === "large" ? 4 : 2) && (
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/60 text-xs">
                    +{project.features.length - (size === "large" ? 4 : 2)}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-end justify-between gap-3">
              <h3
                className={cn(
                  "font-bold text-white leading-tight",
                  isCompact ? "text-sm" : "text-lg md:text-xl",
                )}
              >
                {project.name}
              </h3>
              {!isCompact && project.agency && (
                <span className="text-xs text-white/50 whitespace-nowrap">
                  via {project.agency.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}
