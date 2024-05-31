"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface OptionProps {
  label: string;
  icon: ReactNode;
  href: string;
  isSectionBreaker?: boolean;
}

const Option = ({ label, icon, href, isSectionBreaker }: OptionProps) => {
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <li className="flex flex-col gap-2">
      <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-2 text-lg cursor-pointer text-neutral-500 dark:text-neutral-300 rounded-md hover:bg-options-bg-gradient hover:text-white transition-colors ${
          isSelected && "bg-options-bg-gradient text-white"
        }`}
      >
        <span>{icon}</span> {label}
      </Link>
      {isSectionBreaker && (
        <div className="h-px bg-neutral-200/80 dark:bg-neutral-700/80 my-2" />
      )}
    </li>
  );
};

export default Option;
