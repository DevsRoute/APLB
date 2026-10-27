// Hardwired linking map for the Baohouse template, extracted from the
// yellow-highlighted logic sentences in the v2 Optional Language Library.
//
// Rules (verbatim from the library):
//   - "If 'Additional Rent' is Gross Rent OR Fixed CAM → add CAM Cap Option 1 (None)"
//     Encoded as AUTO pairs.
//   - "For all other 'Additional Rent' options → offer only CAM Cap Options 2 or 3"
//     Encoded as FILTER restricting the reactive list.
//
// Shape:
//   { [proactiveClauseSlug]: {
//       [proactiveOptionSlug]: {
//         mode: 'auto' | 'filter',
//         reactive: { clause, option? , options? }
//       }
//     }
//   }
export const CLAUSE_LINKS = {
  additional_rent: {
    // Options 1, 2, 4 are the "all other" bucket — filter CAM Cap to {2, 3}.
    option_1: {
      mode: 'filter',
      reactive: { clause: 'cam_cap', options: ['option_2', 'option_3'] },
    },
    option_2: {
      mode: 'filter',
      reactive: { clause: 'cam_cap', options: ['option_2', 'option_3'] },
    },
    option_4: {
      mode: 'filter',
      reactive: { clause: 'cam_cap', options: ['option_2', 'option_3'] },
    },
    // Options 3 (Gross Rent) and 5 (Fixed CAM) — auto-pair CAM Cap Option 1 (None).
    option_3: {
      mode: 'auto',
      reactive: { clause: 'cam_cap', option: 'option_1' },
    },
    option_5: {
      mode: 'auto',
      reactive: { clause: 'cam_cap', option: 'option_1' },
    },
  },
};

export function resolveLink(clauseId, optionId) {
  return CLAUSE_LINKS[clauseId]?.[optionId] ?? null;
}

export function activeFiltersFor(reactiveClauseId, chosenLanguage) {
  const limits = [];
  for (const [proClauseId, perOption] of Object.entries(CLAUSE_LINKS)) {
    const picked = chosenLanguage[proClauseId];
    if (!picked) continue;
    const link = perOption[picked];
    if (!link || link.mode !== 'filter') continue;
    if (link.reactive.clause !== reactiveClauseId) continue;
    limits.push({ proClauseId, proOptionId: picked, options: link.reactive.options });
  }
  return limits;
}
