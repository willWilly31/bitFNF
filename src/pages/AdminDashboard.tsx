import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, LogOut, FileText, MessageCircle, Trash2, Eye, Send } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  completed: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  sent: "Terkirim",
  paid: "Dibayar",
  completed: "Selesai",
};

interface InvoiceItem {
  id?: string;
  service_name: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface ServiceRequest {
  id: string;
  customer_name: string;
  phone: string;
  brand: string;
  damage_type: string;
  description: string | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [creating, setCreating] = useState(false);

  // New invoice form
  const [newInvoice, setNewInvoice] = useState({
    customer_name: "",
    phone: "",
    notes: "",
    service_request_id: null as string | null,
  });
  const [items, setItems] = useState<InvoiceItem[]>([
    { service_name: "", description: "", quantity: 1, unit_price: 0, total: 0 },
  ]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchInvoices();
      fetchServiceRequests();
    }
  }, [isAdmin]);

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setInvoices(data);
  };

  const fetchServiceRequests = async () => {
    const { data } = await supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setServiceRequests(data as ServiceRequest[]);
  };

  const addItem = () => {
    setItems([...items, { service_name: "", description: "", quantity: 1, unit_price: 0, total: 0 }]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    (updated[idx] as any)[field] = value;
    if (field === "quantity" || field === "unit_price") {
      updated[idx].total = updated[idx].quantity * updated[idx].unit_price;
    }
    setItems(updated);
  };

  const calculateTotal = () => items.reduce((sum, item) => sum + item.total, 0);

  const createInvoice = async () => {
    if (!newInvoice.customer_name || !newInvoice.phone || items.length === 0) {
      toast.error("Lengkapi data invoice");
      return;
    }
    setCreating(true);
    try {
      const subtotal = calculateTotal();
      const tax = 0;
      const total = subtotal + tax;

      const { data: invoice, error } = await supabase
        .from("invoices")
        .insert({
          customer_name: newInvoice.customer_name,
          phone: newInvoice.phone,
          notes: newInvoice.notes || null,
          service_request_id: newInvoice.service_request_id,
          subtotal,
          tax,
          total,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      const invoiceItems = items.map((item) => ({
        invoice_id: invoice.id,
        service_name: item.service_name,
        description: item.description || null,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.total,
      }));

      const { error: itemsError } = await supabase.from("invoice_items").insert(invoiceItems);
      if (itemsError) throw itemsError;

      toast.success("Invoice berhasil dibuat!");
      setShowCreateDialog(false);
      setNewInvoice({ customer_name: "", phone: "", notes: "", service_request_id: null });
      setItems([{ service_name: "", description: "", quantity: 1, unit_price: 0, total: 0 }]);
      fetchInvoices();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  const updateInvoiceStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("invoices").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Status diubah ke ${statusLabels[status]}`);
      fetchInvoices();
    }
  };

  const deleteInvoice = async (id: string) => {
    if (!confirm("Yakin hapus invoice ini?")) return;
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Invoice dihapus");
      fetchInvoices();
    }
  };

  const sendWhatsApp = (invoice: any) => {
    const invoiceUrl = `${window.location.origin}/invoice/${invoice.id}`;
    const msg = `Halo ${invoice.customer_name},\n\nBerikut invoice perbaikan dari Bit:\n${invoiceUrl}\n\nNo. Invoice: ${invoice.invoice_number}\nTotal: Rp ${Number(invoice.total).toLocaleString("id-ID")}\n\nTerima kasih! 🙏`;
    window.open(`https://wa.me/${invoice.phone.replace(/^0/, "62")}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const convertToInvoice = (sr: ServiceRequest) => {
    setNewInvoice({
      customer_name: sr.customer_name,
      phone: sr.phone,
      notes: sr.description || "",
      service_request_id: sr.id,
    });
    setItems([{ service_name: sr.damage_type, description: `${sr.brand} - ${sr.damage_type}`, quantity: 1, unit_price: 0, total: 0 }]);
    setShowCreateDialog(true);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Bit Admin</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Tabs defaultValue="invoices">
          <TabsList>
            <TabsTrigger value="invoices">Invoice ({invoices.length})</TabsTrigger>
            <TabsTrigger value="requests">Request Servis ({serviceRequests.length})</TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Daftar Invoice</h2>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Buat Invoice</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Buat Invoice Baru</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Nama Pelanggan"
                        value={newInvoice.customer_name}
                        onChange={(e) => setNewInvoice({ ...newInvoice, customer_name: e.target.value })}
                      />
                      <Input
                        placeholder="No. Telepon"
                        value={newInvoice.phone}
                        onChange={(e) => setNewInvoice({ ...newInvoice, phone: e.target.value })}
                      />
                    </div>
                    <Textarea
                      placeholder="Catatan (opsional)"
                      value={newInvoice.notes}
                      onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                    />

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sm">Item Layanan</h3>
                        <Button type="button" variant="outline" size="sm" onClick={addItem}>
                          <Plus className="h-3 w-3 mr-1" /> Tambah
                        </Button>
                      </div>
                      {items.map((item, idx) => (
                        <Card key={idx} className="p-3">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <Input
                              placeholder="Nama Layanan"
                              value={item.service_name}
                              onChange={(e) => updateItem(idx, "service_name", e.target.value)}
                            />
                            <Input
                              placeholder="Deskripsi"
                              value={item.description}
                              onChange={(e) => updateItem(idx, "description", e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2 items-center">
                            <Input
                              type="number"
                              placeholder="Qty"
                              value={item.quantity}
                              onChange={(e) => updateItem(idx, "quantity", parseInt(e.target.value) || 1)}
                            />
                            <Input
                              type="number"
                              placeholder="Harga"
                              value={item.unit_price}
                              onChange={(e) => updateItem(idx, "unit_price", parseFloat(e.target.value) || 0)}
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Rp {item.total.toLocaleString("id-ID")}</span>
                              {items.length > 1 && (
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(idx)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-bold">Total</span>
                      <span className="text-lg font-bold">Rp {calculateTotal().toLocaleString("id-ID")}</span>
                    </div>

                    <Button className="w-full" onClick={createInvoice} disabled={creating}>
                      {creating ? "Menyimpan..." : "Buat Invoice"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Invoice</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bukti</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-xs">{inv.invoice_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{inv.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{inv.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">Rp {Number(inv.total).toLocaleString("id-ID")}</TableCell>
                      <TableCell>
                        <Select value={inv.status} onValueChange={(v) => updateInvoiceStatus(inv.id, v)}>
                          <SelectTrigger className="h-7 w-28">
                            <Badge className={`${statusColors[inv.status]} text-xs`}>{statusLabels[inv.status]}</Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Terkirim</SelectItem>
                            <SelectItem value="paid">Dibayar</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {inv.payment_proof_url ? (
                          <a href={inv.payment_proof_url} target="_blank" rel="noopener noreferrer">
                            <Badge variant="outline" className="text-xs cursor-pointer">Lihat</Badge>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(`/invoice/${inv.id}`, "_blank")}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => sendWhatsApp(inv)}>
                            <MessageCircle className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteInvoice(inv.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {invoices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Belum ada invoice
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Service Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <h2 className="text-lg font-semibold">Request Servis dari Landing Page</h2>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Merk</TableHead>
                    <TableHead>Kerusakan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceRequests.map((sr) => (
                    <TableRow key={sr.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{sr.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{sr.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{sr.brand}</TableCell>
                      <TableCell>{sr.damage_type}</TableCell>
                      <TableCell className="text-xs">{new Date(sr.created_at).toLocaleDateString("id-ID")}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => convertToInvoice(sr)}>
                          <FileText className="h-3.5 w-3.5 mr-1" /> Buat Invoice
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {serviceRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Belum ada request servis
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
