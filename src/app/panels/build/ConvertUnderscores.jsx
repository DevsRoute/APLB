import StepFooter from '../StepFooter.jsx';

const HITS = [
  { line: 'Attn:',                 before: '                              ', after: '___________' },
  { line: 'Phone:',                before: '                           ',    after: '___________' },
  { line: 'Email:',                before: '           Please Provide    ',  after: 'Please Provide ___________' },
  { line: '[Size of Project]',     before: '           ',                    after: '[Size of Project] ___________' },
];

export default function ConvertUnderscores() {
  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto px-[21px] pt-[12px]">
        <h2 className="text-[16px] font-bold leading-[16px] text-ap-text">
          Convert Space Underlines → Underscores
        </h2>
        <p className="mt-[8px] text-[12px] text-ap-text/80">
          APBL found the following space-based blanks in the template.
          Confirm each; the editor will replace them with real underscore fields.
        </p>
        <ul className="mt-[12px] space-y-[8px]">
          {HITS.map((h, i) => (
            <li key={i} className="border border-black/15 bg-white p-[10px]">
              <div className="text-[12px] font-bold text-ap-text">{h.line}</div>
              <div className="mt-[4px] font-mono text-[11px] text-ap-text/70">before: "{h.before}"</div>
              <div className="mt-[2px] font-mono text-[11px] text-ap-text">after:  "{h.after}"</div>
              <div className="mt-[6px] flex justify-end gap-[6px]">
                <button className="border border-black/20 px-[8px] py-[2px] text-[11px] hover:bg-black/5">Skip</button>
                <button className="bg-ap-dark px-[8px] py-[2px] text-[11px] font-bold text-white hover:brightness-110">Convert</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <StepFooter prev={{ key: 'opt-lib', label: 'Build Optional Language' }} />
    </>
  );
}
