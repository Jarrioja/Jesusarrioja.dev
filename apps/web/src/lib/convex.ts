import { ConvexReactClient } from "convex/react";

// Get Convex URL from environment
// In Astro, public env vars must be prefixed with PUBLIC_
const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error(
    "PUBLIC_CONVEX_URL is not set. Add it to your .env file or environment variables."
  );
}

export const convexClient = new ConvexReactClient(CONVEX_URL);
