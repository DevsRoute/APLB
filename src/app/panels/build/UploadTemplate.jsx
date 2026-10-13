import clsx from 'clsx';
import { useRef, useState } from 'react';
import StepFooter from '../StepFooter.jsx';

const SEED = [
  { id: 'u1', name: 'LOI - DT Freestanding California Template - v1', selected: false },
  { id: 'u2', name: 'LOI - Santa Monica Wharf - Santa Monica, CA - Aug 3, 2026 - v1', selected: true },
  { id: 'u3', name: 'LOI - Century Lane - Holler Peak, CA - Jul 31, 2026 - v1', selected: false },
];

export default function UploadTemplate() {
  const [uploads, setUploads] = useState(SEED);
  const [selectedId, setSelectedId] = useState(SEED.find((x) => x.selected)?.id);
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const files = [...fileList];
    if (!files.length) return;
    const added = files.map((f, i) => ({ id: `up-${Date.now()}-${i}`, name: f.name }));
    setUploads((u) => [...added, ...u]);
    setSelectedId(added[0].id);
  }

  return (
    <>
      <div className="ap-scroll flex-1 overflow-auto">
        <h2 className="px-[21px] pt-[12px] text-[16px] font-bold leading-[16px] text-ap-text">
          Uploaded LOI Draft Template
        </h2>

        <div className="px-[21px] pt-[14px]">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            className="cursor-pointer border border-dashed border-black/30 bg-white/60 px-5 py-10 text-center hover:border-ap-dark"
          >
            <div className="text-[12px] italic text-ap-text/70">Drag and Drop Document</div>
            <div className="mt-[8px] text-[13px] font-bold text-ap-text">Upload LOI Draft Template</div>
            <input
              ref={inputRef}
              type="file"
              accept=".docx"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>

        <ul className="mt-[12px]">
          {uploads.map((u) => {
            const selected = selectedId === u.id;
            return (
              <li key={u.id}>
                <button
                  onClick={() => setSelectedId(u.id)}
                  className={clsx(
                    'flex w-full items-start gap-[10px] px-[21px] py-[6px] text-left',
                    selected ? 'bg-ap-dark text-white' : 'text-ap-text hover:bg-black/5',
                  )}
                >
                  <LoiIcon />
                  <span className="text-[12px] font-bold leading-[16px]">{u.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <StepFooter next={{ key: 'link-fields', label: 'Link Site Fields' }} />
    </>
  );
}

function LoiIcon() {
  return (
    <div className="relative mt-[2px] h-[28px] w-[22px] shrink-0 rounded-[2px] bg-[#8fcf7a]">
      <div
        className="absolute right-0 top-0 h-[8px] w-[8px] bg-white/85"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-[2px] text-center text-[8px] font-bold leading-none text-white">LOI</div>
    </div>
  );
}
