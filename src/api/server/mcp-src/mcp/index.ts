import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  createProject,
  createTaskWithResolvingProjectName,
  deleteAllCompletedTasks,
  deleteProjectByName,
  deleteTaskByName,
  updateTaskStatusByName,
} from "../supabase-server-tools/db";
import dotenv from "dotenv";
import fs from "fs";
import { createUserClient } from "../supabase-server-tools/userManagement";

dotenv.config();

const logFile = fs.createWriteStream("/tmp/mcp-server.log", { flags: "a" });

export function log(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message} ${data ? JSON.stringify(data, null, 2) : ""}\n`;
  console.error(logMessage); // В stderr
  logFile.write(logMessage);
}

const args = process.argv.slice(2);
const accessToken = args[args.indexOf("--token") + 1];

export const supabaseClient = createUserClient(accessToken);

const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

server.server.onerror = (error) => {
  log("Server error:", error);
};

// Логируем регистрацию инструментов
log("Registering tools...");

server.registerTool(
  "create_project",
  {
    title: "create_project",
    description: "Create a project with a given name, due date and description",
    inputSchema: z.object({
      project_name: z.string(),
      due_date: z.iso.date().default(new Date().toISOString().split("T")[0]),
      project_description: z.string().default(""),
    }),
  },
  async ({ project_name, due_date, project_description }) => {
    log(
      "create_project called",
      JSON.stringify({ project_name, due_date, project_description }),
    );
    const projectInfo = createProject(
      project_name,
      due_date,
      project_description,
    ).then((data) => {
      return data;
    });
    log("create_project called", JSON.stringify(projectInfo));
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
    log("create_task called", JSON.stringify({ task_name, project_name }));
    const createdTask = await createTaskWithResolvingProjectName(
      task_name,
      project_name,
    );
    log("create_task called", JSON.stringify(createdTask));
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
    const updatedTask = await updateTaskStatusByName(
      project_name,
      task_name,
      task_status,
    );
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
    const deletedTask = await deleteTaskByName(project_name, task_name);
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
    description: "Deletes all completed tasks in a project with a given name",
    inputSchema: z.object({
      project_name: z.string(),
    }),
  },
  async ({ project_name }) => {
    const deletedTasks = await deleteAllCompletedTasks(project_name);
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
    const deletedProject = await deleteProjectByName(project_name);
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

const transport = new StdioServerTransport();
server.connect(transport);
log("MCP Server connected and ready");
