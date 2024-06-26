import { Session } from "@/interfaces/session";

const sessionsMapping = (sessions: Session[]) => {
  const mappedSessions = sessions.map((session) => {
    const date = new Date(session.sessionDate);
    const start = date.toISOString();
    const end = new Date(
      date.getTime() + session.sessionDuration * 60 * 1000
    ).toISOString();

    return {
      id: session.id,
      title: session.patient,
      start,
      end,
      backgroundColor: session.hasPatientAttended ? "#e9b198" : "#db8159",
      textColor: session.hasPatientAttended ? "#666" : "#fff",
      classNames:
        session.isAuthorized && session.isPaid ? ["done"] : ["pending"],
    };
  });

  return mappedSessions;
};

export default sessionsMapping;
