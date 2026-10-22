import { useState } from 'react';
import clsx from 'clsx';
import StepFooter from '../StepFooter.jsx';
import { OPTIONAL_LANGUAGE } from '../../../data/optionalLanguage.js';

export default function BuildOptionalLang() {
  const [categories, setCategories] = useState(OPTIONAL_LANGUAGE);
  const [selectedId, setSelectedId] = useState(categories[0]?.options[0]?.id ?? null);
  const [draggingId, setDraggingId] = useState(null);

  const activeCategory = findCategoryByClauseId(categories, selectedId) ?? categories[0];

  function addCategory() {
    const name = window.prompt('Category name');
    if (!name?.trim()) return;
    const id = `cat-${Date.now()}`;
    setCategories((cs) => [{ id, heading: name.trim(), options: [] }, ...cs]);
  }

  function addClause() {
    if (!activeCategory) return;
    const id = `clause-${Date.now()}`;
    setCategories((cs) =>
      cs.map((c) =>
        c.id !== activeCategory.id
          ? c
          : { ...c, options: [...c.options, { id, title: 'New clause', hint: 'Subtitle', text: '' }] },
      ),
    );
    setSelectedId(id);
  }

  function updateSelected(patch) {
    setCategories((cs) =>
      cs.map((c) => ({
        ...c,
        options: c.options.map((o) => (o.id === selectedId ? { ...o, ...patch } : o)),
      })),
    );
  }

  function moveClause(categoryId, fromId, toId) {
    if (fromId === toId) return;
    setCategories((cs) =>
      cs.map((c) => {
        if (c.id !== categoryId) return c;
        const from = c.options.findIndex((o) => o.id === fromId);
        const to = c.options.findIndex((o) => o.id === toId);
        if (from < 0 || to < 0) return c;
        const next = [...c.options];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        return { ...c, options: next };
      }),
    );
  }

  return (
    <>
      <ActionBar
        onNewCategory={addCategory}
        onNewClause={addClause}
        canUpdate={!!selectedId}
      />

      <div className="ap-scroll flex-1 overflow-auto pb-[20px]">
        {categories.map((category) => (
          <section key={category.id} className="pt-[25px]">
            <h2 className="px-[22px] pb-[10px] text-[16px] font-bold leading-[16px] text-ap-text">
              {category.heading}
            </h2>
            <ul>
              {category.options.map((clause) => (
                <li key={clause.id}>
                  <ClauseCard
                    clause={clause}
                    selected={selectedId === clause.id}
                    dragging={draggingId === clause.id}
                    onSelect={() => setSelectedId(clause.id)}
                    onDragStart={() => setDraggingId(clause.id)}
                    onDragEnd={() => setDraggingId(null)}
                    onDropOn={(fromId) => moveClause(category.id, fromId, clause.id)}
                    onEditBody={(text) => updateSelected({ text })}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <StepFooter
        prev={{ key: 'link-fields', label: 'Link Site Fields' }}
        next={{ key: 'underscores', label: 'Convert Underscores' }}
      />
    </>
  );
}

function findCategoryByClauseId(categories, clauseId) {
  return categories.find((c) => c.options.some((o) => o.id === clauseId));
}

function ActionBar({ onNewCategory, onNewClause, canUpdate }) {
  return (
    <div className="relative flex h-[43px] shrink-0 items-center justify-between bg-ap-light px-[25px]">
      <div className="flex items-center gap-[18px]">
        <ActionLink onClick={onNewCategory}>+ New Category</ActionLink>
        <ActionLink onClick={onNewClause}>+ New Clause</ActionLink>
      </div>

      <div className="flex items-center gap-[22px]">
        <button
          disabled={!canUpdate}
          className={clsx(
            'flex h-[43px] items-center px-[14px] text-[12px] font-bold',
            canUpdate ? 'bg-[#777] text-white' : 'bg-black/10 text-ap-text/60',
          )}
        >
          Update Clause
        </button>
        <ActionLink>Link</ActionLink>
      </div>
    </div>
  );
}

function ActionLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[12px] font-bold text-ap-text2 hover:text-ap-text hover:underline"
    >
      {children}
    </button>
  );
}

function ClauseCard({
  clause,
  selected,
  dragging,
  onSelect,
  onDragStart,
  onDragEnd,
  onDropOn,
  onEditBody,
}) {
  const headerBg = selected ? 'bg-ap-dark' : 'bg-[#F6F6F6]';
  const titleColor = selected ? 'text-[#FBB040]' : 'text-ap-text';
  const bodyBg = selected ? 'bg-[#777] text-white' : 'bg-white text-ap-text';

  function handleDrop(e) {
    e.preventDefault();
    const fromId = e.dataTransfer.getData('text/clause-id');
    if (fromId) onDropOn(fromId);
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('text/clause-id', clause.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  }

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={onSelect}
      className={clsx(
        'cursor-pointer border-b border-black/5 transition-opacity',
        dragging && 'opacity-50',
      )}
    >
      <header
        className={clsx(
          'relative flex items-start justify-between px-[22px] pt-[6px]',
          headerBg,
          clause.hint ? 'h-[44px]' : 'h-[32px]',
        )}
      >
        <div className="flex items-start gap-[8px]">
          <div>
            <div className={clsx('text-[12px] font-bold leading-[16px]', titleColor)}>
              {clause.title}
            </div>
            {clause.hint && (
              <div className={clsx('text-[9px] font-normal leading-[16px]', titleColor)}>
                {clause.hint}
              </div>
            )}
          </div>
          {selected && <EditIcon />}
        </div>
        <DragHandle color={selected ? 'white' : '#777'} />
      </header>

      <div
        className={clsx(
          'whitespace-pre-wrap px-[22px] py-[6px] text-[12px] leading-[16px]',
          bodyBg,
        )}
      >
        {selected ? (
          <textarea
            value={clause.text}
            onChange={(e) => onEditBody(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            rows={Math.max(3, (clause.text.match(/\n/g)?.length ?? 0) + 3)}
            className="w-full resize-none bg-transparent text-white placeholder-white/60 focus:outline-none"
            placeholder="Clause text..."
          />
        ) : (
          clause.text
        )}
      </div>
    </article>
  );
}

function DragHandle({ color = '#777' }) {
  return (
    <span className="mt-[3px] grid cursor-grab gap-[2px]" title="Drag to reorder">
      <span className="block h-[3px] w-[14px] rounded-[1.5px]" style={{ background: color }} />
      <span className="block h-[3px] w-[14px] rounded-[1.5px]" style={{ background: color }} />
      <span className="block h-[3px] w-[14px] rounded-[1.5px]" style={{ background: color }} />
    </span>
  );
}

function EditIcon() {
  return (
    <span className="mt-[3px] inline-block" title="Edit">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(-45deg)' }}
      >
        <path d="M3.25 1.2L3.25 3.8L1 2.5L3.25 1.2Z" fill="#FBB040" stroke="#FBB040" />
        <rect x="5" y="0" width="11" height="5" fill="#FBB040" />
      </svg>
    </span>
  );
}
