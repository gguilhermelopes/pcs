const sessionsMapping = (sessions: any) => {
  const mappedSessions = sessions.map((session: any) => {
    const date = new Date(session.sessionDate);
    const start = date.toISOString().slice(0, -5);
    const end = new Date(date.getTime() + session.sessionDuration * 60 * 1000)
      .toISOString()
      .slice(0, -5);

    return {
      id: session.id,
      title: session.patient,
      start,
      end,
    };
  });

  return mappedSessions;
};

export default sessionsMapping;
