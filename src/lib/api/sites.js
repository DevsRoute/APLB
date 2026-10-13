// Backend-swap seam. Today: static JSON. Later: fetch('/api/sites').
import sites from '../../data/sites.json';

export async function listSites() {
  return sites;
}

export async function getSite(id) {
  return sites.find((s) => s.id === id) ?? null;
}
