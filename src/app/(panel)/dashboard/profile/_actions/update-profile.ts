"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timezone: z.string(),
  times: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export async function updateProfile(formData: ProfileFormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        status: formData.status,
        timezone: formData.timezone,
        times: formData.times || [],
      },
    });

    revalidatePath("/dashboard/profile");

    return {
      success: "Profile updated successfully",
    };
  } catch (error) {
    return {
      error: "Error updating profile",
    };
  }
}
