import TaskForm from "@/components/TaskForm";

export default function AddTaskPage() {
  return (
    <section className="flex flex-col gap-6 max-w-lg mx-auto">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Add Task</h1>
        <p className="text-inkSoft text-sm mt-1">Fill in the details below.</p>
      </div>

      <TaskForm />
    </section>
  );
}
