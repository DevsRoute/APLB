export default function TopHeader() {
  return (
    <header className="flex h-[65px] shrink-0 bg-white">
      <div className="flex w-[234px] shrink-0 flex-col justify-center px-[23px]">
        <img
          src="/abstrapoint-logo.svg"
          alt="AbstraPoint"
          className="h-[25px] w-auto"
        />
        <span className="mt-[3px] text-[10px] font-bold leading-[16px] text-ap-text">
          AP LOI Builder
        </span>
      </div>

      <HeaderTab
        label="My Sites"
        active
        chip={
          <div className="h-[65px] w-[65px] shrink-0">
            <img
              src="/dollar-tree-chip.svg"
              alt="Dollar Tree"
              className="h-full w-full"
            />
          </div>
        }
        className="w-[620px]"
      />

      <HeaderTab label="Delegated to Me" className="w-[594px] flex-1">
        <div className="h-[45px] w-[45px] shrink-0 overflow-hidden rounded-full">
          <img
            src="/avatar-placeholder.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </HeaderTab>
    </header>
  );
}

function HeaderTab({ label, active, chip, children, className = '' }) {
  const bg = active ? 'bg-ap-light' : 'bg-white';
  return (
    <div className={`flex items-center ${bg} ${className}`}>
      <div className="w-[16px]" />
      <div className="shrink-0 py-[11px] text-[16px] font-bold leading-[20px] text-ap-text">
        {label}
      </div>
      {chip && <div className="ml-[18px]">{chip}</div>}
      <div className="flex-1" />
      <div className="flex items-center gap-[6px] pr-[10px]">
        <HamburgerIcon />
        <ChevronBtn direction="left" />
        <ChevronBtn direction="right" />
      </div>
      {children && <div className="pr-[14px]">{children}</div>}
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      <rect y="0" width="18" height="2" rx="1" fill="#404040" />
      <rect y="5" width="18" height="2" rx="1" fill="#404040" />
      <rect y="10" width="18" height="2" rx="1" fill="#404040" />
    </svg>
  );
}

function ChevronBtn({ direction }) {
  const rotate = direction === 'left' ? '' : 'rotate-180';
  return (
    <button className="flex h-[24px] w-[24px] items-center justify-center" aria-label={direction}>
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className={rotate}>
        <path d="M7.41 10.59L2.83 6l4.58-4.59L6 0 0 6l6 6z" fill="#404040" />
      </svg>
    </button>
  );
}
