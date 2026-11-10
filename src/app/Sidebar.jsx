import clsx from 'clsx';
import { useState } from 'react';
import { useWork } from './WorkContext.jsx';
import { useResizableWidth, ResizeHandle } from './useResizableWidth.jsx';
import { Chevron } from '../components/ui/index.js';

const DEFAULT_WIDTH = 199;
const MIN_WIDTH = 160;
const MAX_WIDTH = 400;

const DRAFT = {
  key: 'draft',
  title: 'Draft LOI',
  subtitle: 'Manage LOIs',
  steps: [
    { key: 'link',     label: 'Link Site' },
    { key: 'template', label: 'Template' },
    { key: 'language', label: 'Opt Language' },
  ],
};

const BUILD = {
  key: 'build',
  title: 'Build Template',
  steps: [
    { key: 'upload',      label: 'Upload Draft Template' },
    { key: 'link-fields', label: 'Link Site Fields' },
    { key: 'opt-lib',     label: 'Build Optional Language Library' },
    { key: 'underscores', label: 'Convert Underscores' },
  ],
};

export default function Sidebar() {
  const { mode, step, setMode, setStep } = useWork();
  const [draftOpen, setDraftOpen] = useState(true);
  const [buildOpen, setBuildOpen] = useState(false);
  const [width, onResizeStart] = useResizableWidth({
    initial: DEFAULT_WIDTH,
    min: MIN_WIDTH,
    max: MAX_WIDTH,
  });

  function pickStep(newMode, newStep) {
    setMode(newMode);
    setStep(newStep);
  }

  const buildHeader = (
    <SectionHeader
      section={BUILD}
      open={buildOpen}
      onToggle={() => setBuildOpen((v) => !v)}
      onSubtitle={() => pickStep('build', 'upload')}
    />
  );

  return (
    <aside
      className="relative flex shrink-0 flex-col bg-ap-mid"
      style={{ width: `${width}px` }}
    >
      <SectionHeader
        section={DRAFT}
        open={draftOpen}
        onToggle={() => setDraftOpen((v) => !v)}
        onSubtitle={() => pickStep('draft', 'manage')}
      />
      {draftOpen && (
        <StepList
          steps={DRAFT.steps}
          current={mode === 'draft' ? step : null}
          onPick={(s) => pickStep('draft', s)}
        />
      )}

      <div className="flex-1" />

      {/* Build Template is temporarily hidden while we finish the Draft LOI module.
          Keep the code intact; uncomment to bring it back.
      {buildOpen && buildHeader}
      {buildOpen && (
        <StepList
          steps={BUILD.steps}
          current={mode === 'build' ? step : null}
          onPick={(s) => pickStep('build', s)}
        />
      )}
      {!buildOpen && buildHeader}
      */}
      <ResizeHandle onMouseDown={onResizeStart} />
    </aside>
  );
}

function SectionHeader({ section, open, onToggle, onSubtitle }) {
  function handleSubtitle(e) {
    e.stopPropagation();
    onSubtitle?.();
  }

  if (!open) {
    return (
      <button
        onClick={onToggle}
        className="flex h-[42px] w-full items-center justify-between bg-ap-dark pl-[23px] pr-[12px] text-left"
      >
        <span className="text-[16px] font-bold leading-[16px] text-white">{section.title}</span>
        <Chevron direction="left" color="white" />
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className="block h-[60px] w-full bg-ap-dark pl-[23px] pr-[12px] pt-[12px] text-left"
    >
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-bold leading-[16px] text-white">{section.title}</span>
        <Chevron direction="down" color="white" />
      </div>
      <div
        onClick={handleSubtitle}
        className="mt-[7px] cursor-pointer text-[10px] font-bold leading-[12px] text-white hover:underline"
      >
        {section.subtitle}
      </div>
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
                'block w-full px-[42px] py-[9px] text-left text-[16px] font-bold leading-[16px]',
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
