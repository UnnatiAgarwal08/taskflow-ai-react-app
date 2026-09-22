import { render, screen } from "@testing-library/react";

function TestComponent() {
  return <button>Test Button</button>;
}

test("React Testing Library works", () => {
  render(<TestComponent />);

  const button = screen.getByRole("button", {
    name: "Test Button",
  });

  expect(button).toBeInTheDocument();
});