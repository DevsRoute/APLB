import { Link } from 'react-router-dom';

const links = [
  { to: '/app',               title: 'Open AP LOI Builder',               note: 'Draft and build LOIs — the full app.', primary: true },
  { to: '/poc/superdoc',      title: 'POC 1 — Render .docx as HTML',       note: 'Upload a .docx and render it in the browser (docx-preview).' },
  { to: '/poc/docxtemplater', title: 'POC 2 — Fill [placeholders]',        note: 'Replace [tags] with real values without touching Word formatting.' },
  { to: '/poc/pdf',           title: 'POC 3 — Export as PDF or .docx',     note: 'Edit the rendered doc, then export: raster PDF, vector-print PDF, or .docx.' },
  { to: '/poc/fidelity',      title: 'POC 4 — docx → HTML → docx fidelity', note: 'Side-by-side compare: original vs. final after the full round-trip.' },
  { to: '/poc/docx-editor',   title: 'POC 5 — eigenpal/docx-editor',       note: 'WYSIWYG .docx editor (Apache-2.0 Core, free for commercial).' },
];

export default function Home() {
  return (
    <div className="min-h-full bg-slate-50 p-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-slate-900">AP LOI Builder</h1>
        <p className="mt-2 text-sm text-slate-600">
          Draft Letters of Intent from site data, pick optional language, edit inline, export.
        </p>
        <ul className="mt-6 space-y-2">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`block rounded-md border px-4 py-3 ${
                  l.primary
                    ? 'border-orange-500 bg-orange-500 text-white hover:brightness-105'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm'
                }`}
              >
                <div className={`font-semibold ${l.primary ? 'text-white' : 'text-slate-900'}`}>{l.title}</div>
                <div className={`text-sm ${l.primary ? 'text-white/90' : 'text-slate-500'}`}>{l.note}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
