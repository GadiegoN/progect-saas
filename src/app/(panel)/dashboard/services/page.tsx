import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";

export default async function Services() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col">
      <ServicesContent userId={session.user?.id!} />
    </main>
  );
}
