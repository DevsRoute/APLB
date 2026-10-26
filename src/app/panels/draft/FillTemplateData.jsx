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

export default function FillTemplateData() {
  const { site, template } = useWork();

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
          Template
        </h2>

        {template && (
          <div className="px-[26px] pt-[14px]">
            <div className="text-[12px] font-bold leading-[16px] text-ap-text">{template.name}</div>
            <div className="text-[10px] font-normal leading-[14px] text-ap-text2">
              last updated {template.updated}
            </div>
          </div>
        )}
      </div>

      <StepFooter
        prev={{ key: 'template', label: 'Chose Template' }}
        next={{ key: 'language', label: 'Fill Template Data' }}
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
