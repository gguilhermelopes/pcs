import { Session } from "@/interfaces/session";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const getSingleSessionById = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Session> => {
  const [_key, id] = queryKey;
  const response = await fetch(`/api/sessions/${id}`);
  const data = await response.json();
  return data;
};

const useSingleSession = (id: string) => {
  const query = useQuery({
    queryKey: ["sessionId", id],
    queryFn: getSingleSessionById,
    enabled: !!id,
  });

  return query;
};

export default useSingleSession;
