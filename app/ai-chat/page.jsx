"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

function TaskStatsCard({ output }) {
  if (!output) return null;

  return (
    <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <h3 className="mb-3 font-semibold text-blue-900">
        📊 Task Statistics
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-white p-3 text-center shadow-sm">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-bold">{output.total}</p>
        </div>

        <div className="rounded-lg bg-white p-3 text-center shadow-sm">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-xl font-bold text-green-600">
            {output.completed}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 text-center shadow-sm">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-xl font-bold text-orange-500">
            {output.pending}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 text-center shadow-sm">
          <p className="text-xs text-gray-500">Progress</p>
          <p className="text-xl font-bold text-blue-600">
            {output.completionRate}%
          </p>
        </div>
      </div>
    </div>
  );
}

function ToolErrorCard({ errorText }) {
  return (
    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <div className="text-xl">⚠️</div>

        <div>
          <h3 className="font-semibold text-red-800">
            Unable to load task statistics
          </h3>

          <p className="mt-1 text-sm text-red-700">
            The task statistics tool could not complete the request.
          </p>

          {errorText && (
            <p className="mt-2 text-xs text-red-600">
              {errorText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIChatPage() {
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
  } = useChat({
    api: "/api/chat",
  });

  const isLoading =
    status === "submitted" || status === "streaming";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const message = input.trim();

    setInput("");

    await sendMessage({
      text: message,
    });
  };

  const handleRetry = async () => {
    await regenerate();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto flex max-w-3xl flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            TaskFlow AI
          </h1>

          <p className="mt-2 text-gray-500">
            Ask TaskFlow AI to help organize and manage your tasks.
          </p>
        </div>

        {/* Chat messages */}
        <div className="mb-6 flex min-h-[400px] flex-col gap-4 rounded-xl border bg-white p-6">
          {/* First-run empty state */}
          {messages.length === 0 && (
            <div className="flex flex-1 items-center justify-center text-center text-gray-400">
              <div className="max-w-md">
                <h2 className="text-xl font-semibold text-gray-900">
                  👋 Hi! I&apos;m TaskFlow AI
                </h2>

                <p className="mt-2">
                  I can help you organize, prioritize, and understand your
                  tasks.
                </p>

                <p className="mt-4 text-sm font-medium text-gray-700">
                  Not sure what to ask?
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setInput("How many tasks do I have?")
                  }
                  className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-100"
                >
                  How many tasks do I have? →
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {/* Name */}
                <div className="mb-1 text-xs font-semibold opacity-60">
                  {message.role === "user"
                    ? "You"
                    : "TaskFlow AI"}
                </div>

                {/* Message parts */}
                {message.parts?.map((part, index) => {
                  const key = `${message.id}-${index}`;

                  {/* Normal text */}
                  if (part.type === "text") {
                    return (
                      <p
                        key={key}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </p>
                    );
                  }

                  {/* Check if this is our tool */}
                  const isTaskStatsTool =
                    part.type === "tool-getTaskStats" ||
                    part.toolName === "getTaskStats";

                  if (!isTaskStatsTool) {
                    return null;
                  }

                  {/* 1. INPUT STREAMING */}
                  if (part.state === "input-streaming") {
                    return (
                      <div
                        key={key}
                        className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800"
                      >
                        <div className="font-medium">
                          🔄 Preparing task statistics
                        </div>

                        <p className="mt-1 text-xs opacity-80">
                          TaskFlow AI is preparing the tool request...
                        </p>
                      </div>
                    );
                  }

                  {/* 2. INPUT AVAILABLE */}
                  if (part.state === "input-available") {
                    return (
                      <div
                        key={key}
                        className="mt-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800"
                      >
                        <div className="font-medium">
                          ⚙️ Fetching task statistics
                        </div>

                        <p className="mt-1 text-xs opacity-80">
                          The task statistics tool is running...
                        </p>
                      </div>
                    );
                  }

                  {/* 3. OUTPUT AVAILABLE */}
                  if (part.state === "output-available") {
                    return (
                      <TaskStatsCard
                        key={key}
                        output={part.output}
                      />
                    );
                  }

                  {/* 4. OUTPUT ERROR */}
                  if (part.state === "output-error") {
                    return (
                      <ToolErrorCard
                        key={key}
                        errorText={part.errorText}
                      />
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}

          {/* Loading skeleton */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-full max-w-[85%] rounded-xl bg-gray-100 px-4 py-3">
                <div className="text-xs font-semibold opacity-60">
                  TaskFlow AI
                </div>

                <div className="mt-3 space-y-2">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-gray-300" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-300" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-gray-300" />
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  TaskFlow is thinking...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chat error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-red-800">
                  ⚠️ Something went wrong
                </h3>

                <p className="mt-1 text-sm text-red-700">
                  TaskFlow AI could not complete your request.
                </p>

                <p className="mt-1 text-xs text-red-600">
                  You can retry the failed message without starting a
                  new conversation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRetry}
                disabled={isLoading}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask TaskFlow AI..."
            disabled={isLoading}
            className="flex-1 rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-black px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
