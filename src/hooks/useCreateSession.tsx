import notify from "@/helpers/notify";
import { SessionCreate } from "@/interfaces/session";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const mutate = useMutation({
    mutationFn: createSession,
    onSuccess: async (response, obj) => {
      const data = await response.json();
      if (response.status == 201) {
        notify("Sessão criada com sucesso", "success");
        setIsAddSessionModalOpen(false);
        localStorage.setItem("currentTherapist", obj.therapistId);
        router.refresh();
      } else if (response.status === 400) {
        notify(
          `Erro ao criar a sessão. ${data.message && data.message}`,
          "error"
        );
      }
    },
    onError: () => {
      notify(`Erro ao criar a sessão.`, "error");
    },
  });
  return mutate;
};

export default useCreateSession;
