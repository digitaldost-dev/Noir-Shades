import { motion } from "framer-motion";

const Stats = () => {
  const stats = [
    { number: "500+", label: "DESIGNS CRAFTED" },
    { number: "10K+", label: "HAPPY CUSTOMERS" },
    { number: "25+", label: "CITIES REACHED" },
    { number: "100%", label: "HANDCRAFTED" },
  ];

  return (
    <section className="py-16 bg-noir-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-gold-gradient mb-2">
                {stat.number}
              </div>
              <div className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;