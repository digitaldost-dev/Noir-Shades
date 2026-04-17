import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "The quality and design of Noir Shades products are unmatched. Every piece feels like a luxury investment.",
    name: "Priya Sharma",
    title: "Fashion Influencer",
    initial: "P",
  },
  {
    quote: "Exceptional customer service and premium craftsmanship. This is what luxury shopping should feel like.",
    name: "Arjun Malik",
    title: "Brand Strategist",
    initial: "A",
  },
  {
    quote: "The attention to detail in every product is remarkable. Noir Shades truly defines contemporary elegance.",
    name: "Neha Gupta",
    title: "Style Curator",
    initial: "N",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-noir-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Discover why fashion enthusiasts and luxury seekers choose Noir Shades
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-background/50 backdrop-blur-sm border border-primary/10 rounded-lg p-6 md:p-8 text-center"
            >
              <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote size={16} className="text-primary" />
              </div>
              <blockquote className="font-body text-muted-foreground italic mb-5 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={`${testimonial.name}-star-${i}`} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <div>
                <div className="font-display text-foreground font-semibold">
                  {testimonial.name}
                </div>
                <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                  {testimonial.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;