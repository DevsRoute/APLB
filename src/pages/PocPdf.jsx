import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { renderDocx } from '../lib/docRenderer.js';
import { fetchTemplate } from '../lib/api/templates.js';
import { listSites } from '../lib/api/sites.js';
import { parsePlaceholders } from '../lib/parsePlaceholders.js';
import { autoMapFields, buildFillData } from '../lib/autoMapFields.js';
import { fillDocx, blobToArrayBuffer } from '../lib/fillTemplate.js';
import { exportDocxPagesToPdf } from '../lib/exportPdf.js';
import { printWrapper } from '../lib/printPdf.js';
import { htmlToDocxBlob } from '../lib/htmlToDocx.js';

// POC 3 — fills the sample, renders via docx-preview, lets the user edit
// inline, and exports in three ways so they can pick what fits:
//   PDF (raster)       — one-click, bitmap text
//   PDF (vector/print) — opens browser print dialog, true vector PDF
//   .docx              — round-trip HTML → .docx so inline edits persist
export default function PocPdf() {
  const hostRef = useRef(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    (async () => {
      setStatus('filling…');
      const { arrayBuffer } = await fetchTemplate('dt-shopping-center');
      const { squares } = parsePlaceholders(arrayBuffer);
      const mapping = autoMapFields(squares);
      const sites = await listSites();
      const data = buildFillData(sites[0], mapping);
      const blob = fillDocx(arrayBuffer, data);
      const filledAb = await blobToArrayBuffer(blob);
      setStatus('rendering…');
      await renderDocx(filledAb, hostRef.current);
      // Flip the rendered pages into contentEditable so the user can type.
      for (const page of hostRef.current.querySelectorAll('section.docx')) {
        page.setAttribute('contenteditable', 'true');
        page.spellcheck = true;
      }
      setStatus('ready — edit the document, then export');
    })().catch((e) => setStatus(`error: ${e.message ?? e}`));
  }, []);

  async function toPdfRaster() {
    const wrapper = hostRef.current.querySelector('.docx-wrapper') || hostRef.current;
    setStatus('rastering per page…');
    await exportDocxPagesToPdf(wrapper, 'loi.pdf');
    setStatus('saved as loi.pdf (raster)');
  }

  function toPdfVector() {
    const wrapper = hostRef.current.querySelector('.docx-wrapper') || hostRef.current;
    printWrapper(wrapper, 'LOI');
    setStatus('opened print dialog — pick "Save as PDF"');
  }

  async function toDocx() {
    const sections = hostRef.current.querySelectorAll('section.docx');
    const html = [...sections].map((s) => s.innerHTML).join('\n');
    setStatus('serialising HTML → .docx…');
    const blob = await htmlToDocxBlob(html);
    saveBlob(blob, 'loi.docx');
    setStatus('saved as loi.docx');
  }

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-slate-500 hover:underline">← home</Link>
          <h1 className="text-sm font-semibold text-slate-900">POC 3 — Export edited doc as PDF or .docx</h1>
          <span className="text-xs text-slate-500">status: {status}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toPdfRaster}
            className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-900 hover:bg-slate-50"
            title="html2canvas + jsPDF, per-page geometry"
          >
            Export PDF (raster)
          </button>
          <button
            onClick={toPdfVector}
            className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-900 hover:bg-slate-50"
            title="Browser print — vector, selectable text"
          >
            Export PDF (vector / print)
          </button>
          <button
            onClick={toDocx}
            className="rounded bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-600"
            title="HTML → .docx round-trip"
          >
            Export .docx
          </button>
        </div>
      </header>
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] text-amber-900">
        <strong>Raster PDF</strong> = html2canvas screenshots each page at 3× — one click, bitmap text, exact layout.
        <strong className="ml-3">Vector PDF</strong> = native browser print — pick "Save as PDF" for selectable text.
        <strong className="ml-3">.docx</strong> = round-trip through html-to-docx so inline edits persist in the exported file.
      </div>
      <div ref={hostRef} className="flex-1 overflow-auto doc-host" />
    </div>
  );
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
