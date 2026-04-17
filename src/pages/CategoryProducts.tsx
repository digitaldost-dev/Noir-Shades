import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";
import { ProductCategory } from "@/data/products";

const categoryMeta: Record<ProductCategory, { title: string; subtitle: string }> = {
  eyewear: {
    title: "Eyewear Collection",
    subtitle: "Premium frames and signature sunglasses",
  },
  watches: {
    title: "Watches Collection",
    subtitle: "Statement watches for daily and occasion styling",
  },
  footwear: {
    title: "Footwear Collection",
    subtitle: "Comfort-forward styles with luxury finishes",
  },
  perfume: {
    title: "Perfume Collection",
    subtitle: "Long-lasting fragrances for every mood",
  },
};

const isCategory = (value: string): value is ProductCategory => {
  return value === "eyewear" || value === "watches" || value === "footwear" || value === "perfume";
};

const CategoryProducts = () => {
  const { category } = useParams<{ category: string }>();

  const validCategory = useMemo(() => {
    if (!category || !isCategory(category)) return null;
    return category;
  }, [category]);

  if (!validCategory) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <AllProducts
          initialCategory={validCategory}
          lockCategory
          pageTitle={categoryMeta[validCategory].title}
          pageSubtitle={categoryMeta[validCategory].subtitle}
          sectionId="category-products"
        />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProducts;
