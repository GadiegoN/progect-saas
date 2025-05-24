import { SidebarDashboard } from "./_components/sidebar";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

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
    <div className="flex w-full min-h-screen bg-emerald-100">
      <SidebarDashboard>{children}</SidebarDashboard>
    </div>
  );
}
