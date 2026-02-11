/**
 * Update Projects Script
 *
 * This script updates the migrate-data.ts file to:
 * 1. Set featured=true for: unapiezamaestra, instapower21, mile
 * 2. Keep existing featured projects (tgk, conboca-blanco)
 * 3. Remove URL from all projects except: unapiezamaestra, instapower21, mile, sebasmom
 */

import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, 'migrate-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Projects to feature
const toFeature = ['una-pieza-maestra-red', 'instapower21', 'mile'];

// Projects that can keep their URL
const keepUrl = ['una-pieza-maestra-red', 'instapower21', 'mile', 'sebasmom'];

// Read the file and update
const lines = content.split('\n');
let inProject = false;
let currentSlug = '';
let urlLineIndex = -1;
let featuredLineIndex = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect start of a project
  if (line.includes('slug:')) {
    const match = line.match(/slug:\s*"([^"]+)"/);
    if (match) {
      currentSlug = match[1];
      inProject = true;
      urlLineIndex = -1;
      featuredLineIndex = -1;
    }
  }

  // Find URL line
  if (inProject && line.includes('url:') && !line.includes('logoUrl:')) {
    urlLineIndex = i;
  }

  // Find isFeatured line
  if (inProject && line.includes('isFeatured:')) {
    featuredLineIndex = i;

    // Update featured status if needed
    if (toFeature.includes(currentSlug)) {
      lines[i] = line.replace('isFeatured: false', 'isFeatured: true');
    }
  }

  // End of project (createdAt is the last property)
  if (inProject && line.includes('createdAt:')) {
    // Remove URL if needed
    if (urlLineIndex !== -1 && !keepUrl.includes(currentSlug)) {
      // Remove the URL line
      lines.splice(urlLineIndex, 1);
      // Adjust indexes
      i--;
      if (featuredLineIndex > urlLineIndex) {
        featuredLineIndex--;
      }
    }

    inProject = false;
    currentSlug = '';
  }
}

// Write back
const newContent = lines.join('\n');
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log('✅ Projects updated successfully!');
console.log('  - Set as featured: unapiezamaestra, instapower21, mile');
console.log('  - Kept URLs only for: unapiezamaestra, instapower21, mile, sebasmom');
