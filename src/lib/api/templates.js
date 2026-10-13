// Templates list. Today: static mapping to files in /public/templates.
// Tomorrow: fetch('/api/templates') + presigned URLs from the backend.
const TEMPLATES = [
  {
    id: 'dt-shopping-center',
    name: 'LOI - DT Shopping Center (APST Template)',
    updated: 'Jul 7, 2025',
    url: '/templates/dt-shopping-center.docx',
  },
  {
    id: 'dt-optional-language',
    name: 'LOI - DT Optional Language Library',
    updated: 'Jul 7, 2025',
    url: '/templates/dt-optional-language.docx',
  },
  {
    id: 'sample-loi',
    name: 'LOI - built-in sample',
    updated: 'Oct 12, 2026',
    url: '/templates/sample-loi.docx',
  },
];

export async function listTemplates() {
  return TEMPLATES;
}

export async function fetchTemplate(id) {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown template: ${id}`);
  const res = await fetch(t.url);
  if (!res.ok) throw new Error(`Failed to fetch ${t.url}: ${res.status}`);
  return { meta: t, arrayBuffer: await res.arrayBuffer() };
}
