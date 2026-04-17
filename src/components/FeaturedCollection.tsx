import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getFeaturedProducts, products, Product } from "@/data/products";
import ProductModal from "@/components/ProductModal";

const FeaturedCollection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();
  const featuredProducts = getFeaturedProducts();
  const featured = (featuredProducts.length > 0 ? featuredProducts : products).slice(0, 8);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/logo.svg";
  };

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
      description: `${product.brand} ${product.name} has been added to your cart.`,
    });
  };

  return (
    <>
      <section id="collections" className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              Signature Series
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              Featured Collection
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    {/* Overlay */}
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
                      <h3 className="font-display text-lg text-foreground mb-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
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
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default FeaturedCollection;
