"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Container from "@/components/ui/Container";
import { useStoreData } from "@/lib/use-store-data";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

function ProduitsContent() {
  const { addToCart, itemCount } = useCart();
  const { products, categories } = useStoreData();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categorie") || "tous";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "tous") return products;
    return products.filter((p) => {
      const cat = categories.find((c) => c.handle === activeCategory);
      return cat ? p.categoryId === cat.id : true;
    });
  }, [activeCategory, products, categories]);

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
        <section className="bg-cyan-light py-10 sm:py-14">
          <Container>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-dark">
              Nos produits
            </h1>
            <p className="mt-2 text-text max-w-2xl">
              Découvrez notre gamme complète de produits d&apos;hygiène et
              d&apos;entretien professionnel Paredes.
            </p>
          </Container>
        </section>

        {/* Filter bar + products */}
        <section className="py-8 sm:py-12">
          <Container>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveCategory("tous")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  activeCategory === "tous"
                    ? "bg-primary text-white"
                    : "bg-border-light text-text hover:bg-primary/10 hover:text-primary"
                )}
              >
                Tous les produits
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.handle)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    activeCategory === cat.handle
                      ? "bg-primary text-white"
                      : "bg-border-light text-text hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-text mb-6">
              {filteredProducts.length} produit
              {filteredProducts.length !== 1 ? "s" : ""} trouvé
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <a key={product.id} href={`/produits/${product.id}`} className="block">
                    <ProductCard
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-text text-lg">
                  Aucun produit trouvé dans cette catégorie.
                </p>
                <button
                  onClick={() => setActiveCategory("tous")}
                  className="mt-4 text-primary font-semibold hover:text-primary-dark transition-colors cursor-pointer"
                >
                  Voir tous les produits
                </button>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function ProduitsPage() {
  return (
    <Suspense>
      <ProduitsContent />
    </Suspense>
  );
}
