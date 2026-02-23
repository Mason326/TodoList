import { Agent, FunctionTool, Tool } from "@openai/agents";
import {
  AgenticAIHelperInterface,
  ToolCallRequest,
  ToolCallResult,
  ToolDescriptor,
} from "./interface";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class OpenAIAgentHelper {
  private agent: Agent;
  private mcp: Client;
  private transport: StdioClientTransport;
  private tools: ToolDescriptor[] = [];

  constructor(agentName: string, model: string, instructions: string) {
    this.agent = new Agent({
      name: agentName,
      model: model,
      instructions: instructions,
    });
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
    this.transport = new StdioClientTransport({
      command: "node dist/mcp/index.js",
    });
  }

  async init() {
    this.mcp.connect(this.transport);
    this.tools = (await this.mcp.listTools()).tools as ToolDescriptor[];
    console.log(
      "Connected to server with tools:",
      this.tools.map(({ name }) => name),
    );
  }

  // async chatWithTools(
  //   sessionId: string,
  //   message: string,
  // ): Promise<ToolCallRequest> {
  //   const toolCalls = response.choices[0].message.tool_calls || [];
  //   session.messages.push(response.choices[0].message);
  //   return {
  //     message: response.choices[0].message.content ?? "",
  //     toolCalls: toolCalls.map((tc) => {
  //       const functionCall = tc as {
  //         id: string;
  //         type: "function";
  //         function: {
  //           name: string;
  //           arguments: string;
  //         };
  //       };
  //       return {
  //         id: functionCall.id,
  //         name: functionCall.function.name,
  //         arguments: JSON.parse(functionCall.function.arguments || "{}"),
  //       };
  //     }),
  //   };
  // }

  // async simpleChat(sessionId: string, message: string): Promise<string> {
  //   const session = this.session.get(sessionId);
  //   session.messages.push({
  //     role: "user",
  //     content: [
  //       {
  //         type: "text",
  //         text: message,
  //       },
  //     ],
  //   });
  //   const response = await this.openai.chat.completions.create({
  //     model: this.model,
  //     messages: session.messages,
  //   });

  //   return response.choices[0].message.content ?? "";
  // }

  // async storeToolResult(
  //   sessionId: string,
  //   result: ToolCallResult,
  // ): Promise<void> {
  //   if (!result.request.id) {
  //     console.warn(
  //       "Tool call result does not have an id. This is likely a bug.",
  //       result,
  //     );
  //     return;
  //   }
  //   this.session.get(sessionId).messages.push({
  //     role: "tool",
  //     tool_call_id: result.request.id,
  //     content: result.content,
  //   });
  //   if (result.structuredContent)
  //     this.session.get(sessionId).toolResult[result.request.id] =
  //       result.structuredContent;
  // }
}
