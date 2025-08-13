"use client";

import { Loading } from "@/components/Loading";
import Header from "./Components/Header";
import { SidebarDemo } from "./Components/SideBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { setAuthUser, authUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (session.data) {
      setAuthUser(session.data?.user as User);
    }
    if (session.status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [session.data, session.status, setAuthUser, router]);

  if (session.status === "loading") {
    return <Loading />;
  }

  if (authUser) {
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
  // Optionally, render nothing or a loading spinner while redirecting
  return null;
}
