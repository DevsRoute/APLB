import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const PARTS_WITH_FIELDS = /^word\/(document|header\d*|footer\d*)\.xml$/;

export function fillDocx(arrayBuffer, data) {
  const zip = new PizZip(arrayBuffer);
  clearFieldUnderline(zip);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[', end: ']' },
    nullGetter() { return ''; },
  });
  doc.render(data);
  return doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

// Client wants filled values cyan-highlighted but never underlined. Some
// template fields ship with <w:u> on the [placeholder] run, and docxtemplater
// keeps the run's formatting when it swaps in the value, so drop the
// underline from every run that is part of a [tag] or carries the cyan
// field highlight. Tags can be split across runs ("[" + "LL Broker]"), hence
// the inTag state carried from run to run.
function clearFieldUnderline(zip) {
  for (const name of Object.keys(zip.files)) {
    if (!PARTS_WITH_FIELDS.test(name)) continue;
    let inTag = false;
    const xml = zip.file(name).asText().replace(/<w:r\b[^>]*>[\s\S]*?<\/w:r>/g, (run) => {
      const text = [...run.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map((m) => m[1]).join('');
      let partOfTag = inTag;
      for (const ch of text) {
        if (ch === '[') { inTag = true; partOfTag = true; }
        else if (ch === ']') inTag = false;
      }
      const cyan = /<w:highlight w:val="cyan"\/>/.test(run);
      return partOfTag || cyan ? run.replace(/<w:u\b[^>]*\/>/g, '') : run;
    });
    zip.file(name, xml);
  }
}

export function blobToArrayBuffer(blob) {
  return blob.arrayBuffer();
}
