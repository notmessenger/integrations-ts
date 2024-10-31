import Restack, { ServiceInput } from "@restackio/ai";

import { composioTaskQueue } from "./taskQueue";
import {
  getEntity,
  initiateConnection,
  createCalendarEvent,
  getEntityConnections,
  getExpectedParamsForUser,
} from "./functions";

export async function composioService({
  client,
  options = {
    rateLimit: 100,
  },
}: {
  client: Restack;
  options?: ServiceInput["options"];
}) {
  await client.startService({
    taskQueue: composioTaskQueue,
    functions: {
      getEntity,
      initiateConnection,
      createCalendarEvent,
      getEntityConnections,
      getExpectedParamsForUser,
    },
    options,
  });
}

composioService({ client: new Restack() }).catch((err) => {
  console.error("Error composio service:", err);
});
