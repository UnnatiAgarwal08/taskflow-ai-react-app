import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText } from "ai";
import { z } from "zod";

const openrouter = createOpenAICompatible({
  name: "openrouter",
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// TaskFlow AI tool
// Returns structured information about the user's tasks.
const getTaskStats = {
  description:
    "Get statistics about the user's tasks, including total, completed, pending tasks, and completion rate.",

  inputSchema: z.object({}),

  execute: async () => {
    console.log("🔥 getTaskStats TOOL WAS CALLED");

    // Sample TaskFlow data
    const tasks = [
      { id: 1, completed: true },
      { id: 2, completed: true },
      { id: 3, completed: false },
      { id: 4, completed: true },
      { id: 5, completed: false },
    ];

    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const pending = total - completed;

    const completionRate =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pending,
      completionRate,
    };
  },
};

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openrouter("openai/gpt-4o-mini"),

      system: `
You are TaskFlow AI, an intelligent task management assistant.

Help users organize, prioritize, and manage their tasks.

You have access to a tool called getTaskStats.

IMPORTANT:
Whenever the user asks about:

- how many tasks they have
- completed tasks
- pending tasks
- task completion
- task statistics
- task progress
- how many tasks are left

you MUST use the getTaskStats tool first.

After the tool returns the statistics, answer the user's question using the actual values returned by the tool.

Do not invent task statistics when the tool can provide them.

For example, if the tool returns:

total: 5
completed: 3
pending: 2
completionRate: 60

then give the user an answer based on those exact values.

Give clear, concise and practical answers.
`,

      messages: await convertToModelMessages(messages),

      tools: {
        getTaskStats,
      },

      stopWhen: ({ steps }) => steps.length >= 3,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to generate AI response",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}