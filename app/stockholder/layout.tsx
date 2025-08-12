"use client";
import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";

export default function StockholderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.data)
    return (
      <div>
        <Toaster />
        <Header user={session?.data?.user as User} />
        {children}
      </div>
    );
}
