import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (props, ref) => {
    return (
      <input
        className={twMerge("opacity-0 peer", props.className)}
        ref={ref}
        type="checkbox"
        {...props}
      />
    );
  }
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
