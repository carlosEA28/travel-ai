import { GoogleGenAI } from "@google/genai";
import { GenerateTripSchema } from "./schema";
import { formatCents } from "@/helpers/money";
import { coverToJsonHelper } from "@/helpers/coverToJson";

const ai = new GoogleGenAI({});

export async function generateTrip(params: GenerateTripSchema) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an intelligent travel planner.  
Generate a detailed itinerary in **valid JSON format** based on the following information:

- Destination: ${params.destination}  
- Start Date: ${params.startDate}  
- End Date: ${params.endDate}  
- Budget: ${formatCents(params.budget)}  
- User Interests: ${params.interest.join(", ")}  

### Important Rules:
- Respond **only** with valid JSON, without explanations, additional text, or extra formatting.  
- The JSON must contain the following root-level fields:
  - "estimatedCost": total estimated trip cost in Brazilian Reais.  
  - "famousLandmark": name of the most famous landmark at the destination.  
  - "dayPlans": an array of objects, one for each day between the start and end date.
  - "country": destination country name in ISO 3166-1 alpha-2 format.

### Structure of each \`dayPlan\`:
- \`dayNumber\`: day number.  
- \`date\`: date of the day.  
- \`activities\`: array of objects describing each day's activities.

### Structure of each activity:
- \`title\`: short name of the activity.  
- \`description\`: details about the activity or location.  
- \`category\`: type of activity (e.g., "tourism", "food", "entertainment", "walking", etc.).  
- \`startTime\`: start time (format HH:mm).  
- \`endTime\`: end time (format HH:mm).  
- \`locationName\`: exact name of the location where the activity takes place.  
- \`placeId\`: unique identifier of the location (can be left empty if not available).  
- \`lat\`: latitude of the location (null if unknown).  
- \`lng\`: longitude of the location (null if unknown).  
- \`estimatedCost\`: estimated cost of the activity in Brazilian Reais.

### Additional instructions for \`locationName\`:
- **Analyze the \`title\` and \`description\` fields of each activity.**
- If you find the name of a **tourist attraction, restaurant, museum, square, market, or specific location**, copy that name and automatically insert it into the \`"locationName"\` field.
- If no specific name is found, leave \`"locationName"\` as \`null\`.

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
          "title": "Breakfast at Time Out Market",
          "description": "Start your day by sampling local delicacies at the famous Time Out Market food hall.",
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
          "title": "Visit to Commerce Square",
          "description": "Explore the iconic square by the Tagus River.",
          "category": "tourism",
          "startTime": "10:00",
          "endTime": "12:00",
          "locationName": "Commerce Square",
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
