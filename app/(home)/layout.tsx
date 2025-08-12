"use client";
import { Header } from "@/components/Header";
import React from "react";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";

const layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.data)
    return (
      <div className="flex flex-col items-center">
        <Header user={session?.data?.user as User} />
        {children}
      </div>
    );
};

export default layout;
