"use client";

import { useTasks } from "@/context/TaskContext";

const priorityColor = {
  High: "bg-coral",
  Medium: "bg-amber",
  Low: "bg-mint",
};

export default function TaskCard({ task }) {
  const { toggleComplete, deleteTask } = useTasks();
  const stripe = priorityColor[task.priority] || "bg-line";

  return (
    <div className="relative flex items-start gap-3 bg-white rounded-card shadow-card border border-line pl-4 pr-4 py-4 overflow-hidden">
      <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${stripe}`} />

      <button
        onClick={() => toggleComplete(task.id)}
        aria-label={task.completed ? "Mark as not complete" : "Mark as complete"}
        className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? "bg-mint border-mint"
            : "border-line hover:border-accent"
        }`}
      >
        {task.completed && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium truncate ${
            task.completed ? "line-through text-inkSoft" : "text-ink"
          }`}
        >
          {task.name}
        </p>
        {task.description && (
          <p className="text-sm text-inkSoft mt-0.5 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-inkSoft">
          <span className="font-mono">{task.priority}</span>
          {task.deadline && (
            <span className="font-mono">Due {task.deadline}</span>
          )}
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
        className="shrink-0 p-1.5 rounded-lg text-inkSoft hover:text-coral hover:bg-coral/10 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
