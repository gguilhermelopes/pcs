"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

interface ProvidersProps extends PropsWithChildren {}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
