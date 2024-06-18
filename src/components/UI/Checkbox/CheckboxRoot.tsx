import { HTMLAttributes, ReactNode } from "react";

interface CheckboxRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CheckboxRoot = ({ children, ...props }: CheckboxRootProps) => {
  return (
    <div className="flex flex-col" {...props}>
      {children}
    </div>
  );
};

export default CheckboxRoot;
