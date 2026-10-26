const TEMPLATES = [
  {
    id: 'loi-apst-latest',
    name: 'DT Shopping Center LOI APST (latest)',
    updated: 'Oct 24, 2026',
    url: '/templates/dt-apst-latest.docx',
  },
  {
    id: 'loi-shopping-center',
    name: 'LOI - shopping center',
    updated: 'Oct 10, 2025',
    url: '/templates/dt-shopping-center.docx',
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
