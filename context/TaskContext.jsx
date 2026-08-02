"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext(null);

const STORAGE_KEY = "taskflow.tasks";

const seedTasks = [
  {
    id: "seed-1",
    name: "Learn React",
    description: "Go through components, props, and state.",
    priority: "Medium",
    deadline: "",
    completed: true,
  },
  {
    id: "seed-2",
    name: "Complete Assignment",
    description: "Finish the FE-04 task manager assignment.",
    priority: "High",
    deadline: "",
    completed: true,
  },
  {
    id: "seed-3",
    name: "Build Project",
    description: "Ship TaskFlow end to end.",
    priority: "High",
    deadline: "",
    completed: true,
  },
  {
    id: "seed-4",
    name: "Write Tests",
    description: "Add basic coverage for task actions.",
    priority: "Low",
    deadline: "",
    completed: false,
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(seedTasks);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once, on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Could not read saved tasks:", err);
    }
    setHydrated(true);
  }, []);

  // Persist whenever tasks change (after initial load)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error("Could not save tasks:", err);
    }
  }, [tasks, hydrated]);

  function addTask(task) {
    setTasks((prev) => [
      ...prev,
      { ...task, id: crypto.randomUUID(), completed: false },
    ]);
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const value = { tasks, addTask, toggleComplete, deleteTask };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return ctx;
}
