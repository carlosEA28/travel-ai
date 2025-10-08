import { GenerateContentResponse } from "@google/genai";

export const coverToJsonHelper = async (rawText: GenerateContentResponse) => {
  if (
    !rawText ||
    !rawText.candidates ||
    !Array.isArray(rawText.candidates) ||
    rawText.candidates.length === 0
  ) {
    throw new Error("A resposta da IA está incompleta ou inválida");
  }

  const firstCandidate = rawText.candidates[0];

  if (
    !firstCandidate.content?.parts ||
    firstCandidate.content.parts.length === 0
  ) {
    throw new Error("O conteúdo da resposta da IA está incompleto");
  }

  const textContent = firstCandidate.content.parts[0]?.text;
  if (!textContent) {
    throw new Error("Nenhum texto encontrado na resposta da IA");
  }

  try {
    // 🧼 Limpa blocos de código e espaços extras
    const cleanText = textContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Erro ao fazer parse do JSON da IA:", error);
    console.log("Conteúdo recebido:", textContent);
    throw new Error("Resposta da IA não está em JSON válido");
  }
};
