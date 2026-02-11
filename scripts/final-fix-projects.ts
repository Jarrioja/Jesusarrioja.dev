/**
 * Final Fix Projects Script
 *
 * 1. Add URL to all agencies
 * 2. Keep project URLs only for: unapiezamaestra, instapower21, mile, sebasmom
 * 3. Set featured=true for: unapiezamaestra, instapower21, mile
 * 4. Keep existing featured (tgk, conboca-blanco)
 */

import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, 'migrate-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const newLines: string[] = [];

const toFeature = ['una-pieza-maestra-red', 'instapower21', 'mile'];
const keepProjectUrl = ['una-pieza-maestra-red', 'instapower21', 'mile', 'sebasmom'];

let currentSlug = '';
let insideAgency = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Track current slug
  if (line.includes('slug:')) {
    const match = line.match(/slug:\s*"([^"]+)"/);
    if (match) currentSlug = match[1];
  }

  // Track if we're inside an agency object
  if (line.trim().startsWith('agency: {')) {
    insideAgency = true;
  }

  // Add URL to agency if logoUrl is found
  if (insideAgency && line.includes('logoUrl:')) {
    newLines.push(line);
    // Add URL based on agency name
    if (line.includes('mood-oscuro.png')) {
      newLines.push('      url: "https://mood-agency.com",');
    } else if (line.includes('tgk.svg')) {
      newLines.push('      url: "https://thegrowthkeys.com",');
    }
    continue;
  }

  // Exit agency block
  if (insideAgency && line.trim() === '},') {
    insideAgency = false;
  }

  // Update featured status
  let modifiedLine = line;
  if (line.includes('isFeatured:') && toFeature.includes(currentSlug)) {
    modifiedLine = line.replace('isFeatured: false', 'isFeatured: true');
  }

  newLines.push(modifiedLine);
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');

console.log('✅ All fixes applied successfully!');
