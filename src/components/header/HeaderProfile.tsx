import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

const HeaderProfile = () => {
  const { user } = useContext(UserContext);
  if (!user?.username) return null;

  return (
    <div className="px-5 py-2 bg-neutral-200 dark:bg-neutral-600 rounded-full capitalize text-xl text-secondary500 dark:text-secondary200">
      {user.username?.charAt(0)}
    </div>
  );
};

export default HeaderProfile;
