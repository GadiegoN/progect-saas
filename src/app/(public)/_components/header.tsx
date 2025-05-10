"use client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LayoutDashboard, LogIn, Menu, UserSearch } from "lucide-react";
import { useState } from "react";

interface NavLinkProps {
  name: string;
  href: string;
  icon: React.ComponentType;
  isLoggedIn?: boolean;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItens: NavLinkProps[] = [
    {
      name: "Profissionais",
      href: "/#profissionais",
      icon: UserSearch,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      isLoggedIn: true,
    },
    {
      name: "Login",
      href: "/login",
      icon: LogIn,
      isLoggedIn: false,
    },
  ];

  const NavLinks = () => {
    return (
      <ul className="flex flex-col md:flex-row gap-4">
        {navItens
          .filter(
            (item) =>
              item.isLoggedIn === undefined || item.isLoggedIn === isLoggedIn
          )
          .map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-400 transition duration-200 flex items-center gap-2"
              >
                {item.icon && <item.icon />}
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-md z-50">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Gadiego<span className="text-emerald-500">PRO</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="bg-emerald-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition duration-200 md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-8/12 sm:max-w-sm bg-white p-6 rounded-lg shadow-lg">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">Login</SheetTitle>
              <SheetDescription className="text-gray-600">
                Veja nossos links.
              </SheetDescription>
            </SheetHeader>
            <nav className="space-x-8">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
