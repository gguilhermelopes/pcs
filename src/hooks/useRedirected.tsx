import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useRedirected() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isRedirected, setIsRedirected] = useState(
    searchParams.get("redirect")
  );

  useEffect(() => {
    if (!searchParams.get("redirect")) {
      setIsRedirected(null);
    }
  }, [searchParams, pathname]);

  return { isRedirected };
}
