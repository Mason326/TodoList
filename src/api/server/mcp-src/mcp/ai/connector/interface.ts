export interface ToolDescriptor {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export type SingleToolRequest = {
  id?: string;
  name: string;
  arguments: Record<string, unknown>;
};

export interface ToolCallRequest {
  message: string;
  toolCalls?: SingleToolRequest[];
}

export interface ToolCallResult {
  request: SingleToolRequest;
  content: string;
  structuredContent: any;
}

export interface AgenticAIHelperInterface {
  chatWithTools(
    sessionId: string,
    message: string,
    tools: ToolDescriptor[],
  ): Promise<ToolCallRequest>;

  simpleChat(sessionId: string, message: string): Promise<string>;

  storeToolResult(sessionId: string, result: ToolCallResult): Promise<void>;
}
