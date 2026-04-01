import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="mx-auto mb-6 text-muted-foreground" size={64} strokeWidth={1} />
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Your Cart is Empty</h1>
            <p className="font-body text-muted-foreground mb-10">
              Discover our curated collection and add something extraordinary.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gold-shimmer text-primary-foreground font-body text-sm tracking-widest uppercase px-10 py-4 hover-gold-glow transition-all duration-500"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
            Shopping Cart
          </h1>
          <p className="font-body text-muted-foreground mb-12">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-6 bg-card border border-border p-4 md:p-6"
              >
                <div className="w-24 h-28 md:w-32 md:h-36 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-1">
                      {item.type}
                    </p>
                    <h3 className="font-display text-xl text-foreground mb-1">{item.name}</h3>
                    <p className="font-body text-sm text-muted-foreground">{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 border border-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-body text-sm text-foreground w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border p-8 h-fit lg:sticky lg:top-28"
          >
            <h2 className="font-display text-2xl text-foreground mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-foreground">
                    ₹{(item.priceNum * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-6 mb-8">
              <div className="flex justify-between font-body">
                <span className="text-sm tracking-widest uppercase text-muted-foreground">Total</span>
                <span className="text-xl text-foreground font-display">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block text-center bg-gold-shimmer text-primary-foreground font-body text-sm tracking-widest uppercase px-10 py-4 hover-gold-glow transition-all duration-500 w-full"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
