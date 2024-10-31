import { FunctionFailure } from "@restackio/ai/function";

import { openaiClient } from "../../utils/client";

export async function createThread({ apiKey }: { apiKey: string }) {
  try {
    const openai = openaiClient({ apiKey });
    const thread = await openai.beta.threads.create();

    return thread;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error creating thread: ${error}`);
  }
}
