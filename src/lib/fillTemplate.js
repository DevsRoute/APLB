import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

// Fill a .docx's [placeholders] from the data object. docxtemplater walks the
// XML runs so a tag split across <w:t> boundaries (common when Word applies
// mid-tag styling) still fills cleanly.
export function fillDocx(arrayBuffer, data) {
  const zip = new PizZip(arrayBuffer);
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

export function blobToArrayBuffer(blob) {
  return blob.arrayBuffer();
}
