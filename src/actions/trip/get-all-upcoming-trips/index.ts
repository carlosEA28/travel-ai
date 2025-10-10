"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";

export const getAllUpcomingTrips = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const trips = await prisma.trip.findMany({
    where: {
      startDate: {
        gte: new Date(),
      },
      userId: session?.user.id,
    },
  });

  return trips;
};
