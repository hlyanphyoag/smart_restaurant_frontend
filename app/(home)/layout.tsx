"use client";
import { Header } from "@/components/Header";
import React, { useEffect } from "react";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const { setAuthUser, authUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (session.data) {
      setAuthUser(session.data?.user as User);
    }
    if (session.status === "unauthenticated") {
      router.replace("/sign-in");
    }
  }, [session.data, session.status, setAuthUser, router]);

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
