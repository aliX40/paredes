"use client";

import { useState, type FormEvent } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import { useCart } from "@/lib/cart-context";
import { formatPrice, validatePhone } from "@/lib/utils";
import type { CheckoutForm } from "@/types";

export default function CheckoutPage() {
  const { items, itemCount, subtotal, shippingCost, total, clearCart } =
    useCart();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Numéro invalide. Format attendu : +216 XX XXX XXX";
    }
    if (!form.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }
    if (!form.city.trim()) {
      newErrors.city = "La ville est requise";
    }
    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Le code postal est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setSubmitting(true);

    // Store order info for confirmation page
    const orderData = {
      items: [...items],
      subtotal,
      shippingCost,
      total,
      customer: { ...form },
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("paredes_last_order", JSON.stringify(orderData));
    } catch {
      // Ignore storage errors
    }

    // Clear cart and redirect
    clearCart();
    window.location.href = "/confirmation";
  };

  // Redirect if cart is empty and no submission in progress
  if (items.length === 0 && !submitting) {
    return (
      <>
        <Header
          cartCount={0}
          onCartClick={() => (window.location.href = "/panier")}
        />
        <main className="flex-1">
          <Container>
            <div className="py-20 text-center">
              <h1 className="text-2xl font-bold text-text-dark">
                Votre panier est vide
              </h1>
              <p className="mt-2 text-text">
                Ajoutez des produits à votre panier avant de passer commande.
              </p>
              <a href="/produits" className="mt-4 inline-block">
                <Button variant="primary" size="lg">
                  Découvrir nos produits
                </Button>
              </a>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

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
              Finaliser la commande
            </h1>
            <p className="mt-2 text-text">
              Remplissez vos informations de livraison pour confirmer votre
              commande.
            </p>
          </Container>
        </section>

        {/* COD Banner */}
        <section className="bg-accent/10 border-b border-accent/20">
          <Container>
            <div className="py-4 flex items-center justify-center gap-3">
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
                Paiement à la livraison — Vous payez uniquement à la réception
                de votre commande
              </p>
            </div>
          </Container>
        </section>

        <section className="py-8 sm:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h2 className="text-lg font-bold text-text-dark mb-6">
                      Informations de livraison
                    </h2>

                    <div className="space-y-4">
                      <Input
                        label="Nom complet"
                        placeholder="Votre nom et prénom"
                        value={form.fullName}
                        onChange={(e) =>
                          updateField("fullName", e.target.value)
                        }
                        error={errors.fullName}
                      />

                      <PhoneInput
                        label="Numéro de téléphone"
                        value={form.phone}
                        onChange={(value) => updateField("phone", value)}
                        error={errors.phone}
                      />

                      <Input
                        label="Adresse"
                        placeholder="Rue, numéro, bâtiment..."
                        value={form.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        error={errors.address}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Ville"
                          placeholder="Ex: Tunis, Sousse, Sfax..."
                          value={form.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          error={errors.city}
                        />
                        <Input
                          label="Code postal"
                          placeholder="Ex: 1000"
                          value={form.postalCode}
                          onChange={(e) =>
                            updateField("postalCode", e.target.value)
                          }
                          error={errors.postalCode}
                        />
                      </div>

                      <Input
                        label="Notes (optionnel)"
                        placeholder="Instructions de livraison, point de repère..."
                        value={form.notes || ""}
                        onChange={(e) => updateField("notes", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    fullWidth
                    loading={submitting}
                  >
                    Confirmer la commande
                  </Button>
                </form>
              </div>

              {/* Order summary sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
                  <button
                    type="button"
                    onClick={() => setSummaryOpen(!summaryOpen)}
                    className="w-full flex items-center justify-between lg:cursor-default cursor-pointer"
                  >
                    <h2 className="text-lg font-bold text-text-dark">
                      Votre commande
                    </h2>
                    <svg
                      className={`w-5 h-5 text-text lg:hidden transition-transform ${
                        summaryOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`mt-4 space-y-3 ${
                      summaryOpen ? "block" : "hidden lg:block"
                    }`}
                  >
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start gap-2 text-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-text-dark font-medium truncate">
                            {item.title}
                          </p>
                          <p className="text-text">Qté : {item.quantity}</p>
                        </div>
                        <span className="font-medium text-text-dark price whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}

                    <div className="border-t border-border pt-3 space-y-2">
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
                      <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-bold text-text-dark">Total</span>
                        <span className="font-bold text-text-dark text-lg price">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Edit cart link */}
                  <a
                    href="/panier"
                    className="mt-4 block text-center text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Modifier le panier
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
