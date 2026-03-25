import type { IconType } from "react-icons";
import {
  SiHtml5, SiCss, SiSass, SiJavascript,
  SiWordpress, SiEthereum, SiMailchimp,
  SiCpanel, SiDigitalocean, SiDocker,
  SiGoogle, SiSlack, SiLinux,
  SiExpress, SiKubernetes, SiArgo,
  SiRedis, SiNginx, SiTerraform, SiHelm, SiVercel,
  SiBun, SiTrpc, SiStripe, SiOpenai,
  SiVitest, SiJest, SiGit, SiGithub, SiClaude,
} from "react-icons/si";
import { Cloud, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon: string;
  category?: string;
  order: number;
  tooltip?: string;
}

const brandIcons: Record<string, IconType> = {
  html5: SiHtml5,
  css3: SiCss,
  sass: SiSass,
  javascript: SiJavascript,
  wordpress: SiWordpress,
  ethereum: SiEthereum,
  mailchimp: SiMailchimp,
  cpanel: SiCpanel,
  "digital-ocean": SiDigitalocean,
  docker: SiDocker,
  google: SiGoogle,
  slack: SiSlack,
  linux: SiLinux,
  express: SiExpress,
  kubernetes: SiKubernetes,
  argocd: SiArgo,
  redis: SiRedis,
  nginx: SiNginx,
  terraform: SiTerraform,
  helm: SiHelm,
  vercel: SiVercel,
  bun: SiBun,
  trpc: SiTrpc,
  stripe: SiStripe,
  openai: SiOpenai,
  vitest: SiVitest,
  jest: SiJest,
  git: SiGit,
  github: SiGithub,
  claude: SiClaude,
};

const lucideFallbacks: Record<string, any> = {
  aws: Cloud,
  windows: Server,
  microsoft: Server,
};

export function SkillBadge({ skill }: { skill: Skill }) {
  const BrandIcon = brandIcons[skill.icon];
  const FallbackIcon = lucideFallbacks[skill.icon] || Server;

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
      {BrandIcon
        ? <BrandIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        : <FallbackIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      }
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );
}
