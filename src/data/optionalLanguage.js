// Optional-language blocks per template. Each block has a question, a list of
// options, and the text each option would drop into the LOI.
export const OPTIONAL_LANGUAGE = [
  {
    id: 'existing-tenant',
    heading: 'Existing Tenant in Premises',
    options: [
      {
        id: 'no',
        title: 'No existing Tenant',
        hint: 'Use this when Premises have no Tenant',
        text: 'No',
      },
      {
        id: 'has',
        title: 'Has Existing Tenant',
        hint: 'Use this when Premises have an existing Tenant',
        text: 'Yes; lease expires on ______; or upon notice to vacate within ____ days',
      },
    ],
  },
  {
    id: 'additional-rent',
    heading: 'Additional Rent',
    options: [
      {
        id: 'cam-cap',
        title: 'Use for Triple Net Leases without Admin Fee',
        hint: 'Tenant to contribute its proportionate share of real estate taxes, insurance costs, and common area maintenance expenses.',
        text: 'Tenant shall pay its pro-rata share of Taxes, Insurance and CAM (collectively, "Additional Rent"). CAM Caps for the first full calendar year shall not exceed $__/sqft, with an annual cap on controllable CAM increases of __% uncompounded over the previous year’s base.',
      },
      {
        id: 'cam-with-admin',
        title: 'Use for Gross Rent',
        hint: 'For Gross-rent arrangements where all expenses are included in base rent.',
        text: 'Rent is "gross" and inclusive of taxes, insurance, and CAM. Landlord is solely responsible for all property-level operating expenses.',
      },
      {
        id: 'cam-modified',
        title: 'Use for Modified Gross — Use for Modified Gross Rent',
        hint: 'A hybrid structure. The base year is agreed and increases over the base year are shared.',
        text: 'Base Year is the first full calendar year of the Term. Tenant shall pay its proportionate share of any increase in Taxes, Insurance and CAM above the Base Year amount.',
      },
    ],
  },
  {
    id: 'cam-cap',
    heading: 'CAM Cap',
    options: [
      {
        id: 'none',
        title: 'No CAM Cap',
        hint: 'No cap language is inserted.',
        text: '',
      },
      {
        id: 'cumulative',
        title: 'Cumulative',
        hint: 'Caps are cumulative year over year.',
        text: 'Any under-cap in a given year shall be carried forward for use in subsequent years, cumulatively.',
      },
    ],
  },
];
