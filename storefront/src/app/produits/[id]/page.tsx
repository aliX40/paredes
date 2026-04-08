"use client";

import { useState, use } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useStoreData } from "@/lib/use-store-data";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart, itemCount } = useCart();
  const { products } = useStoreData();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Header
          cartCount={itemCount}
          onCartClick={() => (window.location.href = "/panier")}
        />
        <main className="flex-1">
          <Container>
            <div className="py-20 text-center">
              <h1 className="text-2xl font-bold text-text-dark">
                Produit introuvable
              </h1>
              <p className="mt-2 text-text">
                Ce produit n&apos;existe pas ou a été supprimé.
              </p>
              <a
                href="/produits"
                className="mt-4 inline-block text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                &larr; Retour aux produits
              </a>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleRelatedAddToCart = (p: Product) => {
    addToCart(p);
  };

  return (
    <>
      <Header
        cartCount={itemCount}
        onCartClick={() => (window.location.href = "/panier")}
      />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-cyan-light py-4">
          <Container>
            <nav className="flex items-center gap-2 text-sm text-text">
              <a href="/" className="hover:text-primary transition-colors">
                Accueil
              </a>
              <span>/</span>
              <a href="/produits" className="hover:text-primary transition-colors">
                Produits
              </a>
              <span>/</span>
              <span className="text-text-dark font-medium truncate">
                {product.title}
              </span>
            </nav>
          </Container>
        </section>

        {/* Product detail */}
        <section className="py-8 sm:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image */}
              <div className="relative aspect-square bg-cyan-light rounded-2xl flex items-center justify-center overflow-hidden">
                {product.tags.length > 0 && (
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <Badge key={tag} tag={tag} />
                    ))}
                  </div>
                )}
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-primary/30">
                    <svg
                      className="w-24 h-24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Image bientôt disponible
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-primary uppercase tracking-wide">
                  {product.categoryName}
                </span>

                <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-text-dark">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-text-dark price">
                    {formatPrice(product.price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-text/60 line-through price">
                      {formatPrice(product.compareAtPrice!)}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <p className="mt-1 text-sm text-accent font-semibold">
                    Économisez{" "}
                    {formatPrice(product.compareAtPrice! - product.price)}
                  </p>
                )}

                {/* Description */}
                <p className="mt-6 text-text leading-relaxed">
                  {product.description}
                </p>

                {/* Stock status */}
                <div className="mt-6">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      En stock
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-error">
                      Rupture de stock
                    </span>
                  )}
                </div>

                {/* Quantity + add to cart */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  {/* Quantity selector */}
                  <div className="inline-flex items-center border border-border rounded-lg">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-text hover:text-text-dark hover:bg-border-light rounded-l-lg transition-colors cursor-pointer"
                      aria-label="Diminuer la quantité"
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
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span className="px-5 py-3 text-sm font-semibold text-text-dark min-w-[3rem] text-center tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-text hover:text-text-dark hover:bg-border-light rounded-r-lg transition-colors cursor-pointer"
                      aria-label="Augmenter la quantité"
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>

                  <Button
                    variant={added ? "accent" : "primary"}
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 sm:flex-none"
                  >
                    {added ? (
                      <>
                        <svg
                          className="w-5 h-5"
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
                        Ajouté au panier
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                          />
                        </svg>
                        Ajouter au panier
                      </>
                    )}
                  </Button>
                </div>

                {/* COD notice */}
                <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-text">
                    <strong className="text-text-dark">
                      Paiement à la livraison
                    </strong>{" "}
                    — Vous payez à la réception de votre commande.
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 sm:py-16 bg-cream">
            <Container>
              <h2 className="text-2xl font-bold text-text-dark">
                Produits similaires
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <a key={p.id} href={`/produits/${p.id}`} className="block">
                    <ProductCard
                      product={p}
                      onAddToCart={() => handleRelatedAddToCart(p)}
                    />
                  </a>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
