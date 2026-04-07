import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import AllProducts from "@/components/AllProducts";

import Categories from "@/components/Categories";
import BrandStory from "@/components/BrandStory";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedCollection />
      <Categories />
      <AllProducts />
      
      <BrandStory />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;
