import { SidebarDashboard } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-emerald-100">
      <SidebarDashboard>{children}</SidebarDashboard>
    </div>
  );
}
