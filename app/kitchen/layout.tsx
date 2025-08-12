"use client";

import { Header } from "@/components/Header";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";

export default function KitchenLayout({
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
