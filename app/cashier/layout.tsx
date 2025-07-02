import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";

export default async function CashierLayout({children} : {children : React.ReactNode}) {
    const session = await getServerSession();
    return (
        <div >
            <Header user={session?.user as User}/>
            {children}
        </div>
    )
}