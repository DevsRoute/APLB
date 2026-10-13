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
        <div className="px-[21px] pt-[12px]">
          <h2 className="text-[16px] font-bold leading-[16px] text-ap-text">Select Site for New LOI</h2>
        </div>

        <div className="mt-[12px] space-y-[10px]">
          {sites.map((s) => (
            <SiteCard key={s.id} data={s} selected={site?.id === s.id} onPick={() => setSite(s)} />
          ))}
        </div>
      </div>

      <footer className="border-t border-black/10 px-[21px] py-[11px] text-right">
        <button
          onClick={() => setStep('template')}
          className="text-[12px] font-bold text-ap-text2 hover:underline"
        >
          Link Site and Draft LOI
        </button>
      </footer>
    </>
  );
}

function SiteCard({ data, selected, onPick }) {
  return (
    <button
      onClick={onPick}
      className={clsx(
        'block w-full px-[21px] py-[8px] text-left',
        selected ? 'bg-ap-dark text-white' : 'text-ap-text hover:bg-black/5',
      )}
    >
      <dl className="grid grid-cols-[112px_1fr]">
        {ROWS.map(([label, key]) => (
          <Row key={key} label={label} value={data[key]} selected={selected} />
        ))}
      </dl>
    </button>
  );
}

function Row({ label, value, selected }) {
  return (
    <>
      <dt className={clsx('h-[24px] text-[12px] font-bold leading-[16px]', selected ? 'text-white' : 'text-ap-text')}>
        {label}
      </dt>
      <dd className={clsx('h-[24px] text-[12px] font-normal leading-[16px]', selected ? 'text-white' : 'text-ap-text')}>
        {value ?? '—'}
      </dd>
    </>
  );
}
