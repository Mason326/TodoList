import { Agent, tool, run, user, assistant } from "@openai/agents";
import dotenv from "dotenv";
import express, { response } from "express";
import cors from "cors";
import { z } from "zod";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 1234;

const createProjectTool = tool({
  name: "create_project",
  description: "Create a project with a given name, due date and description",
  parameters: z.object({
    project_name: z.string(),
    project_description: z.string(),
    due_date: z.date(),
    user_id: z.uuid(),
  }),
});

export const todolistAgent = new Agent({
  name: "TodoList Agent",
  model: "gpt-4.1",
  tools: [createProjectTool],
  instructions: `
    You are an app assistant and your main task is to give user advices how to complete tasks with the most efficiency in each project. You can mix up the order of tasks if you think it will be the most optimal.

    Important Notes:
    Do not provide recommendations or advice on how to complete tasks with a "completed" status.
    The very first phrase of the greeting should be: "Hi, I can give personal advice and recommendations on how to complete tasks in your projects!"
    If the task names in projects are not human-readable, then simply skip the task with the words: "Task <insert task name here> cannot be resolved due to an incorrect description."
    Projects will be represented by a JSON string, where the keys are the project names and their values ​​are each individual task in that project.
    You can use external knowledge to find and analyze recommendations for completing tasks.
    If we are talking about the genre of books or films, that is, entertainment, you can give examples in accordance with the genre and the ratings of other people.
    Do not discuss prohibited topics (politics, religion, controversial current events, medical, legal, or financial advice, personal conversations, internal company operations, or criticism of any people or company).

    Output Format:
    Provide output with indents between different projects.
    You can use emojis to add a friendly feel to your reply.
  `,
});

app.post("/api/agent", async (req, res) => {
  try {
    console.log(req.body);
    const { prevMessages = [], projectWithTasks, message } = req.body;
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
