"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { adminSideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex max-w-72 flex-1 flex-col p-6 overflow-hidden  rounded-md border border-neutral-200 bg-gray-100 md:flex-row  dark:border-neutral-700 dark:bg-neutral-800 h-screen " // for your use case, use `h-screen`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-4">
              {adminSideBarLinks.map((link, idx) => {
                return (
                  <SidebarLink
                    key={idx}
                    icon={link.icon}
                    route={link.route}
                    text={link.text}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <SidebarFooter />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black text-lg dark:text-white"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};


export const SidebarFooter = () => {
 
  const {data: session} = useSession()
  const handleLogout = async() =>{
    await signOut()
  }
  return (
    <div className="">
       <div className="flex items-center gap-2">
         <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">{session?.user?.name![0]}</div>
         <div>
          <h2 className="font-semibold">{session?.user?.name}</h2>
          <small className="text-gray-600">{session?.user?.email}</small>
         </div>
         <Button  onClick={handleLogout} variant='secondary' size='icon' className="ml-2">
           <LogOutIcon />
         </Button>
       </div>
    </div>
  )
}