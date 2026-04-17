import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { products, Product, ProductCategory } from "@/data/products";
import ProductModal from "@/components/ProductModal";

const ITEMS_PER_PAGE = 12;

const tabs: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Eyewear", value: "eyewear" },
  { label: "Watches", value: "watches" },
  { label: "Footwear", value: "footwear" },
  { label: "Perfumes", value: "perfume" },
];

type SortValue = "featured" | "price-low" | "price-high" | "name-asc" | "name-desc";

interface AllProductsProps {
  initialCategory?: ProductCategory | "all";
  lockCategory?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
  sectionId?: string;
}

const AllProducts = ({
  initialCategory = "all",
  lockCategory = false,
  pageTitle = "All Products",
  pageSubtitle = "Full Catalogue",
  sectionId = "all-products",
}: AllProductsProps) => {
  const [activeTab, setActiveTab] = useState<ProductCategory | "all">(initialCategory);
  const [sortBy, setSortBy] = useState<SortValue>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/logo.svg";
  };

  const filtered =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.priceNum - b.priceNum;
      case "price-high":
        return b.priceNum - a.priceNum;
      case "name-asc":
        return `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`);
      case "name-desc":
        return `${b.brand} ${b.name}`.localeCompare(`${a.brand} ${a.name}`);
      case "featured":
      default:
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    }
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const currentItems = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageList = (page: number, pages: number) => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "...", pages] as const;
    if (page >= pages - 3) return [1, "...", pages - 4, pages - 3, pages - 2, pages - 1, pages] as const;
    return [1, "...", page - 1, page, page + 1, "...", pages] as const;
  };

  const pages = getPageList(currentPage, totalPages);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: `${product.brand} ${product.name}`,
      type: product.type,
      price: product.price,
      priceNum: product.priceNum,
      image: product.images[0],
    });
    toast({
      title: "Added to Cart",
      description: `${product.brand} ${product.name} has been added.`,
    });
  };

  const handleTabChange = (tab: ProductCategory | "all") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortValue) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <>
      <section id={sectionId} className="section-padding bg-noir-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {pageSubtitle}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              {pageTitle}
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
              {(lockCategory
                ? tabs.filter((t) => t.value === activeTab)
                : tabs
              ).map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  disabled={lockCategory}
                  className={`font-body text-xs tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                    activeTab === tab.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  } ${lockCategory ? "cursor-default" : "cursor-pointer"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 justify-between lg:justify-end">
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                {sorted.length} Items
              </p>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortValue)}
                className="bg-background border border-border px-3 py-2 font-body text-xs tracking-wide text-foreground outline-none focus:border-primary"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${sortBy}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {currentItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group h-full cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative overflow-hidden bg-card border border-border hover-gold-glow transition-all duration-500 flex flex-col h-full">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={product.images[0]}
                        alt={`${product.brand} ${product.name}`}
                        loading="lazy"
                        onError={handleImgError}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay with two actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                          className="flex items-center gap-2 bg-white/10 border border-white/30 backdrop-blur-sm text-white font-body text-[10px] tracking-widest uppercase px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-white/20"
                        >
                          <Eye size={12} />
                          Quick View
                        </button>
                        <button
                          onClick={(e) => handleAdd(product, e)}
                          className="flex items-center gap-2 bg-primary/90 text-primary-foreground font-body text-[10px] tracking-widest uppercase px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 delay-75 hover:bg-primary"
                        >
                          <ShoppingBag size={12} />
                          Add to Cart
                        </button>
                      </div>

                      {/* Video badge */}
                      {product.video && (
                        <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground font-body text-[9px] tracking-widest uppercase px-2 py-1">
                          Video
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-1">
                          {product.brand} · {product.type}
                        </p>
                        <h3 className="font-display text-lg text-foreground mb-1">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="font-body text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        )}
                      </div>
                      <p className="font-body text-sm text-muted-foreground">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-border font-body text-xs tracking-wider uppercase text-muted-foreground disabled:opacity-40"
              >
                Prev
              </button>
              {pages.map((item, idx) =>
                item === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    className={`min-w-9 h-9 px-2 border font-body text-xs ${
                      currentPage === item
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-border font-body text-xs tracking-wider uppercase text-muted-foreground disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default AllProducts;
