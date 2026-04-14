import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Clock, Instagram, MessageCircle, CheckCircle, Wrench, Sun, Moon } from "lucide-react";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { CertificateShowcase } from "@/components/CertificateShowcase";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logoNew from "@/assets/logo-new.svg";
import bitHeroNew from "@/assets/bit-hero-new.png";
import unlockIcon from "@/assets/services/unlock.png";
import softwareIcon from "@/assets/services/software.png";
import matotIcon from "@/assets/services/matot.png";
import gntiPortIcon from "@/assets/services/gnti_port.png";
import gantiIcIcon from "@/assets/services/ganti_ic.png";
import gantiLcdIcon from "@/assets/services/ganti_lcd.png";
import flexibelIcon from "@/assets/services/flexibel_on_off_volume.png";
import chargingIcon from "@/assets/services/charging.png";
import bootloopIcon from "@/assets/services/bootloop.png";
import gantiBateraiIcon from "@/assets/services/ganti_baterai.png";
import perbaikanBoardIcon from "@/assets/services/perbaikan_board.jpeg";

const testimonials = [
  {
    name: "Rizky Pratama",
    device: "iPhone 13 Pro",
    rating: 5,
    text: "LCD pecah parah, dalam 2 jam sudah beres. Kualitas LCD-nya original, harga masuk akal. Recommended banget!",
  },
  {
    name: "Sarah Daulay",
    device: "Samsung S23 Ultra",
    rating: 5,
    text: "HP mati total gak bisa nyala. Ternyata IC power rusak. Ditangani dengan cepat dan profesional. Sekarang HP normal lagi!",
  },
  {
    name: "Andi Wijaya",
    device: "Xiaomi 13T",
    rating: 5,
    text: "Charging port rusak, cuma butuh 1 jam buat ganti. Harga transparan, dikasih tau detail kerusakannya. Puas!",
  },
  {
    name: "Maya Lubis",
    device: "iPad Pro 2022",
    rating: 5,
    text: "Bootloop parah, data penting di dalamnya. Alhamdulillah data aman semua dan tablet normal kembali. Terima kasih Bit!",
  },
];

const services = [
  { icon: CheckCircle, title: "Cek Diagnosa", badge: "Gratis", badgeColor: "bg-green-500", image: null },
  { icon: null, title: "Ganti LCD", badge: "LCD", badgeColor: "bg-blue-500", image: gantiLcdIcon },
  { icon: null, title: "Ganti IC", badge: "IC", badgeColor: "bg-purple-500", image: gantiIcIcon },
  { icon: null, title: "Ganti Baterai", badge: "Battery", badgeColor: "bg-amber-500", image: gantiBateraiIcon },
  { icon: null, title: "Masalah Charging", badge: "Charging", badgeColor: "bg-red-500", image: chargingIcon },
  { icon: null, title: "Ganti Port", badge: "Port", badgeColor: "bg-cyan-500", image: gntiPortIcon },
  { icon: null, title: "Flexibel On/Off", badge: "Flexibel", badgeColor: "bg-indigo-500", image: flexibelIcon },
  { icon: null, title: "HP Mati Total", badge: "Mati Total", badgeColor: "bg-gray-500", image: matotIcon },
  { icon: null, title: "Bootloop", badge: "Bootloop", badgeColor: "bg-pink-500", image: bootloopIcon },
  { icon: null, title: "Software Error", badge: "Software", badgeColor: "bg-violet-500", image: softwareIcon },
  { icon: null, title: "Unlock", badge: "Unlock", badgeColor: "bg-teal-500", image: unlockIcon },
  { icon: null, title: "Perbaikan Board", badge: "Board", badgeColor: "bg-orange-500", image: perbaikanBoardIcon },
];

const whyItems = [
  {
    icon: Wrench,
    title: "Teknisi Berpengalaman",
    description: "10+ tahun pengalaman menangani berbagai merek dan masalah board-level. Ahli dalam diagnosa cepat dan akurat."
  },
  {
    icon: Clock,
    title: "Cepat & Transparan",
    description: "Estimasi biaya yang jelas, update berkala selama proses perbaikan, dan laporan lengkap kondisi sebelum & sesudah."
  },
  {
    icon: CheckCircle,
    title: "Garansi & Pickup",
    description: "Garansi resmi untuk setiap perbaikan. Layanan pickup & delivery gratis untuk area Medan."
  }
];

