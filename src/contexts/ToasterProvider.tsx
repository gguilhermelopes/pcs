"use client";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      toastOptions={{
        style: {
          background: theme === "dark" ? "#1e1e1e" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        },
        success: {
          duration: 4000,
        },
      }}
    />
  );
};

export default ToasterProvider;
