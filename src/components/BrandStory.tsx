import { motion } from "framer-motion";

const BrandStory = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Our Philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Crafted for Those Who{" "}
            <span className="text-gold-gradient italic">Dare to Stand Out</span>
          </h2>
          <div className="space-y-5 text-muted-foreground font-body leading-relaxed max-w-3xl mx-auto">
            <p>
              Noir Shades was born from a singular vision — to create eyewear and lifestyle 
              pieces that don't just follow trends, but define them. Every frame is a statement. 
              Every piece is a conversation.
            </p>
            <p>
              From our signature sunglasses to our curated collection of apparel, shoes, and 
              fragrances, we believe luxury should be accessible without compromise. Each product 
              is crafted with obsessive attention to detail, blending timeless design with 
              contemporary edge.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;
