import clsx from 'clsx';
import { forwardRef } from 'react';
import Chevron from './Chevron.jsx';

const Select = forwardRef(function Select({ children, className = '', ...rest }, ref) {
  return (
    <div className="relative inline-block">
      <select
        ref={ref}
        {...rest}
        className={clsx(
          'h-[28px] appearance-none border border-black/20 bg-white pl-[8px] pr-[26px] text-[12px] text-ap-text',
          'focus:border-ap-dark focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-ap-text">
        <Chevron direction="down" color="#4B4B4B" />
      </span>
    </div>
  );
});

export default Select;
