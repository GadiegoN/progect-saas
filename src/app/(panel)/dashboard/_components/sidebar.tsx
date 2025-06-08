"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Folder,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../../../public/logo-odonto.png";

interface NavLinkProps {
  name: string;
  pathName: string;
  href: string;
  icon: React.ComponentType;
}

const navItems: NavLinkProps[] = [
  {
    name: "Dashboard",
    pathName: "/dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Perfil",
    pathName: "/dashboard/profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Agendamentos",
    pathName: "/dashboard/appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    name: "Serviços",
    pathName: "/dashboard/services",
    href: "/dashboard/services",
    icon: Folder,
  },
];

export function SidebarDashboard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ collapsed }: { collapsed: boolean }) => (
    <ul className="flex flex-col md:flex-row gap-8">
      {navItems.map((item) => {
        const isActive = pathname === item.pathName;
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "hover:text-primary transition duration-200 flex items-center gap-2",
                isActive ? "text-primary font-semibold" : "text-gray-800"
              )}
            >
              <item.icon />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
            "md:top-0 md:left-0 md:h-screen": true,
            "md:overflow-hidden": true,
            "flex md:w-64": !isCollapsed,
          }
        )}
      >
        <div className="mb-6 mt-4">
          <Image
            src={logoImage}
            alt="Logo"
            priority
            quality={100}
            width={isCollapsed ? 40 : 150}
            height={isCollapsed ? 40 : 150}
          />
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-gray-100 hover:bg-secondary text-primary self-end rounded-md cursor-pointer transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isCollapsed ? (
            <ChevronRight className="size-6" />
          ) : (
            <ChevronLeft className="size-6" />
          )}
        </button>
        <nav
          className={clsx(
            "flex gap-1 mt-8 overflow-hidden",
            isCollapsed ? "mx-auto" : ""
          )}
        >
          <ul className="flex flex-col gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.pathName;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "hover:text-primary transition duration-200 flex items-center gap-2",
                      isActive ? "text-primary font-semibold" : "text-gray-800"
                    )}
                  >
                    <item.icon />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden bg-secondary">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center justify-between gap-4 p-4">
              <Link href="/" className="text-2xl font-bold">
                Gadiego<span className="text-primary">PRO</span>
              </Link>

              <SheetTrigger asChild>
                <button className="flex items-center cursor-pointer justify-center md:hidden w-10 h-10 p-2 text-gray-500 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <Menu />
                </button>
              </SheetTrigger>
            </div>

            <SheetContent
              side="right"
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-[80px]" : "w-64"
              } bg-white p-4 flex flex-col justify-between`}
            >
              <div>
                <SheetHeader>
                  {isCollapsed ? (
                    <SheetTitle className="text-2xl flex justify-center font-bold mb-2">
                      G<span className="text-primary">PRO</span>
                    </SheetTitle>
                  ) : (
                    <>
                      <SheetTitle className="text-2xl font-bold mb-2">
                        Gadiego<span className="text-primary">PRO</span>
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
                  }`}
                >
                  <NavLinks collapsed={isCollapsed} />
                </nav>
              </div>

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="mt-6 flex items-center justify-center w-full py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {!isCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </button>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}
