export const OPTIONAL_LANGUAGE = [
  {
    "id": "existing_tenant_in_premises",
    "heading": "Existing Tenant in Premises",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. No Existing Tenant in Premises",
        "bodyParagraphs": [
          "No"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Existing Tenant in Premises",
        "bodyParagraphs": [
          "Yes; lease expires on _______________; or upon notice to vacate within _____ days."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "ll_property_ownership_status",
    "heading": "LL Property Ownership Status",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. Landlord owns Property",
        "bodyParagraphs": [
          "Landlord is current fee owner."
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Landlord is under Contract to Purchase Property",
        "bodyParagraphs": [
          "Landlord is under contract to purchase the property.",
          "Anticipated closing date is ____________________."
        ],
        "default": false
      },
      {
        "id": "option_3",
        "label": "Option 3. Landlord is Ground Leasing the Property",
        "bodyParagraphs": [
          "Landlord is Tenant/Ground Tenant.",
          "(Non-Disturbance Agreement from fee owner required.)"
        ],
        "default": false
      }
    ]
  },
  {
    "id": "rent_commencement_date",
    "heading": "Rent Commencement Date",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. If Later Of",
        "bodyParagraphs": [
          "The later of (i) ___ days after the Delivery Date or (ii) ____ days after receipt of Tenant’s Permits, but in no event later than the date when Tenant opens for business."
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Specific Days after Delivery Date",
        "bodyParagraphs": [
          "___ days after the Delivery Date."
        ],
        "default": false
      },
      {
        "id": "option_3",
        "label": "Option 3. If Earlier Of",
        "bodyParagraphs": [
          "The earlier of (a) ___ days after the Delivery Date or (b) the date when Tenant opens for business."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "additional_rent",
    "heading": "Additional Rent",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. TRIPLE-NET LEASE without Admin Fee",
        "bodyParagraphs": [
          "CAM Costs: Tenant to reimburse Landlord for its proportionate share of CAM Costs, not to exceed $_____ per square foot in the first full calendar year. CAM Costs shall not include any insurance costs, real estate taxes, administrative or management costs, capital expenditures, reserves, or other costs not related to the operation, maintenance, or repair of the common areas.",
          "Real Estate Taxes: Tenant to pay its proportionate share of Real Estate Taxes, not to exceed $________ per square foot in the first full calendar year.",
          "Property Insurance: Tenant to pay its proportionate share of Property Insurance, not to exceed $________ per square foot in the first full calendar year."
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. TRIPLE-NET LEASE with Admin Fee",
        "bodyParagraphs": [
          "CAM Costs: Tenant to reimburse Landlord for its proportionate share of CAM Costs, not to exceed $_____ per square foot in the first full calendar year. CAM Costs shall not include any insurance costs, real estate taxes, administrative or management costs, capital expenditures, reserves, or other costs not related to the operation, maintenance, or repair of the common areas.",
          "Real Estate Taxes: Tenant to pay its proportionate share of Real Estate Taxes, not to exceed $________ per square foot in the first full calendar year.",
          "Property Insurance: Tenant to pay its proportionate share of Property Insurance, not to exceed $________ per square foot in the first full calendar year.",
          "As part of CAM Costs, Tenant will pay an Administrative Fee equal to __% of CAM Costs per year, excluding from CAM Costs for purposes of this calculation (a) capital costs, if otherwise permitted in CAM Costs, (b) the cost of electricity and other utilities, (c) Real Estate Taxes and (d) Property Insurance."
        ],
        "default": false
      },
      {
        "id": "option_3",
        "label": "Option 3. Use for GROSS RENT",
        "bodyParagraphs": [
          "Landlord to be responsible for the payment of all costs related to the operation, maintenance, and repair of the Shopping Center, including real estate taxes and insurance, without reimbursement from Tenant other than payment of Gross Rent."
        ],
        "default": false
      },
      {
        "id": "option_4",
        "label": "Option 4. Use for MODIFIED GROSS RENT – TAX INCREASES ONLY",
        "bodyParagraphs": [
          "Landlord to be responsible for the payment of all costs related to the operation, maintenance, and repair of the Shopping Center, including real estate taxes and insurance. Tenant to reimburse Landlord only for the amount by which real estate taxes increase above the Base Year. If substantially all improvements in the Shopping Center are completed and assessed, the “Base Year” shall be the 12-month tax period in which the Rent Commencement Date occurs. If the Shopping Center is recently constructed or substantially improved, the “Base Year” shall be the first 12-month tax period for which the real estate tax assessment is based on the completed improvements."
        ],
        "default": false
      },
      {
        "id": "option_5",
        "label": "Option 5. Use for FIXED CAM",
        "bodyParagraphs": [
          "Tenant to contribute to Landlord’s common area maintenance expenses by paying fixed CAM of $____ per square foot in the first full calendar year. Thereafter, Tenant’s fixed CAM contribution shall increase by _____% per annum. Except for payment of fixed CAM, Tenant shall have no obligation to pay or reimburse Landlord for expenses incurred in operating, maintaining, or managing the common areas of the Shopping Center.",
          "Real Estate Taxes: Tenant to pay its proportionate share of Real Estate Taxes, not to exceed $________ per square foot in the first full calendar year.",
          "Property Insurance: Tenant to pay its proportionate share of Property Insurance, not to exceed $________ per square foot in the first full calendar year."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "cam_cap",
    "heading": "CAM Cap",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. None",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Non-Cumulative (default)",
        "bodyParagraphs": [
          "CAM Costs for the first full calendar year of the Term will be limited as provided under Additional Rent. Thereafter, the Cap Percentage is __%.",
          "For the calendar year immediately following the first full calendar year (i.e., year 2), Tenant’s Proportionate Share of CAM Costs shall not increase by more than the Cap Percentage over the average monthly CAM Costs payable by Tenant during the first full calendar year of the Lease Term (based upon final year end reconciliations after the first full calendar year) multiplied by 12. Thereafter, in no event shall Tenant’s Proportionate Share of CAM Costs increase from any one calendar year to the immediately succeeding calendar year, by more than the Cap Percentage on a non-cumulative basis (“CAM Cap”). The phrase, on a “non-cumulative basis” means whenever the CAM Costs in a given year do not exceed the CAM Cap for that year, the actual CAM Costs for that year will be the basis for calculating the CAM Cap for the subsequent year."
        ],
        "default": true
      },
      {
        "id": "option_3",
        "label": "Option 3. Cumulative",
        "bodyParagraphs": [
          "CAM Costs for the first full calendar year of the Term will be limited as provided under Additional Rent. Thereafter, the Cap Percentage is __%.",
          "For the calendar year immediately following the first full calendar year of the Lease Term (i.e., year 2), Tenant’s Proportionate Share of CAM Costs shall not increase by more than the Cap Percentage over the first year CAM cap. Thereafter, the CAM Cap will increase from each calendar year to the immediately succeeding calendar year, by the Cap Percentage on a cumulative basis. The phrase “on a cumulative basis” means the CAM Cap shall increase annually in accordance with the formula described above notwithstanding the fact that Tenant’s Proportionate Share of actual CAM Costs in any given year may be less than the CAM Cap in that year."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "tenant_allowance",
    "heading": "Tenant Allowance",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. No Tenant Allowance",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Total Fixed Tenant Allowance Amount",
        "bodyParagraphs": [
          "$_____. The Tenant Allowance will be due within 30 days after Tenant opens for business to the public, failing which Tenant shall be entitled to credit the unpaid Tenant Allowance against Rent."
        ],
        "default": false
      },
      {
        "id": "option_3",
        "label": "Option 3. Per Square Foot Allowance Amount (default)",
        "bodyParagraphs": [
          "______per square foot. The Tenant Allowance will be due within 30 days after Tenant opens for business to the public, failing which Tenant shall be entitled to credit the unpaid Tenant Allowance against Rent."
        ],
        "default": true
      }
    ]
  },
  {
    "id": "free_rent",
    "heading": "Free Rent",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. No Free Rent",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Total Monetary free rent value",
        "bodyParagraphs": [
          "$___________. Tenant shall receive a credit against Base Rent in the amount of the Free Rent, commencing on the Rent Commencement Date."
        ],
        "default": false
      },
      {
        "id": "option_3",
        "label": "Option 3. Number of free base rent months (default language)",
        "bodyParagraphs": [
          "____months of Base Rent. Tenant shall receive a credit against Base Rent in the amount of the Free Rent, commencing on the Rent Commencement Date."
        ],
        "default": true
      }
    ]
  },
  {
    "id": "hvac",
    "heading": "HVAC",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. If Using Existing Systems",
        "bodyParagraphs": [
          "Existing Systems – Survey Required: Tenant will obtain a survey of the HVAC System promptly after execution of this Confirmation Letter to verify the condition. If the survey shows the HVAC System is not more than five (5) years old, provides a minimum of one (1) ton per three hundred fifty (350) square feet of floor area, and is in good working order, Tenant will accept the existing HVAC System. If the survey shows the HVAC system does not meet the minimum requirements, Landlord will replace the existing HVAC equipment or install additional HVAC equipment as necessary as part of Landlord’s Work, in accordance with Tenant’s requirements. During the initial Lease term, Landlord will be solely responsible, at Landlord’s sole cost and expense, to maintain, repair and replace the HVAC System, as necessary, with at least equivalent capacity, so that at all times during the initial Lease term the HVAC System is fully operational. Thereafter, Tenant will be responsible, at Tenant’s sole cost and expense, to maintain and repair the HVAC System; provided that Tenant will be entitled to the benefits of any contractors’ warranties with regard to workmanship and installation as well as the benefit of any manufacturer’s warranty for the HVAC System so long as such warranties remain in effect; and provided, further, that Landlord will be responsible for any repairs or replacement covered by Landlord’s insurance policies."
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. If Landlord is Delivering Systems",
        "bodyParagraphs": [
          "New Systems: Landlord will provide a new, fully operational HVAC System which complies with the requirements set forth in Exhibit C attached hereto when the Premises are delivered to Tenant. Tenant will maintain and repair the HVAC System during the Lease term; provided that Tenant will be entitled to the benefits of any contractors’ warranties with regard to workmanship and installation as well as the benefit of any manufacturer’s warranty for the HVAC System so long as such warranties remain in effect; and provided, further, that Landlord will be responsible for any repairs or replacement covered by Landlord’s insurance policies."
        ],
        "default": false
      },
      {
        "id": "option_3",
        "label": "Option 3. If Tenant takes Full Responsibility of HVAC",
        "bodyParagraphs": [
          "No LL Obligation: Landlord will deliver the existing HVAC System, if any, in its “as is, where is” condition. Landlord makes no representation or warranty as to the existence or function of the HVAC System and Tenant shall be solely responsible to install, maintain and repair such system during the Lease term, provided that Landlord will be responsible for any repairs or replacement covered by Landlord’s insurance policies."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "use_protections",
    "heading": "Use Protections",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. No Renegade Tenants (default)",
        "bodyParagraphs": [
          "<None>"
        ],
        "default": true
      },
      {
        "id": "option_2",
        "label": "Option 2. If Renegade Language is Needed",
        "bodyParagraphs": [
          "Renegade Tenants. If any tenant or occupant of the Shopping Center violates the Use Protections and such violation also constitutes a default under its lease with Landlord (a “Renegade Tenant”), then Tenant’s right to pay Alternate Rent shall be tolled provided that Landlord shall have promptly commenced appropriate legal proceedings against the Renegade Tenant and thereafter diligently prosecutes such proceedings to completion. If Landlord fails to commence such proceedings promptly or thereafter fails to prosecute such proceedings diligently to completion, or if the violation does not cease within 120 days after Landlord has been made aware of such violation (regardless of Landlord’s efforts to stop it), then Tenant shall be entitled to pay Alternate Rent effective as of the date the violation first commenced and continuing for so long as such violation continues. If the violation has not been cured after 12 months, Tenant shall have the ongoing option to terminate the Lease or continue to pay Alternate Rent until the violation is cured. If Tenant elects to terminate the Lease as a result of the violation of the Use Protections by a Renegade Tenant, Tenant shall provide Landlord with written notice of termination and the Lease shall terminate on the date 30 days after the date of Tenant’s notice. Landlord shall not be obligated to reimburse Tenant for the unamortized costs of Tenant’s leasehold improvements in the event of any termination as a result of a renegade tenant."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "co_tenancy_a",
    "heading": "Co-Tenancy A",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. If no Co-Tenancy Language is Needed",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. If Co-Tenancy is Necessary for a Brand-New Development",
        "bodyParagraphs": [
          "Opening: _____________________ is open for business to the public in 100% of its premises and/or ____________ percent (__%) of the Shopping Center GLA is leased to retail tenants and open for business to the public. If the delivery date occurs before this “Opening Co-Tenancy Requirement” is satisfied, Tenant shall have the option of either (a) delaying acceptance of the Premises and extending the delivery date until a later date to be identified by Tenant to Landlord or until the Opening Co-Tenancy Requirement is satisfied, whichever occurs first, or (b) accepting the Premises on the delivery date, subject to a reduction in rent and other rights described in the Lease."
        ],
        "default": false
      },
      {
        "id": "option_3",
        "label": "Option 3. Ongoing #1 (Named Tenant)",
        "bodyParagraphs": [
          "____________________ or a suitable replacement tenant (as further defined in the Lease) occupying at least ninety percent (90%) of the square footage currently occupied by _________________ in the Shopping Center is open for business to the public in its current premises as identified on the Site Plan."
        ],
        "default": false
      },
      {
        "id": "option_4",
        "label": "Option 4. Ongoing #2 (Combination of Multiple Named Co-Tenants)",
        "bodyParagraphs": [
          "At least ___ of the following ___ tenants or their suitable replacement tenants (as further defined in the Lease) occupying at least ninety percent (90%) of the square footage currently occupied by such tenants are open for business to the public in their current premises in the Shopping Center as identified on the Site Plan: ______________________, ___________________, _________________."
        ],
        "default": false
      },
      {
        "id": "option_5",
        "label": "Option 5. Ongoing #3 (% of total GLA or minimum square footage but not specific tenants)",
        "bodyParagraphs": [
          "Tenants operating retail businesses are open for business to the public for retail uses in not less than ____________________ square feet in the Shopping Center/____% of Shopping Center GLA. Premises GLA shall be included for purposes of determining whether this requirement has been satisfied. A gymnasium, sports or health club, a banquet hall, auditorium or other place of public assembly, a medical facility, including a facility for the provision of medical services or a facility providing physical therapy services, and other non-retail uses (except for office or storage facilities incidental to a primary retail operation) shall not satisfy the Ongoing Co-Tenancy Requirement unless Tenant expressly agrees to such use in writing following a request from Landlord."
        ],
        "default": false
      },
      {
        "id": "option_6",
        "label": "Option 6. Ongoing Option #4 (named co-tenant or % of total GLA or minimum square footage)",
        "bodyParagraphs": [
          "Either (a) ____________________ or a suitable replacement tenant (as further defined in the Lease) occupying at least ninety percent (90%) of the square footage currently occupied by _________________ in the Shopping Center is open for business to the public in its current premises as identified on the Site Plan or (b) tenants operating retail businesses are open for business to the public for retail uses in not less than ________________ square feet in the Shopping Center/__% of Shopping Center GLA]. Premises GLA shall be included for purposes of determining whether the required occupancy has been satisfied."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "co_tenancy_b",
    "heading": "Co-Tenancy B",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. None",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Default language for any “ongoing language”",
        "bodyParagraphs": [
          "At any time when this “Ongoing Co-Tenancy Requirement” is not satisfied, Tenant will pay Alternate Rent equal to 1% of gross sales, not to exceed 50% of Base Rent. If the Ongoing Co-Tenancy Requirement remains unsatisfied until the later of (a) 6 months following the date when the Ongoing Co-Tenancy Requirement first failed to be satisfied or (b) 6 months following the date when Tenant had actual notice at the address specified in the Lease that the Ongoing Co-Tenancy Requirement was no longer satisfied, Tenant will have the ongoing right to terminate the Lease. .]"
        ],
        "default": true
      }
    ]
  },
  {
    "id": "early_termination",
    "heading": "Early Termination",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. No Early Termination",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. With Early Termination",
        "bodyParagraphs": [
          "In the event gross sales from the Premises aggregate less than $_________________________ during the period beginning on the 1st day of the ______ full month of the Lease term and ending on the last day of the ____ full month of the Lease term, Tenant may terminate the Lease without penalty or premium by providing Landlord with written notice of termination"
        ],
        "default": false
      }
    ]
  },
  {
    "id": "brokerage",
    "heading": "Brokerage",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. Broker Involved",
        "bodyParagraphs": [
          "Landlord to recognize ___________ as Tenant’s broker and to pay Tenant’s broker per separate agreement."
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. No Broker Involved",
        "bodyParagraphs": [
          "Landlord and Tenant each represent that it has not contacted any agent or broker in connection with a lease for the Premises."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "exhibit_b",
    "heading": "Exhibit B",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. As-is",
        "bodyParagraphs": [
          "Not Applicable"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Exhibit B Language",
        "bodyParagraphs": [
          "(TBD)"
        ],
        "default": false
      }
    ]
  },
  {
    "id": "exhibit_c",
    "heading": "Exhibit C",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. As-is",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Exhibit C Language",
        "bodyParagraphs": [
          "See attached."
        ],
        "default": false
      }
    ]
  },
  {
    "id": "exhibit_e",
    "heading": "Exhibit E",
    "options": [
      {
        "id": "option_1",
        "label": "Option 1. None",
        "bodyParagraphs": [
          "None"
        ],
        "default": false
      },
      {
        "id": "option_2",
        "label": "Option 2. Exhibit E Language",
        "bodyParagraphs": [
          "Landlord to insert restriction language."
        ],
        "default": false
      }
    ]
  }
];
