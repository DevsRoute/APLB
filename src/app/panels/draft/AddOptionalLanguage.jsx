import clsx from 'clsx';
import { useWork } from '../../WorkContext.jsx';
import { OPTIONAL_LANGUAGE } from '../../../data/optionalLanguage.js';
import StepFooter from '../StepFooter.jsx';

export default function AddOptionalLanguage() {
  const { chosenLanguage, setChosenLanguage } = useWork();

  function pick(blockId, optId) {
    setChosenLanguage({ ...chosenLanguage, [blockId]: optId });
  }

  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto">
        {OPTIONAL_LANGUAGE.map((block) => (
          <section key={block.id} className="border-b border-black/10 last:border-b-0">
            <h2 className="px-[21px] pt-[14px] pb-[10px] text-[16px] font-bold leading-[16px] text-ap-text">
              {block.heading}
            </h2>
            <ul>
              {block.options.map((opt) => (
                <li key={opt.id}>
                  <OptionRow
                    opt={opt}
                    selected={chosenLanguage[block.id] === opt.id}
                    onPick={() => pick(block.id, opt.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <StepFooter
        prev={{ key: 'template', label: 'Choose Template' }}
        next={{ key: 'edit', label: 'Underscores and Edit' }}
      />
    </>
  );
}

function OptionRow({ opt, selected, onPick }) {
  return (
    <button
      onClick={onPick}
      className={clsx(
        'relative block w-full px-[21px] py-[10px] text-left',
        selected ? 'bg-ap-dark text-white' : 'text-ap-text hover:bg-black/5',
      )}
    >
      <div className="text-[13px] font-bold leading-[16px]">{opt.title}</div>
      <div className={clsx('mt-[2px] text-[11px] leading-[14px]', selected ? 'text-white/80' : 'text-ap-text/70')}>
        {opt.hint}
      </div>
      {opt.text && (
        <div className={clsx('mt-[6px] text-[12px] leading-[16px]', selected ? 'text-white' : 'text-ap-text/90')}>
          {opt.text}
        </div>
      )}
      {selected && (
        <div className="mt-[6px] text-right text-[12px] font-bold text-[#f5a623]">Add to LOI &gt;</div>
      )}
    </button>
  );
}
