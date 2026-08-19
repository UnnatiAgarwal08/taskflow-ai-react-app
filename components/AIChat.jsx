"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function AIChat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    await sendMessage({
      text: input,
    });

    setInput("");
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
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-gray-500">
            <div>
              <p className="text-lg font-medium">
              👋 Hi! I&apos;m TaskFlow AI
              </p>

              <p className="mt-2 text-sm">
                Ask me to help organize or prioritize your tasks.
              </p>
            </div>
          </div>
        )}

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
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">
                {message.parts
                  ?.filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join("")}
              </p>
            </div>
          </div>
        ))}

        {status === "submitted" && (
          <div className="text-sm text-gray-500">
            TaskFlow AI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-gray-200 p-4 dark:border-gray-700"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask TaskFlow AI..."
          className="flex-1 rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-blue-500"
          disabled={status === "streaming"}
        />

        <button
          type="submit"
          disabled={!input.trim() || status === "streaming"}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}