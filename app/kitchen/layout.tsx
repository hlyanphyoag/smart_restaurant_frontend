import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";
import { Toaster } from "@/components/ui/sooner";

export default async function KitchenLayout({children} : {children : React.ReactNode}) {
    const session = await getServerSession();
    return (
        <div >
            <Toaster />
            <Header user={session?.user as User}/>
            {children}
        </div>
    )
}