import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonRoot = ({ children, className, ...props }: ButtonRootProps) => {
  return (
    <button
      className={twMerge(
        "bg-primary text-white px-4 py-2 w-[300px] rounded-lg text-sm font-medium mt-4 shadow-md transition-colors hover:bg-primary200 dark:hover:bg-primary100 focus:ring-2 dark:bg-primary dark:text-white dark:hover:bg-primary-primary200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonRoot;
