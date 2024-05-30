import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

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
    <html lang="en">
      <body className={monaSans.className}>
        <Sidebar />
        <div>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
