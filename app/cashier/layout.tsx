"use client";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";

export default function CashierLayout({
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
        <Header user={session?.data?.user as User} />
        {children}
      </div>
    );
}
