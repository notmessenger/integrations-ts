# @restackio/integrations-calendly

This package provides an integration for Calendly's API, specifically tailored for use with the Restack AI framework.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-calendly
```

## Features

- Calendly Scheduled Events Listing
- Event Type Creation for Custom Workflows
- Rate Limiting and Error Handling Support

## Usage

### Basic Setup

```typescript
// services.ts
import Restack from "@restackio/ai";
import { calendlyService } from "@restackio/integrations-calendly";

export async function services() {
  const client = new Restack();
  calendlyService({ client }).catch((err) => {
    console.error("Error starting Calendly service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### List Scheduled Events

To list scheduled events, you can use the `listScheduledEvents` function. This function corresponds to the Calendly API endpoint `/scheduled_events`, which accepts various filtering parameters.

```typescript
// listScheduledEventsWorkflow.ts

import { log, step } from "@restackio/ai/workflow";
import * as calendlyFunctions from "@restackio/integrations-calendly/functions";
import { calendlyTaskQueue } from "@restackio/integrations-calendly/taskQueue";

export async function listScheduledEventsWorkflow() {
  const params = {
    user: "user_uri",
    count: 10,
    invitee_email: "example@domain.com",
    status: "active",
  };

  const events = await step<typeof calendlyFunctions>({
    taskQueue: calendlyTaskQueue,
  }).listScheduledEvents(params);

  log.info("Fetched scheduled events", { events });
}
```

### Create Event Type

To create a new event type, use the `createEventType` function, which corresponds to the Calendly API endpoint `/one_off_event_types`. This function allows you to set up one-off event types tailored to specific workflows.

```typescript
// createEventTypeWorkflow.ts

import { log, step } from "@restackio/ai/workflow";
import * as calendlyFunctions from "@restackio/integrations-calendly/functions";
import { calendlyTaskQueue } from "@restackio/integrations-calendly/taskQueue";

export async function createEventTypeWorkflow() {
  const eventTypeData = {
    name: "New Event Type",
    host: "https://api.calendly.com/users/your-user-id",
    duration: 30,
    timezone: "America/New_York",
    date_setting: {
      type: "date_range",
      start_date: "2024-12-01",
      end_date: "2024-12-31",
    },
    location: {
      kind: "physical",
      location: "Main Office",
      additional_info: "Check-in at the front desk",
    },
  };

  const createdEvent = await step<typeof calendlyFunctions>({
    taskQueue: calendlyTaskQueue,
  }).createEventType(eventTypeData);

  log.info("Created new event type", { eventName: createdEvent.name });
}
```

## Configuration

This package uses environment variables for configuration. Ensure that you set up:

- `CALENDLY_API_KEY`: Your Calendly API key

## Additional Information

For more details on the API endpoints used in this integration, refer to the following documentation:

- [List Scheduled Events Endpoint](https://developer.calendly.com/api-docs/2d5ed9bbd2952-list-events)
- [Create One-Off Event Type Endpoint](https://developer.calendly.com/api-docs/v1yuxil3cpmxq-create-one-off-event-type)