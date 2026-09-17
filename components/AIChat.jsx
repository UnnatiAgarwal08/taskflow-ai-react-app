"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

function TaskStatsCard({ output }) {
  if (!output) return null;
  const total = output?.total ?? 0;
  const completed = output?.completed ?? 0;
  const pending = output?.pending ?? 0;
  const completionRate = output?.completionRate ?? 0;

  if (total === 0) {
    return (
      <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-5 text-center dark:border-gray-700 dark:bg-gray-800">
        <div className="text-3xl">📋</div>

        <h3 className="mt-2 font-semibold text-gray-900 dark:text-white">
          No tasks yet
        </h3>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          You don&apos;t have any tasks to track.
        </p>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Create your first task to start seeing your progress.
        </p>

        <a
          href="/add-task"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Create a task →
        </a>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
      <h3 className="mb-3 font-semibold text-blue-900 dark:text-blue-100">
        📊 Task Statistics
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-white p-3 text-center shadow-sm dark:bg-gray-900">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-bold">{output.total}</p>
        </div>

        <div className="rounded-lg bg-white p-3 text-center shadow-sm dark:bg-gray-900">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-xl font-bold text-green-600">
            {completed}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 text-center shadow-sm dark:bg-gray-900">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-xl font-bold text-orange-500">
            {pending}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 text-center shadow-sm dark:bg-gray-900">
          <p className="text-xs text-gray-500">Progress</p>
          <p className="text-xl font-bold text-blue-600">
            {completionRate}%
          </p>
        </div>
      </div>
    </div>
  );
}

function ToolErrorCard({ errorText }) {
  return (
    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
      <div className="flex items-start gap-3">
        <div className="text-xl">⚠️</div>

        <div>
          <h3 className="font-semibold text-red-800 dark:text-red-200">
            Unable to load task statistics
          </h3>

          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            The task statistics tool could not complete the request.
          </p>

          {errorText && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              {errorText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIChat() {
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
  } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    await sendMessage({
      text: input,
    });

    setInput("");
  };

  const handleRetry = async () => {
    await regenerate();
  };

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          TaskFlow AI
        </h2>

        <p className="text-sm text-gray-500">
          Your intelligent task management assistant
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* First-run empty state */}
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-gray-500">
            <div className="max-w-md">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                👋 Hi! I&apos;m TaskFlow AI
              </p>

              <p className="mt-2 text-sm">
                I can help you organize, prioritize, and understand your
                tasks.
              </p>

              <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Not sure what to ask?
              </p>

              <button
                type="button"
                onClick={() => setInput("How many tasks do I have?")}
                className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
              >
                How many tasks do I have? →
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              }`}
            >
              {message.parts?.map((part, index) => {
                const key = `${message.id}-${index}`;

                {/* Normal text */}
                if (part.type === "text") {
                  return (
                    <p
                      key={key}
                      className="whitespace-pre-wrap text-sm"
                    >
                      {part.text}
                    </p>
                  );
                }

                {/* Identify our TaskFlow tool */}
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
                      className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100"
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
                      className="mt-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100"
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

        {/* Loading state */}
        {status === "submitted" && (
          <div className="text-sm text-gray-500">
            TaskFlow AI is thinking...
          </div>
        )}
      </div>

      {/* Chat error + Retry */}
      {error && (
        <div className="mx-4 mb-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="text-xl">⚠️</div>

              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">
                  Something went wrong
                </h3>

                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  TaskFlow AI could not complete your request.
                </p>

                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  You can retry the failed message without starting a new
                  conversation.
                </p>
              </div>
            </div>

            <button type="button" onClick={handleRetry} disabled={status === "submitted"} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
              {status === "submitted" ? "Retrying..." : "Retry"}
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 p-4 dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask TaskFlow AI something..."
            disabled={status === "submitted"}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />

          <button
            type="submit"
            disabled={!input.trim() || status === "submitted"}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
