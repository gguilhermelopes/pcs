import { Login } from "@/interfaces/login";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Employee } from "@/interfaces/employee";

interface UserContext {
  user: Login | null;
  employee: Employee | null;
}

export const UserContext = createContext<UserContext>({
  user: null,
  employee: null,
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<Login | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const user = await fetch("/api/user");
      const data = await user.json();
      setUser(data);
    };
    getUser();
  }, [pathname]);

  useEffect(() => {
    if (user?.username) {
      const getEmployee = async () => {
        const employee = await fetch("/api/employees");
        const data = (await employee.json()) as Employee[];
        setEmployee(
          data.filter((employee) => employee.email === user?.username)[0]
        );
      };
      getEmployee();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, employee }}>
      {children}
    </UserContext.Provider>
  );
};
