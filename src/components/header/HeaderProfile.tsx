import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const HeaderProfile = () => {
  const { user, employee } = useContext(UserContext);

  if (!user?.username) return null;

  return employee?.imgUrl ? (
    <Image
      alt="Perfil"
      src={employee?.imgUrl}
      width={50}
      height={50}
      className="rounded-full"
    />
  ) : (
    <span className="rounded-full bg-gray-200 text-sm text-gray-600 px-[1.125rem] py-3 font-semibold capitalize">
      {user?.username.slice(0, 1)}
    </span>
  );
};

export default HeaderProfile;
