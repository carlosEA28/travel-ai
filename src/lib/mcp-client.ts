import { GoogleGenAI } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

export class MCPClient {
  mcp;
  llm;
  transport: StdioClientTransport | null = null;
  tools: {
    name: string;
    description?: string;
    input_schema: any;
  }[] = [];

  constructor() {
    this.llm = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    this.mcp = new Client({
      name: "mcp-client-cli",
      version: "1.0.0",
    });
  }

  async connectToServer(serverScriptPath: string) {
    try {
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;
      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      await this.mcp.connect(this.transport);
      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      }));
      console.log(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name)
      );
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  async processQuery(query: string) {
    try {
      const result = await this.llm.models.generateContent({
        model: "gemini-pro",
        contents: [
          {
            role: "user",
            parts: [{ text: query }],
          },
        ],
        config: {
          maxOutputTokens: 1000,
        },
      });

      // Forma simples e suportada:
      return result.text;
    } catch (error) {
      console.error("Error processing query with Gemini:", error);
      throw error;
    }
  }

  async cleanup() {
    if (this.mcp) {
      await this.mcp.close();
    }
  }
}
