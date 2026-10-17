import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { IconType } from "react-icons";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { cn } from "@/lib/utils";

interface Project {
  slug: string;
  name: string;
  logoUrl: string;
  features: string[];
  url?: string;
  /** App store listings; when present they replace the "View Project" button. */
  stores?: {
    appStore: string;
    googlePlay: string;
  };
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

interface ProjectCardProps {
  project: Project;
  locale: "en" | "es";
}

const footerButton = cn(
  "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
  "bg-white/20 hover:bg-white/30 backdrop-blur-sm",
  "text-white text-sm font-medium transition-colors"
);

function FooterLink({ href, icon: Icon, label }: { href: string; icon: IconType; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={footerButton}>
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div
        className={cn(
          "relative h-full rounded-2xl overflow-hidden",
          "bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow",
          "border border-border/50"
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.gradient.from} 0%, ${project.gradient.to} 100%)`,
        }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />

        {/* Card Content */}
        <div className="relative p-6 flex flex-col h-full min-h-[320px] z-10">
          {/* Logo */}
          <div className="mb-6 flex items-center justify-center h-20">
            <img
              src={project.logoUrl}
              alt={project.name}
              className="max-h-16 max-w-[200px] object-contain filter brightness-0 invert"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-6 flex-grow">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="text-white/90 text-sm flex items-start gap-2"
              >
                <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            {project.stores ? (
              <>
                <FooterLink href={project.stores.appStore} icon={SiAppstore} label="App Store" />
                <FooterLink href={project.stores.googlePlay} icon={SiGoogleplay} label="Google Play" />
              </>
            ) : (
              project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={footerButton}>
                  <span>{locale === "en" ? "View Project" : "Ver Proyecto"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
