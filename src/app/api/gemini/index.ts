import { GoogleGenAI } from "@google/genai";
import { GenerateTripSchema } from "./schema";
import { formatCents } from "@/helpers/money";
import { coverToJsonHelper } from "@/helpers/coverToJson";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function generateTrip(params: GenerateTripSchema) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Você é um planejador de viagens inteligente.  
Gere um itinerário detalhado em formato JSON com base nas informações a seguir:

- Destino: ${params.destination}
- Data de início: ${params.startDate}
- Data de término: ${params.endDate}
- Orçamento: ${formatCents(params.budget)}
- Interesses do usuário: ${params.interest.join(", ")}

Regras importantes:
- O JSON deve conter:
  - "estimatedCost": custo total estimado da viagem em reais.
  - "famousLandmark": nome do ponto turístico mais famoso do destino.
  - "dayPlans": um array de objetos, um para cada dia entre a data de início e término.
    - Cada "dayPlan" deve ter:
      - "dayNumber", "date"
      - "activities": array com título, descrição, categoria, horário, localização, custo
- Responda apenas com JSON válido, sem texto adicional.
`,
  });

  const parsedReposponse = await coverToJsonHelper(response);
  return parsedReposponse;
}
