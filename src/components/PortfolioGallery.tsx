import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import portfolio1 from "@/assets/portfolio/board-1.jpg";
import portfolio2 from "@/assets/portfolio/board-2.jpg";
import portfolio3 from "@/assets/portfolio/board-3.jpg";

const portfolioItems = [
  { src: portfolio1, title: "IC Reballing & Replacement", desc: "Proses reballing BGA chip dengan presisi mikroskopis" },
  { src: portfolio2, title: "Board-Level Soldering", desc: "Perbaikan jalur dan komponen board dengan peralatan profesional" },
  { src: portfolio3, title: "Micro Component Repair", desc: "Penggantian komponen mikro pada motherboard smartphone" },
];

export const PortfolioGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto">
      {/* Main featured image */}
      <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video bg-muted/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={portfolioItems[activeIndex].src}
              alt={portfolioItems[activeIndex].title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {/* Text overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            >
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {portfolioItems[activeIndex].title}
              </h4>
              <p className="text-white/80 text-sm md:text-base drop-shadow-md max-w-lg">
                {portfolioItems[activeIndex].desc}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {portfolioItems.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            initial={isVisible ? { opacity: 0, y: 30 } : false}
            animate={isVisible ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.1 + idx * 0.15, duration: 0.5, ease: "easeOut" }}
            className={`relative rounded-xl overflow-hidden aspect-video group cursor-pointer transition-all duration-500 ${
              activeIndex === idx
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl scale-[1.02]"
                : "opacity-60 hover:opacity-90 hover:scale-[1.01]"
            }`}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 transition-opacity duration-500 ${
              activeIndex === idx
                ? "bg-primary/10"
                : "bg-black/30 group-hover:bg-black/10"
            }`} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
