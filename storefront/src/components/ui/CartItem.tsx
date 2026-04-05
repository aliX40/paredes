"use client";

import type { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      {/* Thumbnail */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-cyan-light flex items-center justify-center overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-8 h-8 text-primary/30"
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
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text-dark truncate">
          {item.title}
        </h4>
        <p className="text-sm text-text mt-0.5 price">
          {formatPrice(item.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="inline-flex items-center border border-border rounded-lg">
            <button
              type="button"
              onClick={() =>
                onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))
              }
              className="px-2.5 py-1 text-text hover:text-text-dark hover:bg-border-light rounded-l-lg transition-colors cursor-pointer"
              aria-label="Diminuer la quantité"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-3 py-1 text-sm font-medium text-text-dark min-w-[2rem] text-center tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
              className="px-2.5 py-1 text-text hover:text-text-dark hover:bg-border-light rounded-r-lg transition-colors cursor-pointer"
              aria-label="Augmenter la quantité"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subtotal + remove */}
      <div className="flex flex-col items-end justify-between">
        <span className="text-sm font-bold text-text-dark price">
          {formatPrice(item.price * item.quantity)}
        </span>
        <button
          type="button"
          onClick={() => onRemove?.(item.id)}
          className="text-text/50 hover:text-error transition-colors p-1 cursor-pointer"
          aria-label={`Supprimer ${item.title}`}
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
