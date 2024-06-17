import notify from "@/helpers/notify";
import { SessionCreate } from "@/interfaces/session";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

const createSession = async (data: SessionCreate) => {
  const response = await fetch(`api/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

const useCreateSession = (
  setIsAddSessionModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  const mutate = useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      if (data.status !== 201)
        notify(
          "Erro ao criar a sessão! Verifique os campos preenchidos ou tente novamente mais tarde.",
          "error"
        );
      else {
        notify("Sessão criada com sucesso", "success");
        setIsAddSessionModalOpen(false);
      }
    },
  });
  return mutate;
};

export default useCreateSession;
