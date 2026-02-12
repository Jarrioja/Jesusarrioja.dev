import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { MapPin, FileText } from "lucide-react";
import { SkillsMarquee } from "./SkillsMarquee";
import { SocialLinks } from "./SocialLinks";

interface HeroProps {
  locale: "en" | "es";
}

export function Hero({ locale }: HeroProps) {
  const profile = useQuery(api.profile.getProfile, { locale });
  const skills = useQuery(api.profile.getSkills, { locale });

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <header className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Profile Image */}
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="relative">
              <img
                src={profile.profileImageUrl}
                alt={profile.name}
                className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover shadow-lg ring-4 ring-primary/10"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {profile.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                {profile.title}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
            </div>

            {/* Social Links */}
            <SocialLinks />

            {/* CV Link */}
            <div>
              <a
                href={locale === "en" ? "/en/cv" : "/cv"}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <FileText className="w-5 h-5" />
                <span>{locale === "en" ? "View Resume" : "Ver CV"}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Skills - Full width marquee */}
      {skills && skills.length > 0 && (
        <div className="w-full">
          <SkillsMarquee skills={skills} speed={30} />
        </div>
      )}
    </>
  );
}
