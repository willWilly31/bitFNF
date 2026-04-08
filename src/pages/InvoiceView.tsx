import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Printer, MessageCircle, Upload, CheckCircle, Clock, FileText } from "lucide-react";
import logoNew from "@/assets/logo-new.svg";

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: FileText },
  sent: { label: "Menunggu Pembayaran", color: "bg-blue-100 text-blue-800", icon: Clock },
  paid: { label: "Dibayar", color: "bg-green-100 text-green-800", icon: CheckCircle },
  completed: { label: "Selesai", color: "bg-purple-100 text-purple-800", icon: CheckCircle },
};

const InvoiceView = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    const { data: inv } = await supabase.from("invoices").select("*").eq("id", id).single();
    const { data: itm } = await supabase.from("invoice_items").select("*").eq("invoice_id", id);
    setInvoice(inv);
    setItems(itm || []);
    setLoading(false);
  };

  const handleUploadProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !invoice) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${invoice.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("payment-proofs").upload(path, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("payment-proofs").getPublicUrl(path);

      const { error: updateError } = await supabase
        .from("invoices")
        .update({ payment_proof_url: urlData.publicUrl })
        .eq("id", invoice.id);

      if (updateError) throw updateError;

      toast.success("Bukti pembayaran berhasil diupload!");
      fetchInvoice();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const sendWhatsAppConfirm = () => {
    if (!invoice) return;
    const msg = `Halo Bit, saya sudah upload bukti pembayaran untuk invoice ${invoice.invoice_number}. Mohon dikonfirmasi. Terima kasih! 🙏`;
    window.open(`https://wa.me/6281390004553?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Memuat invoice...</div>;
  }

  if (!invoice) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Invoice tidak ditemukan</div>;
  }

  const statusInfo = statusConfig[invoice.status] || statusConfig.draft;

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      {/* Action buttons - hide on print */}
      <div className="max-w-2xl mx-auto mb-4 flex gap-2 print:hidden">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-1" /> Cetak / PDF
        </Button>
        {invoice.status === "sent" && (
          <>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" asChild disabled={uploading}>
                <span>
                  <Upload className="h-4 w-4 mr-1" /> {uploading ? "Mengupload..." : "Upload Bukti Bayar"}
                </span>
              </Button>
              <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleUploadProof} />
            </label>
            <Button variant="outline" size="sm" onClick={sendWhatsAppConfirm}>
              <MessageCircle className="h-4 w-4 mr-1" /> Konfirmasi via WA
            </Button>
          </>
        )}
      </div>

      {/* Invoice Card */}
      <Card className="max-w-2xl mx-auto" ref={printRef}>
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img src={logoNew} alt="Bit" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">Bit</h1>
                <p className="text-xs text-muted-foreground">Fast Fix No Fuss</p>
              </div>
            </div>
            <Badge className={`${statusInfo.color} text-xs`}>{statusInfo.label}</Badge>
          </div>

          <Separator />

          {/* Invoice Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Invoice</p>
              <p className="font-mono font-bold">{invoice.invoice_number}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs mb-1">Tanggal</p>
              <p className="font-medium">{new Date(invoice.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Pelanggan</p>
            <p className="font-semibold">{invoice.customer_name}</p>
            <p className="text-sm text-muted-foreground">{invoice.phone}</p>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Detail Layanan</h3>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Layanan</th>
                    <th className="text-center p-3 font-medium">Qty</th>
                    <th className="text-right p-3 font-medium">Harga</th>
                    <th className="text-right p-3 font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">
                        <p className="font-medium">{item.service_name}</p>
                        {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                      </td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">Rp {Number(item.unit_price).toLocaleString("id-ID")}</td>
                      <td className="p-3 text-right font-medium">Rp {Number(item.total).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rp {Number(invoice.subtotal).toLocaleString("id-ID")}</span>
            </div>
            {Number(invoice.tax) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pajak</span>
                <span>Rp {Number(invoice.tax).toLocaleString("id-ID")}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rp {Number(invoice.total).toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Catatan</p>
              <p className="text-sm">{invoice.notes}</p>
            </div>
          )}

          {/* Payment Proof */}
          {invoice.payment_proof_url && (
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">Bukti Pembayaran</p>
              <img src={invoice.payment_proof_url} alt="Bukti Pembayaran" className="max-h-64 rounded-lg object-contain" />
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>Bit - Fast Fix No Fuss</p>
            <p>WhatsApp: 0813-9000-4553</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceView;
