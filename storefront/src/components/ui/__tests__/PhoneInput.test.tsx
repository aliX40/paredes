import { render, screen, fireEvent } from "@testing-library/react";
import PhoneInput from "@/components/ui/PhoneInput";

describe("PhoneInput", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default label", () => {
    render(<PhoneInput {...defaultProps} />);
    expect(
      screen.getByLabelText("Numéro de téléphone")
    ).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<PhoneInput {...defaultProps} label="Phone" />);
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  });

  it("displays the placeholder", () => {
    render(<PhoneInput {...defaultProps} />);
    expect(screen.getByPlaceholderText("+216 XX XXX XXX")).toBeInTheDocument();
  });

  it("calls onChange with filtered value (strips non-digit/space/plus)", () => {
    const onChange = jest.fn();
    render(<PhoneInput value="" onChange={onChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "+216 98 abc 123" } });
    expect(onChange).toHaveBeenCalledWith("+216 98  123");
  });

  it("shows validation error on blur with invalid number", () => {
    render(<PhoneInput value="123" onChange={jest.fn()} />);
    const input = screen.getByRole("textbox");

    fireEvent.blur(input);

    expect(
      screen.getByText("Numéro invalide. Format attendu : +216 XX XXX XXX")
    ).toBeInTheDocument();
  });

  it("does not show validation error when value is empty after blur", () => {
    render(<PhoneInput value="" onChange={jest.fn()} />);
    const input = screen.getByRole("textbox");

    fireEvent.blur(input);

    expect(
      screen.queryByText(
        "Numéro invalide. Format attendu : +216 XX XXX XXX"
      )
    ).not.toBeInTheDocument();
  });

  it("shows custom error prop instead of validation error", () => {
    render(
      <PhoneInput value="123" onChange={jest.fn()} error="Custom error" />
    );
    expect(screen.getByText("Custom error")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is shown", () => {
    render(
      <PhoneInput value="123" onChange={jest.fn()} error="Custom error" />
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
