import type { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat_essuyage",
    name: "Essuyage",
    handle: "essuyage",
    description: "Bobines, rouleaux et essuie-mains professionnels",
  },
  {
    id: "cat_hygiene",
    name: "Hygiène",
    handle: "hygiene",
    description: "Savons, gels hydroalcooliques et distributeurs",
  },
  {
    id: "cat_entretien",
    name: "Entretien",
    handle: "entretien",
    description: "Produits de nettoyage et d'entretien professionnel",
  },
];

export const products: Product[] = [
  {
    id: "prod_001",
    title: "Bobine d'essuyage industrielle 1000 feuilles",
    description:
      "Bobine d'essuyage industrielle 2 plis, très absorbante. Idéale pour les ateliers, cuisines professionnelles et environnements industriels. 1000 feuilles par rouleau.",
    handle: "bobine-essuyage-industrielle-1000",
    thumbnail: null,
    images: [],
    price: 15900,
    compareAtPrice: null,
    categoryId: "cat_essuyage",
    categoryName: "Essuyage",
    tags: [],
    inStock: true,
  },
  {
    id: "prod_002",
    title: "Savon mousse antiseptique 1L",
    description:
      "Savon mousse antiseptique pour distributeur, formulé pour un usage fréquent en milieu professionnel. Respecte la peau tout en éliminant 99,9% des bactéries.",
    handle: "savon-mousse-antiseptique-1l",
    thumbnail: null,
    images: [],
    price: 12500,
    compareAtPrice: null,
    categoryId: "cat_hygiene",
    categoryName: "Hygiène",
    tags: ["nouveau"],
    inStock: true,
  },
  {
    id: "prod_003",
    title: "Nettoyant multi-surfaces professionnel 5L",
    description:
      "Nettoyant multi-surfaces concentré pour un usage quotidien. Efficace sur toutes les surfaces lavables. Parfum frais longue durée.",
    handle: "nettoyant-multi-surfaces-5l",
    thumbnail: null,
    images: [],
    price: 28900,
    compareAtPrice: 34900,
    categoryId: "cat_entretien",
    categoryName: "Entretien",
    tags: ["offre"],
    inStock: true,
  },
  {
    id: "prod_004",
    title: "Essuie-mains pliés en V — carton de 20 paquets",
    description:
      "Essuie-mains enchevêtrés pliage en V, 2 plis. Compatibles avec la plupart des distributeurs professionnels. Carton de 20 paquets de 150 feuilles.",
    handle: "essuie-mains-plies-v-carton-20",
    thumbnail: null,
    images: [],
    price: 45000,
    compareAtPrice: null,
    categoryId: "cat_essuyage",
    categoryName: "Essuyage",
    tags: [],
    inStock: true,
  },
  {
    id: "prod_005",
    title: "Pack Hygiène Complète — Savon + Gel + Essuie-mains",
    description:
      "Bundle complet pour équiper vos sanitaires : 1 carton de savon mousse (6 recharges), 1 carton de gel hydroalcoolique (6 flacons), 1 carton d'essuie-mains pliés. Économisez 15% par rapport à l'achat séparé.",
    handle: "pack-hygiene-complete",
    thumbnail: null,
    images: [],
    price: 89900,
    compareAtPrice: 105000,
    categoryId: "cat_hygiene",
    categoryName: "Hygiène",
    tags: ["bundle", "offre"],
    inStock: true,
  },
];
