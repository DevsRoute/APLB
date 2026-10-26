// Hardwired linking map for the Dollar Tree Shopping Center LOI.
// Shape:
//   { [proactiveClauseId]: {
//       [proactiveOptionId]: {
//         mode: 'auto' | 'filter',
//         reactive: { clause: '<clauseId>', option?: '<optionId>', options?: ['<id>', ...] }
//       }
//     }
//   }
//
// 'auto'   — picking the proactive option automatically selects reactive.option.
// 'filter' — picking the proactive option limits the reactive clause's visible
//            list to reactive.options; user still manually picks one of them.
//
// Client will share the real map; keep examples minimal and valid so the UI can
// be exercised end-to-end.
export const CLAUSE_LINKS = {
  additional_rent: {
    triple_net_lease_without_admin_fee_cam_cap: {
      mode: 'auto',
      reactive: { clause: 'cam_cap', option: 'non_cumulative_don_t_show_if_language_chosen_by_default' },
    },
    use_for_fixed_cam_no_cam_cap: {
      mode: 'filter',
      reactive: { clause: 'cam_cap', options: ['excluded_costs'] },
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
