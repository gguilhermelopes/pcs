import { LabelHTMLAttributes } from "react";

interface DefaultInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
}

const DefaultInputLabel = ({ label, ...props }: DefaultInputLabelProps) => {
  return <label {...props}>{label}</label>;
};

export default DefaultInputLabel;
