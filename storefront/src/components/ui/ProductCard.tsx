"use client";

import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Badge from "./Badge";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <article className="group relative flex flex-col bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <Badge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square bg-cyan-light flex items-center justify-center overflow-hidden">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-primary/40">
            <svg
              className="w-16 h-16"
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
            <span className="text-xs font-medium">Image bientôt disponible</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          {product.categoryName}
        </span>

        <h3 className="text-sm font-semibold text-text-dark leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <p className="text-xs text-text line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-text-dark price">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-text/60 line-through price">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              Ajouter au panier
            </>
          ) : (
            "Rupture de stock"
          )}
        </Button>
      </div>
    </article>
  );
}
