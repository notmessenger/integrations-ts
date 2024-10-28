import { openaiChatCompletionsBase } from "@restackio/integrations-openai/functions";

import { openAiToolsetClient } from "../utils/toolsets";
import { initiateConnection } from "./initiateConnection";

const appName = "googlecalendar";

export async function createCalendarEvent({
  entityId,
  composioApiKey,
  calendarInstruction,
  waitUntilActive,
}: {
  entityId?: string;
  composioApiKey: string;
  calendarInstruction: string;
  waitUntilActive?: number;
}) {
  const composioOpenAiClient = openAiToolsetClient({
    composioApiKey,
    entityId,
  });

  await initiateConnection({
    entityId,
    appName,
    composioApiKey,
    waitUntilActive,
  });

  const tools = await composioOpenAiClient.getTools({
    actions: ["googlecalendar_create_event"],
  });

  const { result } = await openaiChatCompletionsBase({
    userContent: calendarInstruction,
    tools,
    toolChoice: "auto",
  });

  await composioOpenAiClient.handleToolCall(result);
}
