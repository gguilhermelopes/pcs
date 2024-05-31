import { ButtonHTMLAttributes, ElementType } from "react";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType;
}

const HeaderButton = ({ icon: Icon, ...props }: HeaderButtonProps) => {
  return (
    <button {...props}>
      <Icon />
    </button>
  );
};

export default HeaderButton;
