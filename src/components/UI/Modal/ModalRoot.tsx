import { HTMLAttributes, ReactNode } from "react";

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isModalOpen: boolean;
}

const ModalRoot = ({ children, isModalOpen }: ModalRootProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-slate-800 backdrop-blur-sm bg-opacity-60 z-10 flex items-center justify-center">
      {children}
    </div>
  );
};

export default ModalRoot;
