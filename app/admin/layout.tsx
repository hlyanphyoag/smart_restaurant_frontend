import { Toaster } from "@/components/ui/sooner";
import Header from "./Components/Header";
import { SidebarDemo } from "./Components/SideBar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="w-72 flex-shrink-0 fixed  border-r border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800">
        <SidebarDemo />
      </div>
      <div className="flex-1 min-h-100 h-full scroll-auto ml-72 p-10">
        <Header />
        <main className="">
          <Toaster />
          {children}
        </main>
      </div>
    </div>
  );
}
