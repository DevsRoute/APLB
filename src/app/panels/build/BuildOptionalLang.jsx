import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import StepFooter from '../StepFooter.jsx';
import { OPTIONAL_LANGUAGE } from '../../../data/optionalLanguage.js';

export default function BuildOptionalLang() {
  const [blocks, setBlocks] = useState(OPTIONAL_LANGUAGE);
  const [openId, setOpenId] = useState(blocks[0]?.id);
  const open = blocks.find((b) => b.id === openId);

  function updateOption(blockId, optId, patch) {
    setBlocks((bs) => bs.map((b) => b.id !== blockId ? b : {
      ...b,
      options: b.options.map((o) => o.id !== optId ? o : { ...o, ...patch }),
    }));
  }

  function addOption() {
    const optId = `opt-${Date.now()}`;
    setBlocks((bs) => bs.map((b) => b.id !== openId ? b : {
      ...b,
      options: [...b.options, { id: optId, title: 'New option', hint: '', text: '' }],
    }));
  }

  function removeOption(optId) {
    setBlocks((bs) => bs.map((b) => b.id !== openId ? b : {
      ...b,
      options: b.options.filter((o) => o.id !== optId),
    }));
  }

  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto px-[21px] pt-[12px]">
        <h2 className="text-[16px] font-bold leading-[16px] text-ap-text">Optional Language Library</h2>

        <div className="mt-[12px] flex flex-wrap gap-[6px]">
          {blocks.map((b) => (
            <button
              key={b.id}
              onClick={() => setOpenId(b.id)}
              className={`border px-[10px] py-[4px] text-[11px] font-bold ${
                b.id === openId
                  ? 'border-ap-dark bg-ap-dark text-white'
                  : 'border-black/30 bg-white text-ap-text hover:bg-black/5'
              }`}
            >
              {b.heading}
            </button>
          ))}
        </div>

        {open && (
          <div className="mt-[12px]">
            <input
              value={open.heading}
              onChange={(e) =>
                setBlocks((bs) => bs.map((b) => b.id === open.id ? { ...b, heading: e.target.value } : b))
              }
              className="mb-[10px] w-full border border-black/20 bg-white px-[8px] py-[6px] text-[13px] font-bold focus:border-ap-dark focus:outline-none"
            />
            <ul className="space-y-[10px]">
              {open.options.map((o) => (
                <li key={o.id} className="border border-black/15 bg-white p-[10px]">
                  <div className="flex items-start gap-[6px]">
                    <input
                      value={o.title}
                      onChange={(e) => updateOption(open.id, o.id, { title: e.target.value })}
                      className="flex-1 border border-black/20 px-[6px] py-[4px] text-[12px] font-bold focus:border-ap-dark focus:outline-none"
                    />
                    <button
                      onClick={() => removeOption(o.id)}
                      className="rounded p-[4px] text-ap-text hover:bg-black/5"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <textarea
                    value={o.hint}
                    onChange={(e) => updateOption(open.id, o.id, { hint: e.target.value })}
                    placeholder="Hint shown to drafter"
                    rows={2}
                    className="mt-[6px] w-full border border-black/20 px-[6px] py-[4px] text-[11px] focus:border-ap-dark focus:outline-none"
                  />
                  <textarea
                    value={o.text}
                    onChange={(e) => updateOption(open.id, o.id, { text: e.target.value })}
                    placeholder="Text inserted into the LOI"
                    rows={3}
                    className="mt-[6px] w-full border border-black/20 px-[6px] py-[4px] text-[12px] focus:border-ap-dark focus:outline-none"
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={addOption}
              className="mt-[10px] flex items-center gap-[4px] border border-dashed border-black/30 px-[10px] py-[6px] text-[12px] font-bold text-ap-text hover:border-ap-dark"
            >
              <Plus size={14} /> Add Option
            </button>
          </div>
        )}
      </div>
      <StepFooter
        prev={{ key: 'link-fields', label: 'Link Site Fields' }}
        next={{ key: 'underscores', label: 'Convert Underscores' }}
      />
    </>
  );
}
