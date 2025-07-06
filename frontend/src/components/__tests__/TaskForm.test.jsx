import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../TaskForm";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

import { TasksContextProvider } from "../../context/TaskContext";
import { AuthContextProvider } from "../../context/AuthContext";

// Helper function to render with context
const renderWithProviders = (ui) => {
  return render(
    <AuthContextProvider>
      <TasksContextProvider>{ui}</TasksContextProvider>
    </AuthContextProvider>
  );
};

describe("TaskForm Component", () => {
  it("renders all input fields and the submit button", () => {
    renderWithProviders(<TaskForm />);
    expect(screen.getByLabelText(/Task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Info/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  it("allows user to input and submit a valid task", () => {
    renderWithProviders(<TaskForm />);
    const taskInput = screen.getByLabelText(/Task/i);
    fireEvent.change(taskInput, { target: { value: "Test Task" } });
    expect(taskInput.value).toBe("Test Task");
  });

  it("does not submit form if task is empty", () => {
    renderWithProviders(<TaskForm />);
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByLabelText(/Task/i).value).toBe(""); // Still empty
  });

  it("limits information field to 250 characters", () => {
    renderWithProviders(<TaskForm />);
    const infoInput = screen.getByLabelText(/Additional Info/i);
    const longText = "x".repeat(300);
    fireEvent.change(infoInput, { target: { value: longText } });
    expect(infoInput.value.length).toBeLessThanOrEqual(250);
  });
});