import notify from "@/helpers/notify";
import { SessionMutate } from "@/interfaces/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const editSession = async ({
  id,
  data,
}: {
  id: string;
  data: SessionMutate;
}) => {
  const response = await fetch(`api/sessions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

const useEditSession = (
  id: string,
  setIsAddSessionModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["editSessionId", id],
    mutationFn: (data: SessionMutate) => editSession({ id, data }),
    onSuccess: async (response, obj) => {
      const data = await response.json();
      if (response.status == 200) {
        notify("Sessão atualizada com sucesso.", "success");
        localStorage.setItem("currentTherapist", obj.therapistId);
        setIsAddSessionModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["sessionId", id] });
        router.refresh();
      } else if (response.status === 400) {
        notify(
          `Erro ao atualizar a sessão. ${data.message && data.message}`,
          "error"
        );
      }
    },
    onError: () => {
      notify(`Erro ao atualizar a sessão.`, "error");
    },
  });
  return mutate;
};

export default useEditSession;
