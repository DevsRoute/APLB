import clsx from 'clsx';
import { useWork } from './WorkContext.jsx';

const DRAFT = {
  key: 'draft',
  title: 'Draft LOI',
  subtitle: 'Manage LOIs',
  steps: [
    { key: 'link',     label: 'Link Site' },
    { key: 'template', label: 'Choose Template' },
    { key: 'language', label: 'Add Optional Language' },
    { key: 'edit',     label: 'Underscores and Edit' },
  ],
};
const BUILD = {
  key: 'build',
  title: 'Build Template',
  subtitle: 'Manage Templates',
  steps: [
    { key: 'upload',      label: 'Upload Draft Template' },
    { key: 'link-fields', label: 'Link Site Fields' },
    { key: 'opt-lib',     label: 'Build Optional Language Library' },
    { key: 'underscores', label: 'Convert Underscores' },
  ],
};

export default function Sidebar() {
  const { mode, step, setMode, setStep } = useWork();

  function switchTo(m) {
    setMode(m);
    setStep((m === 'draft' ? DRAFT : BUILD).steps[0].key);
  }

  const isDraft = mode === 'draft';

  return (
    <aside className="relative flex w-[199px] shrink-0 flex-col bg-ap-mid">
      {/* Draft LOI section */}
      <SectionHeader
        section={DRAFT}
        state={isDraft ? 'active' : 'collapsed-top'}
        onToggle={() => !isDraft && switchTo('draft')}
      />
      {isDraft && (
        <StepList steps={DRAFT.steps} current={step} onPick={setStep} />
      )}

      {isDraft && <div className="flex-1" />}

      {/* Build Template section */}
      {!isDraft && (
        <SectionHeader
          section={BUILD}
          state="active"
          onToggle={() => {}}
        />
      )}
      {!isDraft && (
        <StepList steps={BUILD.steps} current={step} onPick={setStep} />
      )}
      {!isDraft && <div className="flex-1" />}

      {isDraft && (
        <SectionHeader
          section={BUILD}
          state="collapsed-bottom"
          onToggle={() => switchTo('build')}
        />
      )}
    </aside>
  );
}

function SectionHeader({ section, state, onToggle }) {
  const { setStep } = useWork();
  const isActive = state === 'active';
  const isCollapsedBottom = state === 'collapsed-bottom';
  const chevron = isActive ? <ChevronDown /> : <ChevronLeft />;

  function handleSubtitle(e) {
    e.stopPropagation();
    if (isActive) setStep(section.key === 'draft' ? 'manage' : 'upload');
  }

  return (
    <button
      onClick={onToggle}
      disabled={isActive}
      className={clsx(
        'relative block w-full bg-ap-dark px-[23px] text-left',
        isCollapsedBottom ? 'h-[42px] pt-[12px]' : 'h-[60px] pt-[12px]',
      )}
    >
      <div className="text-[16px] font-bold leading-[16px] text-white">{section.title}</div>
      {!isCollapsedBottom && (
        <div
          onClick={handleSubtitle}
          className={clsx(
            'mt-[7px] text-[10px] font-bold leading-[12px] text-white',
            isActive && 'cursor-pointer hover:underline',
          )}
        >
          {section.subtitle}
        </div>
      )}
      <span className="absolute right-[14px] top-[14px]">{chevron}</span>
    </button>
  );
}

function StepList({ steps, current, onPick }) {
  return (
    <ul>
      {steps.map((s) => {
        const selected = current === s.key;
        return (
          <li key={s.key}>
            <button
              onClick={() => onPick(s.key)}
              className={clsx(
                'block w-full px-[42px] py-[9px] text-left text-[12px] font-bold leading-[16px]',
                selected ? 'bg-ap-light text-ap-text' : 'text-ap-text2 hover:bg-ap-light/60',
              )}
            >
              {s.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1l5 5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1L1 6l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
