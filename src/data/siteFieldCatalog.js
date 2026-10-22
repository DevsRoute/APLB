export const SITE_FIELDS = [
  { key: 'status',           label: 'Status' },
  { key: 'state',            label: 'State' },
  { key: 'city',             label: 'City' },
  { key: 'street',           label: 'Street' },
  { key: 'project_name',     label: 'Project Name' },
  { key: 'size',             label: 'Size' },
  { key: 'size_of_project',  label: 'Size of Project' },
  { key: 'broker',           label: 'Broker' },
  { key: 'brokerage',        label: 'Brokerage' },
  { key: 'broker_email',     label: 'Broker Email' },
  { key: 'll_name',          label: 'LL Name' },
  { key: 'll_broker',        label: 'LL Broker' },
  { key: 'll_brokerage',     label: 'LL Brokerage' },
  { key: 'll_broker_email',  label: 'LL Broker Email' },
  { key: 're_manager',       label: 'RE Manager' },
  { key: 'lease_term',       label: 'Lease Term' },
  { key: 'options',          label: 'Options' },
  { key: 'rent_table',       label: 'Rent Table' },
  { key: 'existing_tenant',  label: 'Existing Tenant' },
  { key: 'ownership_status', label: 'Ownership Status' },
  { key: 'today',            label: "Today's Date" },
  { key: 'loi_date',         label: 'LOI Date' },
  { key: 'premises_address', label: 'Premises Address' },
];

export const FIELD_KEYS = SITE_FIELDS.map((f) => f.key);

export function normalizePlaceholderName(name) {
  // DT template ships with "Brokage" instead of "Brokerage" — fix before matching.
  const fixed = name.replace(/\bBrokage\b/gi, 'Brokerage');
  return fixed
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
