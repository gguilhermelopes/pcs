"use client";

import sessionsMapping from "@/helpers/sessionsMapping";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Suspense, use, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import SingleSessionModalContent from "./SingleSessionModalContent";
import AddSessionModalContent from "./AddSessionModalContent";
import { Loader } from "../UI/Loader";
import SelectTherapistModalContent from "./SelectTherapistModalContent";
import { Session } from "@/interfaces/session";
import { Patient } from "@/interfaces/patient";
import { Therapist } from "@/interfaces/therapist";

interface CalendarProps {
  sessions: Session[];
  user: any;
  patients: Patient[];
  therapists: Therapist[];
}

const mappedTherapists = (therapists: Therapist[]) => {
  return therapists.map((therapist) => ({
    value: therapist.id,
    label: therapist.name,
  }));
};

const Calendar = ({ sessions, user, patients, therapists }: CalendarProps) => {
  const [therapist, setTherapist] = useState(mappedTherapists(therapists)[0]);
  const [isSingleSessionModalOpen, setIsSingleSessionModalOpen] =
    useState(false);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState(false);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
  const [singleEventId, setSingleEventId] = useState<string | null>(null);
  const events = sessionsMapping(
    sessions.filter((session) => session.therapistId === therapist.value)
  );

  useEffect(() => {
    const currentTherapist = localStorage.getItem("currentTherapist");
    if (currentTherapist) {
      const findTherapist = mappedTherapists(therapists).find(
        (therapist) => therapist.value === currentTherapist
      );
      if (findTherapist) {
        setTherapist(findTherapist);
        localStorage.removeItem("currentTherapist");
      }
    }
  }, [setTherapist, therapists]);

  return (
    <>
      <Modal.Root isModalOpen={isSingleSessionModalOpen}>
        <Suspense fallback={<Loader.Root />}>
          <SingleSessionModalContent
            sessionId={singleEventId}
            setIsModalOpen={setIsSingleSessionModalOpen}
          />
        </Suspense>
      </Modal.Root>
      <Modal.Root isModalOpen={isAddSessionModalOpen}>
        <AddSessionModalContent
          patients={patients}
          setIsAddSessionModalOpen={setIsAddSessionModalOpen}
        />
      </Modal.Root>
      <Modal.Root isModalOpen={isTherapistModalOpen}>
        <SelectTherapistModalContent
          therapists={mappedTherapists(therapists)}
          setTherapist={setTherapist}
          setIsTherapistModalOpen={setIsTherapistModalOpen}
        />
      </Modal.Root>
      <h2 className="text-center mb-4 text-xl">{therapist.label}</h2>
      <FullCalendar
        events={events}
        eventClick={(info) => {
          setSingleEventId(info.event.id);
          setIsSingleSessionModalOpen(true);
        }}
        plugins={[timeGridPlugin]}
        contentHeight="auto"
        headerToolbar={{
          left: "prev,next today",
          right: "timeGridWeek,timeGridDay therapistBtn addSessionBtn",
          center: "title",
        }}
        locale="pt-br"
        buttonIcons={{ prev: "chevron-left", next: "chevron-right" }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          list: "Agenda",
          agenda: "Agenda",
          timeGridWeek: "Semana",
          timeGridDay: "Dia",
          timeGridMonth: "Mês",
          timeGridAgenda: "Agenda",
        }}
        customButtons={{
          therapistBtn: {
            text: therapist.label,
            click: () => {
              setIsTherapistModalOpen(true);
            },
          },
          addSessionBtn: {
            text: "Criar sessão",
            click: () => {
              setIsAddSessionModalOpen(true);
            },
          },
        }}
        now={new Date()}
        nowIndicator={true}
        hiddenDays={[0]}
        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
      />
    </>
  );
};

export default Calendar;
