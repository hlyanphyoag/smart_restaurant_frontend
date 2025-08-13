"use client";
import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";

export default function StockholderLayout({
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
        <Toaster />
        <Header />
        {children}
      </div>
    );
}
