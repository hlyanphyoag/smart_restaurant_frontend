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
import { LogOutIcon, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function Header({ user }: { user: User }) {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async() => {
    await signOut({
      redirect: false,
    })
    return redirect('/sign-in')
  }

  return (
    <div className="relative w-full p-4">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {/* <NavItems items={navItems} /> */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <NavbarButton
                  variant="secondary"
                  className="rounded-full flex items-center justify-center text-lg border h-12 w-12 border-neutral-100 bg-green-400 text-white"
                >
                  {user?.name[0]}
                </NavbarButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem className="cursor-pointer text-gray-600 flex items-center justify-start">
                        <User2Icon  size={28}/>
                      Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-600 flex items-center justify-start" onClick={handleLogout}>
                      <LogOutIcon size={28}/>
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
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{user?.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
