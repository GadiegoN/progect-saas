"use server";

import prisma from "@/lib/prisma";

interface GetUserDAtaProps {
  userId: string;
}

export async function getUserData({ userId }: GetUserDAtaProps) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}
