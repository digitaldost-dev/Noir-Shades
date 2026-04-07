import { motion } from "framer-motion";

const categories = [
  {
    name: "Eyewear",
    tagline: "Our signature collection",
    image: "/products/marc-jacobs-black-3.jpg",
    span: "lg:col-span-2 lg:row-span-2",
    aspect: "aspect-square lg:aspect-auto lg:h-full",
  },
  {
    name: "Watches",
    tagline: "Precision & luxury",
    image: "/products/rado-black-flat.jpg",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    name: "Footwear",
    tagline: "Walk with confidence",
    image: "/products/birkenstock-1.jpg",
    span: "",
    aspect: "aspect-[4/3]",
  },
];

const Categories = () => {
  return (
    <section id="categories" className="section-padding bg-noir-gradient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Browse Collections
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <motion.a
              key={cat.name}
              href="#all-products"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden cursor-pointer ${cat.span}`}
            >
              <div className={`relative ${cat.aspect} overflow-hidden`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">
                    {cat.tagline}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl text-foreground">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
