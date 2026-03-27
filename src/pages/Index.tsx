import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
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
      <BrandStory />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;
