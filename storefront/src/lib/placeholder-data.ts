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
    id: "prod_essuie_tout",
    title: "Essuie-tout ménager compact blanc 90 formats Ecolabel",
    description:
      "Essuie-tout ménager compact blanc, 90 formats (22,4 x 23 cm). Certifié Ecolabel, idéal pour un usage quotidien en cuisine professionnelle ou domestique. Très absorbant et résistant.",
    handle: "essuie-tout-menager-compact-blanc-90",
    thumbnail:
      "https://res.cloudinary.com/dvutyulln/image/upload/s--Che2xt-M--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/473020",
    images: [
      "https://res.cloudinary.com/dvutyulln/image/upload/s--Che2xt-M--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/473020",
    ],
    price: 8500,
    compareAtPrice: null,
    categoryId: "cat_essuyage",
    categoryName: "Essuyage",
    tags: [],
    inStock: true,
  },
  {
    id: "prod_degraissant",
    title: "Dégraissant surpuissant Paredes Access 750ml",
    description:
      "Dégraissant surpuissant Paredes Access en flacon pulvérisateur de 750ml. Formule professionnelle pour éliminer les graisses tenaces sur toutes les surfaces lavables. Prêt à l'emploi.",
    handle: "degraissant-surpuissant-paredes-access-750ml",
    thumbnail:
      "https://res.cloudinary.com/dvutyulln/image/upload/s--5rat8MSl--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/259020",
    images: [
      "https://res.cloudinary.com/dvutyulln/image/upload/s--5rat8MSl--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/259020",
    ],
    price: 18900,
    compareAtPrice: null,
    categoryId: "cat_entretien",
    categoryName: "Entretien",
    tags: [],
    inStock: true,
  },
  {
    id: "prod_nettoyant_vitres",
    title: "Nettoyant vitres Ecolabel Paredes Glass Clean 750ml",
    description:
      "Nettoyant vitres Ecolabel Paredes Glass Clean en pulvérisateur de 750ml. Formule écologique certifiée Ecolabel européen. Ne laisse aucune trace, séchage rapide. Idéal pour vitres, miroirs et surfaces lisses.",
    handle: "nettoyant-vitres-ecolabel-glass-clean-750ml",
    thumbnail:
      "https://res.cloudinary.com/dvutyulln/image/upload/s--p-hq587z--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/051058",
    images: [
      "https://res.cloudinary.com/dvutyulln/image/upload/s--p-hq587z--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/051058",
    ],
    price: 14500,
    compareAtPrice: null,
    categoryId: "cat_entretien",
    categoryName: "Entretien",
    tags: [],
    inStock: true,
  },
  {
    id: "prod_papier_toilette",
    title: "Papier toilette petit rouleau 200 feuilles Ecolabel",
    description:
      "Papier toilette petit rouleau blanc, 200 feuilles (9,1 x 10 cm). Certifié Ecolabel, doux et résistant. Adapté aux distributeurs professionnels standard.",
    handle: "papier-toilette-petit-rouleau-200-feuilles",
    thumbnail:
      "https://res.cloudinary.com/dvutyulln/image/upload/s--bo6cozgI--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/126085",
    images: [
      "https://res.cloudinary.com/dvutyulln/image/upload/s--bo6cozgI--/c_pad,dpr_auto,f_auto,h_500,q_auto:eco,w_500/v1/produits/126085",
    ],
    price: 3900,
    compareAtPrice: null,
    categoryId: "cat_hygiene",
    categoryName: "Hygiène",
    tags: [],
    inStock: true,
  },
];
