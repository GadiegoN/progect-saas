import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  console.log(session.user?.name);

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello Dashboard!</h1>
    </main>
  );
}
