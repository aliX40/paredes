import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/lib/cart-context";
import type { Product } from "@/types";
import type { ReactNode } from "react";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct: Product = {
  id: "prod_test_1",
  title: "Test Product",
  description: "A test product",
  handle: "test-product",
  thumbnail: null,
  images: [],
  price: 10000,
  compareAtPrice: null,
  categoryId: "cat_test",
  categoryName: "Test",
  tags: [],
  inStock: true,
};

const mockProduct2: Product = {
  id: "prod_test_2",
  title: "Test Product 2",
  description: "Another test product",
  handle: "test-product-2",
  thumbnail: null,
  images: [],
  price: 20000,
  compareAtPrice: null,
  categoryId: "cat_test",
  categoryName: "Test",
  tags: [],
  inStock: true,
};

beforeEach(() => {
  localStorageMock.clear();
  jest.clearAllMocks();
});

describe("useCart", () => {
  it("throws when used outside CartProvider", () => {
    // Suppress console.error for expected error
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used within a CartProvider"
    );
    spy.mockRestore();
  });

  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  describe("addToCart", () => {
    it("adds an item to the cart", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].productId).toBe("prod_test_1");
      expect(result.current.items[0].quantity).toBe(1);
      expect(result.current.items[0].price).toBe(10000);
    });

    it("increments quantity when adding an existing product", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it("adds with a custom quantity", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it("adds different products as separate items", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
    });
  });

  describe("removeFromCart", () => {
    it("removes an item by its cart ID", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      const cartItemId = result.current.items[0].id;

      act(() => {
        result.current.removeFromCart(cartItemId);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it("does nothing for a non-existent ID", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.removeFromCart("nonexistent");
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe("updateQuantity", () => {
    it("updates the quantity of an item", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      const cartItemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(cartItemId, 3);
      });

      expect(result.current.items[0].quantity).toBe(3);
    });

    it("removes the item when quantity is set to 0", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      const cartItemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(cartItemId, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it("removes the item when quantity is negative", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      const cartItemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(cartItemId, -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe("clearCart", () => {
    it("empties all items from the cart", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct2);
      });
      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.itemCount).toBe(0);
      expect(result.current.subtotal).toBe(0);
    });
  });

  describe("computed values", () => {
    it("calculates itemCount as total quantity of all items", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2);
      });
      act(() => {
        result.current.addToCart(mockProduct2, 3);
      });

      expect(result.current.itemCount).toBe(5);
    });

    it("calculates subtotal correctly", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2); // 10000 * 2 = 20000
      });
      act(() => {
        result.current.addToCart(mockProduct2, 1); // 20000 * 1 = 20000
      });

      expect(result.current.subtotal).toBe(40000);
    });

    it("returns 7000 shipping cost when cart has items", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.shippingCost).toBe(7000);
    });

    it("returns 0 shipping cost when cart is empty", () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      expect(result.current.shippingCost).toBe(0);
    });

    it("calculates total as subtotal + shipping", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 1); // 10000
      });

      expect(result.current.total).toBe(10000 + 7000);
    });
  });

  describe("localStorage persistence", () => {
    it("persists cart to localStorage on change", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "paredes_cart",
        expect.any(String)
      );
    });

    it("hydrates cart from localStorage on mount", () => {
      const storedItems = [
        {
          id: "cart_prod_test_1_123",
          productId: "prod_test_1",
          title: "Test Product",
          thumbnail: null,
          price: 10000,
          quantity: 2,
        },
      ];
      localStorageMock.getItem.mockReturnValueOnce(
        JSON.stringify(storedItems)
      );

      const { result } = renderHook(() => useCart(), { wrapper });

      // After hydration effect runs
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });
  });
});
