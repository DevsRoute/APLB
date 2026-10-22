import clsx from 'clsx';
import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea({ className = '', ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      {...rest}
      className={clsx(
        'w-full border border-black/20 bg-white px-[8px] py-[6px] text-[12px] text-ap-text',
        'focus:border-ap-dark focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    />
  );
});

export default Textarea;
