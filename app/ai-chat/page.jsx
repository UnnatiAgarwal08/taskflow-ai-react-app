"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function AIChatPage() {
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
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

          {messages.length === 0 && (
            <div className="flex flex-1 items-center justify-center text-center text-gray-400">
              <div>
                <h2 className="text-xl font-semibold">
                  Ask TaskFlow
                </h2>

                <p className="mt-2">
                Try asking: &quot;Help me prioritize my tasks&quot;
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
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
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

                {/* Message */}
                {message.parts?.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <p
                        key={index}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </p>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}

          {/* Thinking */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-xl bg-gray-100 px-4 py-3">
                <div className="text-xs font-semibold opacity-60">
                  TaskFlow AI
                </div>

                <div className="mt-1 text-gray-500">
                  TaskFlow is thinking...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask TaskFlow..."
            className="flex-1 rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-black"
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
