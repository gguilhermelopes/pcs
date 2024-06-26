import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/useMounted";
import DarkModeIcon from "./assets/DarkModeIcon";
import LightModeIcon from "./assets/LightModeIcon";
import HeaderButton from "./HeaderButton";

const ThemeSwitchButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return resolvedTheme === "dark" ? (
    <HeaderButton
      icon={LightModeIcon}
      className="hover:text-primary transition-colors"
      onClick={() => setTheme("light")}
      title="Mudar para modo claro"
    />
  ) : (
    <HeaderButton
      icon={DarkModeIcon}
      className="hover:text-primary transition-colors"
      onClick={() => setTheme("dark")}
      title="Mudar para modo escuro"
    />
  );
};

export default ThemeSwitchButton;
