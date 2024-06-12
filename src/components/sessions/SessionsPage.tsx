import { redirect } from "next/navigation";
import { getUser } from "@/helpers/getUser";

import Calendar from "./Calendar";
import { cookies } from "next/headers";

const SessionsPage = async () => {
  const user = await getUser();
  const token = cookies().get("token");

  if (user?.status === "invalid" || !user) {
    redirect("/login/?redirect=sessions");
  }

  const headers = {
    Authorization: `Bearer ${token?.value}`,
  };

  const [sessions, patients, therapists] = await Promise.all([
    fetch(`${process.env.API_URL}/sessions`, { headers }),
    fetch(`${process.env.API_URL}/patients`, { headers }),
    fetch(`${process.env.API_URL}/therapists`, { headers }),
  ]);

  const [sessionsData, patientsData, therapistsData] = await Promise.all([
    sessions.json(),
    patients.json(),
    therapists.json(),
  ]);

  return (
    <main className="p-8 overflow-y-auto">
      <Calendar
        user={user}
        sessions={sessionsData}
        patients={patientsData}
        therapists={therapistsData}
      />
    </main>
  );
};

export default SessionsPage;
