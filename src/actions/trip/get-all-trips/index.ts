"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const GetAllTrips = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const trips = await prisma.trip.findMany({
      where: {
        userId: {
          equals: session?.user?.id,
        },
      },
    });
    return trips;
  } catch (error) {
    console.log(error);
    return null;
  }
};
