import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import certHardware from "@/assets/certificates/cert-hardware.jpg";
import certSoftware from "@/assets/certificates/cert-software.jpg";

const certificates = [
  {
    src: certHardware,
    title: "Sertifikat Perbaikan Hardware Smartphone",
    issuer: "Borneo Flasher Indonesia (LPKS)",
    number: "0724/BF/10/19",
    date: "20 Oktober 2019",
  },
  {
    src: certSoftware,
    title: "Sertifikat Perbaikan Software Smartphone",
    issuer: "Borneo Flasher Indonesia (LPKS)",
    number: "0724/BF/10/19",
    date: "30 Oktober 2019",
  },
];

// Lightweight CSS-based particle effect instead of canvas
const OrbitingParticles = memo(({ active }: { active: boolean }) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/60"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${10 + (i % 3) * 30}%`,
            animation: `orbit-${i % 4} ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: '0 0 6px 2px rgba(245,158,11,0.3)',
          }}
        />
      ))}
      <style>{`
        @keyframes orbit-0 { 0%,100% { transform: translate(0,0); opacity:0.6; } 50% { transform: translate(20px,-15px); opacity:1; } }
        @keyframes orbit-1 { 0%,100% { transform: translate(0,0); opacity:0.5; } 50% { transform: translate(-15px,20px); opacity:0.9; } }
        @keyframes orbit-2 { 0%,100% { transform: translate(0,0); opacity:0.7; } 50% { transform: translate(15px,15px); opacity:1; } }
        @keyframes orbit-3 { 0%,100% { transform: translate(0,0); opacity:0.4; } 50% { transform: translate(-20px,-10px); opacity:0.8; } }
      `}</style>
    </div>
  );
});
OrbitingParticles.displayName = "OrbitingParticles";

export const CertificateShowcase = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "100px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certificates.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: idx * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setActiveIndex(idx)}
              className={`relative w-full rounded-2xl overflow-hidden transition-all duration-500 group ${
                activeIndex === idx
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-2xl scale-[1.02]"
                  : "opacity-70 hover:opacity-90 shadow-lg"
              }`}
            >
              <OrbitingParticles active={isVisible && activeIndex === idx} />

              <div className="relative bg-muted/20 p-3 md:p-4">
                <img
                  src={cert.src}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-5"
                  >
                    <h4 className="text-sm md:text-base font-bold text-white drop-shadow-lg leading-tight">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-white/70 mt-1">{cert.issuer} • {cert.date}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeIndex === idx && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-primary/20" />
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {certificates.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 bg-gradient-to-r from-primary to-secondary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
});
CertificateShowcase.displayName = "CertificateShowcase";
