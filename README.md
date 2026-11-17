# Shopee Harian

Landing page afiliasi Shopee: katalog produk **home living** (dapur,
organizer, kebersihan) dengan pencarian, filter kategori/sub kategori, tab
rekomendasi, serta strip flash sale berhitung mundur. Tampilan meniru
jagonya.my.id dan dioptimalkan mobile-first.

> Niche beauty (skincare, makeup, parfum, haircare) diparkir untuk fase 2.
> Kodenya masih ada di backup `~/Projects/affiliatelandingpage.bak-20261117`.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (token `@theme` di `app/globals.css`)
- Data produk dari file JSON lokal — tanpa database, tanpa API
- Semua halaman di-prerender statis saat `next build`

## Menjalankan

```bash
npm install
cp .env.example .env.local   # isi NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run lint && npm run build
npm run start                # uji hasil produksi
```

## Struktur

```
app/
  page.tsx              # beranda: hero, kategori, flash sale, katalog
  dapur/page.tsx        # route kategori (statis, satu file per kategori)
  organizer/page.tsx
  kebersihan/page.tsx
  layout.tsx            # font Roboto, metadata, theme color
  robots.ts, sitemap.ts # SEO otomatis
  globals.css           # design token & utility kecil (scrollbar-hide, flash-pulse)
components/
  site-header.tsx       # header oranye + pencarian + bar disclosure afiliasi
  hero-banner.tsx       # judul besar + tagline
  category-row.tsx      # deretan bulatan kategori
  flash-sale.tsx        # strip produk flash sale + countdown WIB
  catalog.tsx           # sidebar kiri + grid produk
  product-explorer.tsx  # tab, filter, pencarian, sortir (client component)
  product-card.tsx      # kartu produk + placeholder foto
  category-view.tsx     # isi halaman kategori (dipakai 3 route di atas)
  benefits.tsx, footer.tsx
lib/
  config.ts             # semua teks, kategori, sub kategori, benefit
  types.ts              # Product, Category, TabKey
  products.ts           # validasi data/products.json → products[]
  catalog-store.ts      # state pencarian/filter/tab
  format.ts             # formatRupiah, formatSold, discountPercent
data/products.json      # data produk (50 produk home living, dari export affiliate)
```

## Menambah / mengubah produk

Edit `data/products.json` lalu build ulang. Data ini hasil export
`tools/export_landing_page.py` dari database affiliate (lihat
`~/workspace/threads-affiliate-system/`). Field wajib: `product_id`, `name`,
`category` (`dapur` | `organizer` | `kebersihan`), `affiliate_link` (harus
`https:`). Opsional: `price_min` (harga boleh kosong — kartu menampilkan
"Cek Harga di Shopee"), `rating`, `reviews`, `image_url` (URL CDN Shopee,
diizinkan via `images.remotePatterns` di `next.config.ts`), `price_display`,
`product_url`. Export **tidak punya** `sold`, `originalPrice`, `featured`,
atau `tag` — jangan dikarang; kartu menampilkan jumlah ulasan sebagai ganti
"Terjual" dan flash sale memakai 8 produk rating tertinggi.

Entri yang tidak valid **dilewati** dengan peringatan di console, jadi salah ketik
tidak menggagalkan build.

> **Wajib:** ganti seluruh `affiliateUrl` contoh (`https://shopee.co.id`) dengan link
> afiliasi milikmu sendiri.

## Foto produk

Kartu memakai foto dari `image_url` (CDN Shopee) bila ada, dan placeholder SVG
bila kosong. Foto lokal tetap bisa dipakai: simpan ke `public/products/` lalu
isi `"image_url": "/products/nama-file.jpg"`; detail ada di
`public/products/README.txt`.

## Menambah kategori

1. Tambah entri di `CATEGORIES` dan `CATEGORY_PAGES` (`lib/config.ts`).
2. Tambah id ke `Category` (`lib/types.ts`) dan `CATEGORY_IDS` (`lib/products.ts`).
3. Buat `app/<id>/page.tsx` berisi `CategoryView` + `categoryMetadata` agar route
   tetap statis dan slug asing langsung 404.

## Deploy

1. Push repo ke GitHub, impor ke Vercel (framework terdeteksi otomatis).
2. Set env `NEXT_PUBLIC_SITE_URL` = domain produksi (dipakai metadata, canonical,
   `robots.txt`, dan `sitemap.xml`).
3. Deploy. `next build` harus lolos tanpa error.

## Pencarian & filter

- Kolom pencarian di header mencocokkan **nama produk dan kategori**, dan
  kata kunci ditulis ke URL `?q=` saat form di-submit (bisa dibagikan/bookmark,
  sesuai `SearchAction` di JSON-LD).
- Tab `Rekomendasi / Terlaris / Terbaru` mengurutkan hasil; "Terlaris"
  memakai jumlah ulasan (export tidak punya kolom terjual); sub kategori
  disimpan **per kategori**, jadi memilih "Pisau & Talenan" di `/dapur` tidak
  ikut terpakai di `/organizer`.

## Kualitas & aksesibilitas

Audit Lighthouse (production build, mobile, beranda):

| Kategori      | Skor |
| ------------- | ---- |
| Performance   | 97   |
| SEO           | 100  |
| Accessibility | 96   |

Skor aksesibilitas tertahan hanya oleh audit `color-contrast`: warna merek
referensi `--color-shopee-orange: #ee4e2e` punya rasio kontras 3,64:1 terhadap
putih, sedangkan WCAG AA meminta 4,5:1 untuk teks kecil. Palet sengaja
dipertahankan agar tampilan tetap identik dengan referensi. Bila ingin mengejar
100, ganti token itu menjadi `#d73211` (rasio ~4,99:1) di `app/globals.css` —
semua `bg-shopee-orange`/`text-shopee-orange` ikut berubah.
