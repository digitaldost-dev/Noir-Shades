export type ProductCategory = "eyewear" | "watches" | "footwear" | "perfume";

export interface Product {
  id: string;
  name: string;
  brand: string;
  type: string;
  category: ProductCategory;
  price: string;
  priceNum: number;
  images: string[];
  video?: string; // optional — path like /videos/product-name.mp4
  description?: string; // optional — product description text
  featured?: boolean;
}

export const products: Product[] = [
  // ============================================================================
  // === EYEWEAR (10 PRODUCTS) ===
  // ============================================================================

  {
    id: "armani-day-night",
    name: "Day & Night",
    brand: "Armani",
    type: "Premium Sunglass",
    category: "eyewear",
    price: "₹1,599",
    priceNum: 1599,
    images: ["/products/armani-day-night.jpg"],
    description:
      "Armani Day & Night - Premium quality sunglass with OG box. Perfect for both day and night wear with authentic packaging and protection.",
    featured: true,
  },
  {
    id: "celine-unisex",
    name: "Unisex Model",
    brand: "Celine",
    type: "Premium Frame",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/celine-unisex.jpg"],
    description:
      "Celine Unisex Model - Premium quality frame with imported box. Versatile design suitable for all occasions with superior lens quality.",
    featured: false,
  },
  {
    id: "mont-blanc-unisex",
    name: "Unisex Model",
    brand: "Mont Blanc",
    type: "Premium Frame",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/mont-blanc-unisex.jpg"],
    description:
      "Mont Blanc Unisex Model - Premium quality frame with imported packaging. Elegant design combining luxury and functionality.",
    featured: false,
  },
  {
    id: "louis-vuitton-sunglass",
    name: "Sunglass Fiber Lens",
    brand: "Louis Vuitton",
    type: "Ladies Model",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/louis-vuitton-sunglass.jpg"],
    description:
      "Louis Vuitton Sunglass - Fiber lens ladies model with premium quality. Includes OG box and comes with authentic luxury branding.",
    featured: true,
  },
  {
    id: "carrera-round",
    name: "Round Model",
    brand: "Carrera",
    type: "Round Sunglass",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/carrera-round.jpg"],
    description:
      "Carrera Round Model - Unisex sunglass with fiber lens. Premium quality frame featuring iconic Carrera design with OG box included.",
    featured: false,
  },
  {
    id: "lacoste-square",
    name: "Square Model",
    brand: "Lacoste",
    type: "Square Sunglass",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/lacoste-square.jpg"],
    description:
      "Lacoste Square Model - Unisex sunglass with fiber lens. Premium quality offering with original box packaging and authentic certification.",
    featured: false,
  },
  {
    id: "oakley-polarized",
    name: "7A Quality Polarized",
    brand: "Oakley",
    type: "Sport Sunglass",
    category: "eyewear",
    price: "₹1,200",
    priceNum: 1200,
    images: ["/products/oakley-polarized.jpg"],
    description:
      "Oakley 7A Quality - Polarized lens with UV protection. High-performance sunglass designed for sports and outdoor activities with premium comfort.",
    featured: true,
  },
  {
    id: "david-beckham-premium",
    name: "Premium Edition",
    brand: "David Beckham",
    type: "Designer Sunglass",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/david-beckham-premium.jpg"],
    description:
      "David Beckham Premium Edition - Top notch premium article. Available in multiple colors with original box included.",
    featured: true,
  },
  {
    id: "bmw-polarised",
    name: "Premium Polarised",
    brand: "BMW",
    type: "Luxury Sunglass",
    category: "eyewear",
    price: "₹1,800",
    priceNum: 1800,
    images: ["/products/bmw-polarised.jpg"],
    description:
      "BMW Premium Polarised - Unisex model with polarized lens and original box. Premium quality automotive-inspired design with full UV protection.",
    featured: true,
  },
  {
    id: "rayban-pure-glass",
    name: "Pure Glass",
    brand: "Rayban",
    type: "Classic Frame",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/rayban-pure-glass.jpg"],
    description:
      "Rayban Pure Glass - Unisex model with fiber frame. Classic design with pure glass lenses and original box packaging included.",
    featured: false,
  },

  // ============================================================================
  // === WATCHES (10 PRODUCTS) ===
  // ============================================================================

  {
    id: "cartier-rimless",
    name: "Rimless Metal",
    brand: "Cartier",
    type: "Rimless Sunglass",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/cartier-rimless.jpg"],
    description:
      "Cartier Rimless Metal - Top notch quality eyewear in a premium metal finish with original box and authenticity packaging.",
    featured: true,
  },
  {
    id: "prada-fiber-metal",
    name: "Fiber Metal",
    brand: "Prada",
    type: "Premium Sunglass",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/prada-fiber-metal.jpg"],
    description:
      "Prada Fiber Metal - Top notch quality eyewear with fiber-metal construction and original box included.",
    featured: false,
  },
  {
    id: "dior-fiber",
    name: "Fiber Premium",
    brand: "Dior",
    type: "Designer Sunglass",
    category: "eyewear",
    price: "₹550",
    priceNum: 550,
    images: ["/products/dior-fiber.jpg"],
    description:
      "Dior Fiber - Top notch quality designer eyewear in premium fiber build with original packaging.",
    featured: false,
  },
  {
    id: "tom-ford-unisex",
    name: "Unisex Premium",
    brand: "Tom Ford",
    type: "Unisex Sunglass",
    category: "eyewear",
    price: "₹999",
    priceNum: 999,
    images: ["/products/tom-ford-unisex.jpg"],
    description:
      "Tom Ford Unisex - Top notch quality eyewear with premium fiber material and original box.",
    featured: false,
  },
  {
    id: "rado-ceramic",
    name: "Ceramic Square",
    brand: "Rado",
    type: "Men's Watch",
    category: "watches",
    price: "$1,150",
    priceNum: 1150,
    images: ["/products/rado-ceramic.jpg"],
    description:
      "Rado Men's Watch - Full ceramic with square case. Date working automatic movement with original model and premium quality materials.",
    featured: true,
  },
  {
    id: "cartier-chrono",
    name: "Chronograph Leather",
    brand: "Cartier",
    type: "Men's Watch",
    category: "watches",
    price: "$1,500",
    priceNum: 1500,
    images: [
      "/products/cartier-chrono-1.jpg",
      "/products/cartier-chrono-2.jpg",
      "/products/cartier-chrono-3.jpg",
    ],
    description:
      "Cartier Men's Chronograph - All chronograph functions working with leather strap belt. Best quality construction for timekeeping precision.",
    featured: true,
  },
  {
    id: "rm-wellcoro",
    name: "Wellcoro Belt",
    brand: "RM",
    type: "Men's Watch",
    category: "watches",
    price: "$2,100",
    priceNum: 2100,
    images: [
      "/products/rm-wellcoro-1.jpg",
      "/products/rm-wellcoro-2.jpg",
      "/products/rm-wellcoro-3.jpg",
    ],
    description:
      "RM Men's Watch - Wellcoro belt with first quality materials. Premium construction offering superior durability and prestige.",
    featured: true,
  },
  {
    id: "ladies-combo-2pc",
    name: "2PC Combo Set",
    brand: "Generic Premium",
    type: "Combo Watch Set",
    category: "watches",
    price: "₹850+",
    priceNum: 850,
    images: [
      "/products/ladies-combo-2pc-1.jpg",
      "/products/ladies-combo-2pc-2.jpg",
      "/products/ladies-combo-2pc-3.jpg",
    ],
    description:
      "Ladies Watches - 2 piece combo set with good quality construction. Perfect pair for multiple occasions and styles.",
    featured: false,
  },
  {
    id: "ladies-combo-3pc",
    name: "3PC Combo Set",
    brand: "Generic Premium",
    type: "Combo Watch Set",
    category: "watches",
    price: "₹999+",
    priceNum: 999,
    images: [
      "/products/ladies-combo-3pc-1.jpg",
      "/products/ladies-combo-3pc-2.jpg",
      "/products/ladies-combo-3pc-3.jpg",
    ],
    description:
      "Ladies Watches - 3 piece combo set with good quality materials. Versatile collection for every occasion with free shipping.",
    featured: false,
  },
  {
    id: "jacob-co-mens",
    name: "Jacob & Co Luxury",
    brand: "Jacob & Co",
    type: "Luxury Men's Watch",
    category: "watches",
    price: "₹19,500+",
    priceNum: 19500,
    images: ["/products/jacob-co-mens.jpg"],
    description:
      "Jacob & Co Men's Watch - Premium luxury timepiece with automatic movement. Leather strap, stainless steel case, and best price offer.",
    featured: true,
  },

  // ============================================================================
  // === PERFUMES (4 PRODUCTS) ===
  // ============================================================================

  {
    id: "louis-vuitton-perfume",
    name: "Double Box Perfume",
    brand: "Louis Vuitton",
    type: "Eau de Parfum",
    category: "perfume",
    price: "$5,000+",
    priceNum: 5000,
    images: ["/products/louis-vuitton-perfume.jpg"],
    description:
      "Louis Vuitton Perfumes - Double box with magnetic cap. Premium 100ML fragrance with full authenticity and luxury packaging.",
    featured: true,
  },
  {
    id: "tiziana-terenzi-luxury",
    name: "Exclusive Luxury",
    brand: "Tiziana Terenzi",
    type: "Premium Fragrance",
    category: "perfume",
    price: "$3,500+",
    priceNum: 3500,
    images: ["/products/tiziana-terenzi-luxury.jpg"],
    description:
      "Tiziana Terenzi - Exclusive luxury premium perfume. High-end fragrance with sophisticated composition and elegant presentation.",
    featured: true,
  },
  {
    id: "turkey-exclusive-perfume",
    name: "Sealed Premium",
    brand: "Turkey Exclusive",
    type: "Premium Fragrance",
    category: "perfume",
    price: "$2,600+",
    priceNum: 2600,
    images: ["/products/turkey-exclusive-perfume.jpg"],
    description:
      "Turkey Exclusive Premium Perfume - Sealed pack with barcode batch code. Authentic luxury fragrance with guaranteed authenticity.",
    featured: false,
  },
  {
    id: "turkey-luxury-perfume",
    name: "Long Lasting Fragrance",
    brand: "Turkey Luxury",
    type: "Premium Perfume",
    category: "perfume",
    price: "$1,800+",
    priceNum: 1800,
    images: ["/products/turkey-luxury-perfume.jpg"],
    description:
      "Turkey Luxury Premium Perfume - Multiple models available with sealed pack. Long lasting fragrance (up to 10 hours) with same batch code.",
    featured: false,
  },

  // ============================================================================
  // === FOOTWEAR (9 PRODUCTS) ===
  // ============================================================================

  {
    id: "puma-speed-cat",
    name: "Speed Cat 7A",
    brand: "Puma",
    type: "Suede Sneaker",
    category: "footwear",
    price: "$2,999+",
    priceNum: 2999,
    images: ["/products/puma-speed-cat.jpg"],
    description:
      "Puma Speed Cat - 7A quality suede leather. Sizes 41-45 available with premium construction and authentic styling.",
    featured: true,
  },
  {
    id: "nike-jordan-travis",
    name: "Air Jordan 1 Travis",
    brand: "Nike",
    type: "High Top Sneaker",
    category: "footwear",
    price: "$3,200+",
    priceNum: 3200,
    images: ["/products/nike-jordan-travis.jpg"],
    description:
      "Nike Air Jordan 1 Travis Scott - 7A quality premium sneaker. Sizes 41-45 available with authentic colorway and construction.",
    featured: true,
  },
  {
    id: "nike-force-kobe",
    name: "Air Force Kobe",
    brand: "Nike",
    type: "Basketball Shoe",
    category: "footwear",
    price: "$3,500+",
    priceNum: 3500,
    images: ["/products/nike-force-kobe.jpg"],
    description:
      "Nike Air Force Kobe - 7A quality with thick sole and premium leather. Sizes 39-45 available with superior comfort and durability.",
    featured: true,
  },
  {
    id: "nike-force-tiffany",
    name: "Air Force Tiffany",
    brand: "Nike",
    type: "Lifestyle Shoe",
    category: "footwear",
    price: "$3,500+",
    priceNum: 3500,
    images: ["/products/nike-force-tiffany.jpg"],
    description:
      "Nike Air Force Tiffany - 7A quality elegant design. Sizes 41-45 available with luxury color palette and premium materials.",
    featured: false,
  },
  {
    id: "nike-jordan-low",
    name: "Air Jordan Low",
    brand: "Nike",
    type: "Low Top Sneaker",
    category: "footwear",
    price: "$3,500+",
    priceNum: 3500,
    images: ["/products/nike-jordan-low.jpg"],
    description:
      "Nike Air Jordan Low - 7A quality sleek design. Sizes 41-45 available with iconic Jordan branding and premium construction.",
    featured: false,
  },
  {
    id: "birkenstock-boys-1",
    name: "Loafers Black Standard",
    brand: "Birkenstock",
    type: "Boys Loafers",
    category: "footwear",
    price: "₹1,399+",
    priceNum: 1399,
    images: ["/products/birkenstock-boys-1.jpg"],
    description:
      "Birkenstock Boys Loafers - Black color with brand box and all tags. Sizes 41-45 available with free brand box included.",
    featured: false,
  },
  {
    id: "birkenstock-boys-2",
    name: "Loafers Black Premium",
    brand: "Birkenstock",
    type: "Boys Loafers",
    category: "footwear",
    price: "₹1,499+",
    priceNum: 1499,
    images: ["/products/birkenstock-boys-2.jpg"],
    description:
      "Birkenstock Boys Loafers Premium - Black color with authentic tags and brand box. Sizes 41-45 available with free brand box.",
    featured: false,
  },
  {
    id: "gucci-loafers",
    name: "Loafers Black Brown",
    brand: "Gucci",
    type: "Designer Loafers",
    category: "footwear",
    price: "₹1,199+",
    priceNum: 1199,
    images: ["/products/gucci-loafers.jpg"],
    description:
      "Gucci Loafers - Premium design available in black and brown. Sizes 6-10 available with authentic Gucci craftsmanship and luxury finish.",
    featured: true,
  },
  {
    id: "nike-7a-quality",
    name: "7A Quality Shoes",
    brand: "Nike",
    type: "General Sneaker",
    category: "footwear",
    price: "₹1,550+",
    priceNum: 1550,
    images: ["/products/nike-7a-quality.jpg"],
    description:
      "Nike 7A Quality - Versatile sneaker design. Sizes 6-10 available with premium construction and free shipping included.",
    featured: false,
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProductsByCategory = (cat: ProductCategory) =>
  products.filter((p) => p.category === cat);
