"use server";

import { Plan } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";

interface SubscriptionProps {
  type: Plan;
}

export async function createSubscription({ type }: SubscriptionProps) {
  const session = await auth();
  const userId = session?.user.id;
  const planPriceMap: Record<Plan, string | undefined> = {
    BASIC: process.env.STRIPE_PLAN_BASIC,
    PROFESSIONAL: process.env.STRIPE_PLAN_PROFESSIONAL,
    ENTERPRISE: process.env.STRIPE_PLAN_ENTERPRISE,
  };

  if (!userId) {
    return {
      sessionId: "",
      error: "Falha ao ativar plano.",
    };
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    return {
      sessionId: "",
      error: "Falha ao ativar plano.",
    };
  }

  let customerId = findUser.stripe_custumer_id;

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: findUser.email,
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripe_custumer_id: stripeCustomer.id,
      },
    });

    customerId = stripeCustomer.id;
  }

  try {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: planPriceMap[type],
          quantity: 1,
        },
      ],
      metadata: {
        type: type,
      },
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return {
      sessionId: stripeCheckoutSession.id,
    };
  } catch (err) {
    return {
      sessionId: "",
      error: "Falha ao ativar plano.",
    };
  }
}
