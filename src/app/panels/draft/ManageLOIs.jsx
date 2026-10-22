import clsx from 'clsx';
import StepFooter from '../StepFooter.jsx';

const SAVED = [
  { id: 's1', name: 'LOI - WestWood Hills - Los Angeles, CA - Aug 30, 2026 - v1', selected: false },
  { id: 's2', name: 'LOI - Burns Park - Los Angeles, CA - Aug 10, 2026 - v1',     selected: false },
  { id: 's3', name: 'LOI - Santa Monica Wharf - Santa Monica, CA - Aug 3, 2026 - v1', selected: true },
  { id: 's4', name: 'LOI - Century Lane - Holler Peak, CA - Jul 31, 2026 - v1',   selected: false },
];
const SENT = [
  { id: 't1', name: 'LOI - Century Park - Alhambra, CA - Jul 3, 2026 - v1', selected: false },
];

export default function ManageLOIs() {
  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto">
        <Column title="Saved LOIs" items={SAVED} tone="green" />
        <Column title="Sent LOIs"  items={SENT}  tone="dark" />
      </div>
      <StepFooter next={{ key: 'template', label: 'Choose Template' }} />
    </>
  );
}

function Column({ title, items, tone }) {
  return (
    <div className="px-[21px] pt-[12px]">
      <h2 className="text-[14px] font-bold leading-[16px] text-ap-text">{title}</h2>
      <ul className="mt-[10px] space-y-[8px]">
        {items.map((it) => (
          <li key={it.id}>
            <button
              className={clsx(
                'flex w-full items-start gap-[10px] rounded px-[6px] py-[6px] text-left',
                it.selected ? 'bg-ap-dark text-white' : 'text-ap-text hover:bg-black/5',
              )}
            >
              <LoiIcon tone={tone} />
              <span className="text-[12px] font-bold leading-[16px]">{it.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoiIcon({ tone }) {
  const bg = tone === 'green' ? '#8fcf7a' : '#3a3f4e';
  return (
    <div className="relative mt-[2px] h-[28px] w-[22px] shrink-0" aria-hidden>
      <div className="absolute inset-0 rounded-[2px]" style={{ background: bg }} />
      <div
        className="absolute right-0 top-0 h-[8px] w-[8px] bg-white/85"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-[2px] text-center text-[8px] font-bold leading-none text-white">
        LOI
      </div>
    </div>
  );
}
