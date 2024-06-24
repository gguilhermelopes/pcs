"use client";

import { UserContextProvider } from "@/contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

interface ProvidersProps extends PropsWithChildren {}

const client = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserContextProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}
