export const OPTIONAL_LANGUAGE = [
  {
    id: 'additional-rent',
    heading: 'Additional Rent',
    options: [
      {
        id: 'triple-net',
        title: 'Use for Triple Net Lease without Admin Fee',
        hint: 'Has CAM Cap',
        text:
          'CAM Costs:  Tenant to reimburse Landlord for its proportionate share of CAM Costs, not to exceed $_____ per square foot in the first full calendar year.  CAM Costs shall not include any insurance costs, real estate taxes, administrative or management costs, capital expenditures, reserves, or other costs not related to the operation, maintenance, or repair of the common areas.\n\nReal Estate Taxes:  Tenant to pay its proportionate share of Real Estate Taxes, not to exceed $________ per square foot in the first full calendar year.\n\nProperty Insurance:  Tenant to pay its proportionate share of Property Insurance, not to exceed $________ per square foot in the first full calendar year.',
      },
      {
        id: 'gross-rent',
        title: 'Use for Gross Rent',
        hint: 'No CAM Cap',
        text:
          'Landlord to be responsible for the payment of all costs related to the operation, maintenance, and repair of the Shopping Center, including real estate taxes and insurance, without reimbursement from Tenant other than payment of Gross Rent.',
      },
      {
        id: 'modified-gross-cam',
        title: 'Use for Modified Gross Rent — CAM Cap',
        hint: 'Tax Increases Only',
        text:
          'Landlord to be responsible for the payment of all costs related to the operation, maintenance, and repair of the Shopping Center, including real estate taxes and insurance. Tenant to reimburse Landlord only for the amount by which real estate taxes increase above the Base Year. If substantially all improvements in the Shopping Center are completed and assessed, the “Base Year” shall be the 12-month tax period in which the Rent Commencement Date occurs. If the Shopping Center is recently constructed or substantially improved, the “Base Year” shall be the first 12-month tax period for which the real estate tax assessment is based on the completed improvements.',
      },
      {
        id: 'modified-gross-tax',
        title: 'Use for Modified Gross Rent — Tax Increases Only',
        hint: 'CAM Cap',
        text:
          'Landlord to be responsible for the payment of all costs related to the operation, maintenance, and repair of the Shopping Center, including real estate taxes and insurance. Tenant to reimburse Landlord only for the amount by which real estate taxes increase above the Base Year.',
      },
    ],
  },
  {
    id: 'existing-tenant',
    heading: 'Existing Tenant in Premises',
    options: [
      {
        id: 'none',
        title: 'No existing Tenant',
        hint: 'Use when the Premises have no Tenant',
        text: 'No',
      },
      {
        id: 'has',
        title: 'Has Existing Tenant',
        hint: 'Use when the Premises have an existing Tenant',
        text: 'Yes; lease expires on ______; or upon notice to vacate within ____ days',
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
        hint: 'No cap language is inserted',
        text: '',
      },
      {
        id: 'cumulative',
        title: 'Cumulative',
        hint: 'Caps are cumulative year over year',
        text: 'Any under-cap in a given year shall be carried forward for use in subsequent years, cumulatively.',
      },
    ],
  },
];
