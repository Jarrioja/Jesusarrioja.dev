import { MapPin } from "lucide-react";
import { SkillsMarquee } from "./SkillsMarquee";
import { SocialLinks } from "./SocialLinks";
import profileData from "@/data/profile.json";
import skillsData from "@/data/skills.json";

interface HeroProps {
  locale: "en" | "es";
}

export function Hero({ locale }: HeroProps) {
  return (
    <>
      <header className="container mx-auto px-4 pt-4 pb-12 md:py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Profile Image */}
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="relative">
              <img
                src={profileData.profileImageUrl}
                alt={profileData.name}
                className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover shadow-lg ring-4 ring-primary/10"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2 space-y-4">
            {/* Name + Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {profileData.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                {profileData.title[locale]}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {profileData.bio[locale]}
            </p>

            {/* Location + Social Links in same row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {profileData.location}
              </div>
              <SocialLinks />
            </div>
          </div>
        </div>
      </header>

      {/* Skills - Full width marquee */}
      {skillsData.length > 0 && (
        <div className="w-full">
          <SkillsMarquee skills={skillsData} speed={30} />
        </div>
      )}
    </>
  );
}
