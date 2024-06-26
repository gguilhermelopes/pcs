import { Button } from ".";
import CloseIcon from "../assets/CloseIcon";
import { twMerge } from "tailwind-merge";

interface CloseButtonProps {
  handleCloseModalClick: () => void;
  className?: string;
}

const CloseButton = ({
  handleCloseModalClick,
  className,
}: CloseButtonProps) => {
  return (
    <Button.Root
      onClick={handleCloseModalClick}
      className={twMerge(
        "absolute right-4 top-[-3px] w-9 rounded-full bg-red-400 hover:bg-red-500 dark:bg-red-800 dark:hover:bg-red-600 shadow-none transform-transition active:translate-y-[1px]",
        className
      )}
    >
      <CloseIcon />
    </Button.Root>
  );
};

export default CloseButton;
