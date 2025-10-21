"use server";

import { MyMCPClient } from "@/lib/mcp-client";

export const getDestinationForecast = async (city: string) => {
  const mcp = new MyMCPClient("http://0.0.0.0:8000/weather/mcp");
  await mcp.connect();
  const result = await mcp.callForecastTool(city);
  await mcp.cleanup();
  return result;
};
