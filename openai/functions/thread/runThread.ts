import { FunctionFailure } from "@restackio/ai/function";

import { openaiClient } from "../../utils/client";

export async function runThread({
  apiKey,
  threadId,
  assistantId,
  stream = false,
}: {
  apiKey: string;
  threadId: string;
  assistantId: string;
  stream: boolean;
}) {
  try {
    const openai = openaiClient({ apiKey });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      ...(stream && { stream }),
    });

    return run;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error running thread: ${error}`);
  }
}
