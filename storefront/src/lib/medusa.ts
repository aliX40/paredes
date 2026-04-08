import type { Product, Category } from "@/types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "https://api.pare-des.tn";

async function medusaFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Medusa API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// --- Products ---

interface MedusaVariant {
  id: string;
  calculated_price?: {
    calculated_amount: number;
    original_amount: number;
  };
}

interface MedusaProduct {
  id: string;
  title: string;
  description: string | null;
  handle: string;
  thumbnail: string | null;
  images: { url: string }[];
  variants: MedusaVariant[];
  collection?: { id: string; title: string } | null;
  categories?: { id: string; name: string; handle: string }[];
  tags?: { value: string }[];
  status: string;
}

function toMillimes(amount: number): number {
  return Math.round(amount * 1000);
}

function mapProduct(p: MedusaProduct): Product {
  const variant = p.variants?.[0];
  const rawPrice = variant?.calculated_price?.calculated_amount ?? 0;
  const rawCompare = variant?.calculated_price?.original_amount ?? null;
  const price = toMillimes(rawPrice);
  const compareAtPrice = rawCompare != null ? toMillimes(rawCompare) : null;

  const category = p.categories?.[0] || p.collection;
  const categoryId = category?.id || "";
  const categoryName =
    (category && "name" in category ? category.name : null) ||
    (category && "title" in category ? category.title : "") ||
    "";

  const tags = (p.tags || [])
    .map((t) => t.value.toLowerCase())
    .filter((v): v is "offre" | "nouveau" | "bundle" =>
      ["offre", "nouveau", "bundle"].includes(v)
    );

  return {
    id: p.id,
    title: p.title,
    description: p.description || "",
    handle: p.handle,
    thumbnail: p.thumbnail,
    images: (p.images || []).map((img) => img.url),
    price,
    compareAtPrice: compareAtPrice !== price ? compareAtPrice : null,
    categoryId,
    categoryName,
    tags,
    inStock: true,
  };
}

export async function getProducts(regionId: string): Promise<Product[]> {
  const data = await medusaFetch<{ products: MedusaProduct[] }>(
    `/store/products?region_id=${regionId}&fields=*variants.calculated_price,*categories,+tags&limit=100`
  );
  return data.products.map(mapProduct);
}

export async function getProduct(
  handle: string,
  regionId: string
): Promise<Product | null> {
  try {
    const data = await medusaFetch<{ products: MedusaProduct[] }>(
      `/store/products?handle=${handle}&region_id=${regionId}&fields=*variants.calculated_price,*categories,+tags`
    );
    if (data.products.length === 0) return null;
    return mapProduct(data.products[0]);
  } catch {
    return null;
  }
}

export async function getProductById(
  id: string,
  regionId: string
): Promise<Product | null> {
  try {
    const data = await medusaFetch<{ product: MedusaProduct }>(
      `/store/products/${id}?region_id=${regionId}&fields=*variants.calculated_price,*categories,+tags`
    );
    return mapProduct(data.product);
  } catch {
    return null;
  }
}

// --- Categories ---

interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
  description: string | null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await medusaFetch<{ product_categories: MedusaCategory[] }>(
    `/store/product-categories`
  );
  return data.product_categories.map((c) => ({
    id: c.id,
    name: c.name,
    handle: c.handle,
    description: c.description || undefined,
  }));
}

// --- Collections (fallback if categories aren't used) ---

interface MedusaCollection {
  id: string;
  title: string;
  handle: string;
}

export async function getCollections(): Promise<Category[]> {
  const data = await medusaFetch<{ collections: MedusaCollection[] }>(
    `/store/collections`
  );
  return data.collections.map((c) => ({
    id: c.id,
    name: c.title,
    handle: c.handle,
  }));
}

// --- Region ---

interface MedusaRegion {
  id: string;
  name: string;
  currency_code: string;
}

let cachedRegionId: string | null = null;

export async function getRegionId(): Promise<string> {
  if (cachedRegionId) return cachedRegionId;
  const data = await medusaFetch<{ regions: MedusaRegion[] }>(`/store/regions`);
  // Find Tunisia region or first region with TND
  const tn =
    data.regions.find((r) => r.currency_code === "tnd") || data.regions[0];
  if (!tn) throw new Error("No region found");
  cachedRegionId = tn.id;
  return tn.id;
}

// --- Cart & Checkout ---

interface MedusaCart {
  id: string;
  shipping_methods?: { id: string }[];
  payment_collection?: {
    id: string;
    payment_sessions?: { id: string; provider_id: string }[];
  };
}

export async function createCart(regionId: string): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(`/store/carts`, {
    method: "POST",
    body: JSON.stringify({ region_id: regionId }),
  });
  return data.cart;
}

export async function addLineItem(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<void> {
  await medusaFetch(`/store/carts/${cartId}/line-items`, {
    method: "POST",
    body: JSON.stringify({ variant_id: variantId, quantity }),
  });
}

export async function updateCart(
  cartId: string,
  data: Record<string, unknown>
): Promise<MedusaCart> {
  const res = await medusaFetch<{ cart: MedusaCart }>(`/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.cart;
}

export async function addShippingMethod(
  cartId: string,
  optionId: string
): Promise<void> {
  await medusaFetch(`/store/carts/${cartId}/shipping-methods`, {
    method: "POST",
    body: JSON.stringify({ option_id: optionId }),
  });
}

export async function getShippingOptions(cartId: string) {
  const data = await medusaFetch<{
    shipping_options: { id: string; name: string; amount: number }[];
  }>(`/store/shipping-options?cart_id=${cartId}`);
  return data.shipping_options;
}

export async function initPaymentSessions(cartId: string): Promise<MedusaCart> {
  const data = await medusaFetch<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/payment-sessions`,
    { method: "POST" }
  );
  return data.cart;
}

export async function setPaymentSession(
  paymentCollectionId: string,
  providerId: string
): Promise<void> {
  await medusaFetch(
    `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
    {
      method: "POST",
      body: JSON.stringify({ provider_id: providerId }),
    }
  );
}

export async function completeCart(
  cartId: string
): Promise<{ type: string; order?: { id: string } }> {
  const data = await medusaFetch<{
    type: string;
    order?: { id: string };
  }>(`/store/carts/${cartId}/complete`, { method: "POST" });
  return data;
}

// --- Get variant ID for a product ---

export async function getVariantId(
  productId: string,
  regionId: string
): Promise<string | null> {
  try {
    const data = await medusaFetch<{ product: MedusaProduct }>(
      `/store/products/${productId}?region_id=${regionId}&fields=variants.id`
    );
    return data.product.variants?.[0]?.id || null;
  } catch {
    return null;
  }
}
