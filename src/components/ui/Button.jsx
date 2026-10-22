import clsx from 'clsx';

const VARIANTS = {
  primary:   'bg-ap-dark text-white hover:brightness-110',
  secondary: 'border border-ap-dark text-ap-text hover:bg-black/5',
  ghost:     'text-ap-text hover:bg-black/5',
  link:      'text-ap-text2 hover:underline',
};

const SIZES = {
  sm: 'h-[22px] px-[8px] text-[11px]',
  md: 'h-[28px] px-[12px] text-[12px]',
  lg: 'h-[36px] px-[16px] text-[13px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      {...rest}
      className={clsx(
        'inline-flex items-center justify-center font-bold leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
