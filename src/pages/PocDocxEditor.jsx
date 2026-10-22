import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocxEditor } from '@docx-editor.dev/react';
import { packagedFonts } from '@docx-editor.dev/fonts';
import '@docx-editor.dev/core/styles/editor.css';

const fonts = packagedFonts();
import { fetchTemplate } from '../lib/api/templates.js';
import { listSites } from '../lib/api/sites.js';
import { parsePlaceholders } from '../lib/parsePlaceholders.js';
import { autoMapFields, buildFillData } from '../lib/autoMapFields.js';
import { fillDocx } from '../lib/fillTemplate.js';

export default function PocDocxEditor() {
  const editorRef = useRef(null);
  const [document, setDocument] = useState(null);
  const [status, setStatus] = useState('loading…');
  const [filename, setFilename] = useState('loi.docx');

  useEffect(() => { loadBuiltIn(); }, []);

  async function loadBuiltIn() {
    try {
      setStatus('fetching template…');
      const { arrayBuffer, meta } = await fetchTemplate('dt-shopping-center');
      setFilename(`${meta.id}-filled.docx`);

      setStatus('filling [tags]…');
      const { squares } = parsePlaceholders(arrayBuffer);
      const mapping = autoMapFields(squares);
      const sites = await listSites();
      const data = buildFillData(sites[0], mapping);
      const filledBlob = fillDocx(arrayBuffer, data);
      const filledAb = await filledBlob.arrayBuffer();
      setDocument(new Uint8Array(filledAb));
      setStatus('ready — edit the document, then click Export .docx');
    } catch (e) {
      console.error(e);
      setStatus(`error: ${e.message ?? e}`);
    }
  }

  async function loadFile(file) {
    try {
      setStatus('opening file…');
      setFilename(file.name);
      const ab = await file.arrayBuffer();
      setDocument(new Uint8Array(ab));
      setStatus('ready — edit, then click Export .docx');
    } catch (e) {
      console.error(e);
      setStatus(`error: ${e.message ?? e}`);
    }
  }

  async function exportDocx() {
    try {
      setStatus('exporting…');
      const bytes = await editorRef.current?.save();
      if (!bytes) {
        setStatus('export returned empty — nothing loaded?');
        return;
      }
      const blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      download(blob, filename);
      setStatus(`exported ${filename} — open in Word to inspect`);
    } catch (e) {
      console.error(e);
      setStatus(`export error: ${e.message ?? e}`);
    }
  }

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-slate-500 hover:underline">← home</Link>
          <h1 className="text-sm font-semibold text-slate-900">POC 6 — eigenpal/docx-editor</h1>
          <span className="text-xs text-slate-500">status: {status}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".docx"
            onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
            className="text-xs"
          />
          <button
            onClick={loadBuiltIn}
            className="rounded bg-slate-800 px-3 py-1 text-xs text-white hover:bg-slate-700"
          >
            Reload DT template
          </button>
          <button
            onClick={exportDocx}
            className="rounded bg-orange-500 px-3 py-1 text-xs font-semibold text-white hover:bg-orange-600"
          >
            Export .docx
          </button>
        </div>
      </header>

      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-[11.5px] text-amber-900">
        <strong>Test for Jay:</strong> type in the fill-in lines (Attn / Phone / Email),
        bold text, insert a bullet. Export → open in Word → confirm the Dollar Tree logo,
        nested terms table, and your inline edits all survived.
        License: Apache-2.0 Core (free for commercial). Tracked changes = $500/mo Pro, not
        needed for this validation per Jay.
      </div>

      <div className="min-h-0 flex-1">
        {document && (
          <DocxEditor
            ref={editorRef}
            document={document}
            mode="edit"
            fonts={fonts}
          />
        )}
      </div>
    </div>
  );
}

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = name;
  window.document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
