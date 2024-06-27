import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { Loader } from "@/components/UI/Loader";

const monaSans = localFont({
  src: "./mona-sans.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "psyclinic solutions",
  description: "Psychology clinic SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={monaSans.className}>
        <Toaster />
        <Providers>
          <Suspense fallback={<Loader.Root className="w-5 h-5" />}>
            <Sidebar />
            <div className="flex flex-col h-screen w-full bg-white dark:bg-neutral-900">
              <Header />
              {children}
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
