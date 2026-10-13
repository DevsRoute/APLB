import PizZip from 'pizzip';

// Pull placeholder markers from a .docx. Three flavors coexist in the client's
// templates:
//   [Site Field]      — populated from AP SiteTracker (names can have spaces)
//   <Section Name>    — optional-language section header
//   <<Option Name>>   — a specific option within that section
// We strip XML tags first because Word often splits a placeholder across
// multiple <w:t> runs when styling boundaries change inside the brackets.
export function parsePlaceholders(arrayBuffer) {
  const zip = new PizZip(arrayBuffer);
  const file = zip.file('word/document.xml');
  if (!file) return { squares: [], sections: [], options: [] };
  const xml = file.asText();
  const flat = decodeEntities(xml.replace(/<[^>]+>/g, ''));

  // [name] — anything that isn't bracket or newline, up to 80 chars.
  const squares = unique(flat.match(/\[([^\]\n[]{1,80})\]/g) || []).map(strip);
  // <<option>>
  const options = unique(flat.match(/<<([^<>\n]{1,120})>>/g) || []).map(stripDouble);
  // <single> — exclude anything that's actually <<option>> or an obvious artefact.
  const singlePass = (flat.match(/<([^<>\n]{1,80})>/g) || []).filter((m) => {
    // Skip <<...>> which the match above catches too.
    return !m.startsWith('<<') && !m.endsWith('>>');
  });
  const sections = unique(singlePass).map(strip);

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
