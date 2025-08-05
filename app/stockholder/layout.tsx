'use client'
import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";

export default  function StockholderLayout({children} : {children: React.ReactNode}) {
    const session = useSession();
    return (
        <div>
            <Toaster />
            <Header user={session?.data?.user as User}/>
            {children}
        </div>
    )
}