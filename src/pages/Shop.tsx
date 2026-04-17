import Navbar from "@/components/Navbar";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <AllProducts
          initialCategory="all"
          pageTitle="Shop All Products"
          pageSubtitle="Browse Collection"
          sectionId="shop-products"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
