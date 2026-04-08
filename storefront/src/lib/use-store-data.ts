"use client";

import { useState, useEffect } from "react";
import type { Product, Category } from "@/types";
import { getProducts, getCategories, getCollections, getRegionId } from "./medusa";
import {
  products as placeholderProducts,
  categories as placeholderCategories,
} from "./placeholder-data";

interface StoreData {
  products: Product[];
  categories: Category[];
  loading: boolean;
  regionId: string | null;
}

let cache: { products: Product[]; categories: Category[]; regionId: string } | null = null;

export function useStoreData(): StoreData {
  const [data, setData] = useState<StoreData>({
    products: cache?.products ?? placeholderProducts,
    categories: cache?.categories ?? placeholderCategories,
    loading: !cache,
    regionId: cache?.regionId ?? null,
  });

  useEffect(() => {
    if (cache) return;

    let cancelled = false;

    async function load() {
      try {
        const regionId = await getRegionId();
        const [products, categories] = await Promise.all([
          getProducts(regionId),
          getCategories().catch(() => getCollections()),
        ]);

        if (!cancelled) {
          cache = { products, categories, regionId };
          setData({ products, categories, loading: false, regionId });
        }
      } catch (err) {
        console.warn("Failed to fetch from Medusa, using placeholder data:", err);
        if (!cancelled) {
          setData({
            products: placeholderProducts,
            categories: placeholderCategories,
            loading: false,
            regionId: null,
          });
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return data;
}
