import Restack, { ServiceInput } from "@restackio/ai"; 
import { rpmToSecond } from "@restackio/ai/utils";
import { listScheduledEvents, createEventType } from "./functions"; 
import { calendlyTaskQueue } from "./taskQueue"; 


export async function calendlyService({
  client,
  options = {
    rateLimit: rpmToSecond(10000), 
  },
  taskQueueSuffix,
}: {
  client: Restack;
  options?: ServiceInput["options"]; 
  taskQueueSuffix?: string; 
}) {
  await client.startService({
    taskQueue: `${calendlyTaskQueue}${taskQueueSuffix ?? ""}`, 
    functions: { listScheduledEvents, createEventType },
    options, 
  });
}

calendlyService({ client: new Restack() }).catch((err) => {
  console.error("Error in main:", err);
});


