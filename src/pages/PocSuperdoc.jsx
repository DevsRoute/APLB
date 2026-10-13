// Renamed in spirit from SuperDoc POC to docx-preview POC — same file path
// so routes don't need to change elsewhere.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { renderDocx } from '../lib/docRenderer.js';
import { fetchTemplate } from '../lib/api/templates.js';

export default function PocSuperdoc() {
  const hostRef = useRef(null);
  const bufferRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [filename, setFilename] = useState(null);

  async function render(arrayBuffer, name) {
    bufferRef.current = arrayBuffer;
    setFilename(name);
    setStatus('rendering…');
    try {
      await renderDocx(arrayBuffer, hostRef.current);
      setStatus('ready');
    } catch (e) {
      console.error(e);
      setStatus(`error: ${e.message ?? e}`);
    }
  }

  async function openBuiltIn() {
    const { arrayBuffer, meta } = await fetchTemplate('dt-shopping-center');
    await render(arrayBuffer, `${meta.id}.docx`);
  }

  async function openFromFile(file) {
    const ab = await file.arrayBuffer();
    await render(ab, file.name);
  }

  function downloadOriginal() {
    if (!bufferRef.current) return;
    const blob = new Blob([bufferRef.current], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    saveBlob(blob, filename ?? 'document.docx');
  }

  useEffect(() => { openBuiltIn(); }, []);

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-slate-500 hover:underline">← home</Link>
          <h1 className="text-sm font-semibold text-navy-900">POC 1 — docx-preview render</h1>
          <span className="text-xs text-slate-500">
            status: {status}{filename ? ` · ${filename}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".docx"
            onChange={(e) => e.target.files?.[0] && openFromFile(e.target.files[0])}
            className="text-xs"
          />
          <button onClick={openBuiltIn} className="rounded bg-navy-800 px-3 py-1 text-xs text-white hover:bg-navy-700">
            Open built-in sample
          </button>
          <button onClick={downloadOriginal} className="rounded bg-accent px-3 py-1 text-xs text-white hover:opacity-90">
            Download .docx
          </button>
        </div>
      </header>
      <div ref={hostRef} className="doc-host flex-1 overflow-auto" />
    </div>
  );
}

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
