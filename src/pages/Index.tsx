import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Clock, Instagram, MessageCircle, CheckCircle, Wrench, Sun, Moon } from "lucide-react";
import { ContainerScroll, CardsContainer, CardTransformed, ReviewStars } from "@/components/ui/animated-cards-stack";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import logoNew from "@/assets/logo-new.svg";
import bitHero from "@/assets/bit-hero.png";
import bitHeroDark from "@/assets/bit-hero-dark.png";
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

const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getStyle = useCallback((speed: number, maxOffset = 60) => {
    const offset = Math.min(Math.max(scrollY * speed, -maxOffset), maxOffset);
    return { transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' } as const;
  }, [scrollY]);

  return getStyle;
};

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

const Index = () => {
  const parallax = useParallax();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.message) {
      toast.error("Mohon lengkapi semua field");
      return;
    }
    const waMessage = `Halo Bit! \n\nNama: ${formData.name}\nKontak: ${formData.contact}\nPesan: ${formData.message}`;
    window.open(`https://wa.me/6281390004553?text=${encodeURIComponent(waMessage)}`, '_blank');
    toast.success("Mengarahkan ke WhatsApp...");
    setFormData({ name: "", contact: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="fixed inset-0 tech-pattern pointer-events-none opacity-40" style={parallax(-0.03, 20)} />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 animate-fade-in">
              <h1 className="text-xl font-bold text-gradient tracking-tight">Bit</h1>
              <span className="text-xs text-muted-foreground font-medium">Fast Fix No Fuss</span>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-sm font-semibold hover:text-primary transition-all hover:scale-105">Layanan</a>
                <a href="#why" className="text-sm font-semibold hover:text-primary transition-all hover:scale-105">Kenapa Kami</a>
                <a href="#testimonials" className="text-sm font-semibold hover:text-primary transition-all hover:scale-105">Testimoni</a>
                <a href="#contact" className="text-sm font-semibold hover:text-primary transition-all hover:scale-105">Kontak</a>
              </div>

              {/* Dark Mode Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-10 h-10 rounded-xl bg-muted/80 hover:bg-muted flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Toggle dark mode"
                >
                  <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                  <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
                </button>
              )}

              <Button asChild className="hidden md:inline-flex bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 shadow-lg">
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
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 text-lg h-14 shadow-xl">
                  <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Hubungi via WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg h-14 border-2 hover-lift hover:border-primary/50">
                  <a href="#services">Lihat Layanan</a>
                </Button>
              </div>

              <div className="flex items-start gap-3 text-sm text-muted-foreground pt-4">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">Jl. Sei Bahorok No. 2A/71, Babura, Medan Baru, Medan</span>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative aspect-square max-w-md mx-auto" style={parallax(-0.05, 40)}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-3xl opacity-25 animate-glow" style={parallax(-0.08, 30)} />
                <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl hover-lift rounded-3xl">
                  <img src={bitHero} alt="Bit - Fast Fix No Fuss" className="w-full h-full object-cover dark:hidden" />
                  <img src={bitHeroDark} alt="Bit - Fast Fix No Fuss" className="w-full h-full object-cover hidden dark:block" />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16" style={parallax(-0.02, 15)}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Kenapa Memilih <span className="text-gradient">Bit</span>?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Kami mengutamakan kualitas dan kepuasan pelanggan dalam setiap perbaikan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyItems.map((item, idx) => (
              <Card 
                key={idx} 
                className="p-8 hover-lift border-2 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:border-primary/30"
                style={parallax(-0.02 - idx * 0.01, 20)}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 glow-effect shadow-lg">
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
          <div className="text-center mb-16" style={parallax(-0.02, 15)}>
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
                  className="shimmer-border group relative overflow-hidden hover-lift border-2 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:border-transparent rounded-xl"
                >
                  <div className="aspect-square p-5 flex flex-col items-center justify-center gap-4">
                    {service.image ? (
                      <div className="w-20 h-20 flex items-center justify-center rounded-2xl overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-lg" />
                      </div>
                    ) : service.icon ? (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg">
                        <service.icon className="w-10 h-10 text-white" />
                      </div>
                    ) : null}
                    <div className="text-center space-y-2">
                      <h4 className="text-sm font-bold leading-tight tracking-tight">{service.title}</h4>
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

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4">
          <div className="text-center mb-8" style={parallax(-0.02, 15)}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Apa Kata <span className="text-gradient">Pelanggan</span>?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>

          <ContainerScroll className="container h-[300vh]">
            <div className="sticky left-0 top-0 h-svh w-full py-12">
              <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
                {testimonials.map((t, index) => (
                  <CardTransformed
                    arrayLength={testimonials.length}
                    key={t.name}
                    variant={theme === 'dark' ? 'dark' : 'light'}
                    index={index + 2}
                    role="article"
                  >
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <ReviewStars
                        className="text-amber-500"
                        rating={t.rating}
                      />
                      <div className="mx-auto w-4/5 text-lg">
                        <blockquote>"{t.text}"</blockquote>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="!size-12 border-2 border-border">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-lg">
                          {t.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="block text-lg font-semibold tracking-tight">{t.name}</span>
                        <span className="block text-sm text-muted-foreground">{t.device}</span>
                      </div>
                    </div>
                  </CardTransformed>
                ))}
              </CardsContainer>
            </div>
          </ContainerScroll>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16" style={parallax(-0.02, 15)}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Hubungi <span className="text-gradient">Kami</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Siap membantu Anda dengan perbaikan cepat dan profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <Card className="p-10 border-2 bg-card/50 backdrop-blur-sm shadow-xl hover-lift">
              <h4 className="text-2xl font-bold mb-8 tracking-tight">Info Kontak</h4>
              <div className="space-y-5">
                <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group">
                  <MessageCircle className="w-6 h-6 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-lg">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">0813-9000-4553</p>
                  </div>
                </a>
                <a href="https://instagram.com/bitservishpmedan" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group">
                  <Instagram className="w-6 h-6 mt-0.5 text-secondary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-lg">Instagram</p>
                    <p className="text-sm text-muted-foreground">@bitservishpmedan</p>
                  </div>
                </a>
                <a href="mailto:bitbuddy99@gmail.com" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group">
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

            <Card className="p-10 border-2 bg-card/50 backdrop-blur-sm shadow-xl hover-lift">
              <h4 className="text-2xl font-bold mb-8 tracking-tight">Kirim Pesan</h4>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm font-bold mb-3 block">Nama</label>
                  <Input id="name" placeholder="Nama Anda" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-12" />
                </div>
                <div>
                  <label htmlFor="contact" className="text-sm font-bold mb-3 block">Email atau WhatsApp</label>
                  <Input id="contact" placeholder="email@contoh.com atau 08123456789" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required className="h-12" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-bold mb-3 block">Pesan</label>
                  <Textarea id="message" placeholder="Ceritakan masalah perangkat Anda..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} required className="resize-none" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 shadow-xl" size="lg">
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
                  <p className="text-muted-foreground font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                    Fast Fix No Fuss — Perbaikan Smartphone & Tablet Profesional di Medan.
                  </p>
                </div>

                <div className="flex mb-8 mt-3 gap-4">
                  <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-6 h-6 hover:scale-110 duration-300"><MessageCircle className="w-6 h-6" /></div>
                    <span className="sr-only">WhatsApp</span>
                  </a>
                  <a href="https://instagram.com/bitservishpmedan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-6 h-6 hover:scale-110 duration-300"><Instagram className="w-6 h-6" /></div>
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="mailto:bitbuddy99@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-6 h-6 hover:scale-110 duration-300"><Mail className="w-6 h-6" /></div>
                    <span className="sr-only">Email</span>
                  </a>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground max-w-full px-4">
                  <a className="hover:text-foreground duration-300 hover:font-semibold cursor-pointer" href="#layanan">Layanan</a>
                  <a className="hover:text-foreground duration-300 hover:font-semibold cursor-pointer" href="#kenapa-bit">Kenapa Bit</a>
                  <a className="hover:text-foreground duration-300 hover:font-semibold cursor-pointer" href="#testimoni">Testimoni</a>
                  <a className="hover:text-foreground duration-300 hover:font-semibold cursor-pointer" href="#kontak">Kontak</a>
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
            <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-foreground to-foreground/80 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              <img src={logoNew} alt="Bit" className="w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-1 bg-gradient-to-r from-transparent via-border to-transparent w-full left-1/2 -translate-x-1/2"></div>

          {/* Bottom shadow */}
          <div className="bg-gradient-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-28 w-full h-24"></div>
        </footer>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281390004553"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-500 z-50 glow-effect animate-float"
        aria-label="Chat di WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
      </a>
    </div>
  );
};

export default Index;
