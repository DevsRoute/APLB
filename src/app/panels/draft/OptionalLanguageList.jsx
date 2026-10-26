import clsx from 'clsx';
import { useState } from 'react';
import { useWork } from '../../WorkContext.jsx';
import { OPTIONAL_LANGUAGE } from '../../../data/optionalLanguage.js';
import { CLAUSE_LINKS, resolveLink, activeFiltersFor } from '../../../data/clauseLinks.js';

export default function OptionalLanguageList() {
  const { chosenLanguage, setChosenLanguage } = useWork();
  const [staged, setStaged] = useState({});

  function stage(clauseId, optionId) {
    const next = { ...staged, [clauseId]: optionId };
    const link = resolveLink(clauseId, optionId);
    if (link?.mode === 'auto' && link.reactive.option) {
      next[link.reactive.clause] = link.reactive.option;
    }
    setStaged(next);
  }

  function commit(clauseId, optionId) {
    const next = { ...chosenLanguage, [clauseId]: optionId };
    const link = resolveLink(clauseId, optionId);
    if (link?.mode === 'auto' && link.reactive.option) {
      next[link.reactive.clause] = link.reactive.option;
    }
    setChosenLanguage(next);
  }

  return (
    <div className="ap-scroll flex-1 overflow-auto">
      {OPTIONAL_LANGUAGE.map((clause) => {
        const filters = activeFiltersFor(clause.id, chosenLanguage);
        const allowed = filters.length === 0
          ? clause.options
          : clause.options.filter((o) => filters.some((f) => f.options.includes(o.id)));
        const stagedId = staged[clause.id];
        const committedId = chosenLanguage[clause.id];
        const autoFrom = findAutoSource(clause.id, committedId, chosenLanguage);

        return (
          <section key={clause.id} className="border-b border-black/10 last:border-b-0">
            <header className="flex items-baseline justify-between px-[21px] pt-[14px] pb-[10px]">
              <h2 className="text-[16px] font-bold leading-[16px] text-ap-text">
                {clause.heading}
              </h2>
              {filters.length > 0 && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#f5a623]">
                  Filtered via {clauseName(filters[0].proClauseId)}
                </span>
              )}
            </header>
            <ul>
              {allowed.map((opt) => (
                <li key={opt.id}>
                  <OptionRow
                    opt={opt}
                    staged={stagedId === opt.id}
                    committed={committedId === opt.id}
                    autoFrom={autoFrom && committedId === opt.id ? autoFrom : null}
                    onStage={() => stage(clause.id, opt.id)}
                    onCommit={() => commit(clause.id, opt.id)}
                  />
                </li>
              ))}
              {allowed.length === 0 && (
                <li className="px-[21px] pb-[12px] text-[11px] italic text-ap-text/70">
                  No options match the current selection filter.
                </li>
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function OptionRow({ opt, staged, committed, autoFrom, onStage, onCommit }) {
  const title = opt.label || firstSentence(opt.bodyParagraphs[0] ?? '') || '(unlabeled option)';
  const preview = opt.bodyParagraphs.slice(opt.label ? 0 : 1).join('\n\n');

  // Three visual states:
  //   committed → full dark background + "✓ IN LOI" badge
  //   staged    → full dark background + prominent Add to LOI button
  //   neither   → plain, hover tint
  const highlighted = committed || staged;

  return (
    <div
      className={clsx(
        'px-[21px] py-[10px]',
        highlighted ? 'bg-ap-dark text-white' : 'text-ap-text hover:bg-black/5',
      )}
    >
      <button
        type="button"
        onClick={onStage}
        className="block w-full text-left"
      >
        <div className="flex items-center gap-2">
          <div className="text-[13px] font-bold leading-[16px]">{title}</div>
          {opt.default && <Badge dark={highlighted} label="default" />}
          {autoFrom && (
            <span className={clsx(
              'rounded px-1.5 py-[1px] text-[9px] font-bold uppercase',
              committed ? 'bg-[#f5a623] text-white' : 'bg-[#f5a623]/20 text-[#f5a623]',
            )}>
              auto · {clauseName(autoFrom.clauseId)}
            </span>
          )}
          {committed && <Badge dark label="✓ IN LOI" />}
        </div>
        {preview && (
          <div className={clsx(
            'mt-[6px] whitespace-pre-wrap text-[12px] leading-[16px]',
            highlighted ? 'text-white' : 'text-ap-text/90',
          )}>
            {preview}
          </div>
        )}
      </button>

      {staged && !committed && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onCommit(); }}
          className="mt-[6px] block w-full text-right text-[12px] font-bold text-[#f5a623] hover:underline"
        >
          Add to LOI &gt;
        </button>
      )}
    </div>
  );
}

function Badge({ label, dark }) {
  return (
    <span className={clsx(
      'rounded px-1.5 py-[1px] text-[9px] font-bold uppercase',
      dark ? 'bg-white/20 text-white' : 'bg-ap-text/10 text-ap-text/80',
    )}>
      {label}
    </span>
  );
}

function firstSentence(s) {
  const m = s.match(/^.{0,120}?[.!?](\s|$)/);
  return m ? m[0].trim() : s.slice(0, 90).trim();
}

function clauseName(id) {
  const c = OPTIONAL_LANGUAGE.find((x) => x.id === id);
  return c?.heading ?? id;
}

function findAutoSource(reactiveClauseId, selectedOptionId, chosenLanguage) {
  if (!selectedOptionId) return null;
  for (const [proClauseId, perOption] of Object.entries(CLAUSE_LINKS)) {
    const chosenPro = chosenLanguage[proClauseId];
    if (!chosenPro) continue;
    const link = perOption[chosenPro];
    if (!link || link.mode !== 'auto') continue;
    if (link.reactive.clause !== reactiveClauseId) continue;
    if (link.reactive.option !== selectedOptionId) continue;
    return { clauseId: proClauseId, optionId: chosenPro };
  }
  return null;
}
