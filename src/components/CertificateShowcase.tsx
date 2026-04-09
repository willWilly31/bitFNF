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

// Particle system with orbiting effect
interface Particle {
  id: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  orbitOffset: number;
}

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: Math.random() * 360,
    radius: 40 + Math.random() * 45,
    speed: 0.15 + Math.random() * 0.3,
    size: 2 + Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.5,
    orbitOffset: Math.random() * Math.PI * 2,
  }));

const OrbitingParticles = memo(({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>(generateParticles(18));
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const fpsInterval = useRef(1000 / 30); // Cap at 30fps for performance

  const animate = useCallback((timestamp: number) => {
    if (!canvasRef.current || !active) return;
    const elapsed = timestamp - lastTimeRef.current;
    if (elapsed < fpsInterval.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTimeRef.current = timestamp - (elapsed % fpsInterval.current);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);
    frameRef.current += 1;

    particlesRef.current.forEach((p) => {
      const angle = (p.angle + frameRef.current * p.speed) * (Math.PI / 180);
      const rx = (p.radius / 100) * cx;
      const ry = (p.radius / 100) * cy * 0.85;
      const x = cx + Math.cos(angle + p.orbitOffset) * rx;
      const y = cy + Math.sin(angle + p.orbitOffset) * ry;

      // Amber/gold particles - contrasting with blue/purple palette
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity * 0.7})`;
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(x, y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity * 0.15})`;
      ctx.fill();
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [active]);

  useEffect(() => {
    if (!canvasRef.current || !active) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio > 1 ? 2 : 1);
    canvas.height = rect.height * (window.devicePixelRatio > 1 ? 2 : 1);
    
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
});
OrbitingParticles.displayName = "OrbitingParticles";

export const CertificateShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "100px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-switch
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
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: idx * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setActiveIndex(idx)}
              className={`relative w-full rounded-2xl overflow-hidden transition-all duration-700 group ${
                activeIndex === idx
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-2xl scale-[1.02]"
                  : "opacity-70 hover:opacity-90 hover:scale-[1.01] shadow-lg"
              }`}
            >
              {/* Particle overlay */}
              <OrbitingParticles active={isVisible && activeIndex === idx} />

              {/* Certificate image - object-contain to avoid cropping */}
              <div className="relative bg-muted/20 p-3 md:p-4">
                <img
                  src={cert.src}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>

              {/* Info overlay at bottom */}
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-5"
                  >
                    <h4 className="text-sm md:text-base font-bold text-white drop-shadow-lg leading-tight">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-white/70 mt-1">{cert.issuer} • {cert.date}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle shimmer border on active */}
              {activeIndex === idx && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-primary/20" />
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Dots indicator */}
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
};
