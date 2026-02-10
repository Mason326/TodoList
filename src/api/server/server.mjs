import { Agent, tool, run, user, assistant } from "@openai/agents";
import dotenv from "dotenv";
import express, { response } from "express";
import cors from "cors";
import { z } from "zod";
import { supabaseAuthMiddleware } from "../supabase/supabase-server-tools/middleware.js";
import { createClient } from "@supabase/supabase-js";
import {
  createProject,
  createTaskWithResolvingProjectName,
  deleteAllCompletedTasks,
  deleteProjectByName,
  deleteTaskByName,
  updateTaskStatusByName,
} from "../supabase/supabase-server-tools/db.js";
import { INSTRUCTIONS } from "./instructions.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 1234;
export let supabaseClient = null;

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
);

const createProjectTool = tool({
  name: "create_project",
  description: "Create a project with a given name, due date and description",
  parameters: z.object({
    project_name: z.string(),
    due_date: z.iso.date().default(new Date().toISOString().split("T")[0]),
    project_description: z.string().default(""),
  }),
  async execute({ project_name, due_date, project_description }) {
    createProject(project_name, due_date, project_description).then((data) => {
      return data;
    });
  },
});

const createTaskTool = tool({
  name: "create_task",
  description: "Creates a task in a project with a given name",
  parameters: z.object({
    task_name: z.string(),
    project_name: z.string(),
  }),
  async execute({ task_name, project_name }) {
    const createdTask = await createTaskWithResolvingProjectName(
      task_name,
      project_name,
    );
    return createdTask;
  },
});

const updateTaskStatusTool = tool({
  name: "update_task_status",
  description:
    "Updates task status with a given name in a project with a given name",
  parameters: z.object({
    project_name: z.string(),
    task_name: z.string(),
    task_status: z.string().default("uncompleted"),
  }),
  async execute({ project_name, task_name, task_status }) {
    const updatedTask = await updateTaskStatusByName(
      project_name,
      task_name,
      task_status,
    );
    return updatedTask;
  },
});

const deleteTaskTool = tool({
  name: "delete_task",
  description: "Deletes task with a given name in a project with a given name",
  parameters: z.object({
    task_name: z.string(),
    project_name: z.string(),
  }),
  async execute({ task_name, project_name }) {
    const deletedTask = await deleteTaskByName(project_name, task_name);
    return deletedTask;
  },
});

const deleteAllCompletedTasksTool = tool({
  name: "delete_all_completed_tasks",
  description: "Deletes all completed tasks in a project with a given name",
  parameters: z.object({
    project_name: z.string(),
  }),
  async execute({ project_name }) {
    const deletedTasks = await deleteAllCompletedTasks(project_name);
    return deletedTasks;
  },
});

const deleteProjectTool = tool({
  name: "delete_project",
  description: "Deletes project with a given name",
  parameters: z.object({
    project_name: z.string(),
  }),
  async execute({ project_name }) {
    const deletedProject = await deleteProjectByName(project_name);
    return deletedProject;
  },
});

export const todolistAgent = new Agent({
  name: "TodoList Agent",
  model: "gpt-4.1",
  tools: [
    createProjectTool,
    createTaskTool,
    updateTaskStatusTool,
    deleteTaskTool,
    deleteAllCompletedTasksTool,
    deleteProjectTool,
  ],
  instructions: INSTRUCTIONS,
});

app.post("/api/agent", supabaseAuthMiddleware, async (req, res) => {
  try {
    const { prevMessages = [], projectWithTasks, message } = req.body;
    supabaseClient = req.supabaseClient;
    const history = prevMessages.map((item) => {
      return item.sender == "ai" ? assistant(item.text) : user(item.text);
    });

    const response = await run(todolistAgent, [
      user(`${projectWithTasks}`),
      ...history,
      user(`${message}`),
    ]);

    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});
