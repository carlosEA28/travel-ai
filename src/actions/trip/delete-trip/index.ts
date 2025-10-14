"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const DeleteTrip = async (tripId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    // Verifica se a viagem pertence ao usuário
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
        userId: session.user.id,
      },
    });

    if (!trip) {
      throw new Error(
        "Trip not found or you don't have permission to delete it"
      );
    }

    // Deleta a viagem
    await prisma.trip.delete({
      where: {
        id: tripId,
      },
    });

    // Atualiza o cache
    revalidatePath(`/user/my-trips/${session.user.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw new Error("Failed to delete trip");
  }
};
