"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import HeroBanner from "@/components/ui/HeroBanner";
import ProductCard from "@/components/ui/ProductCard";
import Container from "@/components/ui/Container";
import { products, categories } from "@/lib/placeholder-data";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types";

export default function Home() {
  const { addToCart, itemCount } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <>
      <Header
        cartCount={itemCount}
        onCartClick={() => (window.location.href = "/panier")}
      />

      <main className="flex-1">
        {/* Hero */}
        <HeroBanner
          headline="Hygiène professionnelle, livrée chez vous en Tunisie"
          subtext="Distributeur exclusif Paredes en Tunisie. Essuyage, hygiène et entretien — qualité professionnelle, paiement à la livraison."
          ctaLabel="Découvrir nos produits"
          ctaHref="/produits"
          imageSrc="/hero-banner.webp"
        />

        {/* Categories */}
        <section className="py-12 sm:py-16">
          <Container>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center">
              Nos catégories
            </h2>
            <p className="mt-2 text-text text-center max-w-xl mx-auto">
              Des solutions professionnelles pour chaque besoin d&apos;hygiène
              et d&apos;entretien.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/produits?categorie=${cat.handle}`}
                  className="group relative flex flex-col items-center p-8 bg-cyan-light rounded-xl border border-transparent hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-7 h-7 text-primary"
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
                  </div>
                  <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="mt-1.5 text-sm text-text text-center">
                      {cat.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* Featured products */}
        <section className="py-12 sm:py-16 bg-cream">
          <Container>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center">
              Nos produits
            </h2>
            <p className="mt-2 text-text text-center">
              Qualité professionnelle Paredes, disponible en Tunisie.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="/produits"
                className="text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                Voir tous les produits &rarr;
              </a>
            </div>
          </Container>
        </section>

        {/* Offers section */}
        {products.some((p) => p.tags.includes("offre") || p.tags.includes("bundle")) && (
          <section className="py-12 sm:py-16">
            <Container>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-dark text-center">
                Offres &amp; Bundles
              </h2>
              <p className="mt-2 text-text text-center">
                Profitez de nos offres spéciales et packs avantageux.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.tags.includes("offre") || p.tags.includes("bundle"))
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="/offres"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Voir toutes les offres &rarr;
                </a>
              </div>
            </Container>
          </section>
        )}

        {/* COD banner */}
        <section className="py-12 sm:py-16 bg-cream">
          <Container narrow>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-10 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary"
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
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-dark">
                Paiement à la livraison
              </h2>
              <p className="mt-3 text-text max-w-md mx-auto">
                Commandez en toute confiance. Vous payez uniquement à la
                réception de votre commande. Livraison dans toute la Tunisie.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
