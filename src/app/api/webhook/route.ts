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

  const text = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK_KEY as string
    );
  } catch (err) {
    console.error("Erro ao verificar assinatura do webhook:", err);
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  const { type, data } = event;

  try {
    switch (type) {
      case "customer.subscription.deleted": {
        const subscription = data.object as Stripe.Subscription;
        await manageSubscription(
          subscription.id,
          subscription.customer.toString(),
          false,
          true
        );
        break;
      }

      case "customer.subscription.updated": {
        const subscription = data.object as Stripe.Subscription;
        await manageSubscription(
          subscription.id,
          subscription.customer.toString(),
          false,
          false
        );
        revalidatePath("/dashboard/plans");
        break;
      }

      case "checkout.session.completed": {
        const session = data.object as Stripe.Checkout.Session;
        const planType = (session.metadata?.type as Plan) ?? "BASIC";

        if (session.subscription && session.customer) {
          await manageSubscription(
            session.subscription.toString(),
            session.customer.toString(),
            true,
            false,
            planType
          );
          revalidatePath("/dashboard/plans");
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = data.object as Stripe.PaymentIntent;
        console.warn("Pagamento falhou:", paymentIntent);
        break;
      }

      default:
        console.log("Evento Stripe não tratado:", type);
    }
  } catch (err) {
    console.error("Erro ao processar webhook:", err);
    return NextResponse.json(
      { error: "Erro ao processar evento" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
};
