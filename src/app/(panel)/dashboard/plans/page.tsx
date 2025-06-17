import { Loading } from "@/components/ui/loading";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PlansGrid } from "./_components/plans-grid";
import { getSubscription } from "@/utils/get-subscription";
import { PlansSubscriptionDetails } from "./_components/plans-subscription-details";

export default async function Plans() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await getSubscription({ userId: session.user?.id });

  return (
    <Suspense fallback={<Loading />}>
      {subscription?.status !== "active" && <PlansGrid />}
      {subscription?.status === "active" && (
        <PlansSubscriptionDetails subscription={subscription!} />
      )}
    </Suspense>
  );
}
