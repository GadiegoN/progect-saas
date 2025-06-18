"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getPermissionUserToReports() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      subscription: true,
    },
  });

  if (!user?.subscription || user.subscription.plan !== "ENTERPRISE") {
    return null;
  }

  return user;
}
