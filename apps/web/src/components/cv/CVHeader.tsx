import { Mail, MapPin, Linkedin, Globe } from "lucide-react";

interface CVHeaderProps {
  profile: {
    fullName: string;
    title: string;
    summary: string;
    email: string;
    location: string;
    website: string;
    linkedIn: string;
  };
}

export function CVHeader({ profile }: CVHeaderProps) {
  return (
    <header className="mb-8 pb-6 border-b print:mb-3 print:pb-3">
      <h1 className="text-4xl font-bold mb-1 print:text-2xl print:mb-1">{profile.fullName}</h1>
      <p className="text-xl text-muted-foreground mb-3 print:text-sm print:mb-2">{profile.title}</p>

      {/* Contact Info */}
      <div className="flex flex-wrap gap-4 text-sm mb-4 print:gap-3 print:text-xs print:mb-2">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors print:text-foreground"
        >
          <Mail className="w-4 h-4 print:w-3 print:h-3" />
          <span>{profile.email}</span>
        </a>
        <div className="flex items-center gap-1.5 text-muted-foreground print:text-foreground">
          <MapPin className="w-4 h-4 print:w-3 print:h-3" />
          <span>{profile.location}</span>
        </div>
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors print:text-foreground"
        >
          <Globe className="w-4 h-4 print:w-3 print:h-3" />
          <span>{profile.website}</span>
        </a>
        <a
          href={profile.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors print:text-foreground"
        >
          <Linkedin className="w-4 h-4 print:w-3 print:h-3" />
          <span>LinkedIn</span>
        </a>
      </div>

      {/* Summary */}
      <p className="text-base leading-relaxed print:text-xs print:leading-normal">
        {profile.summary}
      </p>
    </header>
  );
}
