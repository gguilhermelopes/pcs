"use client";

import { usePathname, useSearchParams } from "next/navigation";
import HeaderButtons from "./HeaderButtons";
import HeaderProfile from "./HeaderProfile";
import { useRedirected } from "@/hooks/useRedirected";

const titleMapping = {
  "/sessions": "Sessões",
  "/patients": "Pacientes",
  "/therapists": "Terapeutas",
  "/employees": "Colaboradores",
  "/insurances": "Planos de Saúde",
  "/users": "Usuários",
  "/help": "Ajuda",
};

const Header = () => {
  const pathname = usePathname();
  const { isRedirected } = useRedirected();

  return (
    <header className="flex items-center justify-between p-7">
      <h1 className="ml-4 text-2xl text-secondary500 dark:text-secondary200">
        {isRedirected
          ? ""
          : titleMapping[pathname as keyof typeof titleMapping]}
      </h1>
      <nav className="flex items-center gap-10">
        <HeaderButtons />
        <HeaderProfile />
      </nav>
    </header>
  );
};

export default Header;
