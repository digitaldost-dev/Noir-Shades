import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { products, Product, ProductCategory } from "@/data/products";

const tabs: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Eyewear", value: "eyewear" },
  { label: "Watches", value: "watches" },
  { label: "Footwear", value: "footwear" },
];

const AllProducts = () => {
  const [activeTab, setActiveTab] = useState<ProductCategory | "all">("all");
  const { addItem } = useCart();
  const { toast } = useToast();

  const filtered =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  const handleAdd = (product: Product) => {
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

  return (
    <section id="all-products" className="py-12 md:py-16 px-6 md:px-12 lg:px-20 bg-noir-gradient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Full Catalogue
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            All Products
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`font-body text-xs tracking-[0.25em] uppercase px-6 py-2.5 border transition-all duration-300 ${
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-card border border-border hover-gold-glow transition-all duration-500">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={`${product.brand} ${product.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <button
                      onClick={() => handleAdd(product)}
                      className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground font-body text-xs tracking-widest uppercase py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                  </div>
                  <div className="p-5">
                    <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-1">
                      {product.brand} · {product.type}
                    </p>
                    <h3 className="font-display text-lg text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {product.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AllProducts;
