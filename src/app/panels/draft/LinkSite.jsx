import clsx from 'clsx';
import { useWork } from '../../WorkContext.jsx';

const ROWS = [
  ['Status',       'status'],
  ['State',        'state'],
  ['City',         'city'],
  ['Submarket',    'submarket'],
  ['Street',       'street'],
  ['Project Name', 'project_name'],
  ['Size',         'size'],
  ['Broker',       'broker'],
  ['Brokerage',    'brokerage'],
  ['Broker Email', 'broker_email'],
];

export default function LinkSite() {
  const { sites, site, setSite, setStep } = useWork();

  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto">
        <h2 className="px-[26px] pt-[14px] text-[16px] font-bold leading-[16px] text-ap-text">
          Select Site for New LOI
        </h2>

        <ul className="mt-[21px] space-y-[24px] pb-[24px]">
          {sites.map((s) => {
            const selected = site?.id === s.id;
            return (
              <li
                key={s.id}
                className={clsx(
                  selected
                    ? 'mx-[14px] bg-ap-dark py-[8px] pl-[12px] pr-[12px] text-white'
                    : 'px-[26px] text-ap-text',
                )}
              >
                <button onClick={() => setSite(s)} className="block w-full text-left">
                  <dl className="grid grid-cols-[112px_1fr]">
                    {ROWS.map(([label, key]) => (
                      <Row key={key} label={label} value={s[key]} selected={selected} />
                    ))}
                  </dl>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="border-t border-black/15 px-[26px] py-[11px] text-right">
        <button
          onClick={() => setStep('template')}
          className="text-[16px] font-bold leading-[16px] text-ap-text2 hover:underline"
        >
          Link Site and Draft LOI &gt;
        </button>
      </footer>
    </>
  );
}

function Row({ label, value, selected }) {
  const color = selected ? 'text-white' : 'text-ap-text';
  return (
    <>
      <dt className={clsx('h-[24px] text-[12px] font-bold leading-[16px]', color)}>
        {label}
      </dt>
      <dd className={clsx('h-[24px] text-[12px] font-normal leading-[16px]', color)}>
        {value ?? '—'}
      </dd>
    </>
  );
}
