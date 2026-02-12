#!/usr/bin/env node
/**
 * Extracts color values from CSS text (stdin or first arg).
 * Outputs a JSON array of unique hex colors (#rrggbb).
 * No dependencies.
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const namedColors = {
  black: '#000000', white: '#ffffff', red: '#ff0000', lime: '#00ff00', blue: '#0000ff',
  yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff', gray: '#808080', grey: '#808080',
  maroon: '#800000', green: '#008000', navy: '#000080', purple: '#800080', olive: '#808000',
  teal: '#008080', silver: '#c0c0c0', orange: '#ffa500', aqua: '#00ffff', fuchsia: '#ff00ff',
  transparent: null, currentcolor: null, inherit: null,
  // Extended common names
  aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aquamarine: '#7fffd4', azure: '#f0ffff',
  beige: '#f5f5dc', bisque: '#ffe4c4', blanchedalmond: '#ffebcd', blueviolet: '#8a2be2',
  brown: '#a52a2a', burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00',
  chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc',
  crimson: '#dc143c', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9', darkgrey: '#a9a9a9', darkgreen: '#006400', darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b', darkolivegreen: '#556b2f', darkorange: '#ff8c00', darkorchid: '#9932cc',
  darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f', darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f', darkslategrey: '#2f4f4f', darkturquoise: '#00ced1', darkviolet: '#9400d3',
  deeppink: '#ff1493', deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969',
  dodgerblue: '#1e90ff', firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22',
  gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520',
  greenyellow: '#adff2f', honeydew: '#f0fff0', hotpink: '#ff69b4', indianred: '#cd5c5c',
  indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa',
  lavenderblush: '#fff0f5', lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6',
  lightcoral: '#f08080', lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgray: '#d3d3d3',
  lightgrey: '#d3d3d3', lightgreen: '#90ee90', lightpink: '#ffb6c1', lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa', lightskyblue: '#87cefa', lightslategray: '#778899', lightslategrey: '#778899',
  lightsteelblue: '#b0c4de', lightyellow: '#ffffe0', limegreen: '#32cd32', linen: '#faf0e6',
  mediumaquamarine: '#66cdaa', mediumblue: '#0000cd', mediumorchid: '#ba55d3', mediumpurple: '#9370db',
  mediumseagreen: '#3cb371', mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa', mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5', navajowhite: '#ffdead', oldlace: '#fdf5e6', orangered: '#ff4500',
  orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98', paleturquoise: '#afeeee',
  palevioletred: '#db7093', papayawhip: '#ffefd5', peachpuff: '#ffdab9', peru: '#cd853f',
  pink: '#ffc0cb', plum: '#dda0dd', powderblue: '#b0e0e6', rosybrown: '#bc8f8f',
  royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072', sandybrown: '#f4a460',
  seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d', skyblue: '#87ceeb',
  slateblue: '#6a5acd', slategray: '#708090', slategrey: '#708090', snow: '#fffafa',
  springgreen: '#00ff7f', steelblue: '#4682b4', tan: '#d2b48c', thistle: '#d8bfd8',
  tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3',
  whitesmoke: '#f5f5f5', yellowgreen: '#9acd32', rebeccapurple: '#663399',
};

function hex3To6(hex) {
  const r = hex[1] + hex[1], g = hex[2] + hex[2], b = hex[3] + hex[3];
  return '#' + r + g + b;
}

function rgbToHex(r, g, b) {
  const n = (x) => Math.max(0, Math.min(255, Math.round(Number(x))));
  const h = (x) => {
    x = n(x).toString(16);
    return x.length === 1 ? '0' + x : x;
  };
  return '#' + h(r) + h(g) + h(b);
}

function hslToHex(h, s, l) {
  let r, g, b;
  const H = Number(h) / 360;
  const S = Number(s.replace('%', '')) / 100;
  const L = Number(l.replace('%', '')) / 100;
  if (S === 0) {
    r = g = b = L;
  } else {
    const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    const p = 2 * L - q;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    r = hue2rgb(p, q, H + 1 / 3);
    g = hue2rgb(p, q, H);
    b = hue2rgb(p, q, H - 1 / 3);
  }
  return rgbToHex(r * 255, g * 255, b * 255);
}

function extractColors(css) {
  const seen = new Set();
  const add = (hex) => {
    if (hex && hex.length >= 7) seen.add(hex.toLowerCase());
  };

  // #rgb #rrggbb #rrggbbaa
  const hexRe = /#([0-9A-Fa-f]{3})\b|#([0-9A-Fa-f]{6})\b|#([0-9A-Fa-f]{8})\b/g;
  let m;
  while ((m = hexRe.exec(css)) !== null) {
    if (m[1]) add(hex3To6('#' + m[1]));
    if (m[2]) add('#' + m[2]);
    if (m[3]) add('#' + m[3].slice(0, 6));
  }

  // rgb(r,g,b) and rgba(r,g,b,a)
  const rgbRe = /rgba?\s*\(\s*([^,)]+)\s*,\s*([^,)]+)\s*,\s*([^,)]+)(?:\s*,\s*[^)]+)?\s*\)/g;
  while ((m = rgbRe.exec(css)) !== null) {
    add(rgbToHex(m[1], m[2], m[3]));
  }

  // hsl(h,s%,l%) and hsla(...)
  const hslRe = /hsla?\s*\(\s*([^,)]+)\s*,\s*([^,)]+)\s*,\s*([^,)]+)(?:\s*,\s*[^)]+)?\s*\)/g;
  while ((m = hslRe.exec(css)) !== null) {
    add(hslToHex(m[1], m[2], m[3]));
  }

  // Named colors (word boundary, then optional space/;/)")
  const nameRe = /\b(transparent|currentcolor|inherit|[\w]+)\s*([;})\],])/gi;
  while ((m = nameRe.exec(css)) !== null) {
    const name = m[1].toLowerCase();
    const hex = namedColors[name];
    if (hex) add(hex);
  }

  return [...seen].sort();
}

export { extractColors };

function main() {
  const input = process.argv[2] !== undefined
    ? process.argv[2]
    : readFileSync(0, 'utf8');
  const colors = extractColors(input);
  console.log(JSON.stringify(colors, null, 0));
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();
