import { ChatModel } from "openai/resources/index";
import { FunctionFailure } from "@restackio/ai/function";

import { openaiClient } from "../../utils/client";
import { AssistantTool } from "openai/resources/beta/assistants.mjs";

export async function createAssistant({
  apiKey,
  name,
  instructions,
  model = "gpt-4o-mini",
  tools = [],
}: {
  apiKey: string;
  name: string;
  instructions: string;
  tools?: AssistantTool[];
  model: ChatModel;
}) {
  try {
    const openai = openaiClient({ apiKey });

    const assistant = await openai.beta.assistants.create({
      name,
      instructions,
      model,
      tools,
    });

    return assistant;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error creating assistant: ${error}`);
  }
}
