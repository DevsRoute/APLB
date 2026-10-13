import StepFooter from '../StepFooter.jsx';

const BLANKS = [
  'Attn Name',
  'Phone',
  'Email',
  'Size of Project',
  'Monthly Rent',
  'Rent Commencement Date',
  'Term (months)',
  'Options (count × years)',
  'Security Deposit',
  'Delivery Condition',
];

export default function UnderscoresAndEdit() {
  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto px-[21px] pt-[12px]">
        <h2 className="text-[16px] font-bold leading-[16px] text-ap-text">Fill Underscore Fields</h2>
        <p className="mt-[10px] text-[12px] text-ap-text/80">
          Each blank maps to a highlighted underline in the LOI. Fill them here;
          the editor on the right updates as you type.
        </p>
        <ul className="mt-[12px] space-y-[8px]">
          {BLANKS.map((label) => (
            <li key={label}>
              <label className="block">
                <span className="mb-[4px] block text-[12px] font-bold text-ap-text">{label}</span>
                <input
                  type="text"
                  className="w-full rounded-[2px] border border-black/20 bg-white px-[8px] py-[6px] text-[12px] focus:border-ap-dark focus:outline-none"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>

      <StepFooter prev={{ key: 'language', label: 'Add Optional Language' }} />
    </>
  );
}
