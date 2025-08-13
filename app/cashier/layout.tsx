"use client";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/AuthStore";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CashierLayout({
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
      router.replace("/sign-in");
    }
  }, [session.data, session.status, setAuthUser, router]);

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
