import Fuse from 'fuse.js';
import { FIELD_KEYS, SITE_FIELDS, normalizePlaceholderName } from '../data/siteFieldCatalog.js';

const fuse = new Fuse(FIELD_KEYS, { threshold: 0.4, includeScore: true });

// placeholders: array of raw placeholder names (e.g. "LL Broker", "Premises Address")
// → { placeholderName: fieldKey | null }
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

// Build the data object passed to docxtemplater. Handles computed fields
// (premises_address, loi_date) and leaves manual ones blank.
export function buildFillData(site, mapping) {
  const data = {};
  for (const [placeholder, fieldKey] of Object.entries(mapping)) {
    data[placeholder] = resolveField(site, fieldKey);
  }
  return data;
}

function resolveField(site, fieldKey) {
  if (!fieldKey) return '';
  if (fieldKey === 'loi_date') {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  if (fieldKey === 'premises_address') {
    if (!site) return '';
    const parts = [site.street, site.city, site.state].filter(Boolean);
    return parts.join(', ');
  }
  const field = SITE_FIELDS.find((f) => f.key === fieldKey);
  if (field?.source === 'manual') return site?.[fieldKey] ?? '';
  return site?.[fieldKey] ?? '';
}
