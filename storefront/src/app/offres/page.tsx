"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Container from "@/components/ui/Container";
import { useStoreData } from "@/lib/use-store-data";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default function OffresPage() {
  const { addToCart, itemCount } = useCart();
  const { products } = useStoreData();

  const offerProducts = products.filter(
    (p) => p.tags.includes("offre") || p.tags.includes("bundle")
  );

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
        {/* Page header */}
        <section className="bg-gradient-to-br from-accent/10 to-primary/5 py-10 sm:py-14">
          <Container>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark">
              Offres &amp; Bundles
            </h1>
            <p className="mt-2 text-text max-w-2xl">
              Profitez de nos offres spéciales et packs avantageux pour équiper
              vos locaux à moindre coût.
            </p>
          </Container>
        </section>

        {/* Offers */}
        <section className="py-8 sm:py-12">
          <Container>
            {offerProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offerProducts.map((product) => {
                    const hasDiscount =
                      product.compareAtPrice &&
                      product.compareAtPrice > product.price;
                    return (
                      <div key={product.id} className="relative">
                        {hasDiscount && (
                          <div className="absolute -top-2 -right-2 z-20 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            -{" "}
                            {formatPrice(
                              product.compareAtPrice! - product.price
                            )}
                          </div>
                        )}
                        <a href={`/produits/${product.id}`} className="block">
                          <ProductCard
                            product={product}
                            onAddToCart={() => handleAddToCart(product)}
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>

                {/* COD reminder */}
                <div className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-xl text-center">
                  <p className="text-text">
                    <strong className="text-text-dark">
                      Paiement à la livraison
                    </strong>{" "}
                    — Toutes nos offres sont livrées dans toute la Tunisie.
                    Vous payez à la réception.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-text text-lg">
                  Aucune offre disponible pour le moment.
                </p>
                <a
                  href="/produits"
                  className="mt-4 inline-block text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Découvrir nos produits &rarr;
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
