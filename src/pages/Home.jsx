import { Link } from 'react-router-dom';

const links = [
  { to: '/poc/superdoc', label: 'POC 1 — docx-preview render', note: 'Open and render a .docx' },
  { to: '/poc/docxtemplater', label: 'POC 2 — docxtemplater fill', note: 'Fill [placeholders] in a .docx without breaking formatting' },
  { to: '/poc/pdf', label: 'POC 3 — PDF export', note: 'Raster + vector-print paths' },
  { to: '/poc/fidelity', label: 'POC 4 — Fidelity comparison', note: 'Side-by-side original vs. pipeline output (Path A vs Path B)' },
];

export default function Home() {
  return (
    <div className="min-h-full bg-panel p-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-ink-900">AP LOI Builder</h1>
        <p className="mt-2 text-sm text-ink-700">
          Draft Letters of Intent from site data, pick optional language, fill blanks, edit inline, export.
        </p>
        <ul className="mt-6 space-y-2">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`block rounded-md border px-4 py-3 ${
                  l.primary
                    ? 'border-brand-orange bg-brand-orange text-white hover:brightness-105'
                    : 'border-panel-border bg-white hover:border-brand-orange hover:shadow-sm'
                }`}
              >
                <div className={`font-semibold ${l.primary ? 'text-white' : 'text-ink-900'}`}>{l.label}</div>
                <div className={`text-sm ${l.primary ? 'text-white/90' : 'text-ink-700'}`}>{l.note}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
