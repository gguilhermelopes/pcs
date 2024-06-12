import { LabelHTMLAttributes, ReactNode } from "react";

interface DefaultInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  children?: ReactNode;
}

const DefaultInputLabel = ({
  label,
  children,
  ...props
}: DefaultInputLabelProps) => {
  return <label {...props}>{children}</label>;
};

export default DefaultInputLabel;
