import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/ui/Input";

describe("Input", () => {
  it("renders with a label", () => {
    render(<Input label="Full Name" />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  });

  it("generates an id from the label when none provided", () => {
    render(<Input label="Full Name" />);
    const input = screen.getByLabelText("Full Name");
    expect(input.id).toBe("full-name");
  });

  it("uses the provided id", () => {
    render(<Input label="Full Name" id="custom-id" />);
    const input = screen.getByLabelText("Full Name");
    expect(input.id).toBe("custom-id");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input label="Name" onChange={handleChange} />);
    const input = screen.getByLabelText("Name");
    await user.type(input, "Hello");

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it("displays an error message", () => {
    render(<Input label="Email" error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("displays a hint when no error", () => {
    render(<Input label="Email" hint="Enter your email" />);
    expect(screen.getByText("Enter your email")).toBeInTheDocument();
  });

  it("shows error instead of hint when both are present", () => {
    render(<Input label="Email" error="Bad" hint="Good" />);
    expect(screen.getByText("Bad")).toBeInTheDocument();
    expect(screen.queryByText("Good")).not.toBeInTheDocument();
  });

  it("applies error styles when error is present", () => {
    render(<Input label="Email" error="Required" />);
    const input = screen.getByLabelText("Email");
    expect(input.className).toContain("border-error");
  });
});
