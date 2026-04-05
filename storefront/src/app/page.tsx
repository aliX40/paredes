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
          headline="Engagé pour l'hygiène des professionnels en Tunisie"
          subtext="Distributeur exclusif Paredes. Essuyage, hygiène et entretien — des solutions éco-responsables adaptées à votre métier."
          ctaLabel="Découvrir nos produits"
          ctaHref="/produits"
          imageSrc="/hero-banner.webp"
        />

        {/* Value proposition strip */}
        <section className="border-y border-border bg-white">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div className="flex items-center gap-4 py-5 sm:px-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375m11.25 0h3.375a1.125 1.125 0 001.125-1.125v-3.375M3.375 14.25V3.75h7.5v10.5H3.375zm0 0h7.5m0 0l1.5-1.5m0 0l3-3m-3 3h7.5V6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-dark">Livraison toute la Tunisie</p>
                  <p className="text-xs text-text">Offerte dès 300 DT HT</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-5 sm:px-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-dark">Produits éco-responsables</p>
                  <p className="text-xs text-text">Certifiés et durables</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-5 sm:px-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-dark">Conseil par métier</p>
                  <p className="text-xs text-text">Solutions adaptées à votre secteur</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-5 sm:px-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-dark">Paiement à la livraison</p>
                  <p className="text-xs text-text">Payez à la réception</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

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

        {/* Engagement banner */}
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
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-dark">
                Paredes, engagé pour l&apos;hygiène des pros
              </h2>
              <p className="mt-3 text-text max-w-lg mx-auto">
                Des produits éco-responsables, un conseil adapté à votre métier,
                et un paiement à la livraison partout en Tunisie. Commandez en
                toute confiance.
              </p>
              <a
                href="/produits"
                className="inline-flex items-center gap-1.5 mt-5 text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                Découvrir nos solutions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
