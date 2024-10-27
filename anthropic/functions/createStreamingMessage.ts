import { MessageCreateParamsStreaming, MessageStreamEvent, RawMessageStreamEvent } from '@anthropic-ai/sdk/resources/messages';
import { log } from "@restackio/ai/function";
import { anthropicClient } from "../utils/client";

/**
 * When creating a Message you can stream the response using server-sent events (SSE)
 *
 * @see {@link https://docs.anthropic.com/en/api/messages-streaming}
 */
/*
export async function* createStreamingMessage({
  headers = null,
  body,
  token,
}: {
  headers?: object | null;
  body: MessageCreateParamsStreaming;
  token?: string;
}): AsyncGenerator<RawMessageStreamEvent> {

  if (!body) {
    throw new Error(`Missing 'body' value`)
  }

  try {
    const anthropic = anthropicClient({ token });

    const stream = await anthropic.messages.stream(body, headers);

    for await (const event of stream) {
      yield event;
    }

  } catch (error) {
    log.error("Anthropic Create Streaming Message error", { error });
    throw new Error(`Anthropic Create Streaming Message error ${error}`);
  }
}
*/

export async function* createStreamingMessage({
  headers = null,
  body,
  token,
}: {
  headers?: object | null;
  body: MessageCreateParamsStreaming;
  token?: string;
}): AsyncGenerator<MessageStreamEvent> {

  if (!body) {
    throw new Error(`Missing 'body' value`)
  }

  try {
    const anthropic = anthropicClient({ token });

    const stream = anthropic.messages.stream(body, headers);

    for await (const event of stream) {
      yield event;
    }

  } catch (error) {
    log.error("Anthropic Create Streaming Message error", { error });
    throw new Error(`Anthropic Create Streaming Message error ${error}`);
  }
}
