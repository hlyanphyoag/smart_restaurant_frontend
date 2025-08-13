"use client";

import { Loading } from "@/components/Loading";
import Header from "./Components/Header";
import { SidebarDemo } from "./Components/SideBar";
import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { setAuthUser, authUser } = useAuthStore();

  useEffect(() => {
    if (session.data) {
      setAuthUser(session.data?.user as User);
    }
  }, [session.data]);

  if (session.status === "loading") {
    return <Loading />;
  }

  if (authUser)
    return (
      <div className="flex h-screen">
        <SidebarDemo />

        <div className="flex-1 min-h-100 h-full scroll-auto ml-80 p-10">
          <Header />
          <main className="">{children}</main>
        </div>
      </div>
    );
}
