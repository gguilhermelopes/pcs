import { HTMLAttributes, ReactNode } from "react";

interface DefaultInputRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DefaultInputRoot = ({ children }: DefaultInputRootProps) => {
  return <div className="flex flex-col">{children}</div>;
};

export default DefaultInputRoot;
