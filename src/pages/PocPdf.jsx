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

// Fills the sample template with the first site, renders via docx-preview, then
// exports to PDF two ways so the fidelity trade-off is explicit.
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
      setStatus('ready');
    })().catch((e) => setStatus(`error: ${e.message ?? e}`));
  }, []);

  async function toPdfRaster() {
    const wrapper = hostRef.current.querySelector('.docx-wrapper') || hostRef.current;
    setStatus('rastering per page…');
    await exportDocxPagesToPdf(wrapper, 'loi.pdf');
    setStatus('pdf saved (raster)');
  }

  function toPdfVector() {
    const wrapper = hostRef.current.querySelector('.docx-wrapper') || hostRef.current;
    printWrapper(wrapper, 'LOI');
    setStatus('opened print dialog — pick "Save as PDF"');
  }

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-slate-500 hover:underline">← home</Link>
          <h1 className="text-sm font-semibold text-navy-900">POC 3 — PDF export</h1>
          <span className="text-xs text-slate-500">status: {status}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toPdfRaster}
            className="rounded border border-slate-300 px-3 py-1 text-xs text-navy-900 hover:bg-slate-50"
            title="html2canvas + jsPDF, per-page geometry"
          >
            Export PDF (raster)
          </button>
          <button
            onClick={toPdfVector}
            className="rounded bg-accent px-3 py-1 text-xs text-white hover:opacity-90"
            title="Browser print — vector, selectable text, pixel-perfect"
          >
            Export PDF (vector / print)
          </button>
        </div>
      </header>
      <div className="border-b border-slate-200 bg-amber-50 px-4 py-1.5 text-[11px] text-amber-900">
        <strong>Raster</strong> = html2canvas screenshots each page at 3× — one-click, bitmap text, exact layout.
        <strong className="ml-3">Vector / print</strong> = opens a new window and triggers the browser's print dialog —
        pick "Save as PDF" for selectable text and true page geometry (no backend needed).
      </div>
      <div ref={hostRef} className="doc-host flex-1 overflow-auto" />
    </div>
  );
}
