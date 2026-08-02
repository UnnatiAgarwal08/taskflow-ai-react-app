"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";

export default function TaskForm() {
  const { addTask } = useTasks();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Task name can't be empty.");
      return;
    }

    addTask({ name: name.trim(), description: description.trim(), priority, deadline });
    router.push("/tasks");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-card border border-line p-6 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Task Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. Learn React"
          className="rounded-lg border border-line px-3 py-2 text-sm focus:border-accent outline-none"
        />
        {error && <p className="text-xs text-coral">{error}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Add a few details (optional)"
          className="rounded-lg border border-line px-3 py-2 text-sm focus:border-accent outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="priority" className="text-sm font-medium text-ink">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg border border-line px-3 py-2 text-sm focus:border-accent outline-none bg-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="deadline" className="text-sm font-medium text-ink">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="rounded-lg border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="self-start bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}
