"use client";

import Link from "next/link";
import { useTasks } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard";

export default function TasksPage() {
  const { tasks } = useTasks();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink">Tasks</h1>
          <p className="text-inkSoft text-sm mt-1">Everything on your list.</p>
        </div>
        <Link
          href="/add-task"
          className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
        >
          + Add Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-card shadow-card border border-line p-8 text-center text-inkSoft text-sm">
          No tasks yet. Add your first one to get started.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}
