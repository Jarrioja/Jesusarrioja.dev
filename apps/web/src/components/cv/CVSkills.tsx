import type { IconType } from "react-icons";
import {
  SiTypescript, SiNodedotjs, SiHono, SiExpress, SiBun, SiTrpc, SiDrizzle, SiPhp,
  SiSupabase, SiPostgresql, SiMongodb, SiMysql, SiRedis,
  SiReact, SiAstro, SiJavascript,
  SiDocker, SiKubernetes, SiArgo, SiNginx, SiTerraform, SiHelm, SiRailway, SiGooglecloud, SiCloudflare, SiVercel,
  SiTurborepo, SiGithubactions, SiGit, SiGithub, SiGraphql,
  SiStripe, SiOpenai, SiVitest, SiJest, SiClaude,
  SiWordpress, SiWoocommerce, SiElementor,
} from "react-icons/si";
import { Code2, Cloud } from "lucide-react";

const brandIcons: Record<string, IconType> = {
  "TypeScript": SiTypescript,
  "Hono": SiHono,
  "Express": SiExpress,
  "Bun": SiBun,
  "tRPC": SiTrpc,
  "Drizzle ORM": SiDrizzle,
  "Node.js": SiNodedotjs,
  "PHP": SiPhp,
  "Supabase": SiSupabase,
  "PostgreSQL": SiPostgresql,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "Redis": SiRedis,
  "React.js": SiReact,
  "Astro": SiAstro,
  "JavaScript": SiJavascript,
  "Docker": SiDocker,
  "Kubernetes": SiKubernetes,
  "ArgoCD": SiArgo,
  "Nginx": SiNginx,
  "Terraform": SiTerraform,
  "Helm": SiHelm,
  "Vercel": SiVercel,
  "Railway": SiRailway,
  "AWS": Cloud as unknown as IconType,
  "GCP": SiGooglecloud,
  "Cloudflare": SiCloudflare,
  "Turborepo": SiTurborepo,
  "GitHub Actions": SiGithubactions,
  "Git": SiGit,
  "GitHub": SiGithub,
  "Stripe": SiStripe,
  "OpenAI": SiOpenai,
  "Vitest": SiVitest,
  "Jest": SiJest,
  "Claude": SiClaude,
  "WordPress": SiWordpress,
  "WP GraphQL": SiGraphql,
  "WooCommerce": SiWoocommerce,
  "Elementor": SiElementor,
};

interface SkillCategory {
  category: string;
  skills: string[];
}

interface CVSkillsProps {
  skills: SkillCategory[];
  locale: "en" | "es";
}

export function CVSkills({ skills, locale }: CVSkillsProps) {
  return (
    <section className="mb-8 print:mb-6">
      <h2 className="text-2xl font-bold mb-4 print:text-xl print:mb-3">
        {locale === "en" ? "Technical Skills" : "Habilidades Técnicas"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-2 print:gap-2">
        {skills.map((skillGroup, index) => (
          <div key={index} className="break-inside-avoid">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 print:mb-1">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-1.5 print:gap-1">
              {skillGroup.skills.map((skill, idx) => {
                const Icon = brandIcons[skill];
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs border border-border rounded-md print:border-gray-300"
                  >
                    {Icon
                      ? <Icon className="w-3 h-3 shrink-0" />
                      : <Code2 className="w-3 h-3 shrink-0 text-muted-foreground" />
                    }
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
