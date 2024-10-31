# @restackio/integrations-composio

This package provides integration with Composio, allowing you to:

1. get entity
2. get entity connections
3. initiate a connection
4. Create an event on google calendar

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-composio
```

## Usage

Make sure to create a user at [composio app](https://app.composio.dev/) and set the api key as env var `COMPOSIO_API_KEY`.
You will also need an open ai key and set is env var `OPENAI_API_KEY`

### Setting up the Composio service

To use the Composio integration, you need to set up the Composio service:

```typescript
// services.ts
import Restack from "@restackio/ai";
import { composioService } from "@restackio/integrations-composio";

export async function services() {
  const client = new Restack();
  composioService({ client }).catch((err) => {
    console.error("Error starting Composio service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Getting an entity

To get an entity from Composio:

```typescript
// getEntity.ts

import { log, step } from "@restackio/ai/workflow";
import * as composioFunctions from "@restackio/integrations-composio/functions";
import { composioTaskQueue } from "@restackio/integrations-composio/taskQueue";

export async function getEntityWorkflow({entityId, composioApiKey}: {entityId: string, composioApiKey: string}) {
  const response = await step<typeof composioFunctions>({
    taskQueue: openaiTaskQueue,
  }).getEntity({
    composioApiKey: "your_api_key",
    entityId: 'your_unique_entity_id",
  });
}
```

### Initiate a connection

To be able to interact with Composio tools a connections needs to be established. This is how a connected account will be linked to an integration from Composio. All this is encapsulated under the entity provided. Some integrations will need the user to follow authentication flow, such as establishing a connection with github. In this scenario the connection object will be returned and expose a connectionUrl that you can use as you please to make the user interact with it and go ahead and finish the auth flow. `waitUntilActive` is optionally provided in case you want the function to wait the provided amount of seconds for the user to finish the auth flow. In case the user doesn't finishes on time the function will fail with a timeout.

It is important to note that in the timeout failure scenario, the user can still use the provided link and finish the auth flow and the next time initiateConnection is called, the connection will be detected as active and the function call will be successful.

When a connection is initiated you will notice an integration will be listed on your Composio dashboard with the status of "INITIATED". It will be set as active once the user finishes the authflow. For now the restack integration will print the URL the user needs to visit to finish the authflow on the terminal.
It can also happen you don't want the function to wait until user finished the auth flow in order to resolve, hence the waitUntilActive parameter is optional.
In this case then the `initiateConnection` function will resolve with the connection object from which you can access the auth flow url with the `redirectUrl` connection field. In this way you can handle showing the url to the user in any way you please.

```typescript
/// workflows/initiateConnectionWorkflow.ts

import { log, step } from "@restackio/ai/workflow";
import * as composioFunctions from "@restackio/integrations-composio/functions";
import { composioTaskQueue } from "@restackio/integrations-composio/taskQueue";

export async function initiateConnectionWorkflow(
  { entityId, appName, composioApiKey, waitUntilActive },
  {
    entityId: string,
    appName: string,
    composioApiKey: string,
    waitUntilActive: number,
  }
) {
  const response = await step<typeof composioFunctions>({
    taskQueue: initiateConnection,
  }).getEntity({
    composioApiKey,
    appName,
    composioAPiKey,
    waitUntilActive,
  });
}
```

### Getting expected params for the user

Some integrations from composio may require some parameters to be supplied by the user in order to work, for example shopify. In order for you as a developer to know which fields to ask for you can make use of the `getExpectedParamsForUser` function. You can use how you want to ask the user for these parameters. You can either resolve workflow and return response to your UI, ask for them directly on terminal, etc.

```typescript
/// workflows/getExpectedUserParamsWorkflow.ts

import { log, step } from "@restackio/ai/workflow";
import * as composioFunctions from "@restackio/integrations-composio/functions";
import { composioTaskQueue } from "@restackio/integrations-composio/taskQueue";
export async function getExpectedUserParamsWorkflow(
  { composioApiKey, app, authScheme, entityId },
  { entityId: string, authScheme: string, composioApiKey: string, app: string }
) {
  const response = await step<typeof composioFunctions>({
    taskQueue: initiateConnection,
  }).getExpectedParamsForUser({
    composioApiKey,
    app,
    authScheme,
    entityId,
  });

  console.log("ask user for following params", response);
}
```

### Create calendar event

This function can be used to create events on a user's google calendar. This function makes use of the other functions exposed by the integration and can also be used to see how everything can be used to interact with both Restack's Open AI integration and Composio. This is how you can easily call this function inside one of your workflows.

As you can see natural human language can be provided to the createCalendarEvent function in order to create an event on the user's calendar.
Internally createCalendarEvent will:

1. Initiate a connection to the 'googlecalendar' app on composio.
2. Get the `googlecalendar_create_event` composio tool to pass it to the open ai restack integration.
3. Wait for 60 seconds for the user to go through the auth flow with google calendar.
4. When user finishes this short flow in under 60 seconds the event will be created on the calendar automatically.

```typescript
/// workflows/createGoogleCalendarEventWorkflow.ts

import { log, step } from "@restackio/ai/workflow";
import * as composioFunctions from "@restackio/integrations-composio/functions";
import { composioTaskQueue } from "@restackio/integrations-composio/taskQueue";
export async function createGoogleCalendarEventWorkflow(
  { calendarInstruction, entityId: string },
  { calendarInstruction: string, entityId: string }
) {
  await step<typeof composioFunctions>({}).createCalendarEvent({
    composioApiKey: "your_composio_api_key",
    entityId,
    calendarInstruction: `Create a 1 hour meeting event at 5:30PM tomorrow. Today's date is ${today}`,
    waitUntilActive: 60,
  });
}
```

### Notes

Entities are created when passed, there is no need to "create" an entity on composio dashboard. So there is no need for previous steps to provide an entity id. You can provide any value here such as: "Jessica", "Mark" etc.
