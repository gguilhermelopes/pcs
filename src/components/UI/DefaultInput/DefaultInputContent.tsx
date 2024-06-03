import { InputHTMLAttributes, forwardRef } from "react";

interface DefaultInputContentProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const DefaultInputContent = forwardRef<
  HTMLInputElement,
  DefaultInputContentProps
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="bg-neutral-200 dark:bg-neutral-800 px-4 py-2 rounded-lg text-sm w-[300px] text-neutral-900 dark:text-neutral-200 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary100"
      {...props}
    />
  );
});

export default DefaultInputContent;
