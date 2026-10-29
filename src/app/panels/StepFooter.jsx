import { useWork } from '../WorkContext.jsx';

export default function StepFooter({ prev, next, rightLabel }) {
  const { setStep } = useWork();
  const btn = 'text-[16px] font-bold leading-[16px] text-ap-text2 hover:underline';
  return (
    <footer className="border-t border-black/15 px-[26px] py-[11px]">
      <div className="flex items-center justify-between">
        {prev ? (
          <button onClick={() => setStep(prev.key)} className={btn}>
            {'< '}{prev.label}
          </button>
        ) : <span />}
        {next ? (
          <button onClick={() => setStep(next.key)} className={btn}>
            {rightLabel ?? next.label} {'>'}
          </button>
        ) : <span />}
      </div>
    </footer>
  );
}
