FOTO PRODUK
===========

Saat ini foto produk berasal dari CDN Shopee (field "image_url" di
data/products.json, diizinkan via images.remotePatterns di next.config.ts).
Kartu yang image_url-nya kosong memakai placeholder (ikon gambar abu-abu).

Foto lokal tetap bisa dipakai sebagai pengganti:

1. Simpan foto produk ke folder ini, misalnya: rak-dapur.jpg
   (rasio 1:1, sisi >= 500px, format .jpg/.webp, ukuran < 200 KB).

2. Isi field "image_url" pada produk di data/products.json dengan path lokal:

   {
     "product_id": "P-...",
     "name": "...",
     "image_url": "/products/rak-dapur.jpg",
     ...
   }

3. Jalankan ulang `npm run dev` (atau `npm run build`) — placeholder
   otomatis berganti dengan foto tersebut.

Catatan: gunakan foto milik sendiri atau yang lisensinya jelas. Jangan
menyalin gambar dari situs lain.
