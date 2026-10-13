import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Rasterise each docx-preview page section (one <section class="docx">) into its
// own PDF page, using the section's own pixel size. This avoids the "one tall
// image sliced blindly" artefacts of the naive approach.
export async function exportDocxPagesToPdf(wrapperEl, filename = 'loi.pdf') {
  const pages = [...wrapperEl.querySelectorAll('section.docx')];
  if (pages.length === 0) {
    // Fallback: treat the whole wrapper as one page.
    return exportNodeToPdf(wrapperEl, filename);
  }

  // Use the first page's pixel size to set PDF geometry. docx-preview sizes
  // sections in px at 96 DPI, so 1 px ≈ 0.75 pt (72 pt / 96 px).
  const PX_TO_PT = 72 / 96;
  const firstRect = pages[0].getBoundingClientRect();
  const pdf = new jsPDF({
    unit: 'pt',
    format: [firstRect.width * PX_TO_PT, firstRect.height * PX_TO_PT],
    orientation: firstRect.width > firstRect.height ? 'landscape' : 'portrait',
  });

  for (let i = 0; i < pages.length; i++) {
    const section = pages[i];
    const rect = section.getBoundingClientRect();
    const canvas = await html2canvas(section, {
      scale: 3,                 // 3x for crisp text
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      windowWidth: rect.width,
      windowHeight: rect.height,
    });
    const w = rect.width * PX_TO_PT;
    const h = rect.height * PX_TO_PT;
    if (i > 0) pdf.addPage([w, h], w > h ? 'landscape' : 'portrait');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, w, h);
  }

  pdf.save(filename);
}

// Legacy single-image fallback kept for callers that don't have per-page sections.
export async function exportNodeToPdf(node, filename = 'loi.pdf') {
  const canvas = await html2canvas(node, {
    scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false,
  });
  const pdf = new jsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgH = (canvas.height * pageW) / canvas.width;
  let heightLeft = imgH, position = 0;
  const dataUrl = canvas.toDataURL('image/png');
  pdf.addImage(dataUrl, 'PNG', 0, position, pageW, imgH);
  heightLeft -= pageH;
  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(dataUrl, 'PNG', 0, position, pageW, imgH);
    heightLeft -= pageH;
  }
  pdf.save(filename);
}
