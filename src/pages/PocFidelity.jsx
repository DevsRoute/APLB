import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTemplate } from '../lib/api/templates.js';
import { listSites } from '../lib/api/sites.js';
import { parsePlaceholders } from '../lib/parsePlaceholders.js';
import { autoMapFields, buildFillData } from '../lib/autoMapFields.js';
import { fillDocx, blobToArrayBuffer } from '../lib/fillTemplate.js';
import { renderDocx } from '../lib/docRenderer.js';
import { htmlToDocxBlob } from '../lib/htmlToDocx.js';

// POC 4 — side-by-side fidelity check.
//   Path A — original .docx -> docxtemplater fills [tags] -> output
//   Path B — Path A -> docx-preview (HTML) -> html-to-docx -> output
// Left is the original; right is the pipeline's output under the chosen path.
export default function PocFidelity() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bufferRef = useRef(null);
  const [path, setPath] = useState('A');
  const [status, setStatus] = useState('idle');
  const [filename, setFilename] = useState(null);

  const compare = useCallback(async (ab, name) => {
    bufferRef.current = ab;
    setFilename(name);
    setStatus('rendering original…');
    await renderDocx(ab, leftRef.current);

    try {
      setStatus('filling placeholders…');
      const { squares } = parsePlaceholders(ab);
      const mapping = autoMapFields(squares);
      const sites = await listSites();
      const data = buildFillData(sites[0], mapping);
      const filledBlob = fillDocx(ab, data);
      const filledAb = await blobToArrayBuffer(filledBlob);

      if (path === 'A') {
        setStatus('rendering Path A output…');
        await renderDocx(filledAb, rightRef.current);
        setStatus(`ready — Path A (fill-only): ${(filledBlob.size / 1024).toFixed(1)} KB`);
        return;
      }

      // Path B: full round-trip through our in-browser editor stack.
      setStatus('round-tripping through docx-preview + html-to-docx…');
      const scratch = document.createElement('div');
      document.body.appendChild(scratch);
      scratch.style.position = 'absolute';
      scratch.style.left = '-99999px';
      await renderDocx(filledAb, scratch);
      const sections = scratch.querySelectorAll('section.docx');
      const html = [...sections].map((s) => s.innerHTML).join('\n');
      scratch.remove();

      const roundBlob = await htmlToDocxBlob(html);
      const roundAb = await blobToArrayBuffer(roundBlob);
      await renderDocx(roundAb, rightRef.current);
      setStatus(`ready — Path B (round-trip): ${(roundBlob.size / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.error(e);
      setStatus(`error: ${e.message ?? e}`);
    }
  }, [path]);

  async function loadBuiltIn() {
    const { arrayBuffer, meta } = await fetchTemplate('dt-shopping-center');
    await compare(arrayBuffer, meta.name);
  }
  async function loadFile(file) {
    const ab = await file.arrayBuffer();
    await compare(ab, file.name);
  }

  useEffect(() => { loadBuiltIn(); /* eslint-disable-next-line */ }, []);
  useEffect(() => {
    if (bufferRef.current) compare(bufferRef.current, filename);
    // eslint-disable-next-line
  }, [path]);

  // Scroll sync — ratio-based so differing content heights still roughly align.
  useEffect(() => {
    const l = leftRef.current;
    const r = rightRef.current;
    if (!l || !r) return;
    let lock = false;
    const sync = (src, dst) => {
      if (lock) return;
      lock = true;
      const denom = src.scrollHeight - src.clientHeight;
      const ratio = denom > 0 ? src.scrollTop / denom : 0;
      dst.scrollTop = ratio * Math.max(0, dst.scrollHeight - dst.clientHeight);
      requestAnimationFrame(() => { lock = false; });
    };
    const onL = () => sync(l, r);
    const onR = () => sync(r, l);
    l.addEventListener('scroll', onL);
    r.addEventListener('scroll', onR);
    return () => {
      l.removeEventListener('scroll', onL);
      r.removeEventListener('scroll', onR);
    };
  }, []);

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-slate-500 hover:underline">← home</Link>
          <h1 className="text-sm font-semibold text-slate-900">POC 4 — Fidelity Comparison</h1>
          <span className="text-xs text-slate-500">{filename ? `· ${filename}` : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <PathToggle value={path} onChange={setPath} />
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
            Reload sample
          </button>
        </div>
      </header>

      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-[11.5px] text-amber-900">
        <strong>Path A</strong> — fills <code>[tags]</code> inside the original .docx and nothing else.
        Everything docxtemplater doesn't touch — fonts, colors, images, tables, headers, footers — is byte-identical to the original.
        <br />
        <strong>Path B</strong> — renders the .docx to HTML (<code>docx-preview</code>), then converts HTML back to .docx (<code>html-to-docx</code>).
        <strong> Images and complex tables are lost on the round-trip</strong> — the libraries don't carry structural .docx features over HTML.
        For the real app this is the trade-off: Path A for faithful output, Path B only if the user absolutely needs to type into the doc in the browser.
      </div>

      <div className="flex items-center justify-between border-b bg-white px-4 py-1 text-[11px] text-slate-700">
        <div>status: {status}</div>
        <div>scroll either side — the other follows</div>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-900">
            LEFT — original .docx
          </div>
          <div ref={leftRef} className="doc-host flex-1 overflow-auto" />
        </div>
        <div className="w-px bg-slate-300" />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-900">
            RIGHT — pipeline output ({path === 'A' ? 'Path A: fill-only' : 'Path B: round-trip'})
          </div>
          <div ref={rightRef} className="doc-host flex-1 overflow-auto" />
        </div>
      </div>
    </div>
  );
}

function PathToggle({ value, onChange }) {
  return (
    <div className="flex overflow-hidden rounded border border-slate-300">
      <Choice selected={value === 'A'} onClick={() => onChange('A')}>Path A — fill-only</Choice>
      <Choice selected={value === 'B'} onClick={() => onChange('B')}>Path B — round-trip</Choice>
    </div>
  );
}
function Choice({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-[11px] font-semibold ${
        selected ? 'bg-slate-800 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'
      }`}
    >{children}</button>
  );
}
