import { motion } from "framer-motion";
import { MapPin, Mail, ArrowDownRight } from "lucide-react";
import { SocialLinks } from "../portfolio/SocialLinks";
import profileData from "@/data/profile.json";

interface BentoHeroProps {
  locale: "en" | "es";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function BentoHero({ locale }: BentoHeroProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8"
    >
      {/* Main intro card — large, spans 4 cols */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-4 relative rounded-3xl overflow-hidden bg-foreground text-background p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
      >
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="200" cy="0" r="160" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="0" r="120" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="0" r="80" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div>
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium tracking-[0.2em] uppercase opacity-50 mb-6"
          >
            {locale === "en" ? "Portfolio" : "Portafolio"} — 2025
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {profileData.name}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl opacity-70 font-light max-w-lg"
          >
            {profileData.title[locale]}
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex items-end justify-between mt-8">
          <div className="flex flex-wrap gap-4 text-sm opacity-50">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {profileData.location}
            </span>
            {profileData.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {profileData.email}
              </span>
            )}
          </div>
          <ArrowDownRight className="w-8 h-8 opacity-30" />
        </motion.div>
      </motion.div>

      {/* Profile image card — 2 cols */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 rounded-3xl overflow-hidden relative group min-h-[320px]"
      >
        <img
          src={profileData.profileImageUrl}
          alt={profileData.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {locale === "en" ? "Available for projects" : "Disponible para proyectos"}
          </div>
        </div>
      </motion.div>

      {/* Bio card */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-3 rounded-3xl bg-secondary/40 border border-border/50 p-8 flex flex-col justify-center"
      >
        <p className="text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
          {locale === "en" ? "About" : "Acerca de"}
        </p>
        <p className="text-base md:text-lg leading-relaxed text-foreground/80">
          {profileData.bio[locale]}
        </p>
      </motion.div>

      {/* Social links + CTA card */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-3 rounded-3xl bg-secondary/40 border border-border/50 p-8 flex flex-col justify-between"
      >
        <div>
          <p className="text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground mb-5">
            {locale === "en" ? "Connect" : "Conectar"}
          </p>
          <SocialLinks />
        </div>
        <a
          href={locale === "en" ? "/en/cv" : "/cv"}
          className="mt-6 group inline-flex items-center gap-3 text-sm font-medium"
        >
          <span className="px-5 py-2.5 rounded-full bg-foreground text-background transition-all group-hover:px-7">
            {locale === "en" ? "View full resume" : "Ver CV completo"}
          </span>
          <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
            <ArrowDownRight className="w-4 h-4 rotate-[-90deg]" />
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}
