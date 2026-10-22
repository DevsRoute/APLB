import clsx from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(function Input({ className = '', ...rest }, ref) {
  return (
    <input
      ref={ref}
      {...rest}
      className={clsx(
        'h-[28px] w-full border border-black/20 bg-white px-[8px] text-[12px] text-ap-text',
        'focus:border-ap-dark focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    />
  );
});

export default Input;
