// Refreshes src/data/activity.json, the fallback the section shows before (or without) the live API.
// Usage: GITHUB_TOKEN=... pnpm activity
import { writeFile } from "node:fs/promises";
import { fetchActivity } from "../src/lib/activity.ts";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("Set GITHUB_TOKEN to refresh the activity snapshot");

const activity = await fetchActivity(token);
await writeFile(new URL("../src/data/activity.json", import.meta.url), JSON.stringify(activity) + "\n");
console.log(`activity.json: ${activity.total} contributions`);
