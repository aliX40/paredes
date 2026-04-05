import { products, categories } from "@/lib/placeholder-data";

describe("placeholder data integrity", () => {
  describe("categories", () => {
    it("has at least one category", () => {
      expect(categories.length).toBeGreaterThan(0);
    });

    it.each(categories)("category $name has required fields", (category) => {
      expect(category.id).toBeTruthy();
      expect(category.name).toBeTruthy();
      expect(category.handle).toBeTruthy();
    });

    it("has unique category IDs", () => {
      const ids = categories.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("has unique category handles", () => {
      const handles = categories.map((c) => c.handle);
      expect(new Set(handles).size).toBe(handles.length);
    });
  });

  describe("products", () => {
    it("has at least one product", () => {
      expect(products.length).toBeGreaterThan(0);
    });

    it.each(products)("product $title has required fields", (product) => {
      expect(product.id).toBeTruthy();
      expect(product.title).toBeTruthy();
      expect(product.handle).toBeTruthy();
      expect(product.categoryId).toBeTruthy();
      expect(product.categoryName).toBeTruthy();
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThan(0);
    });

    it("has unique product IDs", () => {
      const ids = products.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("every product references an existing category", () => {
      const categoryIds = new Set(categories.map((c) => c.id));
      for (const product of products) {
        expect(categoryIds.has(product.categoryId)).toBe(true);
      }
    });

    it("every compareAtPrice (when set) is greater than price", () => {
      for (const product of products) {
        if (product.compareAtPrice != null) {
          expect(product.compareAtPrice).toBeGreaterThan(product.price);
        }
      }
    });

    it("all prices are reasonable positive integers", () => {
      for (const product of products) {
        expect(Number.isInteger(product.price)).toBe(true);
        expect(product.price).toBeGreaterThan(0);
        expect(product.price).toBeLessThan(10_000_000); // < 10,000 TND
      }
    });

    it("all tags are valid ProductTag values", () => {
      const validTags = new Set(["offre", "nouveau", "bundle"]);
      for (const product of products) {
        for (const tag of product.tags) {
          expect(validTags.has(tag)).toBe(true);
        }
      }
    });
  });
});
