"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icon, LogOutIcon, UserIcon } from "lucide-react";
import { bowlChopsticks } from "@lucide/lab";
import { useAuthStore } from "@/store/AuthStore";
import ProfilePicture from "@/components/ui/ProfilePicture";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "w-80 flex-shrink-0 fixed z-50 border-r   mx-auto flex flex-1 flex-col p-6 overflow-hidden  rounded-md border border-neutral-200 bg-gray-100 md:flex-row  dark:border-neutral-700 dark:bg-neutral-800 h-screen " // for your use case, use `h-screen`
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
      <Icon size={40} className="text-green-400" iconNode={bowlChopsticks} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-green-400 text-lg"
      >
        Smart Restaurant
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Icon size={40} className="text-green-400" iconNode={bowlChopsticks} />
    </Link>
  );
};

export const SidebarFooter = () => {
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    logout();
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-900 shadow">
          <ProfilePicture
            name={authUser?.name}
            imageURL={authUser?.profilePic!}
          />
          <div className="flex flex-col justify-center">
            <h2 className="font-semibold text-base leading-tight">
              {authUser?.name}
            </h2>
            <small className="text-gray-500 dark:text-gray-400 text-xs">
              {authUser?.email}
            </small>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="icon"
            className="ml-auto"
            title="Logout"
          >
            <LogOutIcon className="w-5 h-5" />
          </Button>
        </div>
        <Link
          href="/profile"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors shadow text-sm"
        >
          <UserIcon size={20} />
          Profile
        </Link>
      </div>
    </div>
  );
};
