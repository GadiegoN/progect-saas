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
import {
  LayoutDashboard,
  LogIn,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Github,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { handleRegister, LoginType } from "../_actions/login";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  name: string;
  pathName: string;
  href: string;
  icon: React.ComponentType;
  isLoggedIn?: boolean;
}

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  async function handleLogin(provider: LoginType) {
    setIsOpen(false);
    await handleRegister(provider);
  }

  const NavLinks = ({ collapsed }: { collapsed: boolean }) => {
    const isLoggedIn = status === "authenticated";

    return (
      <ul className="flex flex-col md:flex-row gap-8">
        {isLoggedIn && (
          <li>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-primary transition duration-200 flex items-center gap-2"
            >
              <LayoutDashboard />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <Button
                onClick={() => {
                  handleLogin("google");
                }}
                className="bg-indigo-700 hover:bg-indigo-500"
              >
                <LogIn />
                {!collapsed && <span>Login com Google</span>}
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  handleLogin("github");
                }}
                className="bg-gray-800 hover:bg-gray-700"
              >
                <Github />
                {!collapsed && <span>Login com Github</span>}
              </Button>
            </li>
          </>
        )}
      </ul>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-secondary p-4 shadow-md z-50">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-primary">CON</span>TEMP
        </Link>

        <nav className="hidden md:flex space-x-8">
          <NavLinks collapsed={false} />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md hover:bg-primary transition duration-200 md:hidden">
            <Menu />
          </SheetTrigger>

          <SheetContent
            side="right"
            className={`transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-[80px]" : "w-64"
            } bg-white p-4 flex flex-col justify-between`}
          >
            <div>
              <SheetHeader>
                {isCollapsed && (
                  <SheetTitle className="text-2xl flex justify-center font-bold mb-2">
                    G<span className="text-primary">PRO</span>
                  </SheetTitle>
                )}
                {!isCollapsed && (
                  <>
                    <SheetTitle className="text-2xl font-bold mb-2">
                      <span className="text-primary">CON</span>TEMP
                    </SheetTitle>
                    <SheetDescription className="text-gray-600">
                      Menu de navegação
                    </SheetDescription>
                  </>
                )}
              </SheetHeader>

              <nav
                className={`mt-6 flex ${
                  isCollapsed ? "justify-center" : "justify-start"
                }
            `}
              >
                <NavLinks collapsed={isCollapsed} />
              </nav>
            </div>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="mt-6 flex items-center justify-center cursor-pointer w-full py-2 rounded-md text-primary hover:bg-secondary"
            >
              {!isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
