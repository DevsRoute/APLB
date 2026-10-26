import clsx from 'clsx';
import { useWork } from '../../WorkContext.jsx';
import StepFooter from '../StepFooter.jsx';

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

export default function ChooseTemplate() {
  const { site, templates, template, setTemplate } = useWork();

  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto">
        <div className="px-[26px] pt-[14px]">
          <h2 className="text-[16px] font-bold leading-[16px] text-ap-text">Linked Site Data</h2>
          <dl className="mt-[20px] grid grid-cols-[112px_1fr]">
            {ROWS.map(([label, key]) => (
              <Row key={key} label={label} value={site?.[key]} />
            ))}
          </dl>
        </div>

        <div className="mx-[14px] mt-[8px] border-t border-black/15" />

        <h2 className="px-[26px] pt-[16px] text-[16px] font-bold leading-[16px] text-ap-text">
          Template for West Region LOIs
        </h2>

        <ul className="mt-[14px] space-y-[2px]">
          {templates.map((t) => {
            const selected = template?.id === t.id;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setTemplate(t)}
                  className={clsx(
                    'block w-full px-[26px] py-[6px] text-left',
                    selected ? 'bg-ap-dark text-white' : 'text-ap-text2 hover:bg-black/5',
                  )}
                >
                  <div className="text-[12px] font-bold leading-[16px]">{t.name}</div>
                  <div className="text-[10px] font-normal leading-[14px] opacity-90">
                    last updated {t.updated}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <StepFooter
        prev={{ key: 'link', label: 'Link Site' }}
        next={{ key: 'fill-data', label: 'Fill Template Data' }}
        rightLabel="Select"
      />
    </>
  );
}

function Row({ label, value }) {
  return (
    <>
      <dt className="h-[24px] text-[12px] font-bold leading-[16px] text-ap-text">{label}</dt>
      <dd className="h-[24px] text-[12px] font-normal leading-[16px] text-ap-text">
        {value ?? '—'}
      </dd>
    </>
  );
}
