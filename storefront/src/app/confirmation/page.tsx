"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { formatPrice, formatPhone } from "@/lib/utils";
import type { CartItem, CheckoutForm } from "@/types";

interface OrderData {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  customer: CheckoutForm;
  createdAt: string;
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("paredes_last_order");
      if (stored) {
        const parsed = JSON.parse(stored) as OrderData;
        setOrder(parsed);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  return (
    <>
      <Header onCartClick={() => (window.location.href = "/panier")} />

      <main className="flex-1">
        <section className="py-12 sm:py-20">
          <Container narrow>
            {/* Success icon */}
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-10 h-10 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-text-dark">
                Commande confirmée !
              </h1>
              <p className="mt-3 text-text text-lg max-w-lg mx-auto">
                Merci pour votre commande. Nous avons bien reçu votre demande.
              </p>
            </div>

            {/* Call notice */}
            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-text-dark">
                Nous vous appellerons pour confirmer
              </h2>
              <p className="mt-2 text-text text-sm max-w-md mx-auto">
                Notre équipe vous contactera au numéro fourni pour confirmer
                votre commande et organiser la livraison.
              </p>
            </div>

            {/* COD reminder */}
            <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-xl flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5 text-accent flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-semibold text-text-dark">
                Paiement à la livraison — Vous payez à la réception
              </p>
            </div>

            {/* Order details */}
            {order && (
              <div className="mt-8 bg-white rounded-xl border border-border overflow-hidden">
                {/* Customer info */}
                <div className="p-6 border-b border-border">
                  <h3 className="text-sm font-semibold text-text-dark uppercase tracking-wide mb-3">
                    Informations de livraison
                  </h3>
                  <div className="space-y-1 text-sm text-text">
                    <p className="font-medium text-text-dark">
                      {order.customer.fullName}
                    </p>
                    <p>{formatPhone(order.customer.phone)}</p>
                    <p>{order.customer.address}</p>
                    <p>
                      {order.customer.postalCode} {order.customer.city}
                    </p>
                    {order.customer.notes && (
                      <p className="mt-2 italic text-text/70">
                        Note : {order.customer.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 border-b border-border">
                  <h3 className="text-sm font-semibold text-text-dark uppercase tracking-wide mb-3">
                    Articles commandés
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <div>
                          <p className="text-text-dark font-medium">
                            {item.title}
                          </p>
                          <p className="text-text">
                            {formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium text-text-dark price">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="p-6 bg-border-light/50">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text">Sous-total</span>
                      <span className="font-medium text-text-dark price">
                        {formatPrice(order.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text">Livraison</span>
                      <span className="font-medium text-text-dark price">
                        {formatPrice(order.shippingCost)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-bold text-text-dark">Total</span>
                      <span className="font-bold text-text-dark text-lg price">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Back to home */}
            <div className="mt-8 text-center">
              <a href="/">
                <Button variant="primary" size="lg">
                  Retour à l&apos;accueil
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
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
