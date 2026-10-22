import PizZip from 'pizzip';

// Three marker flavors coexist in client templates:
//   [Site Field]    — pulls from AP SiteTracker (names can have spaces)
//   <Section>       — optional-language section header
//   <<Option>>      — a choice within that section
export function parsePlaceholders(arrayBuffer) {
  const zip = new PizZip(arrayBuffer);
  const file = zip.file('word/document.xml');
  if (!file) return { squares: [], sections: [], options: [] };
  const xml = file.asText();
  const flat = decodeEntities(xml.replace(/<[^>]+>/g, ''));

  const squares = unique(flat.match(/\[([^\]\n[]{1,80})\]/g) || []).map(strip);
  const options = unique(flat.match(/<<([^<>\n]{1,120})>>/g) || []).map(stripDouble);
  const sections = unique(
    (flat.match(/<([^<>\n]{1,80})>/g) || []).filter((m) => !m.startsWith('<<') && !m.endsWith('>>')),
  ).map(strip);

  return { squares, sections, options };
}

function unique(xs) { return [...new Set(xs)]; }
function strip(x)  { return x.slice(1, -1).trim(); }
function stripDouble(x) { return x.slice(2, -2).trim(); }
function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}
