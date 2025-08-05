'use client'
import { Header } from "@/components/Header";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";


export default  function CashierLayout({children} : {children : React.ReactNode}) {
    const session =  useSession();
    return (
        <div >
            <Header user={session?.data?.user as User}/>
            {children}
        </div>
    )
}