"use client";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const SigninLayout = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/");
    }
  }, [session.data, session.status, router]);

  if (session.status === "loading") {
    return <Loading />;
  }

  return children;
};

export default SigninLayout;
