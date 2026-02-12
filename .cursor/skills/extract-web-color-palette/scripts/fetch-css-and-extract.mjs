#!/usr/bin/env node
/**
 * Fetches a page URL, collects all CSS (inline + style tags + linked stylesheets),
 * then runs color extraction. Outputs JSON array of hex colors.
 * Usage: node fetch-css-and-extract.mjs <url>
 */
import https from 'https';
import http from 'http';
import { URL } from 'url';

const targetUrl = process.argv[2];
if (!targetUrl) {
  console.error('Usage: node fetch-css-and-extract.mjs <url>');
  process.exit(1);
}

const FETCH_TIMEOUT_MS = 8000;

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const lib = u.protocol === 'https:' ? https : http;
    const opts = { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; palette-extractor)' } };
    const req = lib.get(url, opts, (res) => {
      const redirect = res.headers.location;
      if (redirect && [301, 302, 307, 308].includes(res.statusCode)) {
        fetchUrl(new URL(redirect, url).href).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(FETCH_TIMEOUT_MS, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function resolveUrl(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

async function main() {
  const baseUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
  const html = await fetchUrl(baseUrl);
  const base = new URL(baseUrl);

  let allCss = '';

  // Inline style attributes
  const styleAttrRe = /style\s*=\s*["']([^"']*)["']/gi;
  let m;
  while ((m = styleAttrRe.exec(html)) !== null) allCss += m[1] + '\n';

  // <style>...</style>
  const styleTagRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  while ((m = styleTagRe.exec(html)) !== null) allCss += m[1] + '\n';

  // <link rel="stylesheet" href="...">
  const linkRe = /<link[^>]+rel\s*=\s*["']?(?:stylesheet)["']?[^>]+href\s*=\s*["']([^"']+)["']/gi;
  const hrefs = [];
  while ((m = linkRe.exec(html)) !== null) hrefs.push(m[1]);
  // Also href before rel
  const linkRe2 = /<link[^>]+href\s*=\s*["']([^"']+)["'][^>]+rel\s*=\s*["']?(?:stylesheet)["']?/gi;
  while ((m = linkRe2.exec(html)) !== null) hrefs.push(m[1]);

  const seenLinks = new Set();
  for (const href of hrefs) {
    const full = resolveUrl(href, base);
    if (!full || href.startsWith('data:') || seenLinks.has(full)) continue;
    seenLinks.add(full);
    try {
      const css = await fetchUrl(full);
      allCss += css + '\n';
    } catch (_) {}
    if (seenLinks.size >= 25) break;
  }

  // Run extract-colors in process: load and call
  const { extractColors } = await import('./extract-colors.mjs');
  const colors = extractColors(allCss);
  console.log(JSON.stringify(colors));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
