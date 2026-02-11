/**
 * Fix Projects Script
 *
 * Properly removes only project URLs, not agency URLs
 */

import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, 'migrate-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Projects to feature
const toFeature = ['una-pieza-maestra-red', 'instapower21', 'mile'];

// Projects that can keep their project URL
const keepUrl = ['una-pieza-maestra-red', 'instapower21', 'mile', 'sebasmom'];

// Parse and rebuild
const lines = content.split('\n');
const newLines: string[] = [];
let currentSlug = '';
let inProject = false;
let inAgency = false;
let skipNext = false;

for (let i = 0; i < lines.length; i++) {
  if (skipNext) {
    skipNext = false;
    continue;
  }

  const line = lines[i];

  // Detect slug
  if (line.includes('slug:')) {
    const match = line.match(/slug:\s*"([^"]+)"/);
    if (match) {
      currentSlug = match[1];
      inProject = true;
    }
  }

  // Detect agency start
  if (line.trim().startsWith('agency:')) {
    inAgency = true;
  }

  // Detect agency end
  if (inAgency && line.trim() === '},') {
    inAgency = false;
  }

  // Check if this is a project URL line (not agency URL, not logoUrl)
  const isProjectUrl = line.includes('url:') &&
                       !line.includes('logoUrl:') &&
                       !inAgency &&
                       inProject;

  // Decide whether to skip this line
  if (isProjectUrl && !keepUrl.includes(currentSlug)) {
    // Skip this URL line
    continue;
  }

  // Update featured status
  let modifiedLine = line;
  if (line.includes('isFeatured:') && toFeature.includes(currentSlug)) {
    modifiedLine = line.replace('isFeatured: false', 'isFeatured: true');
  }

  newLines.push(modifiedLine);

  // Reset when project ends
  if (line.includes('createdAt:')) {
    inProject = false;
    currentSlug = '';
  }
}

// Write back
fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');

console.log('✅ Projects fixed successfully!');
console.log('  - Set as featured: unapiezamaestra, instapower21, mile');
console.log('  - Removed project URLs except for: unapiezamaestra, instapower21, mile, sebasmom');
console.log('  - Kept all agency URLs intact');
