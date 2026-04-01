import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  address: z.string().trim().min(5, "Address is required").max(500),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  pincode: z.string().trim().min(6, "Valid pincode required").max(10),
  notes: z.string().max(500).optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, totalPrice, clearCart, totalItems } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (_data: CheckoutForm) => {
    // Simulate order placement
    await new Promise((r) => setTimeout(r, 1500));
    setOrderPlaced(true);
    clearCart();
    toast({
      title: "Order Booked Successfully!",
      description: "We'll reach out to confirm your order shortly.",
    });
  };

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="mx-auto mb-6 text-primary" size={72} strokeWidth={1} />
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Order Booked!
            </h1>
            <p className="font-body text-muted-foreground mb-10 leading-relaxed">
              Thank you for choosing Noir Shades. Our team will contact you shortly to confirm your order and arrange delivery.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gold-shimmer text-primary-foreground font-body text-sm tracking-widest uppercase px-10 py-4 hover-gold-glow transition-all duration-500"
            >
              Back to Home
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
            to="/cart"
            className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-12">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-card border border-border p-6 md:p-8 space-y-6">
              <h2 className="font-display text-2xl text-foreground mb-2">Your Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    Full Name *
                  </label>
                  <input
                    {...register("fullName")}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-xs mt-1 font-body">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1 font-body">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Phone Number *
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="+91 98765 43210"
                />
                {errors.phone && (
                  <p className="text-destructive text-xs mt-1 font-body">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Delivery Address *
                </label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="House/Flat No., Street, Landmark"
                />
                {errors.address && (
                  <p className="text-destructive text-xs mt-1 font-body">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    City *
                  </label>
                  <input
                    {...register("city")}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Mumbai"
                  />
                  {errors.city && (
                    <p className="text-destructive text-xs mt-1 font-body">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    State *
                  </label>
                  <input
                    {...register("state")}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Maharashtra"
                  />
                  {errors.state && (
                    <p className="text-destructive text-xs mt-1 font-body">{errors.state.message}</p>
                  )}
                </div>
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    Pincode *
                  </label>
                  <input
                    {...register("pincode")}
                    className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="400001"
                  />
                  {errors.pincode && (
                    <p className="text-destructive text-xs mt-1 font-body">{errors.pincode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  Order Notes (Optional)
                </label>
                <textarea
                  {...register("notes")}
                  rows={2}
                  className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Any special instructions..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold-shimmer text-primary-foreground font-body text-sm tracking-widest uppercase px-10 py-4 hover-gold-glow transition-all duration-500 disabled:opacity-50"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </motion.form>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border p-8 h-fit lg:sticky lg:top-28"
          >
            <h2 className="font-display text-2xl text-foreground mb-8">
              Order Summary ({totalItems})
            </h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-14 h-16 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm text-foreground">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-body text-sm text-foreground">
                    ₹{(item.priceNum * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-6">
              <div className="flex justify-between font-body">
                <span className="text-sm tracking-widest uppercase text-muted-foreground">Total</span>
                <span className="text-xl text-foreground font-display">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
