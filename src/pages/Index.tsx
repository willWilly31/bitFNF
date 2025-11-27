import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock, Instagram, MessageCircle, CheckCircle, Wrench, Cpu, Battery, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import logoFull from "@/assets/logo-full.png";
import logoIcon from "@/assets/logo-icon.png";
import unlockIcon from "@/assets/services/unlock.png";
import softwareIcon from "@/assets/services/software.png";
import matotIcon from "@/assets/services/matot.png";
import gntiPortIcon from "@/assets/services/gnti_port.png";
import gantiIcIcon from "@/assets/services/ganti_ic.png";
import gantiLcdIcon from "@/assets/services/ganti_lcd.png";
import flexibelIcon from "@/assets/services/flexibel_on_off_volume.png";
import chargingIcon from "@/assets/services/charging.png";
import bootloopIcon from "@/assets/services/bootloop.png";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contact || !formData.message) {
      toast.error("Mohon lengkapi semua field");
      return;
    }

    // Create WhatsApp message
    const waMessage = `Halo Bit! 

Nama: ${formData.name}
Kontak: ${formData.contact}
Pesan: ${formData.message}`;
    
    const waUrl = `https://wa.me/6281390004553?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
    
    toast.success("Mengarahkan ke WhatsApp...");
    setFormData({ name: "", contact: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Tech Pattern Overlay */}
      <div className="fixed inset-0 tech-pattern pointer-events-none opacity-40" />

      {/* Header */}
      <header className="relative z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <img src={logoIcon} alt="Bit Logo" className="w-10 h-10 animate-float" />
              <div>
                <h1 className="text-lg font-bold text-gradient">Bit</h1>
                <p className="text-xs text-muted-foreground">Fast Fix No Fuss</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
                Layanan
              </a>
              <a href="#why" className="text-sm font-medium hover:text-primary transition-colors">
                Kenapa Kami
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Kontak
              </a>
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
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
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Fast Fix No Fuss
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Perbaikan <span className="text-gradient">Smartphone & Tablet</span> Profesional
              </h2>

              <p className="text-lg text-muted-foreground max-w-xl">
                Teknisi berpengalaman 10+ tahun. Sparepart berkualitas. Garansi servis. 
                Pickup service tersedia untuk area Medan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg h-14"
                >
                  <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Hubungi via WhatsApp
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="text-lg h-14 border-2 hover-lift">
                  <a href="#services">Lihat Layanan</a>
                </Button>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground pt-4">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Jl. Sei Bahorok No. 2A/71, Babura, Medan Baru, Medan</span>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-3xl opacity-20 animate-glow" />
                <Card className="relative overflow-hidden border-2 glow-effect">
                  <div className="aspect-square bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8">
                    <img src={logoFull} alt="Bit - Fast Fix No Fuss" className="w-full h-auto" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Kenapa Memilih <span className="text-gradient">Bit</span>?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami mengutamakan kualitas dan kepuasan pelanggan dalam setiap perbaikan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((item, idx) => (
              <Card 
                key={idx} 
                className="p-6 hover-lift border-2 bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 glow-effect">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Layanan <span className="text-gradient">Kami</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Solusi lengkap untuk semua kebutuhan perbaikan smartphone dan tablet Anda
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: CheckCircle,
                  title: "Cek Diagnosa",
                  badge: "Gratis",
                  badgeColor: "bg-green-500",
                  image: null
                },
                {
                  icon: null,
                  title: "Ganti LCD",
                  badge: "LCD",
                  badgeColor: "bg-blue-500",
                  image: gantiLcdIcon
                },
                {
                  icon: null,
                  title: "Ganti IC",
                  badge: "IC",
                  badgeColor: "bg-purple-500",
                  image: gantiIcIcon
                },
                {
                  icon: Battery,
                  title: "Ganti Baterai",
                  badge: "Battery",
                  badgeColor: "bg-amber-500",
                  image: null
                },
                {
                  icon: null,
                  title: "Masalah Charging",
                  badge: "Charging",
                  badgeColor: "bg-red-500",
                  image: chargingIcon
                },
                {
                  icon: null,
                  title: "Ganti Port",
                  badge: "Port",
                  badgeColor: "bg-cyan-500",
                  image: gntiPortIcon
                },
                {
                  icon: null,
                  title: "Flexibel On/Off",
                  badge: "Flexibel",
                  badgeColor: "bg-indigo-500",
                  image: flexibelIcon
                },
                {
                  icon: null,
                  title: "HP Mati Total",
                  badge: "Mati Total",
                  badgeColor: "bg-gray-500",
                  image: matotIcon
                },
                {
                  icon: null,
                  title: "Bootloop",
                  badge: "Bootloop",
                  badgeColor: "bg-pink-500",
                  image: bootloopIcon
                },
                {
                  icon: null,
                  title: "Software Error",
                  badge: "Software",
                  badgeColor: "bg-violet-500",
                  image: softwareIcon
                },
                {
                  icon: null,
                  title: "Unlock",
                  badge: "Unlock",
                  badgeColor: "bg-teal-500",
                  image: unlockIcon
                },
                {
                  icon: Cpu,
                  title: "Perbaikan Board",
                  badge: "Board",
                  badgeColor: "bg-orange-500",
                  image: null
                }
              ].map((service, idx) => (
                <Card 
                  key={idx}
                  className="group relative overflow-hidden hover-lift border-2 bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="aspect-square p-4 flex flex-col items-center justify-center gap-3">
                    {service.image ? (
                      <div className="w-16 h-16 flex items-center justify-center">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-contain transition-transform group-hover:scale-110"
                        />
                      </div>
                    ) : service.icon ? (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform group-hover:scale-110">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                    ) : null}
                    
                    <div className="text-center space-y-1">
                      <h4 className="text-sm font-semibold leading-tight">{service.title}</h4>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${service.badgeColor}`}>
                        {service.badge}
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-colors pointer-events-none" />
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Hubungi <span className="text-gradient">Kami</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Siap membantu Anda dengan perbaikan cepat dan profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <Card className="p-8 border-2 bg-card/50 backdrop-blur-sm">
              <h4 className="text-xl font-semibold mb-6">Info Kontak</h4>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/6281390004553" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">0813-9000-4553</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/bitservishpmedan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <Instagram className="w-5 h-5 mt-0.5 text-secondary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-muted-foreground">@bitservishpmedan</p>
                  </div>
                </a>

                <a 
                  href="mailto:bitbuddy99@gmail.com"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">bitbuddy99@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-sm text-muted-foreground">
                      Jl. Sei Bahorok No. 2A/71, Babura, Medan Baru, Kota Medan, Sumatera Utara 20154
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg">
                  <Clock className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Jam Operasional</p>
                    <p className="text-sm text-muted-foreground">Senin - Sabtu: 09.00 - 18.00</p>
                    <p className="text-sm text-muted-foreground">Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Form */}
            <Card className="p-8 border-2 bg-card/50 backdrop-blur-sm">
              <h4 className="text-xl font-semibold mb-6">Kirim Pesan</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Nama
                  </label>
                  <Input
                    id="name"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="text-sm font-medium mb-2 block">
                    Email atau WhatsApp
                  </label>
                  <Input
                    id="contact"
                    placeholder="email@contoh.com atau 08123456789"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Pesan
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Ceritakan masalah perangkat Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Kirim via WhatsApp
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/40 bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img src={logoIcon} alt="Bit" className="w-8 h-8" />
              <span className="font-bold text-lg text-gradient">Bit - Fast Fix No Fuss</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bit Service. Perbaikan Smartphone & Tablet Profesional di Medan.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <a href="https://wa.me/6281390004553" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="https://instagram.com/bitservishpmedan" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                Instagram
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="mailto:bitbuddy99@gmail.com" className="hover:underline">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281390004553"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 glow-effect"
        aria-label="Chat di WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default Index;
