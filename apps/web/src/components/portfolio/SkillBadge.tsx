import { Code2, Database, Cloud, Server, Package, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  _id: string;
  name: string;
  icon: string;
  category?: string;
  order: number;
  tooltip?: string;
}

interface SkillBadgeProps {
  skill: Skill;
}

// Map icon names to Lucide icons
const iconMap: Record<string, any> = {
  html5: Code2,
  css3: Code2,
  sass: Code2,
  javascript: Code2,
  wordpress: Package,
  ethereum: Database,
  mailchimp: Server,
  windows: Server,
  aws: Cloud,
  cpanel: Server,
  "digital-ocean": Cloud,
  docker: Package,
  google: Cloud,
  microsoft: Cloud,
  slack: Wrench,
  linux: Server,
};

export function SkillBadge({ skill }: SkillBadgeProps) {
  const IconComponent = iconMap[skill.icon] || Code2;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-secondary/50 hover:bg-secondary transition-colors",
        "border border-border",
        "group cursor-default"
      )}
      title={skill.tooltip || skill.name}
    >
      <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );
}
