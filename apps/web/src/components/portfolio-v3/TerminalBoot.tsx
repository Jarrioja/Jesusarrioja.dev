import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalBootProps {
  locale: "en" | "es";
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: "BIOS v3.2.1 — POST check", delay: 0 },
  { text: "Memory: 16384 MB OK", delay: 150 },
  { text: "Detecting drives... SSD 512GB [OK]", delay: 300 },
  { text: "", delay: 400 },
  { text: "Loading kernel........................ done", delay: 500 },
  { text: "Mounting /dev/portfolio", delay: 800 },
  { text: "Starting network interfaces.......... [OK]", delay: 1000 },
  { text: "Loading convex-backend............... [OK]", delay: 1200 },
  { text: "Initializing i18n subsystem.......... [OK]", delay: 1400 },
  { text: "Starting react-renderer.............. [OK]", delay: 1550 },
  { text: "", delay: 1650 },
  { text: "    ╦╔═╗╔═╗╦ ╦╔═╗  ╔═╗╦═╗╦═╗╦╔═╗ ╦╔═╗", delay: 1750 },
  { text: "    ║║╣ ╚═╗║ ║╚═╗  ╠═╣╠╦╝╠╦╝║║ ║ ║╠═╣", delay: 1800 },
  { text: "   ╚╝╚═╝╚═╝╚═╝╚═╝  ╩ ╩╩╚═╩╚═╩╚═╝╚╝╩ ╩", delay: 1850 },
  { text: "", delay: 1950 },
  { text: "System ready. Welcome.", delay: 2050 },
];

export function TerminalBoot({ locale, onComplete }: TerminalBootProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    const finishTimer = setTimeout(onComplete, 2800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="text-xs leading-relaxed"
            style={{
              color: line.text.includes("[OK]")
                ? "#28c840"
                : line.text.includes("╔") || line.text.includes("╦") ||
                  line.text.includes("╠") || line.text.includes("╚") ||
                  line.text.includes("╩") || line.text.includes("╗") ||
                  line.text.includes("╣") || line.text.includes("╝") ||
                  line.text.includes("═")
                ? "#28c840"
                : line.text.includes("Welcome")
                ? "#febc2e"
                : "#5a5a5a",
              fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
              whiteSpace: "pre",
            }}
          >
            {line.text || "\u00A0"}
          </div>
        ))}

        {/* Blinking cursor at the end */}
        {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
          <span
            className="terminal-cursor inline-block w-2 h-3.5"
            style={{ background: "#28c840" }}
          />
        )}
      </div>
    </motion.div>
  );
}
