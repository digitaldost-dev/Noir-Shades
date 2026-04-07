import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getFeaturedProducts, Product } from "@/data/products";

const featured = getFeaturedProducts();

const FeaturedCollection = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

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
      description: `${product.brand} ${product.name} has been added to your cart.`,
    });
  };

  return (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
