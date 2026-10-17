import type { IconType } from "react-icons";
import {
  SiTypescript, SiNodedotjs, SiReact, SiExpo, SiAstro,
  SiTailwindcss, SiShadcnui, SiHono, SiBun, SiDrizzle, SiZod,
  SiPostgresql, SiSupabase, SiRedis, SiDocker, SiKubernetes, SiTerraform,
  SiCloudflare, SiRailway, SiVercel, SiGithubactions, SiTurborepo,
  SiPnpm, SiVitest, SiSentry, SiPosthog, SiClaude,
  SiWordpress, SiWoocommerce,
} from "react-icons/si";
import { Cloud, Server, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon: string;
  category?: string;
  order: number;
  tooltip?: string;
}

const brandIcons: Record<string, IconType> = {
  typescript: SiTypescript,
  nodejs: SiNodedotjs,
  react: SiReact,
  expo: SiExpo,
  astro: SiAstro,
  tailwind: SiTailwindcss,
  shadcn: SiShadcnui,
  hono: SiHono,
  bun: SiBun,
  drizzle: SiDrizzle,
  zod: SiZod,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  redis: SiRedis,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  terraform: SiTerraform,
  cloudflare: SiCloudflare,
  railway: SiRailway,
  vercel: SiVercel,
  "github-actions": SiGithubactions,
  turborepo: SiTurborepo,
  pnpm: SiPnpm,
  vitest: SiVitest,
  sentry: SiSentry,
  posthog: SiPosthog,
  claude: SiClaude,
  wordpress: SiWordpress,
  woocommerce: SiWoocommerce,
};

const lucideFallbacks: Record<string, LucideIcon> = {
  aws: Cloud,
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
