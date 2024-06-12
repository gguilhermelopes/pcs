import { SessionCreate } from "@/interfaces/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createSession = async (data: SessionCreate) => {
  return await fetch(`api/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const useCreateSession = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionId"] });
    },
  });
  return mutate;
};

export default useCreateSession;
