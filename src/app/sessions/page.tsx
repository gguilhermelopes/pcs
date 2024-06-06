import { redirect } from "next/navigation";
import { getUser } from "@/helpers/getUser";

const Sessions = async () => {
  const user = await getUser();

  if (user?.status === "invalid" || !user) {
    redirect("/login/?redirect=sessions");
  }

  return <div>{user.username}</div>;
};

export default Sessions;
