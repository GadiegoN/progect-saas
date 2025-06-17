"use server";

import { auth } from "@/lib/auth";
import { PlanDetailsProps } from "./get-plans";
import prisma from "@/lib/prisma";
import { canCreateService } from "./can-create-service";

export type PLAN_PROP =
  | "BASIC"
  | "PROFESSIONAL"
  | "ENTERPRISE"
  | "TRIAL"
  | "EXPIRED";

export interface ResultPermissionProps {
  hasPermission: boolean;
  planId: string;
  expired: boolean;
  plan: PlanDetailsProps | null;
}

interface CanPErmissionProps {
  type: string;
}

export async function canPermission({
  type,
}: CanPErmissionProps): Promise<ResultPermissionProps> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  switch (type) {
    case "service":
      const permission = await canCreateService(subscription, session);

      return permission;

    default:
      return {
        hasPermission: false,
        planId: "EXPIRED",
        expired: true,
        plan: null,
      };
  }
}
