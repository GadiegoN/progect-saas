import { SidebarDashboard } from "./_components/sidebar";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <SidebarDashboard>
        {children} <Toaster duration={2500} />
      </SidebarDashboard>
    </div>
  );
}
