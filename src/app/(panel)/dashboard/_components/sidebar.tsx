"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { LogoTempCon } from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Folder,
  User,
  Banknote,
} from "lucide-react";

interface NavLinkProps {
  name: string;
  pathName: string;
  href: string;
  icon: React.ComponentType;
}

const dashboardNavItems: NavLinkProps[] = [
  {
    name: "Agendamentos",
    pathName: "/dashboard",
    href: "/dashboard",
    icon: Calendar,
  },
  {
    name: "Serviços",
    pathName: "/dashboard/services",
    href: "/dashboard/services",
    icon: Folder,
  },
];

const settingsNavItems: NavLinkProps[] = [
  {
    name: "Perfil",
    pathName: "/dashboard/profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Planos",
    pathName: "/dashboard/plans",
    href: "/dashboard/plans",
    icon: Banknote,
  },
];

function NavigationGroup({
  title,
  items,
  collapsed,
  pathname,
  onClick,
}: {
  title: string;
  items: NavLinkProps[];
  collapsed: boolean;
  pathname: string;
  onClick?: () => void;
}) {
  return (
    <>
      {!collapsed && (
        <li className="text-xs text-muted-foreground font-bold uppercase tracking-wider px-2 mt-6">
          {title}
        </li>
      )}
      {items.map(({ name, href, icon: Icon, pathName }) => {
        const isActive = pathname === pathName;
        return (
          <li key={name}>
            <Link
              href={href}
              onClick={onClick}
              className={clsx(
                "hover:text-primary transition duration-200 flex items-center gap-2",
                isActive ? "text-primary font-semibold" : "text-gray-800"
              )}
            >
              <Icon />
              {!collapsed && <span>{name}</span>}
            </Link>
          </li>
        );
      })}
    </>
  );
}

function NavLinks({
  collapsed,
  pathname,
  onLinkClick,
}: {
  collapsed: boolean;
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <nav
      className={clsx(
        "flex gap-1 mt-8 overflow-hidden",
        collapsed && "mx-auto"
      )}
    >
      <ul className="flex flex-col gap-6">
        <NavigationGroup
          title="Dashboard"
          items={dashboardNavItems}
          collapsed={collapsed}
          pathname={pathname}
          onClick={onLinkClick}
        />
        <NavigationGroup
          title="Configurações"
          items={settingsNavItems}
          collapsed={collapsed}
          pathname={pathname}
          onClick={onLinkClick}
        />
      </ul>
    </nav>
  );
}

export function SidebarDashboard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "hidden md:flex md:fixed md:top-0 md:left-0 md:h-screen md:overflow-hidden flex-col border-r bg-background transition-all duration-300 p-4",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="mb-6 mt-4 flex justify-center">
          <LogoTempCon colapsed={isCollapsed} />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={toggleCollapse}
            title={isCollapsed ? "Expandir" : "Recolher"}
            variant="outline"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <NavLinks collapsed={isCollapsed} pathname={pathname} />
      </aside>

      {/* Main Content Area */}
      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        {/* Mobile Header */}
        <header className="md:hidden bg-secondary">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center justify-between gap-4 p-4">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-primary">CON</span>TEMP
              </Link>

              <SheetTrigger asChild>
                <button className="flex items-center cursor-pointer justify-center w-10 h-10 p-2 text-gray-500 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <Menu />
                </button>
              </SheetTrigger>
            </div>

            <SheetContent
              side="right"
              className="w-64 bg-white p-4 flex flex-col justify-between"
            >
              <div>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold mb-2">
                    <span className="text-primary">CON</span>TEMP
                  </SheetTitle>
                  <SheetDescription className="text-gray-600">
                    Menu de navegação
                  </SheetDescription>
                </SheetHeader>

                <NavLinks
                  collapsed={false}
                  pathname={pathname}
                  onLinkClick={() => setIsOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}
