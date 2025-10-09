/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { generateTrip } from "@/app/api/gemini";
import { GetImageUrl } from "@/app/api/unsplash";
import { geocodeLocation } from "@/app/api/maptiler";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import z from "zod";

const createTrip = z.object({
  destination: z.string().trim().min(1, "Destino obrigatório"),
  budget: z.number().min(1, "Orçamento obrigatório"),
  startDate: z.date(),
  endDate: z.date(),
  interest: z.array(z.string()).min(1, "Interesses obrigatórios"),
});

export const CreateTrip = async (params: z.infer<typeof createTrip>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unathorized");
  }

  const tripExists = await prisma.trip.findFirst({
    where: {
      destination: params.destination,
      startDate: params.startDate,
      userId: session.user.id,
    },
  });

  if (tripExists) {
    throw new Error(
      "Uma viagem para esse destino nessa mesma data já foi criada"
    );
  }

  const aiResponse = await generateTrip(params);
  const landmark = aiResponse.famousLandmark;
  const estimatedCost = aiResponse.estimatedCost;
  const dayPlans = aiResponse.dayPlans;

  const response = await GetImageUrl(landmark || params.destination);
  const imageUrl = response.urls.full;

  for (const day of dayPlans) {
    for (const activity of day.activities) {
      if (activity.locationName) {
        const { lat, lng } = await geocodeLocation(
          `${activity.locationName} ${params.destination}`
        );
        activity.lat = lat;
        activity.lng = lng;
      } else {
        activity.lat = null;
        activity.lng = null;
      }
    }
  }

  const trip = await prisma.trip.create({
    data: {
      userId: session.user.id,
      destination: params.destination,
      startDate: new Date(params.startDate),
      endDate: new Date(params.endDate),
      budget: params.budget,
      coverImageUrl: imageUrl,
      estimatedCost,
      dayPlans: {
        create: dayPlans.map((plan: any) => ({
          dayNumber: plan.dayNumber,
          date: plan.date ? new Date(plan.date) : new Date(params.startDate),
          activities: {
            create: plan.activities.map((act: any) => ({
              title: act.title,
              description: act.description ?? null,
              category: act.category ?? null,
              locationName: act.locationName ?? null,
              lat: act.lat,
              lng: act.lng,
              estimatedCost:
                typeof act.estimatedCost === "number"
                  ? act.estimatedCost
                  : null,
            })),
          },
        })),
      },
    },
    include: {
      dayPlans: {
        include: {
          activities: true,
        },
      },
    },
  });

  return trip;
};
