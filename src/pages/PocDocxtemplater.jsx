import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTemplate } from '../lib/api/templates.js';
import { listSites } from '../lib/api/sites.js';
import { parsePlaceholders } from '../lib/parsePlaceholders.js';
import { autoMapFields, buildFillData } from '../lib/autoMapFields.js';
import { fillDocx, blobToArrayBuffer } from '../lib/fillTemplate.js';
import { renderDocx } from '../lib/docRenderer.js';

// POC 2 — proves we can fill [placeholders] inside a .docx without breaking
// Word's internal XML. Log on the left shows what the parser + mapper did;
// the right pane renders the filled result.
export default function PocDocxtemplater() {
  const [log, setLog] = useState([]);
  const [filled, setFilled] = useState(null);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef(null);

  function push(msg) { setLog((l) => [...l, msg]); }

  async function run(fileArg) {
    setLog([]); setFilled(null); setBusy(true);
    if (previewRef.current) previewRef.current.innerHTML = '';
    try {
      let ab;
      if (fileArg) {
        push(`• input: user file "${fileArg.name}" (${fileArg.size} bytes)`);
        ab = await fileArg.arrayBuffer();
      } else {
        push('• input: built-in sample template');
        ({ arrayBuffer: ab } = await fetchTemplate('dt-shopping-center'));
      }

      const { squares, sections, options } = parsePlaceholders(ab);
      push(`• [site-field] tags: ${squares.length ? squares.join(', ') : '(none)'}`);
      if (sections.length) push(`• <optional-language> sections: ${sections.join(', ')}`);
      if (options.length) push(`• <<option>> markers: ${options.length} found`);
      if (squares.length === 0 && sections.length === 0) {
        push('⚠ no [placeholders] or <sections> detected — check the template syntax.');
      }

      const mapping = autoMapFields(squares);
      push('• auto-mapping (placeholder → site field):');
      for (const [k, v] of Object.entries(mapping)) {
        push(`    [${k}] → ${v ?? '✗ no match'}`);
      }

      const sites = await listSites();
      const site = sites[0];
      push(`• site: ${site.id}`);

      const data = buildFillData(site, mapping);
      const blob = fillDocx(ab, data);
      push(`✓ filled → ${blob.size} byte .docx produced`);
      setFilled(blob);

      const filledAb = await blobToArrayBuffer(blob);
      await renderDocx(filledAb, previewRef.current);
      push('✓ rendered via docx-preview');
    } catch (e) {
      console.error(e);
      push(`✗ ERROR: ${e.message ?? e}`);
      if (e.properties?.errors) {
        for (const sub of e.properties.errors) {
          push(`    · ${sub.properties.explanation ?? sub.message}`);
        }
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-slate-500 hover:underline">← home</Link>
          <h1 className="text-sm font-semibold text-slate-900">POC 2 — docxtemplater placeholder fill</h1>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".docx"
            disabled={busy}
            onChange={(e) => e.target.files?.[0] && run(e.target.files[0])}
            className="text-xs"
          />
          <button
            disabled={busy}
            onClick={() => run()}
            className="rounded bg-slate-800 px-3 py-1 text-xs text-white hover:bg-slate-700 disabled:opacity-50"
          >
            Use built-in sample
          </button>
          {filled && (
            <button
              onClick={() => saveBlob(filled, 'filled.docx')}
              className="rounded bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-600"
            >
              Download filled .docx
            </button>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-[420px] shrink-0 overflow-auto border-r border-slate-200 bg-white p-4">
          <p className="mb-3 text-xs text-slate-600">
            Loads a .docx, extracts <code>{'[tags]'}</code>, fuzzy-maps to a site field,
            fills, then renders. If a tag was split across <code>&lt;w:t&gt;</code> runs by
            Word, docxtemplater handles it — this is where that assumption gets tested.
          </p>
          <pre className="whitespace-pre-wrap text-[11px] leading-snug text-slate-800">
{log.join('\n') || '(output appears here — click "Use built-in sample" or pick a file)'}
          </pre>
        </aside>

        <div ref={previewRef} className="doc-host flex-1 overflow-auto" />
      </div>
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
