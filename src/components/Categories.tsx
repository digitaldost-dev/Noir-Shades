import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    emoji: "🕶️",
    name: "Eyewear",
    description: "Bold everyday shades and premium statement frames",
    path: "/products/eyewear",
  },
  {
    emoji: "⌚",
    name: "Watches",
    description: "Luxury wristwear with modern and classic silhouettes",
    path: "/products/watches",
  },
  {
    emoji: "👟",
    name: "Footwear",
    description: "Comfort-driven premium sneakers, loafers and slides",
    path: "/products/footwear",
  },
  {
    emoji: "🌸",
    name: "Perfume",
    description: "Signature long-lasting fragrances for every style",
    path: "/products/perfume",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section id="categories" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Category Showcase
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-8">
            Tap into each collection directly and jump into focused browsing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(category.path)}
            >
              <div className="h-full border border-border bg-card hover:border-primary/40 hover-gold-glow transition-all duration-500 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-4">{category.emoji}</div>
                  <h3 className="font-display text-2xl text-foreground mb-3">{category.name}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-primary group-hover:translate-x-1 transition-transform duration-300">
                  Shop Now
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/shop")}
            className="bg-gold-shimmer text-primary-foreground font-body text-sm tracking-widest uppercase px-8 py-3 hover-gold-glow transition-all duration-500"
          >
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;