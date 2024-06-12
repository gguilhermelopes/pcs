import { HTMLAttributes, ReactNode } from "react";

interface DefaultInputRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DefaultInputRoot = ({ children, ...props }: DefaultInputRootProps) => {
  return (
    <div className="flex flex-col" {...props}>
      {children}
    </div>
  );
};

export default DefaultInputRoot;
