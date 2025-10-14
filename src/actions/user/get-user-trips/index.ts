"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const GetUserTrips = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/signup");
  }

  const trips = await prisma.trip.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return trips;
};
