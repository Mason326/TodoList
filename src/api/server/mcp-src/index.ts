import {
  Agent,
  run,
  user,
  assistant,
  MCPServerStreamableHttp,
} from "@openai/agents";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { supabaseAuthMiddleware } from "./supabase-server-tools/middleware";
import { createClient } from "@supabase/supabase-js";
import { INSTRUCTIONS } from "./instructions";
import { Request } from "express-serve-static-core";
import QueryString from "qs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 1234;
export let token: string = "";

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
);

async function main(
  request: Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>,
) {
  const { prevMessages = [], projectWithTasks, message } = request.body;
  token = (request as any).accessToken;
  const mcpServer = new MCPServerStreamableHttp({
    url: "http://localhost:2222/mcp",
    name: "MCP server for supabase actions",
    requestInit: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
    // fullCommand: `node ./dist/mcp/index.js --token ${token}`,
  });

  console.log("Connecting to MCP server...");
  await mcpServer.connect();
  console.log("MCP server connected successfully");
  let response = null;
  try {
    const todolistAgent = new Agent({
      name: "TodoList Agent",
      model: "gpt-4.1",
      instructions: INSTRUCTIONS,
      mcpServers: [mcpServer],
    });

    const previousMessages = prevMessages as {
      text: string;
      time: Date;
      sender: string;
    }[];
    const history = previousMessages.map((item) => {
      return item.sender == "ai" ? assistant(item.text) : user(item.text);
    });

    response = await run(todolistAgent, [
      user(`${projectWithTasks}`),
      ...history,
      user(`${message}`),
    ]);
  } finally {
    await mcpServer.close();
  }
  return response;
}

app.post("/api/agent", supabaseAuthMiddleware, async (req, res) => {
  try {
    const response = await main(req);
    res.json({ response });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});
