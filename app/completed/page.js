"use client";

import { useTasks } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard";

export default function CompletedPage() {
  const { tasks } = useTasks();
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Completed Tasks</h1>
        <p className="text-inkSoft text-sm mt-1">
          {completedTasks.length} task{completedTasks.length !== 1 ? "s" : ""} done.
        </p>
      </div>

      {completedTasks.length === 0 ? (
        <div className="bg-white rounded-card shadow-card border border-line p-8 text-center text-inkSoft text-sm">
          Nothing completed yet. Finish a task and it&apos;ll show up here.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}
