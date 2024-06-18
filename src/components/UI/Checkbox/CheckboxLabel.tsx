import { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

const CheckboxLabel = ({ label, className, ...props }: CheckboxLabelProps) => {
  return (
    <label
      className={twMerge(
        "absolute py-2 rounded-md cursor-pointer flex items-center after:content[''] after:absolute after:w-5 after:h-5 after:border-2 after:border-primary after:bg-white after:dark:bg-neutral-700 after:right-[-2rem] after:rounded-sm after:cursor-pointer peer-checked:after:bg-primary peer-focus:ring-2 peer-focus:ring-primary",
        className
      )}
      {...props}
    >
      {label}
    </label>
  );
};

export default CheckboxLabel;
