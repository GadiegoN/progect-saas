"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@/generated/prisma";
import { createSubscription } from "../_actions/create-subscription";
import { toast } from "sonner";
import { getStripeJs } from "@/utils/stripe-js";

interface PlanSubscriptionButtonProps {
  isPromo?: boolean;
  type: Plan;
}

export function PlanSubscriptionButton({
  isPromo,
  type,
}: PlanSubscriptionButtonProps) {
  async function handleCreateBilling(type: Plan) {
    const { sessionId, error } = await createSubscription({ type: type });

    if (error) {
      toast.error(error);

      return;
    }

    const stripe = await getStripeJs();

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: sessionId });
    }
  }

  return (
    <Button
      className="w-full mt-6"
      variant={isPromo ? "default" : "outline"}
      onClick={() => handleCreateBilling(type)}
    >
      Assinar plano
    </Button>
  );
}
