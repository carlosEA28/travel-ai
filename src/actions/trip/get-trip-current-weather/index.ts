"use server";
import { MyMCPClient } from "../../../lib/mcp-client";

export const getTripCurrentWeather = async (city: string) => {
  const mcpClient = new MyMCPClient("http://0.0.0.0:8000/weather/mcp");
  await mcpClient.connect();
  try {
    const response = await mcpClient.callWeatherTool(city);
    return response; // <-- certifique-se de que está retornando
  } catch (error) {
    console.error("Error processing query:", error);
    return null; // ou throw error
  } finally {
    await mcpClient.cleanup();
  }
};
