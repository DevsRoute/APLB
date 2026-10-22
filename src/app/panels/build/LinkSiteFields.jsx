import clsx from 'clsx';
import { useState } from 'react';
import StepFooter from '../StepFooter.jsx';

const FIELDS = [
  'LL Broker', 'LL Brokerage', 'LL Broker Email',
  'Street Address', 'City', 'State', 'Size',
  'Project Name', 'RE Manager', 'Rent Table', 'Date',
];

export default function LinkSiteFields() {
  const [active, setActive] = useState('LL Broker');
  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto">
        <h2 className="px-[21px] pt-[12px] text-[16px] font-bold leading-[16px] text-ap-text">
          Fields to Link to from AP SiteTracker™
        </h2>

        <ul className="mt-[14px]">
          {FIELDS.map((f) => {
            const selected = active === f;
            return (
              <li key={f}>
                <button
                  onClick={() => setActive(f)}
                  className={clsx(
                    'flex w-full items-center justify-between px-[21px] py-[4px] text-left',
                    selected ? 'bg-ap-dark' : 'hover:bg-black/5',
                  )}
                >
                  <span
                    className="inline-block px-[6px] py-[1px] text-[12px] font-medium leading-[16px] text-ap-text"
                    style={{ background: '#00FFFF' }}
                  >
                    {f}
                  </span>
                  {selected && (
                    <span className="text-[12px] font-bold text-white">Add to LOI &gt;</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <StepFooter
        prev={{ key: 'upload', label: 'Upload Draft Template' }}
        next={{ key: 'opt-lib', label: 'Build Optional Language' }}
      />
    </>
  );
}
