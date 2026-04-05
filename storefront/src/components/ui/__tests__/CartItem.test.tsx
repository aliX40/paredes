import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "@/components/ui/CartItem";
import type { CartItem as CartItemType } from "@/types";

const mockItem: CartItemType = {
  id: "cart_001",
  productId: "prod_001",
  title: "Bobine d'essuyage industrielle",
  thumbnail: null,
  price: 15900,
  quantity: 2,
};

describe("CartItem", () => {
  it("renders the item title", () => {
    render(<CartItem item={mockItem} />);
    expect(
      screen.getByText("Bobine d'essuyage industrielle")
    ).toBeInTheDocument();
  });

  it("renders the unit price", () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText("15,900 TND")).toBeInTheDocument();
  });

  it("renders the line subtotal (price * quantity)", () => {
    render(<CartItem item={mockItem} />);
    // 15900 * 2 = 31800
    expect(screen.getByText("31,800 TND")).toBeInTheDocument();
  });

  it("renders the quantity", () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls onUpdateQuantity with incremented value on + click", async () => {
    const user = userEvent.setup();
    const handleUpdate = jest.fn();

    render(<CartItem item={mockItem} onUpdateQuantity={handleUpdate} />);
    await user.click(
      screen.getByLabelText("Augmenter la quantité")
    );

    expect(handleUpdate).toHaveBeenCalledWith("cart_001", 3);
  });

  it("calls onUpdateQuantity with decremented value on - click", async () => {
    const user = userEvent.setup();
    const handleUpdate = jest.fn();

    render(<CartItem item={mockItem} onUpdateQuantity={handleUpdate} />);
    await user.click(
      screen.getByLabelText("Diminuer la quantité")
    );

    expect(handleUpdate).toHaveBeenCalledWith("cart_001", 1);
  });

  it("does not decrement below 1", async () => {
    const user = userEvent.setup();
    const handleUpdate = jest.fn();
    const singleItem = { ...mockItem, quantity: 1 };

    render(<CartItem item={singleItem} onUpdateQuantity={handleUpdate} />);
    await user.click(
      screen.getByLabelText("Diminuer la quantité")
    );

    expect(handleUpdate).toHaveBeenCalledWith("cart_001", 1);
  });

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const handleRemove = jest.fn();

    render(<CartItem item={mockItem} onRemove={handleRemove} />);
    await user.click(
      screen.getByLabelText("Supprimer Bobine d'essuyage industrielle")
    );

    expect(handleRemove).toHaveBeenCalledWith("cart_001");
  });
});
