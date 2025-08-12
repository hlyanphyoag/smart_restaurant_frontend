"use client";

import { User } from "@/types/user";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizeable-navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  BellIcon,
  CalculatorIcon,
  History,
  HistoryIcon,
  List,
  LogOutIcon,
  PlusCircle,
  User2Icon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { notiStore } from "@/store/StatusStore";
import CheckOutCard from "@/app/(home)/component/CheckOutCard";
import ProfilePicture from "./ui/ProfilePicture";

export function Header({ user }: { user: User }) {
  const router = useRouter();
  const { notifications, removeNotification } = notiStore();

  const navItems = [
    {
      name: "Order History",
      link: "/order-history",
    },
    {
      name: "Notifications",
      link: "/notifications",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    return redirect("/sign-in");
  };

  console.log("User from Header:", user?.role);

  return (
    <div className="relative w-full p-4">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            {user?.role === "CUSTOMER" && (
              <div className="flex items-center gap-2">
                <Button
                  className="relative"
                  onClick={() => {
                    router.push("/order-history");
                    removeNotification();
                  }}
                  size="icon"
                  variant="secondary"
                >
                  <HistoryIcon size={28} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Button>

                {/* <div>
                  <Button
                    className="relative"
                    onClick={() => {
                      router.push("/notifications");
                    }}
                    size="icon"
                    variant="secondary"
                  >
                    <BellIcon size={28} />
                  </Button>
                </div> */}
              </div>
            )}
            {user?.role === "CASHIER" && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.push("/cashier/pos/")}
                  size="icon"
                  variant="secondary"
                >
                  <CalculatorIcon size={28} />
                </Button>
              </div>
            )}
            {user?.role === "STOCKHOLDER" && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.push("/stockholder/add-ingredient")}
                  size="icon"
                  variant="secondary"
                >
                  <PlusCircle size={28} />
                </Button>
                <Button
                  onClick={() => router.push("/stockholder/all-ingredient")}
                  size="icon"
                  variant="secondary"
                >
                  <List size={28} />
                </Button>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <ProfilePicture name={user.name} />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className="cursor-pointer text-gray-600 flex items-center justify-start"
                >
                  <User2Icon size={28} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-gray-600 flex items-center justify-start"
                  onClick={handleLogout}
                >
                  <LogOutIcon size={28} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-4">
              <div className="flex  justify-between items-center">
                <div className="border size-11 flex items-center justify-center border-gray-400 p-3 rounded-full">
                  {user?.name ? user.name[0] : "U"}
                </div>
                <Button
                  className="relative"
                  onClick={() => {
                    router.push("/order-history");
                    removeNotification();
                  }}
                  size="icon"
                  variant="secondary"
                >
                  <HistoryIcon size={28} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                  <LogOutIcon size={20} />
                  <small>Logout</small>
                </Button>
              </div>

              <div>
                <h1 className="text-md font-semibold">Your Cart</h1>
              </div>
              <CheckOutCard />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
