import Restack, { ServiceInput } from "@restackio/ai";
import { rpmToSecond } from "@restackio/ai/utils";
import {
  geminiGenerateContent,
  geminiGenerateContentStream,
} from "./functions";
import { geminiTaskQueue } from "./taskQueue";

// rate limit https://ai.google.dev/pricing

export async function geminiService({
  client,
  options = {
    rateLimit: rpmToSecond(2000),
  },
  taskQueueSuffix,
}: {
  client: Restack;
  options?: ServiceInput["options"];
  taskQueueSuffix?: string;
}) {
  await client.startService({
    taskQueue: `${geminiTaskQueue}${taskQueueSuffix ?? ""}`,
    functions: { geminiGenerateContent, geminiGenerateContentStream },
    options,
  });
}

// Optional: Call the service directly for testing
geminiService({ client: new Restack() }).catch((err) => {
  console.error("Error in main:", err);
});
