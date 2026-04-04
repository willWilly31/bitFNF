import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  device: string;
  rating: number;
  text: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  theme?: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-muted'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </div>
);

export const TestimonialCarousel = ({ testimonials, theme }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? -15 : 15,
    }),
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="relative" style={{ perspective: "1200px" }}>
        {/* Stacked cards behind */}
        <div className="absolute inset-0 flex justify-center">
          {[2, 1].map((offset) => (
            <div
              key={offset}
              className="absolute w-full max-w-lg mx-auto rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
              style={{
                height: "280px",
                top: `${offset * 8}px`,
                transform: `scale(${1 - offset * 0.05}) translateZ(${-offset * 40}px)`,
                opacity: 0.3 + (2 - offset) * 0.2,
              }}
            />
          ))}
        </div>

        {/* Active card */}
        <div className="relative z-10 flex justify-center min-h-[320px] items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 },
              }}
              className="w-full max-w-lg"
            >
              <div className={`relative rounded-2xl border-2 p-8 md:p-10 shadow-xl ${
                theme === 'dark' 
                  ? 'border-border bg-card/80 backdrop-blur-md' 
                  : 'border-border/50 bg-card/90 backdrop-blur-md'
              }`}>
                <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                
                <div className="flex flex-col items-center text-center space-y-5">
                  <StarRating rating={testimonials[activeIndex].rating} />
                  
                  <blockquote className="text-lg md:text-xl leading-relaxed font-medium">
                    "{testimonials[activeIndex].text}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <Avatar className="!size-12 border-2 border-primary/30">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-lg">
                        {testimonials[activeIndex].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <span className="block text-lg font-semibold tracking-tight">
                        {testimonials[activeIndex].name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {testimonials[activeIndex].device}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-border bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={next}
            className="p-3 rounded-full border border-border bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
