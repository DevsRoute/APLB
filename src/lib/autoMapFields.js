import Fuse from 'fuse.js';
import { FIELD_KEYS, normalizePlaceholderName } from '../data/siteFieldCatalog.js';

const fuse = new Fuse(FIELD_KEYS, { threshold: 0.4, includeScore: true });

export function autoMapFields(placeholders) {
  const out = {};
  for (const p of placeholders) {
    const normalized = normalizePlaceholderName(p);
    if (FIELD_KEYS.includes(normalized)) { out[p] = normalized; continue; }
    const [best] = fuse.search(normalized);
    out[p] = best ? best.item : null;
  }
  return out;
}

export function buildFillData(site, mapping) {
  const data = {};
  for (const [placeholder, fieldKey] of Object.entries(mapping)) {
    data[placeholder] = resolve(site, fieldKey);
  }
  return data;
}

function resolve(site, fieldKey) {
  if (!fieldKey) return '';
  if (fieldKey === 'today' || fieldKey === 'loi_date') {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  if (fieldKey === 'premises_address') {
    if (!site) return '';
    return [site.street, site.city, site.state].filter(Boolean).join(', ');
  }
  return site?.[fieldKey] ?? '';
}
