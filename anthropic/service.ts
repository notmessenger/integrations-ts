import Restack, { ServiceInput } from "@restackio/ai";
import { createNonStreamingMessage } from "./functions";
import { anthropicTaskQueue } from "./taskQueue";

export async function anthropicService({
  client,
  options = {},
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: anthropicTaskQueue,
    functions: { createNonStreamingMessage },
    options,
  });
}

anthropicService({ client: new Restack() }).catch((err) => {
  console.error("Error service:", err);
});
