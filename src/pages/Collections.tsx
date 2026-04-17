import Navbar from "@/components/Navbar";
import FeaturedCollection from "@/components/FeaturedCollection";
import Footer from "@/components/Footer";

const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <FeaturedCollection />
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
