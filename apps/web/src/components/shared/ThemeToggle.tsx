"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-secondary/50" />
    );
  }

  const isDark = resolvedTheme === "dark";
  // Shared by the portfolio and the CV, so the label follows the page language.
  const isSpanish = document.documentElement.lang === "es";
  const label = isDark
    ? isSpanish ? "Cambiar a tema claro" : "Switch to light theme"
    : isSpanish ? "Cambiar a tema oscuro" : "Switch to dark theme";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex items-center justify-center",
        "w-9 h-9 rounded-lg",
        "bg-secondary/50 hover:bg-secondary transition-colors",
        "border border-border"
      )}
      aria-label={label}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
}
