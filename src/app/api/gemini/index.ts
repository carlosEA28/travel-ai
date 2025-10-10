import { GoogleGenAI } from "@google/genai";
import { GenerateTripSchema } from "./schema";
import { formatCents } from "@/helpers/money";
import { coverToJsonHelper } from "@/helpers/coverToJson";

const ai = new GoogleGenAI({});

export async function generateTrip(params: GenerateTripSchema) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Você é um planejador de viagens inteligente.  
Gere um itinerário detalhado em formato **JSON válido** com base nas informações a seguir:

- Destino: ${params.destination}  
- Data de início: ${params.startDate}  
- Data de término: ${params.endDate}  
- Orçamento: ${formatCents(params.budget)}  
- Interesses do usuário: ${params.interest.join(", ")}  

### Regras importantes:
- Responda **somente** com um JSON válido, sem explicações, texto adicional ou formatação extra.  
- O JSON deve conter os seguintes campos no nível raiz:
  - "estimatedCost": custo total estimado da viagem em reais.  
  - "famousLandmark": nome do ponto turístico mais famoso do destino.  
  - "dayPlans": um array de objetos, um para cada dia entre a data de início e término.
  - "country": nome do país do destino no padrão ISO 3166-1 alpha-2.

### Estrutura de cada \`dayPlan\`:
- \`dayNumber\`: número do dia.  
- \`date\`: data do dia.  
- \`activities\`: array de objetos descrevendo cada atividade do dia.

### Estrutura de cada atividade:
- \`title\`: nome curto da atividade.  
- \`description\`: detalhes da atividade ou local.  
- \`category\`: tipo da atividade (ex: "tourism", "food", "entertainment", "walking", etc).  
- \`startTime\`: horário de início (formato HH:mm).  
- \`endTime\`: horário de término (formato HH:mm).  
- \`locationName\`: nome exato do local onde a atividade acontece.  
- \`placeId\`: identificador único do local (pode ser deixado vazio se não disponível).  
- \`lat\`: latitude do local (deixe nulo se não souber).  
- \`lng\`: longitude do local (deixe nulo se não souber).  
- \`estimatedCost\`: custo estimado da atividade em reais.

### Instruções adicionais para \`locationName\`:
- **Analise os campos \`title\` e \`description\` de cada atividade.**
- Se encontrar o nome de um **ponto turístico, restaurante, museu, praça, mercado ou local específico**, copie esse nome e insira-o automaticamente no campo \`"locationName"\`.
- Se não encontrar nenhum nome específico, deixe \`"locationName"\` como \`null\`.

### Exemplo de saída esperada:

\`\`\`json
{
  "estimatedCost": 3500,
  "famousLandmark": "Praça do Comércio",
  "country": "PT",
  "dayPlans": [
    {
      "dayNumber": 1,
      "date": "2025-12-01",
      "activities": [
        {
          "title": "Café da manhã no Time Out Market",
          "description": "Comece o dia experimentando iguarias locais no famoso mercado gastronômico Time Out Market.",
          "category": "food",
          "startTime": "08:30",
          "endTime": "09:30",
          "locationName": "Time Out Market",
          "placeId": "",
          "lat": null,
          "lng": null,
          "estimatedCost": 40
        },
        {
          "title": "Passeio na Praça do Comércio",
          "description": "Explorar a icônica praça à beira do Rio Tejo.",
          "category": "tourism",
          "startTime": "10:00",
          "endTime": "12:00",
          "locationName": "Praça do Comércio",
          "placeId": "",
          "lat": null,
          "lng": null,
          "estimatedCost": 0
        }
      ]
    }
  ]
}
\`\`\`
    `,
  });

  const parsedReposponse = await coverToJsonHelper(response);
  return parsedReposponse;
}
