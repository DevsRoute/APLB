const TEMPLATES = [
  {
    id: 'dt-shopping-center',
    name: 'DT Shopping Center LOI (default)',
    updated: 'Jul 7, 2025',
    url: '/templates/dt-shopping-center.docx',
  },
  {
    id: 'sample-loi',
    name: 'Minimal sample LOI',
    updated: new Date().toISOString().slice(0, 10),
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
