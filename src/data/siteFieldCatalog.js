// Site fields the LOI templates can reference. Key is the normalized placeholder
// name (lowercase, spaces/dashes collapsed to _). label is what the user sees.
// `source: 'sitetracker'` fields come from AP SiteTracker. 'computed' are built
// from other fields. 'manual' are flagged in the UI for the user to fill.
export const SITE_FIELDS = [
  { key: 'status',          label: 'Status',          source: 'sitetracker' },
  { key: 'state',           label: 'State',           source: 'sitetracker' },
  { key: 'city',            label: 'City',            source: 'sitetracker' },
  { key: 'submarket',       label: 'Submarket',       source: 'sitetracker' },
  { key: 'street',          label: 'Street',          source: 'sitetracker' },
  { key: 'project_name',    label: 'Project Name',    source: 'sitetracker' },
  { key: 'size',            label: 'Size (sqft)',     source: 'sitetracker' },
  { key: 'broker',          label: 'Broker',          source: 'sitetracker' },
  { key: 'brokerage',       label: 'Brokerage',       source: 'sitetracker' },
  { key: 'broker_email',    label: 'Broker Email',    source: 'sitetracker' },
  { key: 'll_name',         label: 'LL Name',         source: 'sitetracker' },
  { key: 'll_broker',       label: 'LL Broker',       source: 'sitetracker' },
  { key: 'll_brokerage',    label: 'LL Brokerage',    source: 'sitetracker' },
  { key: 'll_broker_email', label: 'LL Broker Email', source: 'sitetracker' },
  { key: 're_manager',      label: 'RE Manager',      source: 'sitetracker' },

  // Derived from site data
  { key: 'premises_address', label: 'Premises Address', source: 'computed' },
  { key: 'loi_date',         label: 'LOI Date',         source: 'computed' },

  // Flagged by client as "not yet in SiteTracker, can be added"
  { key: 'size_of_project',  label: 'Size of Project',  source: 'manual' },
  { key: 'lease_term',       label: 'Lease Term',       source: 'manual' },
  { key: 'options',          label: 'Options',          source: 'manual' },
  { key: 'rent_table',       label: 'Rent Table',       source: 'manual' },
];

export const FIELD_KEYS = SITE_FIELDS.map((f) => f.key);

// Normalize a human placeholder name (e.g. "LL Broker") into a key the catalog
// uses (e.g. "ll_broker"). Also fixes the "LL Brokage" typo the client has in
// the sample template.
export function normalizePlaceholderName(name) {
  const fixed = name.replace(/\bBrokage\b/gi, 'Brokerage');
  return fixed
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
