const TEMPLATES = [
  {
    id: 'baohouse-apst-v2',
    name: 'Baohouse Shopping Center LOI APST (v2)',
    updated: 'Oct 27, 2026',
    url: '/templates/baohouse-apst-v2.docx',
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
