// Opens a new window containing only the rendered doc, invokes window.print(),
// and lets the user pick "Save as PDF" from the browser dialog. The output is a
// true vector PDF with selectable text — the closest to pixel-perfect we can
// get without a backend (LibreOffice headless) in the stack.
export function printWrapper(wrapperEl, title = 'LOI') {
  const html = wrapperEl.outerHTML;
  // Copy the <style> tags docx-preview injected (its CSS lives in the host doc,
  // including @font-face and page-size rules).
  const styles = [...document.querySelectorAll('style, link[rel="stylesheet"]')]
    .map((n) => n.outerHTML)
    .join('\n');

  const win = window.open('', '_blank', 'width=900,height=1100');
  if (!win) { alert('Pop-up blocked — allow pop-ups to print to PDF.'); return; }

  win.document.open();
  win.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${title}</title>
${styles}
<style>
  html, body { margin: 0; padding: 0; background: white; }
  .docx-wrapper { background: white !important; gap: 0 !important; padding: 0 !important; }
  .docx-wrapper > section.docx { box-shadow: none !important; margin: 0 !important; }
  @page { margin: 0; }
</style>
</head>
<body>${html}</body>
</html>`);
  win.document.close();

  // Wait a tick so fonts and images paint before the print dialog opens.
  win.onload = () => {
    setTimeout(() => { win.focus(); win.print(); }, 250);
  };
}