const cinematicVideos = [
  {
    title: "Proses perbaikan pada board indikasi kerusakan short dgn menggunakan metode suntik tegangan yang sesuai jalur/ rangkaian",
    description: "Penelusuran titik short pada board dilakukan dengan metode suntik tegangan sesuai jalur rangkaian agar diagnosa akurat dan aman.",
    src: "https://agzc6nhbegqnyyyk.public.blob.vercel-storage.com/VID-20240824-WA0003.mp4",
  },
  {
    title: "Perbaikan port usb dgn menggunakan part original",
    description: "Penggantian port USB menggunakan part original untuk menjaga kestabilan charging dan daya tahan perangkat.",
    src: "https://agzc6nhbegqnyyyk.public.blob.vercel-storage.com/VID_20240926_094000.mp4",
  },
];

const WhySectionParticleBackdrop = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let animationFrameId = 0;
    const pointer = { x: 0, y: 0, active: false };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.9;
      }

      update(width: number, height: number) {
        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= 0 || this.y >= height) this.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - this.x;
          const dy = pointer.y - this.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < 140) {
            this.x -= (dx / distance) * 0.8;
            this.y -= (dy / distance) * 0.8;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = "rgba(56, 189, 248, 0.5)";
        context.fill();
      }
    }

    let particles: Particle[] = [];

    const resizeCanvas = () => {
      const { clientWidth, clientHeight } = parent;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      const count = Math.max(45, Math.floor((clientWidth * clientHeight) / 16000));
      particles = Array.from({ length: count }, () => new Particle(clientWidth, clientHeight));
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = `rgba(109, 80, 255, ${opacity * 0.35})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw();
      });

      drawConnections();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const insideX = event.clientX >= bounds.left && event.clientX <= bounds.right;
      const insideY = event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      pointer.active = insideX && insideY;
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", brand: "", damage: "", message: "" });
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => setMounted(true), []);

  const brands = ["iPhone", "Samsung", "Xiaomi", "OPPO", "Vivo", "Realme", "Huawei", "OnePlus", "Google Pixel", "iPad", "Tablet Lainnya", "Lainnya"];
  const damages = ["Ganti LCD", "Ganti IC", "Ganti Baterai", "Masalah Charging", "Ganti Port", "Flexibel On/Off", "HP Mati Total", "Bootloop", "Software Error", "Unlock", "Perbaikan Board", "Lainnya"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.brand || !formData.damage) {
      toast.error("Mohon lengkapi semua field");
      return;
    }

    try {
      await supabase.from("service_requests").insert({
        customer_name: formData.name,
        phone: formData.contact,
        brand: formData.brand,
        damage_type: formData.damage,
        description: formData.message || null,
      });
    } catch (err) {
      console.error("Failed to save service request:", err);
    }

    const waMessage = `Halo Bit! \n\nNama: ${formData.name}\nKontak: ${formData.contact}\nMerk: ${formData.brand}\nKerusakan: ${formData.damage}\nCatatan: ${formData.message || '-'}`;
    window.open(`https://wa.me/6281390004553?text=${encodeURIComponent(waMessage)}`, '_blank');
    toast.success("Request servis terkirim!");
    setFormData({ name: "", contact: "", brand: "", damage: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="fixed inset-0 tech-pattern pointer-events-none opacity-40" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gradient tracking-tight">Bit</h1>
              <span className="text-xs text-muted-foreground font-medium">Fast Fix No Fuss</span>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-sm font-semibold hover:text-primary transition-colors">Layanan</a>
                <a href="#why" className="text-sm font-semibold hover:text-primary transition-colors">Kenapa Kami</a>
                <a href="#testimonials" className="text-sm font-semibold hover:text-primary transition-colors">Testimoni</a>
                <a href="#contact" className="text-sm font-semibold hover:text-primary transition-colors">Kontak</a>
              </div>

              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-10 h-10 rounded-xl bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors"
                  aria-label="Toggle dark mode"
                >
                  <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                  <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
                </button>
              )}

              <Button asChild className="hidden md:inline-flex bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg">
                <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-semibold shadow-sm">
                <CheckCircle className="w-4 h-4" />
                Fast Fix No Fuss
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Perbaikan <span className="text-gradient">Smartphone & Tablet</span> Profesional
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Teknisi berpengalaman 10+ tahun. Sparepart berkualitas. Garansi servis. 
                Pickup service tersedia untuk area Medan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg h-14 shadow-xl">
                  <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Hubungi via WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg h-14 border-2 hover:border-primary/50 transition-colors">
                  <a href="#services">Lihat Layanan</a>
                </Button>
              </div>

              <div className="flex items-start gap-3 text-sm text-muted-foreground pt-4">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">Jl. Sei Bahorok No. 2A/71, Babura, Medan Baru, Medan</span>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-3xl opacity-25 animate-glow" />
                <div className="relative">
                  <img src={bitHeroNew} alt="Bit - Fast Fix No Fuss" className="w-full h-full object-contain drop-shadow-2xl" loading="eager" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Video Showcase */}
        <section id="showcase-video" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Cinematic <span className="text-gradient">Service Reel</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Lihat langsung kualitas pengerjaan Bit dalam tampilan video sinematik yang smooth.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-center">
            {cinematicVideos.map((video, index) => (
              <Card
                key={video.src}
                onClick={() => setActiveVideo(index)}
                className={`group overflow-hidden rounded-3xl border-2 border-border/70 bg-card/60 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer
                  ${activeVideo === index ? "opacity-100 z-20 scale-100" : "opacity-50 z-10 scale-[0.98]"}
                  ${index === 0 ? "md:w-[46%] md:translate-y-0" : "md:w-[46%] md:-ml-16 lg:-ml-24 md:translate-y-8"}
                  ${index === 0 ? "mt-0" : "mt-6 md:mt-0"}`}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70 z-10 pointer-events-none" />
                  <video
                    className="w-full h-[420px] md:h-[520px] object-cover rounded-3xl group-hover:scale-[1.02] transition-transform duration-700"
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => setActiveVideo(index)}
                  >
                    <source src={video.src} type="video/mp4" />
                    Browser Anda tidak mendukung video HTML5.
                  </video>
                </div>
                <div className="p-6 md:p-7">
                  <h4 className="text-xl font-bold tracking-tight mb-2">{video.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{video.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why" className="container mx-auto px-4 py-20 relative overflow-hidden">
          <div className="absolute inset-x-2 md:inset-x-4 bottom-2 top-28 rounded-[2rem] overflow-hidden pointer-events-none opacity-80">
            <WhySectionParticleBackdrop />
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/0 to-background/20" />
          </div>

          <div className="text-center mb-16 relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Kenapa Memilih <span className="text-gradient">Bit</span>?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Kami mengutamakan kualitas dan kepuasan pelanggan dalam setiap perbaikan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {whyItems.map((item, idx) => (
              <Card 
                key={idx} 
                className="p-8 border-2 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Layanan <span className="text-gradient">Kami</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Solusi lengkap untuk semua kebutuhan perbaikan smartphone dan tablet Anda
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <Card 
                  key={idx}
                  className="shimmer-border group relative overflow-hidden border-2 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:border-transparent rounded-xl transition-shadow duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] p-4 flex flex-col items-center justify-center gap-5">
                    {service.image ? (
                      <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-110">
                        <img src={service.image} alt={service.title} loading="lazy" decoding="async" className="w-full h-full object-contain drop-shadow-xl" />
                      </div>
                    ) : service.icon ? (
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-xl">
                        <service.icon className="w-14 h-14 md:w-16 md:h-16 text-white" />
                      </div>
                    ) : null}
                    <div className="text-center space-y-2">
                      <h4 className="text-base font-bold leading-tight tracking-tight">{service.title}</h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${service.badgeColor} shadow-md`}>
                        {service.badge}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Hasil Kerja <span className="text-gradient">Kami</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Perbaikan board-level dengan presisi tinggi dan peralatan profesional
            </p>
          </div>

          <PortfolioGallery />
        </section>

        {/* Sertifikasi */}
        <section id="certificates" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Sertifikasi <span className="text-gradient">Resmi</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Teknisi tersertifikasi dari lembaga pelatihan resmi untuk menjamin kualitas perbaikan
            </p>
          </div>

          <CertificateShowcase />
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Apa Kata <span className="text-gradient">Pelanggan</span>?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} theme={theme} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Hubungi <span className="text-gradient">Kami</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Siap membantu Anda dengan perbaikan cepat dan profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <Card className="p-10 border-2 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h4 className="text-2xl font-bold mb-8 tracking-tight">Info Kontak</h4>
              <div className="space-y-5">
                <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group">
                  <MessageCircle className="w-6 h-6 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-lg">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">0813-9000-4553</p>
                  </div>
                </a>
                <a href="https://instagram.com/bitservishpmedan" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group">
                  <Instagram className="w-6 h-6 mt-0.5 text-secondary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-lg">Instagram</p>
                    <p className="text-sm text-muted-foreground">@bitservishpmedan</p>
                  </div>
                </a>
                <a href="mailto:bitbuddy99@gmail.com" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group">
                  <Mail className="w-6 h-6 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-lg">Email</p>
                    <p className="text-sm text-muted-foreground">bitbuddy99@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 p-4 rounded-xl">
                  <MapPin className="w-6 h-6 mt-0.5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Alamat</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Jl. Sei Bahorok No. 2A/71, Babura, Medan Baru, Kota Medan, Sumatera Utara 20154</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl">
                  <Clock className="w-6 h-6 mt-0.5 text-primary" />
                  <div>
                    <p className="font-bold text-lg">Jam Operasional</p>
                    <p className="text-sm text-muted-foreground">Senin - Sabtu: 09.00 - 18.00</p>
                    <p className="text-sm text-muted-foreground">Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 border-2 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h4 className="text-2xl font-bold mb-8 tracking-tight">Form Servis</h4>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-sm font-bold mb-2 block">Nama</label>
                  <Input id="name" placeholder="Nama Anda" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-12" />
                </div>
                <div>
                  <label htmlFor="contact" className="text-sm font-bold mb-2 block">WhatsApp / Email</label>
                  <Input id="contact" placeholder="08123456789" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required className="h-12" />
                </div>
                <div>
                  <label htmlFor="brand" className="text-sm font-bold mb-2 block">Merk Perangkat</label>
                  <Select value={formData.brand} onValueChange={(v) => setFormData({ ...formData, brand: v })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Pilih merk perangkat" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="damage" className="text-sm font-bold mb-2 block">Jenis Kerusakan</label>
                  <Select value={formData.damage} onValueChange={(v) => setFormData({ ...formData, damage: v })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Pilih jenis kerusakan" />
                    </SelectTrigger>
                    <SelectContent>
                      {damages.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-bold mb-2 block">Catatan Tambahan <span className="text-muted-foreground font-normal">(opsional)</span></label>
                  <Textarea id="message" placeholder="Ceritakan detail masalah perangkat Anda..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="resize-none" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-xl" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Kirim via WhatsApp
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <section className="relative w-full mt-0 overflow-hidden">
        <footer className="border-t border-border bg-background mt-20 relative">
          <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
            <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
              <div className="w-full flex flex-col items-center">
                <div className="space-y-2 flex flex-col items-center flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-3xl font-bold">Bit</span>
                  </div>
                  <p className="text-muted-foreground text-sm text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                    Fast Fix No Fuss — Perbaikan Smartphone & Tablet Profesional di Medan.
                  </p>
                </div>

                <div className="flex mb-8 mt-3 gap-4">
                  <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="w-6 h-6" />
                    <span className="sr-only">WhatsApp</span>
                  </a>
                  <a href="https://instagram.com/bitservishpmedan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Instagram className="w-6 h-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="mailto:bitbuddy99@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-6 h-6" />
                    <span className="sr-only">Email</span>
                  </a>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground max-w-full px-4">
                  <a className="hover:text-foreground transition-colors cursor-pointer" href="#services">Layanan</a>
                  <a className="hover:text-foreground transition-colors cursor-pointer" href="#why">Kenapa Bit</a>
                  <a className="hover:text-foreground transition-colors cursor-pointer" href="#testimonials">Testimoni</a>
                  <a className="hover:text-foreground transition-colors cursor-pointer" href="#contact">Kontak</a>
                </div>
              </div>
            </div>

            <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
              <p className="text-base text-muted-foreground text-center md:text-left">
                ©{new Date().getFullYear()} Bit Service. All rights reserved.
              </p>
            </div>
          </div>

          {/* Large background text */}
          <div
            className="bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', maxWidth: '95vw' }}
          >
            BIT
          </div>

          {/* Bottom logo */}
          <div className="absolute hover:border-foreground duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl bg-background/60 left-1/2 border-2 border-border flex items-center justify-center p-3 -translate-x-1/2 z-10">
            <div className={`w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-[hsl(220,26%,14%)]' : 'bg-white'}`}>
              <img src={logoNew} alt="Bit" className="w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 object-contain drop-shadow-lg" />
            </div>
          </div>

          <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-1 bg-gradient-to-r from-transparent via-border to-transparent w-full left-1/2 -translate-x-1/2"></div>
          <div className="bg-gradient-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-28 w-full h-24"></div>
        </footer>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281390004553"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-500 z-50 animate-float"
        aria-label="Chat di WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
      </a>
    </div>
  );
};

export default Index;
