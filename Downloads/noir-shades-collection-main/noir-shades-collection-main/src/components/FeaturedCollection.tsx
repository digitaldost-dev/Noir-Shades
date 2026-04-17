import { motion } from "framer-motion";
import productAviator from "@/assets/product-aviator.jpg";
import productRound from "@/assets/product-round.jpg";
import productCateye from "@/assets/product-cateye.jpg";
import productWayfarer from "@/assets/product-wayfarer.jpg";

const products = [
  {
    name: "The Monarch",
    type: "Aviator",
    price: "₹4,999",
    image: productAviator,
  },
  {
    name: "The Visionary",
    type: "Round Frame",
    price: "₹3,999",
    image: productRound,
  },
  {
    name: "The Enigma",
    type: "Cat-Eye",
    price: "₹5,499",
    image: productCateye,
  },
  {
    name: "The Classic",
    type: "Wayfarer",
    price: "₹3,499",
    image: productWayfarer,
  },
];

const FeaturedCollection = () => {
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
            Featured Eyewear
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-card border border-border hover-gold-glow transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-1">
                    {product.type}
                  </p>
                  <h3 className="font-display text-xl text-foreground mb-2">
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
