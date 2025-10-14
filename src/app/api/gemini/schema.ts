import z from "zod";

const generateTripSchema = z.object({
  destination: z.string().trim().min(1, "Destino obrigatório"),
  budget: z.number().min(1, "Orçamento obrigatório"),
  startDate: z.date(),
  endDate: z.date(),
  interest: z.array(z.string()).min(1, "Interesses obrigatórios"),
});

export type GenerateTripSchema = z.infer<typeof generateTripSchema>;
