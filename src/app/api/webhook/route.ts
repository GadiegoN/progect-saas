import { Plan } from "@/generated/prisma";
import { manageSubscription } from "@/utils/manage-subscription";
import { stripe } from "@/utils/stripe";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  console.log("WebHook iniciando...");

  const text = await req.text();
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY as string
  );

  switch (event.type) {
    case "customer.subscription.deleted":
      const payment = event.data.object as Stripe.Subscription;
      await manageSubscription(
        payment.id,
        payment.customer.toString(),
        false,
        true
      );
      break;

    case "customer.subscription.updated":
      const paymentIntent = event.data.object as Stripe.Subscription;
      await manageSubscription(
        paymentIntent.id,
        paymentIntent.customer.toString(),
        false,
        false
      );
      revalidatePath("/dashboard/plans");
      break;

    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const type = checkoutSession.metadata?.type
        ? checkoutSession.metadata?.type
        : "BASIC";

      if (checkoutSession.subscription && checkoutSession.customer) {
        await manageSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true,
          false,
          type as Plan
        );
      }
      revalidatePath("/dashboard/plans");
      break;

    case "payment_intent.payment_failed":
      const paymentFailed = event.data.object as Stripe.PaymentIntent;
      console.log("checkoutSession", paymentFailed);
      break;

    default:
      console.log("Evento não tratado: ", event.type);
  }

  return NextResponse.json({ received: true });
};
