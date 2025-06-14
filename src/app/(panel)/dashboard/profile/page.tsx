import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-info-user";
import { ProfileContent } from "./_components/profile-content";
import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await getUserData({ userId: session.user?.id });

  if (!user) {
    redirect("/");
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent user={user} />
    </Suspense>
  );
}
