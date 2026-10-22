// Convert the editor's current HTML back to .docx (browser build, MIT).
// Fidelity ceiling: paragraphs, tables, basic text runs, lists, alignment,
// bold/italic/underline — all survive. Complex Word features (merged cells,
// custom numbering, embedded objects) may degrade.
import HTMLtoDOCX from '@turbodocx/html-to-docx';

const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export async function htmlToDocxBlob(innerHtml, { title = 'LOI' } = {}) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${innerHtml}</body></html>`;
  const out = await HTMLtoDOCX(html, null, {
    orientation: 'portrait',
    pageSize: { width: 12240, height: 15840 },   // 8.5x11 in @ 1440 twips/in
    margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
    table: { row: { cantSplit: true } },
  });
  // The browser build sometimes returns a polyfilled Buffer / Uint8Array / ArrayBuffer
  // instead of a Blob — wrap it so callers can treat the result uniformly.
  if (out instanceof Blob) return out;
  return new Blob([out], { type: DOCX_MIME });
}
