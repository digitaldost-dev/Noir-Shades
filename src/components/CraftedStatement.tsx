import { motion } from "framer-motion";

const CraftedStatement = () => {
  return (
    <section className="py-20 bg-noir-gradient">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4"
        >
          Our Philosophy
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-8"
        >
          Crafted for Those Who <span className="text-gold-gradient italic font-normal">Dare to Stand Out</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-muted-foreground text-base md:text-xl leading-[1.7] max-w-5xl mx-auto"
        >
          Noir Shades was born from a singular vision - to create eyewear and lifestyle pieces that don't
          just follow trends, but define them. Every frame is a statement. Every piece is a conversation.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-muted-foreground text-base md:text-xl leading-[1.7] max-w-5xl mx-auto mt-8"
        >
          From our signature sunglasses to our curated collection of apparel, shoes, and fragrances, we
          believe luxury should be accessible without compromise. Each product is crafted with obsessive
          attention to detail, blending timeless design with contemporary edge.
        </motion.p>
      </div>
    </section>
  );
};

export default CraftedStatement;
