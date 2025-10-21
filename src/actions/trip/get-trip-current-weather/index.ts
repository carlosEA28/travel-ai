"use server";
import { MyMCPClient } from "../../../lib/mcp-client";

export const getTripCurrentWeather = async (city: string) => {
  const mcpClient = new MyMCPClient("http://0.0.0.0:8000/weather/mcp");
  await mcpClient.connect();

  try {
    const response = await mcpClient.callWeatherTool(city);

    if (!response) {
      throw new Error("Error processing query");
    }

    return response;
  } catch (error) {
    console.error("Error processing query:", error);
    throw error;
  }
};
