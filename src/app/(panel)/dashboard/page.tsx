import { Button } from "@/components/ui/button";
import getSession from "@/lib/get-session";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/appointments/appointments";
import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { checkSubscriptionPermition } from "@/utils/permissions/check-subscription-permition";
import { LabelSubscription } from "@/components/ui/label-subscription";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await checkSubscriptionPermition(session.user.id!);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex gap-2 items-center justify-end">
        <Link href={`/clinic/${session.user?.id}`} target="_blank">
          <Button
            variant="outline"
            className="text-primary border-primary hover:text-primary/80"
          >
            <Calendar className="size-5" />
            <span>Novo agendamento</span>
          </Button>
        </Link>

        <ButtonCopyLink userId={session.user?.id} />
      </div>

      {subscription?.subscriptionStatus === "EXPIRED" && (
        <LabelSubscription expired={true} />
      )}

      {subscription?.subscriptionStatus === "TRIAL" && (
        <div>
          <p>{subscription?.message}</p>
        </div>
      )}

      {subscription?.subscriptionStatus !== "EXPIRED" && (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
          <Appointments userId={session.user?.id} />
          <Reminders userId={session.user?.id} />
        </section>
      )}
    </Suspense>
  );
}
