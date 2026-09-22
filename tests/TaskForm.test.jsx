import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { addTask, push } = vi.hoisted(() => ({
  addTask: vi.fn(),
  push: vi.fn(),
}));

vi.mock("@/context/TaskContext", () => ({
  useTasks: () => ({
    addTask,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

import TaskForm from "../components/TaskForm";

describe("TaskForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows an error when task name is empty", async () => {
    const user = userEvent.setup();

    render(<TaskForm />);

    await user.click(
      screen.getByRole("button", {
        name: "Add Task",
      })
    );

    expect(
      screen.getByText("Task name can't be empty.")
    ).toBeInTheDocument();

    expect(addTask).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it("adds a valid task and navigates to the tasks page", async () => {
    const user = userEvent.setup();

    render(<TaskForm />);

    await user.type(
      screen.getByLabelText("Task Name"),
      "Learn React"
    );

    await user.type(
      screen.getByLabelText("Description"),
      "Practice React testing"
    );

    await user.selectOptions(
      screen.getByLabelText("Priority"),
      "High"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Task",
      })
    );

    expect(addTask).toHaveBeenCalledWith({
      name: "Learn React",
      description: "Practice React testing",
      priority: "High",
      deadline: "",
    });

    expect(push).toHaveBeenCalledWith("/tasks");
  });
  
  it("allows the user to enter a task name and description", async () => {
    const user = userEvent.setup();
  
    render(<TaskForm />);
  
    const taskName = screen.getByLabelText("Task Name");
    const description = screen.getByLabelText("Description");
  
    await user.type(taskName, "Complete assignment");
    await user.type(description, "Finish FE-09 testing");
  
    expect(taskName).toHaveValue("Complete assignment");
    expect(description).toHaveValue("Finish FE-09 testing");
  });
});
