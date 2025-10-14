"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const GetTripById = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unathorized");
  }

  const trip = await prisma.trip.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      dayPlans: {
        include: {
          activities: true,
        },
      },
    },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  return trip;
};
