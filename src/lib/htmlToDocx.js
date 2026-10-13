// Convert the editor's current HTML back to .docx (browser build, MIT).
// Fidelity ceiling: paragraphs, tables, basic text runs, lists, alignment,
// bold/italic/underline — all survive. Complex Word features (merged cells,
// custom numbering, embedded objects) may degrade. For LOIs that's fine.
import HTMLtoDOCX from '@turbodocx/html-to-docx';

export async function htmlToDocxBlob(innerHtml, { title = 'LOI' } = {}) {
  // The lib wants a full HTML doc string.
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${innerHtml}</body></html>`;
  const blob = await HTMLtoDOCX(html, null, {
    orientation: 'portrait',
    pageSize: { width: 12240, height: 15840 }, // 8.5x11in in twips
    margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
    table: { row: { cantSplit: true } },
  });
  return blob;
}
