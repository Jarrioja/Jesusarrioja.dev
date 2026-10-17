// lucide-react 1.x dropped brand icons, so brands come from react-icons.
import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedin, FaMedium, FaXTwitter } from "react-icons/fa6";
import socialLinksData from "@/data/socialLinks.json";

const platforms: Record<string, { icon: IconType; label: string }> = {
  twitter: { icon: FaXTwitter, label: "X (Twitter)" },
  linkedin: { icon: FaLinkedin, label: "LinkedIn" },
  instagram: { icon: FaInstagram, label: "Instagram" },
  medium: { icon: FaMedium, label: "Medium" },
};

export function SocialLinks() {
  if (socialLinksData.length === 0) return null;

  return (
    <div className="flex gap-2">
      {socialLinksData.map((link) => {
        const { icon: IconComponent, label } = platforms[link.platform] ?? { icon: FaMedium, label: link.platform };
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label={label}
          >
            <IconComponent className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
