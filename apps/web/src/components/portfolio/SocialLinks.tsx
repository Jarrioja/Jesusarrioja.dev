import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { Twitter, Linkedin, Instagram, BookOpen } from "lucide-react";

const iconMap: Record<string, any> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  medium: BookOpen,
};

export function SocialLinks() {
  const socialLinks = useQuery(api.profile.getSocialLinks);

  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className="flex gap-3">
      {socialLinks.map((link) => {
        const IconComponent = iconMap[link.platform] || BookOpen;
        return (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label={link.platform}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}
