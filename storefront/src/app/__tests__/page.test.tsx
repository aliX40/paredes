import { render, screen } from "@testing-library/react";
import { CartProvider } from "@/lib/cart-context";
import Home from "@/app/page";

describe("Home page", () => {
  const renderPage = () =>
    render(
      <CartProvider>
        <Home />
      </CartProvider>
    );

  it("renders the hero banner headline", () => {
    renderPage();
    expect(
      screen.getByText(
        /Hygi\u00e8ne professionnelle, livr\u00e9e chez vous en Tunisie/
      )
    ).toBeInTheDocument();
  });

  it("renders the categories section", () => {
    renderPage();
    expect(screen.getByText("Nos cat\u00E9gories")).toBeInTheDocument();
  });

  it("renders all category names", () => {
    renderPage();
    expect(screen.getAllByText("Essuyage").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Hygi\u00e8ne").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Entretien").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the products section", () => {
    renderPage();
    expect(screen.getByText("Nos produits")).toBeInTheDocument();
  });

  it("renders product cards with add-to-cart buttons", () => {
    renderPage();
    const addButtons = screen.getAllByRole("button", {
      name: /Ajouter au panier/i,
    });
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it("renders the offers section", () => {
    renderPage();
    expect(screen.getAllByText(/Offres/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the COD (payment on delivery) banner", () => {
    renderPage();
    expect(
      screen.getByText("Paiement \u00e0 la livraison")
    ).toBeInTheDocument();
  });

  it("renders the header with PAREDES branding", () => {
    renderPage();
    // PAREDES appears in both header and footer
    expect(screen.getAllByText("PAREDES").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the CTA button", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: /D\u00e9couvrir nos produits/i })
    ).toBeInTheDocument();
  });
});
