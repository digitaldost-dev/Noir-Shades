import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Play, Pause } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const allMedia = [
    ...product.images.map((src) => ({ type: "image" as const, src })),
    ...(product.video ? [{ type: "video" as const, src: product.video }] : []),
  ];

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: `${product.brand} ${product.name}`,
      type: product.type,
      price: product.price,
      priceNum: product.priceNum,
      image: product.images[0],
    });
    toast({
      title: "Added to Cart",
      description: `${product.brand} ${product.name} has been added to your cart.`,
    });
    onClose();
  };

  const prev = () => setActiveIdx((i) => (i - 1 + allMedia.length) % allMedia.length);
  const next = () => setActiveIdx((i) => (i + 1) % allMedia.length);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const current = allMedia[activeIdx];

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/logo.svg";
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-card border border-border overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200"
            >
              <X size={18} />
            </button>

            {/* LEFT — Media gallery */}
            <div className="w-full md:w-1/2 relative bg-noir-gradient flex-shrink-0">
              {/* Main media */}
              <div className="relative w-full h-64 md:h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    {current.type === "video" ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          src={current.src}
                          className="w-full h-full object-cover"
                          loop
                          playsInline
                          onEnded={() => setIsPlaying(false)}
                        />
                        <button
                          onClick={togglePlay}
                          className="absolute inset-0 flex items-center justify-center group"
                        >
                          <div className="w-16 h-16 rounded-full bg-black/50 border border-primary/50 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                            {isPlaying ? (
                              <Pause size={24} className="text-white" />
                            ) : (
                              <Play size={24} className="text-white ml-1" />
                            )}
                          </div>
                        </button>
                      </div>
                    ) : (
                      <img
                        src={current.src}
                        alt={`${product.brand} ${product.name}`}
                        onError={handleImgError}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav arrows */}
                {allMedia.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 border border-border/50 flex items-center justify-center hover:border-primary transition-all duration-200"
                    >
                      <ChevronLeft size={16} className="text-white" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 border border-border/50 flex items-center justify-center hover:border-primary transition-all duration-200"
                    >
                      <ChevronRight size={16} className="text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allMedia.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex gap-2 justify-center px-4">
                  {allMedia.map((media, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`w-12 h-12 border-2 overflow-hidden flex-shrink-0 transition-all duration-200 ${
                        i === activeIdx ? "border-primary" : "border-border/40 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {media.type === "video" ? (
                        <div className="w-full h-full bg-black/70 flex items-center justify-center">
                          <Play size={12} className="text-primary" />
                        </div>
                      ) : (
                        <img src={media.src} alt="" onError={handleImgError} className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — Product info */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
              <div>
                <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary mb-2">
                  {product.brand} · {product.type}
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                  {product.name}
                </h2>
                <p className="font-body text-2xl text-foreground mb-6">{product.price}</p>

                {product.description && (
                  <div className="mb-8">
                    <div className="w-8 h-px bg-primary/50 mb-4" />
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Category — {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Free Shipping on all orders
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Authentic & Verified Product
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAdd}
                  className="w-full bg-primary text-primary-foreground font-body text-xs tracking-widest uppercase py-4 flex items-center justify-center gap-3 hover:bg-primary/90 transition-all duration-300"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-border text-muted-foreground font-body text-xs tracking-widest uppercase py-3 hover:border-primary/50 hover:text-foreground transition-all duration-300"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
