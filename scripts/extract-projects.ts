/**
 * Extract Projects from Legacy HTML
 *
 * This script parses the legacy HTML file and extracts all project information
 * Run with: pnpm tsx scripts/extract-projects.ts
 */

import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

const htmlPath = path.join(__dirname, "../legacy/index.html");
const html = fs.readFileSync(htmlPath, "utf-8");
const $ = cheerio.load(html);

interface Project {
  name: string;
  logoFile: string;
  features: string[];
  url?: string;
  agency?: string;
}

const projects: Project[] = [];

// Find all project cards
$(".job__cards").each((index, element) => {
  const card = $(element);

  // Extract logo
  const logoImg = card.find(".job__cards-logo img, .job__cards-logo--a img").first();
  const logoSrc = logoImg.attr("src") || "";
  const logoFile = logoSrc.replace("img/", "");

  // Extract name from alt or previous heading
  let name = logoImg.attr("alt") || "";
  if (!name) {
    // Try to find name from image filename
    name = logoFile.replace(/\.(svg|png|jpg)$/, "").replace(/[-_]/g, " ");
  }

  // Extract features
  const features: string[] = [];
  card.find(".job__text-card li").each((_, li) => {
    const feature = $(li).text().trim();
    if (feature) {
      features.push(feature);
    }
  });

  // Extract URL
  const url = card.find("a.btn, .job__cta a").first().attr("href");

  // Extract agency
  const agencyLink = card.find("a.agency-logo, a[href*='mood'], a[href*='growth']").first();
  let agency = undefined;
  if (agencyLink.length > 0) {
    const href = agencyLink.attr("href") || "";
    if (href.includes("mood")) {
      agency = "mood";
    } else if (href.includes("growth") || href.includes("roadtrip")) {
      agency = "tgk";
    }
  }

  if (name || logoFile) {
    projects.push({
      name: name || logoFile,
      logoFile,
      features,
      url,
      agency,
    });
  }
});

console.log(`Found ${projects.length} projects:\n`);
projects.forEach((project, index) => {
  console.log(`${index + 1}. ${project.name}`);
  console.log(`   Logo: ${project.logoFile}`);
  console.log(`   Features: ${project.features.length}`);
  console.log(`   URL: ${project.url || "N/A"}`);
  console.log(`   Agency: ${project.agency || "N/A"}`);
  console.log();
});

// Export as JSON for easy copying
const outputPath = path.join(__dirname, "extracted-projects.json");
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
console.log(`\n✅ Exported to ${outputPath}`);
