import { Client } from "@modelcontextprotocol/sdk/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

/**
 * MyMCPClient
 * Um cliente simplificado para conectar a um servidor MCP via HTTP.
 * Exemplo de uso:
 *   const mcp = new MyMCPClient("http://0.0.0.0:8000/weather/mcp");
 *   await mcp.connect();
 *   const result = await mcp.callWeatherTool("São Paulo");
 */
export class MyMCPClient {
  private client: Client;
  private transport: StreamableHTTPClientTransport;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.transport = new StreamableHTTPClientTransport(new URL(this.baseUrl));
    this.client = new Client({ name: "frontend-mcp-client", version: "1.0.0" });
  }

  /** Conecta ao servidor MCP remoto via HTTP */
  async connect() {
    try {
      await this.client.connect(this.transport);

      const tools = await this.client.listTools();
      console.log(
        "✅ Conectado ao servidor MCP com as ferramentas:",
        tools.tools.map((t) => t.name)
      );

      return tools;
    } catch (error) {
      console.error("❌ Falha ao conectar ao servidor MCP:", error);
      throw error;
    }
  }

  /** Chama a ferramenta `get_current_location_weather` do servidor MCP */
  async callWeatherTool(city: string) {
    try {
      const result = await this.client.callTool({
        name: "get_current_location_weather",
        arguments: { city },
      });

      // Pega o JSON raw
      const rawData = result.structuredContent?.result?.raw;

      if (!rawData) {
        console.error("MCP retornou undefined ou sem raw:", result);
        throw new Error("Erro ao processar a resposta do MCP");
      }

      console.log("🌤️ Resultado raw do servidor MCP:", rawData);

      return rawData; // Retorna o JSON completo
    } catch (error) {
      console.error("❌ Erro ao chamar a ferramenta MCP:", error);
      throw error;
    }
  }

  /** Fecha a conexão MCP */
  async cleanup() {
    await this.client.close();
  }
}
