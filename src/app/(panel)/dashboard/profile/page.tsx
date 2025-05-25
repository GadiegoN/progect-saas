import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-info-user";
import { ProfileContent } from "./_components/profile-content";

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
    <main>
      <ProfileContent user={user} />
    </main>
  );
}
