# 🚀 Modern Personal Portfolio

Portofolio web modern, interaktif, dan berkinerja tinggi yang dibangun menggunakan **Next.js (App Router)**. Proyek ini dirancang untuk menampilkan profil, pengalaman, pendidikan, sertifikasi, tech stack, dan integrasi dinamis dengan proyek GitHub.

## ✨ Fitur Utama

- **⚡ Performa Tinggi & Optimal**: Menggunakan `next/image` untuk gambar, *dynamic imports* untuk komponen berat, dan *font display swap* untuk mencegah layout shift (FOIT).
- **🐙 Integrasi GitHub Dinamis**: Menarik data repositori publik secara otomatis dari GitHub API. Menggunakan sistem *Server-Side Fetching* dengan *Caching* 1 jam dari Next.js untuk mencegah terkena limitasi (*rate limit*) API GitHub.
- **✨ Animasi & Interaksi Modern**: 
  - Transisi halaman dan elemen yang mulus dengan **Framer Motion**.
  - Background konstelasi interaktif dengan **TS Particles**.
  - Kursor kustom modern yang beradaptasi dengan elemen yang dapat diklik (*mix-blend-mode*).
- **📜 Smooth Scrolling**: Pengalaman scrolling *butter-smooth* menggunakan **Lenis**.
- **📄 Penampil PDF Bawaan**: Melihat sertifikat (PDF) secara langsung di dalam modal tanpa perlu mengunduhnya (menggunakan `react-pdf`).
- **📱 Responsif Penuh**: Tampilan yang menyesuaikan dengan sempurna mulai dari layar HP hingga Desktop ultra-lebar. (Animasi berat dinonaktifkan otomatis di mobile untuk menghemat baterai).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & shadcn/ui
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Scroll Engine**: [Lenis](https://lenis.studiofreight.com/)
- **Renderer PDF**: [React-PDF](https://github.com/wojtekmaj/react-pdf)
- **Partikel**: [TS Particles](https://particles.js.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📂 Struktur Folder Proyek

```text
├── app/
│   ├── api/github/route.ts   # Server-side API Handler untuk fetch data GitHub
│   ├── globals.css           # Global CSS & Konfigurasi Tailwind/Variabel warna
│   ├── layout.tsx            # Root layout Next.js (Konfigurasi Font & Metadata)
│   └── page.tsx              # Halaman Utama (Merender semua section)
├── public/                   # Asset statis publik
│   ├── certificates/         # File PDF/JPG Sertifikat
│   ├── images/               # Foto profil (fotodiri.jpeg)
│   └── cv-farhan.pdf         # File CV yang bisa diunduh
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar & Footer
│   │   ├── sections/         # Bagian per bagian website (Hero, About, Projects, dll)
│   │   ├── shared/           # Komponen reusable (Cursor, Preloader, Modal PDF, SmoothScroll)
│   │   └── ui/               # Komponen dasar (seperti Button dari shadcn)
│   ├── data/
│   │   ├── portfolio.ts      # 🗄️ DATABASE LOKAL: Edit data teks portofolio di sini!
│   │   └── types.ts          # Definisi Type TypeScript
└── package.json              # Konfigurasi dependensi project
```

---

## ⚙️ Cara Menjalankan di Lokal (Development)

1. **Clone repositori ini** (jika belum ada di laptop Anda).
2. **Buka terminal** di dalam folder proyek.
3. **Instal dependensi** menggunakan `pnpm` (disarankan karena proyek ini memakai pnpm):
   ```bash
   pnpm install
   ```
4. **Jalankan server development**:
   ```bash
   pnpm dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📝 Cara Mengubah Data (Kustomisasi)

Jika Anda ingin mengubah konten teks, pengalaman, atau link pada website ini, Anda **hanya perlu mengedit satu file utama**:

👉 Buka file: `src/data/portfolio.ts`

Di dalam file tersebut, Anda bisa mengubah:
- Data Personal (Nama, Bio, Kontak)
- Pengalaman Kerja & Organisasi
- Riwayat Pendidikan
- Daftar Sertifikasi (Pastikan path file di dalam folder `public/certificates/` sesuai)
- Keahlian & Tech Stack

**Mengubah Username GitHub untuk Proyek:**
Secara default, ini mengambil repositori dari username GitHub yang terdaftar di API Route.
👉 Buka: `app/api/github/route.ts`
Ubah variabel `GITHUB_USERNAME` dengan username GitHub Anda.

---

## 🚀 Cara Deploy ke Vercel

Proyek ini sangat dioptimalkan untuk di-deploy secara instan menggunakan Vercel.

1. Push semua kode Anda ke repositori **GitHub**.
2. Kunjungi [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
3. Klik **Add New... > Project**.
4. Import repositori portofolio ini dari daftar repositori GitHub Anda.
5. Biarkan semua pengaturan *default* (Vercel akan otomatis mengenali ini sebagai proyek Next.js).
6. Klik **Deploy**.
7. Selesai! Portofolio Anda kini live dan dapat diakses publik. Setiap kali Anda melakukan `git push` ke GitHub, Vercel akan otomatis memperbarui situs web Anda.

---

## 💡 Catatan Optimasi
- Portofolio ini menggunakan `next: { revalidate: 3600 }` pada pengambilan data GitHub. Artinya, data repositori akan otomatis diperbarui setiap **1 jam** sekali. Ini menjaga kecepatan load website tetap instan dan menghindari pemblokiran dari GitHub API.
- Komponen berat diload menggunakan `next/dynamic` (`ssr: false`) agar metrik pemuatan halaman (*Core Web Vitals*) tetap hijau.
