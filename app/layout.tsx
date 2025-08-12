import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/ReactQuery/QueryProvider";
import { AuthProvider } from "@/components/AuthContext";
import { SocketContextProvider } from "@/provider/SocketContextProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Restaurant",
  description: "Smart Restaurant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AuthProvider>
          <QueryProvider>
            <SocketContextProvider>{children}</SocketContextProvider>
            <Toaster richColors />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
