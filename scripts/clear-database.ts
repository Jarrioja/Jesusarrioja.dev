/**
 * Clear Database Script
 *
 * This script clears all data from Convex database
 * Run with: pnpm tsx scripts/clear-database.ts
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../packages/convex/convex/_generated/api";

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("❌ CONVEX_URL not found");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

const tables = [
  "profile",
  "socialLinks",
  "skills",
  "projects",
  "cvProfile",
  "experiences",
  "cvSkills",
  "certifications",
  "education",
  "languages",
];

async function clearDatabase() {
  console.log("🗑️  Clearing database...\n");

  for (const table of tables) {
    try {
      const result = await client.mutation(api.mutations.clearTable, {
        tableName: table,
      });
      console.log(`  ✓ Cleared ${table}: ${result.deleted} documents`);
    } catch (error) {
      console.error(`  ✗ Error clearing ${table}:`, error);
    }
  }

  console.log("\n✅ Database cleared successfully!");
}

clearDatabase();
