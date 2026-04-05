import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/ui/Header";

describe("Header", () => {
  it("renders the PAREDES brand name", () => {
    render(<Header />);
    expect(screen.getByText("PAREDES")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    // Desktop and mobile nav both have these links, so there will be duplicates
    const accueilLinks = screen.getAllByText("Accueil");
    const produitsLinks = screen.getAllByText("Produits");
    const offresLinks = screen.getAllByText("Offres");

    expect(accueilLinks.length).toBeGreaterThanOrEqual(1);
    expect(produitsLinks.length).toBeGreaterThanOrEqual(1);
    expect(offresLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders cart button with item count", () => {
    render(<Header cartCount={3} />);
    expect(screen.getByLabelText("Panier (3 articles)")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not show cart count badge when count is 0", () => {
    render(<Header cartCount={0} />);
    expect(screen.getByLabelText("Panier (0 articles)")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("shows 99+ for large cart counts", () => {
    render(<Header cartCount={150} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("calls onCartClick when cart button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Header cartCount={2} onCartClick={handleClick} />);
    await user.click(screen.getByLabelText("Panier (2 articles)"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders Tunisie label", () => {
    render(<Header />);
    expect(screen.getByText("Tunisie")).toBeInTheDocument();
  });
});
