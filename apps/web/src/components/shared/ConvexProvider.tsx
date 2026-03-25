import { ThemeProvider } from "./ThemeProvider";
import type { ReactNode } from "react";

interface ConvexProviderProps {
  children: ReactNode;
}

export function ConvexProvider({ children }: ConvexProviderProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
