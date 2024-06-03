import { HTMLAttributes } from "react";

interface DefaultInputErrorMessageProps
  extends HTMLAttributes<HTMLSpanElement> {
  message: string;
}

const DefaultInputErrorMessage = ({
  message,
  ...props
}: DefaultInputErrorMessageProps) => {
  return (
    <span className="text-xs text-red-500 mt-1" {...props}>
      {message}
    </span>
  );
};

export default DefaultInputErrorMessage;
