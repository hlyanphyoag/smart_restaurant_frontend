"use client";
import { Header } from "@/components/Header";
import React, { useEffect } from "react";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/AuthStore";

const layout = ({ children }: { children: React.ReactNode }) => {
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
      <div className="flex flex-col items-center">
        <Header />
        {children}
      </div>
    );
};

export default layout;
