export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  thumbnail: string | null;
  images: string[];
  price: number; // in millimes (smallest unit), e.g. 15900 = 15,900 TND
  compareAtPrice?: number | null;
  categoryId: string;
  categoryName: string;
  tags: ProductTag[];
  inStock: boolean;
}

export type ProductTag = "offre" | "nouveau" | "bundle";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  thumbnail: string | null;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | "en_attente"
  | "confirmee"
  | "expediee"
  | "livree"
  | "annulee";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingCost: number;
  status: OrderStatus;
  customer: CheckoutForm;
  createdAt: string;
}

export interface CheckoutForm {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  handle: string;
  description?: string;
}
