"use client";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/AuthStore";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CashierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { setAuthUser, authUser } = useAuthStore();

  useEffect(() => {
    if (session.data) {
      setAuthUser(session.data.user as User);
    }
  }, [session.data]);

  if (session.status === "loading") {
    return <Loading />;
  }

  if (authUser)
    return (
      <div>
        <Header />
        {children}
      </div>
    );
}
