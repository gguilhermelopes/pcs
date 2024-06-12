"use client";

import sessionsMapping from "@/helpers/sessionsMapping";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import Modal from "../UI/Modal";
import SingleSessionModalContent from "./SingleSessionModalContent";
import AddSessionModalContent from "./AddSessionModalContent";

interface CalendarProps {
  sessions: any;
  user: any;
  patients: any;
  therapists: any;
}

const Calendar = ({ sessions, user, patients, therapists }: CalendarProps) => {
  const events = sessionsMapping(sessions);
  const [therapist, setTherapist] = useState("Terapeuta");
  const [isSingleSessionModalOpen, setIsSingleSessionModalOpen] =
    useState(false);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState(false);
  const [singleEventId, setSingleEventId] = useState<string | null>(null);

  return (
    <>
      <Modal.Root isModalOpen={isSingleSessionModalOpen}>
        <SingleSessionModalContent
          sessionId={singleEventId}
          setIsModalOpen={setIsSingleSessionModalOpen}
        />
      </Modal.Root>
      <Modal.Root isModalOpen={isAddSessionModalOpen}>
        <AddSessionModalContent
          patients={patients}
          setIsAddSessionModalOpen={setIsAddSessionModalOpen}
        />
      </Modal.Root>
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
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          list: "Agenda",
          prev: "Anterior",
          next: "Próximo",
          agenda: "Agenda",
          timeGridWeek: "Semana",
          timeGridDay: "Dia",
          timeGridMonth: "Mês",
          timeGridAgenda: "Agenda",
        }}
        customButtons={{
          therapistBtn: {
            text: therapist,
            click: () => {
              console.log("Terapeuta");
            },
          },
          addSessionBtn: {
            text: "Adicionar sessão",
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
