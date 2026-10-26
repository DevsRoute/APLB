import PizZip from 'pizzip';
import { OPTIONAL_LANGUAGE } from '../data/optionalLanguage.js';

const DOC_XML = 'word/document.xml';

export function fillOptionalLanguage(arrayBuffer, chosenLanguage) {
  const zip = new PizZip(arrayBuffer);
  const xml = zip.file(DOC_XML).asText();
  const next = rewriteClauses(xml, chosenLanguage);
  zip.file(DOC_XML, next);
  return zip.generate({ type: 'arraybuffer' });
}

function rewriteClauses(xml, chosenLanguage) {
  let out = xml;
  for (const clause of OPTIONAL_LANGUAGE) {
    const optionId = chosenLanguage[clause.id];
    if (!optionId) continue; // leave the <Clause Heading> placeholder visible
    const option = clause.options.find((o) => o.id === optionId);
    if (!option) continue;
    out = replaceClauseParagraph(out, clause.heading, option.bodyParagraphs);
  }
  return out;
}

// Walk <w:p>...</w:p> paragraphs; the first one whose plain text equals
// `<Heading>` (ignoring surrounding whitespace) gets spliced out and
// replaced with one <w:p> per body paragraph. Formatting is kept simple;
// the destination paragraph inherits default styling.
function replaceClauseParagraph(xml, heading, bodyParagraphs) {
  const token = `<${heading}>`;
  const paraRe = /<w:p\b[^>]*>[\s\S]*?<\/w:p>/g;
  let m;
  while ((m = paraRe.exec(xml))) {
    const paraXml = m[0];
    const text = extractPlainText(paraXml);
    if (text.trim() !== token) continue;
    const replacement = bodyParagraphs.length > 0
      ? bodyParagraphs.map(renderParagraph).join('')
      : renderParagraph('');
    return xml.slice(0, m.index) + replacement + xml.slice(m.index + paraXml.length);
  }
  return xml;
}

function extractPlainText(paraXml) {
  const parts = [];
  const re = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;
  let m;
  while ((m = re.exec(paraXml))) parts.push(unescapeXml(m[1]));
  return parts.join('');
}

function renderParagraph(text) {
  const safe = escapeXml(stripDelimiters(text));
  return `<w:p><w:r><w:t xml:space="preserve">${safe}</w:t></w:r></w:p>`;
}

// Docxtemplater runs its second pass with [ and ] as delimiters. Library
// option bodies occasionally carry orphan brackets (e.g. the "Default In"
// Co-Tenancy clause ends with ".]"), which crashes the lexer with
// "Unopened tag". Strip them from injected prose — none of the live
// clauses rely on bracket literals.
function stripDelimiters(s) {
  return s.replace(/[\[\]]/g, '');
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function unescapeXml(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
