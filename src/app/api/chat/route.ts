import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

import { db } from '@/db';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id } = await req.json();

  const listing = await db.query.listings.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: {
      nearbyStations: {
        with: {
          station: true,
        },
      },
    },
  });

  const coreMessages = convertToCoreMessages(messages);

  coreMessages.unshift({
    role: 'system',
    content: `You are a helpful real state assistant. Your name is Movers Market AI. Use the following information to answer potential clients' inqueries:
    ${JSON.stringify(listing)}`,
  });

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: coreMessages,
  });

  return result.toDataStreamResponse();
}
