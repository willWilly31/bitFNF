## Architecture

### Database Tables
1. **service_requests** — Data dari form servis (merk, kerusakan, nama, telp)
2. **invoices** — Invoice utama (nomor, total, status, customer info)
3. **invoice_items** — Item per invoice (layanan, harga, qty)
4. **user_roles** — Role admin (terpisah dari auth.users)

### Auth & Roles
- Admin login via email/password
- Role-based access dengan `has_role()` security definer function
- RLS policies untuk proteksi data

### Pages
1. **`/admin/login`** — Login admin
2. **`/admin`** — Dashboard admin (list invoices, create/edit invoice, update status)
3. **`/invoice/:id`** — Public invoice view (customer bisa lihat & upload bukti bayar)

### Features
- ✅ Status tracking: Draft → Sent → Paid → Completed
- ✅ PDF download/print invoice
- ✅ WhatsApp kirim link invoice ke pelanggan
- ✅ Payment proof upload (customer upload bukti transfer)
- ✅ Form servis di landing page auto-create service_request
- ✅ Admin bisa convert service_request → invoice atau buat manual

### Storage
- Bucket `payment-proofs` untuk bukti transfer