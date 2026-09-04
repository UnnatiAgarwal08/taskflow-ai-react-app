import { z } from "zod";

export const getTaskStats = {
  description:
    "Get statistics about the user's tasks, including total, completed, pending tasks, and completion rate.",

  inputSchema: z.object({}),

  execute: async () => {
    console.log("getTaskStats TOOL WAS CALLED");

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