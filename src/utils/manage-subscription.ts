import { Plan } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { stripe } from "./stripe";

/**
 * Gerencia uma assinatura (subscription) de um usuário no banco de dados,
 * sincronizando com os dados do Stripe. Pode criar, atualizar ou remover
 * a assinatura conforme os parâmetros fornecidos.
 *
 * @async
 * @function manageSubscription
 * @param {string} subscriptionId - ID da assinatura no Stripe.
 * @param {string} customerId - ID do cliente no Stripe.
 * @param {boolean} [createAction=false] - Define se deve criar uma nova assinatura.
 * @param {boolean} [deleteAction=false] - Define se deve remover a assinatura.
 * @param {Plan} [type] - Tipo de plano associado à assinatura.
 *
 * @returns {Promise<Response | void>}
 */
export async function manageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
  type?: Plan
) {
  const user = await prisma.user.findFirst({
    where: {
      stripe_custumer_id: customerId,
    },
  });

  if (!user) {
    return Response.json(
      { error: "Falha ao realizar assinatura" },
      { status: 400 }
    );
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: user.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? "BASIC",
  };

  if (deleteAction) {
    await prisma.subscription.delete({
      where: { id: subscriptionId },
    });

    return;
  }

  try {
    if (createAction) {
      await prisma.subscription.create({ data: subscriptionData });
    } else {
      const existingSubscription = await prisma.subscription.findFirst({
        where: { id: subscriptionId },
      });

      if (!existingSubscription) return;

      await prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
        },
      });
    }
  } catch (err) {
    console.error("Erro ao gerenciar assinatura:", err);
  }
}

// export async function manageSubscription(
//   subscriptionId: string,
//   custumerId: string,
//   createAction = false,
//   deleteAction = false,
//   type?: Plan
// ) {
//   const findUser = await prisma.user.findFirst({
//     where: {
//       stripe_custumer_id: custumerId,
//     },
//   });

//   if (!findUser) {
//     return Response.json(
//       {
//         error: "Falha ao realizar assinatura",
//       },
//       { status: 400 }
//     );
//   }

//   const subscription = await stripe.subscriptions.retrieve(subscriptionId);

//   const subscriptionData = {
//     id: subscription.id,
//     userId: findUser.id,
//     status: subscription.status,
//     priceId: subscription.items.data[0].price.id,
//     plan: type ?? "BASIC",
//   };

//   if (subscriptionId && deleteAction) {
//     await prisma.subscription.delete({
//       where: {
//         id: subscriptionId,
//       },
//     });

//     return;
//   }

//   if (createAction) {
//     try {
//       await prisma.subscription.create({
//         data: subscriptionData,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   } else {
//     try {
//       const findSubscription = await prisma.subscription.findFirst({
//         where: {
//           id: subscriptionId,
//         },
//       });

//       if (!findSubscription) {
//         return;
//       }

//       await prisma.subscription.update({
//         where: {
//           id: findSubscription.id,
//         },
//         data: {
//           status: subscription.status,
//           priceId: subscription.items.data[0].price.id,
//           plan: type ?? "BASIC",
//         },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }
