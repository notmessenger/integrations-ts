# @restackio/integrations-google-gemini

This package provides an integration for Google's Gemini AI API, specifically tailored for use with the Restack AI framework.

## Installation

To install the package, use npm or yarn:

```bash
npm install @restackio/integrations-google-gemini
```

## Features

- Gemini Text Generation (base and streaming)
- Rate limiting support (2000 RPM default)
- Simple prompt handling
- Event streaming
- Temperature and other parameter controls

## Usage

### Basic Setup

```typescript
// services.ts
import Restack from "@restackio/ai";
import { geminiService } from "@restackio/integrations-google-gemini";

export async function services() {
  const client = new Restack();
  geminiService({ client, options: { rateLimit: 2000 } }).catch((err) => {
    console.error("Error starting Gemini service:", err);
  });
}

services().catch((err) => {
  console.error("Error running services:", err);
});
```

### Text Generation

For basic text generation:

```typescript
// geminiGenerateContent.ts

import { log, step } from "@restackio/ai/workflow";
import * as geminiFunctions from "@restackio/integrations-google-gemini/functions";
import { geminiTaskQueue } from "@restackio/integrations-google-gemini/taskQueue";

export async function geminiGenerateContentWorkflow() {
  const response = await step<typeof geminiFunctions>({
    taskQueue: geminiTaskQueue,
  }).geminiGenerateContent({
    userContent: "Hello, how are you?",
    model: "gemini-pro",
    apiKey: "your-api-key-here",
    params: {
      temperature: 0.9,
      topP: 1,
      topK: 1,
      candidateCount: 1,
    },
  });
}
```

For streaming text generation:

```typescript
// streamingGeneration.ts

import { log, step } from "@restackio/ai/workflow";
import * as geminiFunctions from "@restackio/integrations-google-gemini/functions";
import { geminiTaskQueue } from "@restackio/integrations-google-gemini/taskQueue";

export async function streamingGenerationWorkflow() {
  const response = await step<typeof geminiFunctions>({
    taskQueue: geminiTaskQueue,
  }).geminiGenerateContentStream({
    userContent: "Tell me a story",
    model: "gemini-pro",
    systemContent: "You are a creative storyteller",
    params: {
      temperature: 0.9,
      maxOutputTokens: 1000,
    },
    apiKey: "your-api-key-here",
  });
}
```

## Configuration

The package uses environment variables for configuration. Make sure to set:

- \`GEMINI_API_KEY\`: Your Google API key for Gemini
