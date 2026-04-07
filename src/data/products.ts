export type ProductCategory = "eyewear" | "watches" | "footwear";

export interface Product {
  id: string;
  name: string;
  brand: string;
  type: string;
  category: ProductCategory;
  price: string;
  priceNum: number;
  images: string[];
  featured?: boolean;
}

export const products: Product[] = [
  // === EYEWEAR ===
  {
    id: "rayban-green",
    name: "Wayfarer Green",
    brand: "Ray-Ban",
    type: "Wayfarer",
    category: "eyewear",
    price: "₹4,999",
    priceNum: 4999,
    images: ["/products/rayban-green-1.jpg", "/products/rayban-green-2.jpg"],
    featured: true,
  },
  {
    id: "rayban-blue",
    name: "Wayfarer Blue",
    brand: "Ray-Ban",
    type: "Wayfarer",
    category: "eyewear",
    price: "₹4,999",
    priceNum: 4999,
    images: ["/products/rayban-blue.jpg"],
  },
  {
    id: "rayban-polarized",
    name: "Polarized Grey",
    brand: "Ray-Ban",
    type: "Wayfarer Polarized",
    category: "eyewear",
    price: "₹5,940",
    priceNum: 5940,
    images: ["/products/rayban-polarized.jpg"],
    featured: true,
  },
  {
    id: "armani-camo",
    name: "Round Camo Edition",
    brand: "Emporio Armani",
    type: "Round Frame",
    category: "eyewear",
    price: "₹6,499",
    priceNum: 6499,
    images: [
      "/products/armani-camo-1.jpg",
      "/products/armani-camo-2.jpg",
      "/products/armani-camo-3.jpg",
      "/products/armani-camo-4.jpg",
    ],
    featured: true,
  },
  {
    id: "oakley-sport",
    name: "Sport Polarised",
    brand: "Oakley",
    type: "Sport Shield",
    category: "eyewear",
    price: "₹7,499",
    priceNum: 7499,
    images: [
      "/products/oakley-sport-1.jpg",
      "/products/oakley-sport-2.jpg",
      "/products/oakley-sport-3.jpg",
    ],
    featured: true,
  },
  {
    id: "marc-jacobs-black",
    name: "Square Black Matte",
    brand: "Marc Jacobs",
    type: "Square Frame",
    category: "eyewear",
    price: "₹5,999",
    priceNum: 5999,
    images: [
      "/products/marc-jacobs-black-1.jpg",
      "/products/marc-jacobs-black-2.jpg",
      "/products/marc-jacobs-black-3.jpg",
    ],
  },
  {
    id: "marc-jacobs-grey",
    name: "Square Grey Matte",
    brand: "Marc Jacobs",
    type: "Square Frame",
    category: "eyewear",
    price: "₹5,999",
    priceNum: 5999,
    images: [
      "/products/marc-jacobs-grey-1.jpg",
      "/products/marc-jacobs-grey-2.jpg",
      "/products/marc-jacobs-grey-3.jpg",
    ],
  },
  {
    id: "marc-jacobs-brown",
    name: "Square Brown Tint",
    brand: "Marc Jacobs",
    type: "Square Frame",
    category: "eyewear",
    price: "₹5,999",
    priceNum: 5999,
    images: ["/products/marc-jacobs-brown.jpg"],
  },
  {
    id: "dior-model29",
    name: "Model No. 29",
    brand: "Christian Dior",
    type: "Rectangle Frame",
    category: "eyewear",
    price: "₹8,499",
    priceNum: 8499,
    images: ["/products/dior-model29.jpg"],
  },

  // === WATCHES ===
  {
    id: "rado-black",
    name: "Captain Cook Black",
    brand: "Rado",
    type: "Skeleton Automatic",
    category: "watches",
    price: "₹12,999",
    priceNum: 12999,
    images: ["/products/rado-black-wrist.jpg", "/products/rado-black-flat.jpg"],
    featured: true,
  },
  {
    id: "rado-blue",
    name: "Captain Cook Blue",
    brand: "Rado",
    type: "Skeleton Automatic",
    category: "watches",
    price: "₹12,999",
    priceNum: 12999,
    images: ["/products/rado-blue.jpg"],
  },
  {
    id: "rado-green",
    name: "Captain Cook Green",
    brand: "Rado",
    type: "Skeleton Automatic",
    category: "watches",
    price: "₹13,999",
    priceNum: 13999,
    images: ["/products/rado-green.jpg"],
  },
  {
    id: "richard-mille",
    name: "Green Carbon",
    brand: "Richard Mille",
    type: "Skeleton Tourbillon",
    category: "watches",
    price: "₹18,999",
    priceNum: 18999,
    images: ["/products/richard-mille.jpg"],
    featured: true,
  },
  {
    id: "fossil-rose",
    name: "Rose Gold Collection",
    brand: "Fossil",
    type: "Women's Watch",
    category: "watches",
    price: "₹4,499",
    priceNum: 4499,
    images: ["/products/fossil-watch.jpg"],
  },
  {
    id: "rolex-fossil",
    name: "Crystal Rose Gold",
    brand: "Rolex / Fossil",
    type: "Women's Watch",
    category: "watches",
    price: "₹5,999",
    priceNum: 5999,
    images: ["/products/rolex-fossil-watch.jpg"],
  },

  // === FOOTWEAR ===
  {
    id: "birkenstock-black",
    name: "Gizeh EVA Black",
    brand: "Birkenstock",
    type: "Sandals",
    category: "footwear",
    price: "₹3,499",
    priceNum: 3499,
    images: ["/products/birkenstock-1.jpg", "/products/birkenstock-2.jpg"],
    featured: true,
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProductsByCategory = (cat: ProductCategory) =>
  products.filter((p) => p.category === cat);
