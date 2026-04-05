import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";

const baseProduct: Product = {
  id: "prod_001",
  title: "Bobine d'essuyage industrielle",
  description: "A professional cleaning product",
  handle: "bobine-essuyage",
  thumbnail: null,
  images: [],
  price: 15900,
  compareAtPrice: null,
  categoryId: "cat_essuyage",
  categoryName: "Essuyage",
  tags: [],
  inStock: true,
};

describe("ProductCard", () => {
  it("renders the product title", () => {
    render(<ProductCard product={baseProduct} />);
    expect(
      screen.getByText("Bobine d'essuyage industrielle")
    ).toBeInTheDocument();
  });

  it("renders the category name", () => {
    render(<ProductCard product={baseProduct} />);
    expect(screen.getByText("Essuyage")).toBeInTheDocument();
  });

  it("renders the formatted price", () => {
    render(<ProductCard product={baseProduct} />);
    expect(screen.getByText("15,900 TND")).toBeInTheDocument();
  });

  it("renders the product description", () => {
    render(<ProductCard product={baseProduct} />);
    expect(
      screen.getByText("A professional cleaning product")
    ).toBeInTheDocument();
  });

  it("shows discount price when compareAtPrice is set", () => {
    const discountProduct: Product = {
      ...baseProduct,
      price: 28900,
      compareAtPrice: 34900,
    };

    render(<ProductCard product={discountProduct} />);
    expect(screen.getByText("28,900 TND")).toBeInTheDocument();
    expect(screen.getByText("34,900 TND")).toBeInTheDocument();
  });

  it("does not show discount when compareAtPrice is null", () => {
    render(<ProductCard product={baseProduct} />);
    const prices = screen.getAllByText(/TND/);
    expect(prices).toHaveLength(1);
  });

  it("renders tags as badges", () => {
    const taggedProduct: Product = {
      ...baseProduct,
      tags: ["nouveau", "offre"],
    };

    render(<ProductCard product={taggedProduct} />);
    expect(screen.getByText("Nouveau")).toBeInTheDocument();
    expect(screen.getByText("Offre")).toBeInTheDocument();
  });

  it("renders 'Ajouter au panier' button when in stock", () => {
    render(<ProductCard product={baseProduct} />);
    expect(
      screen.getByRole("button", { name: /Ajouter au panier/i })
    ).toBeInTheDocument();
  });

  it("renders 'Rupture de stock' when out of stock", () => {
    const outOfStock: Product = { ...baseProduct, inStock: false };
    render(<ProductCard product={outOfStock} />);
    expect(
      screen.getByRole("button", { name: "Rupture de stock" })
    ).toBeDisabled();
  });

  it("calls onAddToCart when button is clicked", async () => {
    const user = userEvent.setup();
    const handleAdd = jest.fn();

    render(<ProductCard product={baseProduct} onAddToCart={handleAdd} />);
    await user.click(
      screen.getByRole("button", { name: /Ajouter au panier/i })
    );

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(baseProduct);
  });

  it("shows placeholder when thumbnail is null", () => {
    render(<ProductCard product={baseProduct} />);
    expect(
      screen.getByText("Image bientôt disponible")
    ).toBeInTheDocument();
  });
});
