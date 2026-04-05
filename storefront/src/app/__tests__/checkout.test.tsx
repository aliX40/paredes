import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "@/lib/cart-context";
import CheckoutPage from "@/app/checkout/page";

// Pre-populated cart items for tests that need a non-empty cart
const cartItems = [
  {
    id: "cart_prod_001_123",
    productId: "prod_001",
    title: "Bobine d'essuyage",
    thumbnail: null,
    price: 15900,
    quantity: 1,
  },
];

function renderCheckout() {
  window.localStorage.setItem("paredes_cart", JSON.stringify(cartItems));
  return render(
    <CartProvider>
      <CheckoutPage />
    </CartProvider>
  );
}

describe("Checkout page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows empty cart message when cart is empty", () => {
    render(
      <CartProvider>
        <CheckoutPage />
      </CartProvider>
    );
    expect(screen.getByText("Votre panier est vide")).toBeInTheDocument();
  });

  it("renders the checkout form when cart has items", () => {
    renderCheckout();
    expect(
      screen.getByText("Informations de livraison")
    ).toBeInTheDocument();
  });

  it("renders all required form fields", () => {
    renderCheckout();
    expect(screen.getByLabelText("Nom complet")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Num\u00e9ro de t\u00e9l\u00e9phone")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse")).toBeInTheDocument();
    expect(screen.getByLabelText("Ville")).toBeInTheDocument();
    expect(screen.getByLabelText("Code postal")).toBeInTheDocument();
  });

  it("renders the COD (payment on delivery) banner", () => {
    renderCheckout();
    expect(
      screen.getByText(/Paiement \u00e0 la livraison/)
    ).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    renderCheckout();
    expect(
      screen.getByRole("button", { name: /Confirmer la commande/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    renderCheckout();

    await user.click(
      screen.getByRole("button", { name: /Confirmer la commande/i })
    );

    expect(
      screen.getByText("Le nom complet est requis")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Le num\u00e9ro de t\u00e9l\u00e9phone est requis")
    ).toBeInTheDocument();
    expect(screen.getByText("L'adresse est requise")).toBeInTheDocument();
    expect(screen.getByText("La ville est requise")).toBeInTheDocument();
    expect(
      screen.getByText("Le code postal est requis")
    ).toBeInTheDocument();
  });

  it("shows phone validation error for invalid phone", async () => {
    const user = userEvent.setup();
    renderCheckout();

    const phoneInput = screen.getByLabelText("Num\u00e9ro de t\u00e9l\u00e9phone");
    fireEvent.change(phoneInput, { target: { value: "123" } });

    await user.click(
      screen.getByRole("button", { name: /Confirmer la commande/i })
    );

    expect(
      screen.getByText(
        "Num\u00e9ro invalide. Format attendu : +216 XX XXX XXX"
      )
    ).toBeInTheDocument();
  });

  it("clears field error when user types in that field", async () => {
    const user = userEvent.setup();
    renderCheckout();

    // Submit empty to trigger errors
    await user.click(
      screen.getByRole("button", { name: /Confirmer la commande/i })
    );

    expect(
      screen.getByText("Le nom complet est requis")
    ).toBeInTheDocument();

    // Type in the name field
    const nameInput = screen.getByLabelText("Nom complet");
    await user.type(nameInput, "Test");

    expect(
      screen.queryByText("Le nom complet est requis")
    ).not.toBeInTheDocument();
  });

  it("renders order summary with item details", () => {
    renderCheckout();
    expect(screen.getByText("Votre commande")).toBeInTheDocument();
    expect(screen.getByText("Bobine d'essuyage")).toBeInTheDocument();
  });
});
