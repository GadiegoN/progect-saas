import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-info-user";

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
      <h1 className="text-3xl font-bold underline">Hello Profile!</h1>
    </main>
  );
}
