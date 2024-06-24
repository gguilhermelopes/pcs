import { Login } from "@/interfaces/login";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface UserContext {
  user: Login | null;
}

export const UserContext = createContext<UserContext>({
  user: null,
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<Login | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getUser = async () => {
      const user = await fetch("/api/user");
      const data = await user.json();
      setUser(data);
    };
    getUser();
  }, [pathname, searchParams]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
