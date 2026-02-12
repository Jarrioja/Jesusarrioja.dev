---
name: extract-web-color-palette
description: Extracts the color palette from a web page given only its URL. Fetches the page, collects CSS (inline, style tags, linked stylesheets), parses all color values, and returns a deduplicated palette. Use when the user wants to "extract colors from a URL", "get the color palette of a website", "steal colors from a page", or "analyze palette from [url]".
---

# Extract Web Color Palette from URL

## When to use

Apply this skill when the user provides a **URL** and wants to obtain the **color palette** used on that page (hex, rgb, or named colors). Input is only the URL; no local files required.

## Workflow (with Node script)

1. **Fetch the page**  
   Use the fetch script (which gets raw HTML via Node) or, when possible, `mcp_web_fetch` (see “Without Node” below).

2. **Collect all CSS**  
   From the fetched HTML, gather inline `style="..."`, `<style>...</style>` blocks, and each `<link rel="stylesheet" href="...">` (fetch each href). Append everything into one CSS string.

3. **Extract colors**  
   Run the extraction script on the combined CSS:
   ```bash
   node .cursor/skills/extract-web-color-palette/scripts/extract-colors.mjs
   ```
   Pipe the full CSS into stdin, or pass it as the first argument.  
   Or use the full pipeline: `node .cursor/skills/extract-web-color-palette/scripts/fetch-css-and-extract.mjs <url>`.

4. **Present the palette**  
   Show the user the palette (e.g. hex swatches and/or a small table).

## Workflow without Node (webfetch + shell only)

Use this when the user wants to avoid running JavaScript (only `mcp_web_fetch` + shell).

**Limitación:** `mcp_web_fetch(page_url)` returns **markdown**, not raw HTML, so you **cannot** see `<link rel="stylesheet">` or `<style>` to discover CSS URLs from the page itself.

**What you can do:**

1. **Guess CSS URLs** and fetch them with `mcp_web_fetch`:
   - Try common paths: `https://<domain>/style.css`, `https://<domain>/css/main.css`, `https://<domain>/main.css`, `https://<domain>/assets/css/main.css`, `https://<domain>/wp-content/themes/<theme>/style.css`.
   - If one returns CSS (not a 404/markdown page), you have CSS text.

2. **Extract colors from that CSS without JS** using shell:
   ```bash
   # Hex (3, 6, 8 digits)
   grep -oE '#[0-9A-Fa-f]{3}\b|[0-9A-Fa-f]{6}\b|[0-9A-Fa-f]{8}\b' 
   # Or combined with rgb/hsl (raw strings, no conversion)
   grep -oE '#[0-9A-Fa-f]{3,8}\b|rgba?\([^)]+\)|hsla?\([^)]+\)' 
   ```
   Pipe the CSS content (e.g. from a file or from a previous fetch saved to stdout) into `grep`. Deduplicate with `sort -u`. You get hex and raw `rgb()`/`hsl()`; converting rgb/hsl to hex without a script is not practical, so either leave them as-is or run the Node script only for that step.

3. **Present** the list of hex (and optional rgb/hsl) as the palette.

Sites with hashed or framework-generated asset URLs (e.g. many WordPress themes, Vite, Next.js) often do not expose a guessable CSS path; then the “webfetch-only” method cannot find CSS and the Node-based fetch script is needed.

## Output format

Prefer presenting the palette like this:

```markdown
## Color palette from [URL]

| Hex       | Preview |
|-----------|---------|
| `#1a1a2e` | ■       |
| `#16213e` | ■       |
...
```

Or as a simple list of hex codes plus a note that they can be copied.

## Limitations

- Only colors present in the **fetched HTML and CSS** are found. Colors applied only via JavaScript (e.g. CSS-in-JS at runtime) or in dynamically loaded styles may be missing.
- The script normalizes to hex; original `rgb()`/`hsl()`/named values are not preserved in the output (use the script output or add a separate “raw” pass if needed).

## Script reference

- **extract-colors.mjs**: Reads CSS from stdin (or first argument), finds `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, and common CSS color names; normalizes to hex and deduplicates. No dependencies. Run from repo root.
