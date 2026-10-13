import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import EditorToolbar from '../components/EditorToolbar.jsx';
import { renderDocx } from '../lib/docRenderer.js';
import { htmlToDocxBlob } from '../lib/htmlToDocx.js';
import { exportDocxPagesToPdf } from '../lib/exportPdf.js';
import { printWrapper } from '../lib/printPdf.js';

const EditorPane = forwardRef(function EditorPane(
  { buffer, editable = true, fontFamily, fontSizePx, onFont, onFontSize, onExport, onSend },
  ref,
) {
  const hostRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getHtml() {
      const sections = hostRef.current?.querySelectorAll('section.docx') || [];
      return [...sections].map((s) => s.innerHTML).join('\n');
    },
    getWrapper() {
      return hostRef.current?.querySelector('.docx-wrapper') || hostRef.current;
    },
    async exportDocx(filename = 'loi.docx') {
      const html = this.getHtml();
      if (!html) return;
      const blob = await htmlToDocxBlob(html);
      saveBlob(blob, filename);
    },
    async exportPdfRaster(filename = 'loi.pdf') {
      const w = this.getWrapper();
      if (w) await exportDocxPagesToPdf(w, filename);
    },
    printPdf(title = 'LOI') {
      const w = this.getWrapper();
      if (w) printWrapper(w, title);
    },
  }));

  useEffect(() => {
    if (!buffer || !hostRef.current) return;
    renderDocx(buffer, hostRef.current).then(() => {
      if (editable) {
        for (const page of hostRef.current.querySelectorAll('section.docx')) {
          page.setAttribute('contenteditable', 'true');
          page.spellcheck = true;
        }
      }
    });
  }, [buffer, editable]);

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-white">
      <EditorToolbar
        fontFamily={fontFamily}
        fontSizePx={fontSizePx}
        onFont={onFont}
        onFontSize={onFontSize}
        onExport={onExport}
        onSend={onSend}
      />
      <div ref={hostRef} className="doc-host thin-scroll flex-1 overflow-auto" />
    </div>
  );
});

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default EditorPane;
