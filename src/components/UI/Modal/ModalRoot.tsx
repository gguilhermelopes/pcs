import { HTMLAttributes, ReactNode } from "react";
import useAnimatedUnmount from "@/hooks/useAnimatedUnmount";
import { twMerge } from "tailwind-merge";

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isModalOpen: boolean;
}

const ModalRoot = ({ children, isModalOpen }: ModalRootProps) => {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isModalOpen);
  if (!shouldRender) return null;
  return (
    <div
      ref={animatedElementRef}
      className={twMerge(
        "fixed top-0 left-0 w-full h-screen bg-slate-800 backdrop-blur-sm bg-opacity-60 z-10 flex items-center justify-center animate-fade-in",
        !isModalOpen && "animate-fade-out"
      )}
    >
      {children}
    </div>
  );
};

export default ModalRoot;
