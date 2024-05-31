import HeaderButton from "./HeaderButton";
import ThemeSwitchButton from "./ThemeSwitchButton";

import SearchIcon from "./assets/SearchIcon";

const HeaderButtons = () => {
  return (
    <div className="flex items-center gap-6 text-neutral-400 dark:text-neutral-500">
      <HeaderButton
        icon={SearchIcon}
        className="hover:text-primary transition-colors"
      />
      <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 my-2" />
      <ThemeSwitchButton />
    </div>
  );
};

export default HeaderButtons;
