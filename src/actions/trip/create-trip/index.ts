"use server";

import { generateTrip } from "@/app/api/gemini";
import { GetImageUrl } from "@/app/api/unsplash";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  //checar se a trip ja n existe
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

  // Call the Gemini function
  const aiResponse = await generateTrip(params);

  //separar parametros
  const landmark = aiResponse.famousLandmark;
  const estimatedCost = aiResponse.estimatedCost;
  const dayPlans = aiResponse.dayPlans;

  //chamar func do unsplash e pegar a public url
  const response = await GetImageUrl(landmark);
  const imageUrl = response.urls.full;

  //criar a trip

  //tirar de any para algum tipo, any para teste
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        create: dayPlans.map((plan: any) => ({
          dayNumber: plan.dayNumber,
          date: plan.date ? new Date(plan.date) : new Date(params.startDate), // fallback seguro
          activities: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: plan.activities.map((act: any) => ({
              title: act.title,
              description: act.description ?? null,
              category: act.category ?? null,
              startTime: act.startTime ?? null,
              endTime: act.endTime ?? null,
              locationName: act.locationName ?? null,
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
