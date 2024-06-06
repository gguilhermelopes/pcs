import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function useRedirected() {
  const searchParams = useSearchParams();
  const [isRedirected] = useState(searchParams.get("redirect"));

  return { isRedirected };
}
