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
      <StepFooter next={{ key: 'template', label: 'Template' }} />
    </>
  );
}

function Column({ title, items, tone }) {
  return (
    <div className="px-[21px] pt-[12px]">
      <h2 className="text-[16px] font-bold leading-[16px] text-ap-text">{title}</h2>
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
  const fill = tone === 'green' ? '#6BD745' : '#3a3f4e';
  return (
    <svg width="22" height="31" viewBox="0 0 33 47" fill="none" className="mt-[2px] shrink-0" aria-hidden>
      <path d="M0 0H23.5L33 11.5V47H0V0Z" fill={fill} />
      <path d="M9.4503 25.416H12.1383V27H7.3983V18.576H9.4503V25.416ZM17.101 27.084C16.309 27.084 15.581 26.9 14.917 26.532C14.261 26.164 13.737 25.652 13.345 24.996C12.961 24.332 12.769 23.588 12.769 22.764C12.769 21.94 12.961 21.2 13.345 20.544C13.737 19.888 14.261 19.376 14.917 19.008C15.581 18.64 16.309 18.456 17.101 18.456C17.893 18.456 18.617 18.64 19.273 19.008C19.937 19.376 20.457 19.888 20.833 20.544C21.217 21.2 21.409 21.94 21.409 22.764C21.409 23.588 21.217 24.332 20.833 24.996C20.449 25.652 19.929 26.164 19.273 26.532C18.617 26.9 17.893 27.084 17.101 27.084ZM17.101 25.212C17.773 25.212 18.309 24.988 18.709 24.54C19.117 24.092 19.321 23.5 19.321 22.764C19.321 22.02 19.117 21.428 18.709 20.988C18.309 20.54 17.773 20.316 17.101 20.316C16.421 20.316 15.877 20.536 15.469 20.976C15.069 21.416 14.869 22.012 14.869 22.764C14.869 23.508 15.069 24.104 15.469 24.552C15.877 24.992 16.421 25.212 17.101 25.212ZM24.6026 18.576V27H22.5506V18.576H24.6026Z" fill="white" />
    </svg>
  );
}
