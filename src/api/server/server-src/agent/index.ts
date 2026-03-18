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
import { supabaseAuthMiddleware } from "./supabase-auth-middleware/middleware.js";
import { createClient } from "@supabase/supabase-js";
import { INSTRUCTIONS } from "./instructions.js";
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
  const {
    prevMessages = [],
    projectWithTasks,
    message,
    uploadedFiles,
  } = request.body;
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

    const inputFiles: {
      type: "input_file";
      file: string;
      filename: string;
    }[] = [];

    const inputImages: {
      type: "input_image";
      image: string;
      providerData: {
        detail: string;
      };
    }[] = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const fileUrl = uploadedFiles[i].filePath;
      const fileNameByParts = uploadedFiles[i].displayName.split(".");
      const ext = fileNameByParts[fileNameByParts.length - 1];
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

      if (ext == "pdf") {
        console.log("Downloading PDF file...");
        const fileData = await fetch(fileUrl);
        console.log("File fetched, status:", fileData.status);

        if (!fileData.ok) {
          throw new Error(`Failed to fetch file: ${fileData.statusText}`);
        }

        const arrayBuffer = await fileData.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        inputFiles.push({
          type: "input_file",
          file: `data:application/pdf;base64,${base64Data}`,
          filename: uploadedFiles[i].displayName,
        });

        console.log(`PDF downloaded, size: ${arrayBuffer.byteLength} bytes`);
      } else if (imageExtensions.includes(ext)) {
        console.log("Downloading image...");
        const fileData = await fetch(fileUrl);
        console.log("Image fetched, status:", fileData.status);

        let mimeType = "image/jpeg";
        switch (ext) {
          case "jpg":
          case "jpeg":
            mimeType = "image/jpeg";
            break;
          case "png":
            mimeType = "image/png";
            break;
          case "gif":
            mimeType = "image/gif";
            break;
          case "webp":
            mimeType = "image/webp";
            break;
        }

        if (!fileData.ok) {
          throw new Error(`Failed to fetch file: ${fileData.statusText}`);
        }

        const arrayBuffer = await fileData.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");
        inputImages.push({
          type: "input_image",
          image: `data:${mimeType};base64,${base64Data}`,
          providerData: {
            detail: "auto",
          },
        });
      }
    }

    const userMessageContent = [
      {
        type: "input_text",
        text: message,
      },
      ...inputFiles,
      ...inputImages,
    ];

    console.log("Running agent with file...");

    response = await run(todolistAgent, [
      user(`${projectWithTasks}`),
      ...history,
      user(userMessageContent as any),
    ]);

    console.log("Agent response received");
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
  console.log("Server is running on port", PORT);
});
