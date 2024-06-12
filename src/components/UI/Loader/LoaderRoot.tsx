import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface LoaderRootProps extends HTMLAttributes<HTMLSpanElement> {}

const LoaderRoot = ({ ...props }: LoaderRootProps) => {
  return (
    <span
      className={twMerge(
        "flex border-4 border-neutral-600 dark:border-neutral-100 border-r-white dark:border-r-neutral-900 rounded-full w-6 h-6 animate-spin-loader",
        props.className
      )}
      {...props}
    />
  );
};

export default LoaderRoot;
