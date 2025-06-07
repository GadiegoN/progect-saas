"use server";

import prisma from "@/lib/prisma";

export async function getAllServices({ userId }: { userId: string }) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        userId: userId,
        status: true,
      },
    });

    return {
      services,
      servicesCount: services.length,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
}
