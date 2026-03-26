import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import {
  createProject,
  createTaskWithResolvingProjectName,
  deleteAllCompletedTasks,
  deleteProjectByName,
  deleteTaskByName,
  updateTaskStatusByName,
} from "./supabase-server-tools/db.js";
import dotenv from "dotenv";
import express from "express";
import { randomUUID } from "node:crypto";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import cors from "cors";
import { createUserClient } from "./supabase-server-tools/userManagement.js";
import { SupabaseClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 2222;
const PORT_AGENT = 1234;

const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};
export function log(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message} ${data ? JSON.stringify(data, null, 2) : ""}\n`;
  console.error(logMessage);
}

let token: string | null = null;
export let supabaseClient: SupabaseClient | null;

app.use("/mcp", (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  token = authHeader.split(" ")[1];

  supabaseClient = createUserClient(token!!);

  next();
});

log("MCP Server connected and ready");

app.post("/mcp", async (req, res) => {
  console.error("Headers:", req.headers);
  console.error("Host:", req.headers.host);
  console.error("Body:", req.body);
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        transports[sessionId] = transport;
      },
      enableDnsRebindingProtection: true,
      allowedHosts: [`agent:${PORT_AGENT}`, `mcp:${PORT}`],
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };
    const server = new McpServer({
      name: "demo-server",
      version: "1.0.0",
    });

    server.server.onerror = (error) => {
      log("Server error:", JSON.stringify(error));
    };

    log("Registering tools...");

    server.registerTool(
      "create_project",
      {
        title: "create_project",
        description:
          "Create a project with a given name, due date and description",
        inputSchema: z.object({
          project_name: z.string(),
          due_date: z.iso
            .date()
            .default(new Date().toISOString().split("T")[0]),
          project_description: z.string().default(""),
        }),
      },
      async ({ project_name, due_date, project_description }) => {
        log(
          "create_project called with arguments",
          JSON.stringify({ project_name, due_date, project_description }),
        );
        const projectInfo = createProject(
          project_name,
          due_date,
          project_description,
        ).then((data) => {
          return data;
        });
        log("create_project result ", JSON.stringify(projectInfo));
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(projectInfo),
            },
          ],
        };
      },
    );

    server.registerTool(
      "create_task",
      {
        title: "create_task",
        description: "Creates a task in a project with a given name",
        inputSchema: z.object({
          task_name: z.string(),
          project_name: z.string(),
        }),
      },
      async ({ task_name, project_name }) => {
        log(
          "create_task called with arguments",
          JSON.stringify({ task_name, project_name }),
        );
        const createdTask = await createTaskWithResolvingProjectName(
          task_name,
          project_name,
        );
        log("create_task result", JSON.stringify(createdTask));
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(createdTask),
            },
          ],
        };
      },
    );

    server.registerTool(
      "update_task_status",
      {
        title: "update_task_status",
        description:
          "Updates task status with a given name in a project with a given name",
        inputSchema: z.object({
          project_name: z.string(),
          task_name: z.string(),
          task_status: z.string().default("uncompleted"),
        }),
      },
      async ({ project_name, task_name, task_status }) => {
        log(
          "update_task_status called with arguments",
          JSON.stringify({ project_name, task_name, task_status }),
        );
        const updatedTask = await updateTaskStatusByName(
          project_name,
          task_name,
          task_status,
        );
        log("update_task_status result", JSON.stringify(updatedTask));
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(updatedTask),
            },
          ],
        };
      },
    );

    server.registerTool(
      "delete_task",
      {
        title: "delete_task",
        description:
          "Deletes task with a given name in a project with a given name",
        inputSchema: z.object({
          task_name: z.string(),
          project_name: z.string(),
        }),
      },
      async ({ task_name, project_name }) => {
        log(
          "delete_task called with arguments",
          JSON.stringify({ task_name, project_name }),
        );
        const deletedTask = await deleteTaskByName(project_name, task_name);
        log("delete_task result", JSON.stringify(deletedTask));
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(deletedTask),
            },
          ],
        };
      },
    );

    server.registerTool(
      "delete_all_completed_tasks",
      {
        title: "delete_all_completed_tasks",
        description:
          "Deletes all completed tasks in a project with a given name",
        inputSchema: z.object({
          project_name: z.string(),
        }),
      },
      async ({ project_name }) => {
        log(
          "delete_all_completed_tasks called with arguments",
          JSON.stringify({ project_name }),
        );
        const deletedTasks = await deleteAllCompletedTasks(project_name);
        log("delete_all_completed_tasks result", JSON.stringify(deletedTasks));
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(deletedTasks),
            },
          ],
        };
      },
    );

    server.registerTool(
      "delete_project",
      {
        title: "delete_project",
        description: "Deletes project with a given name",
        inputSchema: z.object({
          project_name: z.string(),
        }),
      },
      async ({ project_name }) => {
        log(
          "delete_project called with arguments",
          JSON.stringify({ project_name }),
        );
        const deletedProject = await deleteProjectByName(project_name);
        log("delete_project result", JSON.stringify(deletedProject));
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(deletedProject),
            },
          ],
        };
      },
    );

    await server.connect(transport);
  } else {
    res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Bad Request: No valid session ID provided",
      },
      id: null,
    });
    return;
  }

  await transport.handleRequest(req, res, req.body);
});

const handleSessionRequest = async (
  req: express.Request,
  res: express.Response,
) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }

  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
};

app.get("/mcp", handleSessionRequest);

app.delete("/mcp", handleSessionRequest);

app.listen(PORT, () => {
  console.log("Server is running");
});
