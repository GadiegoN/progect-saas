"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Subscription } from "@/generated/prisma";
import { subscriptionPlans } from "@/utils/plans";
import { createPortalCustomer } from "../_actions/create-portal-customer";
import { toast } from "sonner";

interface PlansSubscriptionDetailsProps {
  subscription: Subscription;
}

const planNameMap: Record<string, string> = {
  BASIC: "Básico",
  PROFESSIONAL: "Profissional",
  ENTERPRISE: "Empresa",
};

export function PlansSubscriptionDetails({
  subscription,
}: PlansSubscriptionDetailsProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan
  );

  const planName = planNameMap[subscription.plan] || "Plano desconhecido";
  const statusLabel = subscription.status === "active" ? "ATIVO" : "INATIVO";

  const handleManageSubscription = async () => {
    const portal = await createPortalCustomer();

    if (portal.error) {
      toast.error("Erro ao gerenciar assinatura.");

      return;
    }

    window.location.href = portal.sessionId;
  };

  return (
    <Card className="w-full max-w-xl mx-auto lg:ml-10">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl">Seu plano atual</CardTitle>
        <CardDescription>Assinatura ativa</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{planName}</h3>
            <span className="p-2 rounded-md bg-primary text-white font-semibold">
              {statusLabel}
            </span>
          </div>

          {subscriptionInfo && (
            <ul className="list-disc list-inside space-y-2">
              {subscriptionInfo.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6">
        <Button onClick={handleManageSubscription} className="w-full">
          Gerenciar assinatura
        </Button>
      </CardFooter>
    </Card>
  );
}
