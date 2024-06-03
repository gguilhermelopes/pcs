import Option from "./Option";
import SessionsIcon from "./assets/SessionsIcon";
import PatientsIcon from "./assets/PatientsIcon";
import TherapistsIcon from "./assets/TherapistsIcon";
import EmployeesIcon from "./assets/EmployeesIcon";
import InsurancesIcon from "./assets/InsurancesIcon";
import UsersIcon from "./assets/UsersIcon";
import HelpIcon from "./assets/HelpIcon";
import Link from "next/link";

const options = [
  {
    label: "Sessões",
    icon: <SessionsIcon />,
    href: "/sessions",
  },
  {
    label: "Pacientes",
    href: "/patients",
    icon: <PatientsIcon />,
  },
  {
    label: "Terapeutas",
    href: "/therapists",

    icon: <TherapistsIcon />,
  },
  {
    label: "Colaboradores",
    href: "/employees",
    icon: <EmployeesIcon />,
  },
  {
    label: "Planos de Saúde",
    href: "/insurances",
    icon: <InsurancesIcon />,
    isSectionBreaker: true,
  },
  {
    label: "Usuários",
    href: "/users",
    icon: <UsersIcon />,
  },
  {
    label: "Ajuda",
    href: "/help",
    icon: <HelpIcon />,
  },
];

const Sidebar = () => {
  return (
    <div className="min-h-screen min-w-[280px] p-7 bg-secondary100 dark:bg-secondary500  border-r border-neutral-200/80 dark:border-neutral-700/80 ">
      <Link href="/">
        <h1 className="text-3xl text-center text-primary mb-14">
          psy solutions
        </h1>
      </Link>
      <span className="text-secondary300 dark:text-secondary400 uppercase text-xs mb-4 block">
        gerenciamento
      </span>
      <ul className="list-none flex flex-col gap-2">
        {options.map((option) => (
          <Option key={option.label} {...option} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
