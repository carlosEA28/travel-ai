"use server";
import { MyMCPClient } from "../../../lib/mcp-client";

export const getTripCurrentWeather = async (city: string) => {
  const mcpClient = new MyMCPClient(`${process.env.MCP_BASE_URL}/weather/mcp`);
  await mcpClient.connect();
  try {
    const response = await mcpClient.callWeatherTool(city);
    return response;
  } catch (error) {
    console.error("Error processing query:", error);
    return null;
  } finally {
    await mcpClient.cleanup();
  }
};
