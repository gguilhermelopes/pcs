import { Session } from "@/interfaces/session";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const getSingleSessionById = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Session | undefined> => {
  const [_key, id] = queryKey;
  const response = await fetch(`/api/sessions/${id}`);
  const data = await response.json();
  return data;
};

const useSingleSession = (id: string, enabled: boolean) => {
  const query = useQuery({
    queryKey: ["sessionId", id],
    queryFn: getSingleSessionById,
    enabled: enabled,
  });

  return query;
};

export default useSingleSession;
