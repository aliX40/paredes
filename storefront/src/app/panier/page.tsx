"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import CartItemComponent from "@/components/ui/CartItem";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function PanierPage() {
  const {
    items,
    itemCount,
    subtotal,
    shippingCost,
    total,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      <Header
        cartCount={itemCount}
        onCartClick={() => (window.location.href = "/panier")}
      />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-cyan-light py-10 sm:py-14">
          <Container>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark">
              Votre panier
            </h1>
            <p className="mt-2 text-text">
              {itemCount > 0
                ? `${itemCount} article${itemCount !== 1 ? "s" : ""} dans votre panier`
                : "Votre panier est vide"}
            </p>
          </Container>
        </section>

        <section className="py-8 sm:py-12">
          <Container>
            {items.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
                    {items.map((item) => (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>

                  {/* Continue shopping */}
                  <a
                    href="/produits"
                    className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    Continuer les achats
                  </a>
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
                    <h2 className="text-lg font-bold text-text-dark mb-4">
                      Récapitulatif
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text">Sous-total</span>
                        <span className="font-medium text-text-dark price">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text">Livraison</span>
                        <span className="font-medium text-text-dark price">
                          {formatPrice(shippingCost)}
                        </span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between">
                        <span className="font-bold text-text-dark">Total</span>
                        <span className="font-bold text-text-dark text-lg price">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* COD notice */}
                    <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                      <p className="text-xs text-text text-center">
                        <strong className="text-text-dark">
                          Paiement à la livraison
                        </strong>
                      </p>
                    </div>

                    <a href="/checkout" className="block mt-4">
                      <Button variant="accent" size="lg" fullWidth>
                        Passer la commande
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty cart state */
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-border-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-text/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-text-dark">
                  Votre panier est vide
                </h2>
                <p className="mt-2 text-text max-w-md mx-auto">
                  Découvrez notre gamme de produits d&apos;hygiène et
                  d&apos;entretien professionnel.
                </p>
                <a href="/produits" className="inline-block mt-6">
                  <Button variant="primary" size="lg">
                    Découvrir nos produits
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Button>
                </a>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
