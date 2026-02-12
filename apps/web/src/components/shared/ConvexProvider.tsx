import { ConvexProvider as ConvexReactProvider } from "convex/react";
import { convexClient } from "@/lib/convex";
import { ThemeProvider } from "./ThemeProvider";
import type { ReactNode } from "react";

interface ConvexProviderProps {
  children: ReactNode;
}

export function ConvexProvider({ children }: ConvexProviderProps) {
  return (
    <ThemeProvider>
      <ConvexReactProvider client={convexClient}>
        {children}
      </ConvexReactProvider>
    </ThemeProvider>
  );
}
