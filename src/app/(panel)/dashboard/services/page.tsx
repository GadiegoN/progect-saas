import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";
import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

export default async function Services() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <Suspense fallback={<Loading />}>
      <ServicesContent userId={session.user?.id!} />
    </Suspense>
  );
}
