import { useWork } from '../WorkContext.jsx';

// Thin footer bar: 1px top line + 12px font-bold labels on each side.
export default function StepFooter({ prev, next, rightLabel }) {
  const { setStep } = useWork();
  return (
    <footer className="border-t border-black/10 px-[21px] py-[11px]">
      <div className="flex items-center justify-between text-[12px] font-bold text-ap-text2">
        {prev ? (
          <button onClick={() => setStep(prev.key)} className="hover:underline">
            {'< '}{prev.label}
          </button>
        ) : <span />}
        {next ? (
          <button onClick={() => setStep(next.key)} className="hover:underline">
            {rightLabel ?? next.label} {'>'}
          </button>
        ) : <span />}
      </div>
    </footer>
  );
}
