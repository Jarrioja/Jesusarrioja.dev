import { useQuery } from "convex/react";
import { api } from "../../../../../packages/convex/convex/_generated/api";
import { motion } from "framer-motion";
import { useTypewriter } from "./useTypewriter";

interface TerminalHeroProps {
  locale: "en" | "es";
}

const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

export function TerminalHero({ locale }: TerminalHeroProps) {
  const profile = useQuery(api.profile.getProfile, { locale });
  const socialLinks = useQuery(api.profile.getSocialLinks);

  const { displayed: catOutput, isDone: catDone } = useTypewriter({
    text: "cat ./about.md",
    speed: 40,
    delay: 200,
    enabled: !!profile,
  });

  if (!profile) {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Prompt />
          <span className="terminal-cursor inline-block w-2 h-4" style={{ background: "#28c840" }} />
        </div>
      </div>
    );
  }

  const platformMap: Record<string, string> = {
    twitter: "twitter.com",
    linkedin: "linkedin.com",
    instagram: "instagram.com",
    medium: "medium.com",
  };

  return (
    <section className="mb-16">
      {/* Command: whoami */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <Prompt />
          <span style={{ color: "#e0e0e0" }}>whoami</span>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          className="pl-0 mt-2"
        >
          {/* ASCII portrait frame */}
          <div style={{ color: "#28c840" }} className="text-xs mb-4 whitespace-pre">
{`  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │   ${profile.name.padEnd(45)}│
  │   ${profile.title.padEnd(45)}│
  │                                                 │
  │   📍 ${(profile.location || "").padEnd(43)}│
  │   📧 ${(profile.email || "").padEnd(43)}│
  │                                                 │
  └─────────────────────────────────────────────────┘`}
          </div>
        </motion.div>
      </motion.div>

      {/* Command: cat about.md */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <Prompt />
          <span style={{ color: "#e0e0e0" }}>{catOutput}</span>
          {!catDone && (
            <span
              className="terminal-cursor inline-block w-2 h-4"
              style={{ background: "#28c840" }}
            />
          )}
        </div>
        {catDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-3 pl-0"
          >
            <p
              className="text-sm leading-relaxed max-w-2xl"
              style={{ color: "#8a8a8a" }}
            >
              {profile.bio}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Command: ls -la ./links/ */}
      {socialLinks && socialLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Prompt />
            <span style={{ color: "#e0e0e0" }}>ls -la ./links/</span>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            className="mt-2"
          >
            {/* Table header */}
            <div className="text-xs mb-1" style={{ color: "#4a4a4a" }}>
              total {socialLinks.length}
            </div>
            {socialLinks.map((link, i) => (
              <motion.a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block text-xs py-0.5 transition-colors group"
                style={{ color: "#6a6a6a" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#28c840";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6a6a6a";
                }}
              >
                <span style={{ color: "#3a3a3a" }}>-rw-r--r-- </span>
                <span style={{ color: "#3a3a3a" }}>jarrioja </span>
                <span>{link.platform.padEnd(12)}</span>
                <span className="group-hover:underline" style={{ color: "inherit" }}>
                  {" → "}
                  {platformMap[link.platform] || link.url}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function Prompt() {
  return (
    <span className="text-xs flex-shrink-0">
      <span style={{ color: "#28c840" }}>jarrioja</span>
      <span style={{ color: "#4a4a4a" }}>@</span>
      <span style={{ color: "#febc2e" }}>dev</span>
      <span style={{ color: "#4a4a4a" }}>:</span>
      <span style={{ color: "#5c9eff" }}>~</span>
      <span style={{ color: "#4a4a4a" }}>$ </span>
    </span>
  );
}
