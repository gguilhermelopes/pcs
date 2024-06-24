import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUser } from "@/helpers/getUser";
import Calendar from "./Calendar";
import { Loader } from "../UI/Loader";

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
    <main className="px-8 pb-8 overflow-y-auto">
      <Suspense fallback={<Loader.Root />}>
        <Calendar
          user={user}
          sessions={sessionsData}
          patients={patientsData}
          therapists={therapistsData}
        />
      </Suspense>
    </main>
  );
};

export default SessionsPage;
