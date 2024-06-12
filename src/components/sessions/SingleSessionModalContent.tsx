import useSingleSession from "@/hooks/useSingleSession";
import { Dispatch, SetStateAction } from "react";

interface SingleSessionModalContentProps {
  sessionId: string | null;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SingleSessionModalContent = ({
  sessionId,
  setIsModalOpen,
}: SingleSessionModalContentProps) => {
  if (sessionId === null) return null;

  const { data: session } = useSingleSession(sessionId);
  return (
    session && (
      <div className="p-4 flex flex-col bg-slate-300 dark:bg-slate-900 rounded-lg">
        <h1>{session.patient}</h1>
        <h2>{session.therapist}</h2>
        <p>{session.sessionDate}</p>
        <p>{session.sessionDuration} min</p>
        <div>
          <span>{session.sessionValue} R$</span>
          {session.isPaid ? <span>Pago</span> : <span>Não Pago</span>}
        </div>
        <div>
          <span>{session.token ? session.token : "Token não encontrado"}</span>
          {session.isAuthorized ? (
            <span>Autorizada</span>
          ) : (
            <span>Não autorizada</span>
          )}
        </div>
      </div>
    )
  );
};

export default SingleSessionModalContent;
