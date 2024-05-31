import HeaderButton from "./HeaderButton";
import DarkModeIcon from "./assets/DarkModeIcon";
import SearchIcon from "./assets/SearchIcon";

const HeaderButtons = () => {
  return (
    <div className="flex items-center gap-6 text-neutral-300">
      <HeaderButton
        icon={SearchIcon}
        className="hover:text-primary transition-colors"
      />
      <div className="h-6 w-px bg-neutral-200 my-2" />
      <HeaderButton
        icon={DarkModeIcon}
        className="hover:text-primary transition-colors"
      />
    </div>
  );
};

export default HeaderButtons;
