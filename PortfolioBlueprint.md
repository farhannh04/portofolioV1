# Struktur Portofolio Web - Muhammad Farhan Nur Hidayat
Didesain untuk implementasi menggunakan framework Next.js.

## 1. Navigasi (`<Navbar />`)
*   **Logo/Nama:** Farhan / M. Farhan N.H.
*   **Menu Links:**
    *   Beranda (`#home`)
    *   Tentang (`#about`)
    *   Pengalaman (`#experience`)
    *   Pendidikan & Lisensi (`#education`)
    *   Keterampilan (`#skills`)
    *   Kontak (`#contact`)
*   **Call to Action (CTA):** Tombol "Unduh CV" (Tautan ke file PDF CV).

---

## 2. Bagian Beranda (`<HeroSection />`)
*   **Greeting:** "Halo, Saya Muhammad Farhan Nur Hidayat"
*   **Headline/Title:** "Mahasiswa Sistem Informasi | Web Backend Developer | IT Project Manager"
*   **Deskripsi Singkat:** Membangun solusi backend yang efisien dengan ekosistem Laravel dan merancang arsitektur database yang solid, dikombinasikan dengan keterampilan manajemen proyek TI.
*   **Tombol Aksi:** 
    *   "Lihat Portofolio" (Scroll ke bawah)
    *   "Hubungi Saya" (Link ke LinkedIn/Email)
*   **Visual:** Foto profil profesional atau ilustrasi vektor 3D bertema web development/manajemen.

---

## 3. Bagian Tentang Saya (`<AboutSection />`)
*   **Judul:** Tentang Saya
*   **Deskripsi Panjang:**
    "Saya adalah mahasiswa aktif program studi S1 Sistem Informasi di Universitas Bina Sarana Informatika (IPK 3.88). Saya merupakan individu yang proaktif dengan kemampuan interpersonal yang baik. Berbekal minat mendalam di bidang pengembangan *backend* web (terutama Laravel) dan perancangan arsitektur database, saya juga aktif di organisasi kemahasiswaan untuk mengasah keterampilan manajemen proyek TI. Saya selalu terbuka untuk mengeksplorasi tantangan baru di industri teknologi."
*   **Highlight Poin:**
    *   🎓 S1 Sistem Informasi (Semester 5)
    *   💻 Backend Development Enthusiast
    *   📊 IT Project Management

---

## 4. Bagian Pengalaman Kerja & Organisasi (`<ExperienceSection />`)
*Dapat dibuat dengan desain antarmuka Timeline (Garis Waktu) atau Kartu (Cards).*

### Pengalaman Kerja (Kerja & Magang)
*   **Mentor Web Programming (Laravel) - Magang**
    *   *Sekolah Menengah Kejuruan 20 Jakarta | Okt 2025 - Jan 2026*
    *   Membimbing siswa RPL dalam pengembangan backend Laravel (arsitektur MVC, routing, middleware, database migrations, CRUD, autentikasi).
    *   Membina pengembangan 2 proyek web dasar siswa sesuai *project timeline* dan struktur pemrograman.
*   **Multimedia Intern - Magang**
    *   *Kementerian Kesehatan Republik Indonesia | Jan 2019 - Feb 2019*
    *   Merancang dan memproduksi poster edukasi dan video animasi kesehatan untuk kampanye masyarakat.
    *   Mengeksekusi aset grafis menggunakan berbagai software multimedia.

### Pengalaman Organisasi
*   **Ketua Divisi Litbang**
    *   *Himpunan Mahasiswa Sistem Informasi (HIMSI) | Mar 2025 - Mar 2026*
    *   Memimpin 10 anggota tim, melakukan evaluasi berbasis data, dan mengelola logistik/administrasi perizinan kegiatan.
*   **Anggota Divisi RSDM**
    *   *Himpunan Mahasiswa Sistem Informasi (HIMSI) | Okt 2023 - Mar 2025*
    *   Membantu proses *Open Recruitment*, merencanakan program *upgrading*, dan menginisiasi kegiatan *bonding*.

---

## 5. Bagian Pendidikan & Sertifikasi (`<EducationCertificationSection />`)

### Pendidikan
*   **S1 Sistem Informasi** - Universitas Bina Sarana Informatika (Sep 2023 - Sekarang) | IPK: 3.88
*   **Kompetensi Keahlian Multimedia** - SMK Bina Putra Jakarta (2017 - 2020) | Nilai Rata-rata: 85.4

### Pelatihan & Sertifikat (Grid Antarmuka)
*   **IT Bootcamp: Software Development For Industry** (UBSI, Juli 2025) - *Project Manager*
*   **Uji Kompetensi Basis Data** (PT Jidoka System Indonesia, Juli 2024) - *Skor: 92*
*   **Academic Training Skill and Experience** (HIMSI UBSI, Mar 2024) - *Project Manager*
*   **HIMSI Leadership Training** (Nov 2023) - *Peserta*

---

## 6. Bagian Keterampilan (`<SkillsSection />`)
*Dikelompokkan menggunakan Tags, Progress Bars, atau Ikon (seperti ikon Devicon/FontAwesome).*

*   **Hard Skills:**
    *   **Web & Backend:** PHP, Laravel (MVC, Routing, Migrations)
    *   **Database:** MySQL, Perancangan Arsitektur Basis Data
    *   **Data Analysis:** Python (Jupyter Notebook, Pandas)
    *   **Design & Multimedia:** Tata Letak Antarmuka, Desain Grafis, Animasi, Editor Visual
    *   **Tools:** Microsoft Office, Google Suite
*   **Soft Skills:**
    *   Project Management, Kerja Sama Tim, Komunikasi, Berpikir Analitis & Pemecahan Masalah, Manajemen Waktu.

---

## 7. Bagian Kontak (`<ContactSection />`)
*   **Teks Ajakan:** "Mari berkolaborasi! Jangan ragu untuk menghubungi saya melalui kontak di bawah ini."
*   **Informasi Kontak:**
    *   📧 Email: farhan@gmail.com
    *   📞 Telepon/WA: +62 85773299060
    *   📍 Lokasi: Jakarta Utara, DKI Jakarta, 14420
*   **Social Links:**
    *   LinkedIn: linkedin.com/in/mfarhannurhidayat
    *   GitHub: (Dapat ditambahkan nanti jika ada)
*   **Bentuk UI Alternatif:** Formulir Kontak (Nama, Email, Pesan).

---
## Saran Direktori Proyek Next.js
Untuk membangun struktur di atas, berikut adalah rancangan folder komponen yang bisa diterapkan:

```text
/src
 ├── /app
 │    ├── layout.tsx
 │    ├── page.tsx (halaman utama merender semua section di bawah)
 ├── /components
 │    ├── Navbar.tsx
 │    ├── HeroSection.tsx
 │    ├── AboutSection.tsx
 │    ├── ExperienceSection.tsx
 │    ├── EducationSection.tsx
 │    ├── SkillsSection.tsx
 │    ├── ContactSection.tsx
 │    └── Footer.tsx
 ├── /public
 │    ├── images/ (untuk foto profil, logo sertifikat)
 │    └── cv-farhan.pdf (untuk diunduh)
```


---

# 19. Integrasi Struktur Konten dengan Blueprint

Dokumen ini menghubungkan struktur portfolio dengan implementasi teknologi modern sehingga dapat langsung dijadikan acuan pengembangan.

## Struktur Halaman Final

```text
Landing Page
├── Navbar
├── Hero
├── Featured Projects
├── About
├── Experience
├── Education & Certifications
├── Skills
├── Contact
└── Footer
```

## Mapping Component

| Section | Component | Teknologi |
|---|---|---|
| Navbar | Navbar.tsx | Next.js + Tailwind |
| Hero | HeroSection.tsx | Framer Motion |
| Projects | ProjectSection.tsx | Card + Modal |
| About | AboutSection.tsx | Responsive Grid |
| Experience | ExperienceSection.tsx | Timeline |
| Education | EducationSection.tsx | Grid |
| Skills | SkillsSection.tsx | Devicon |
| Contact | ContactSection.tsx | Contact Form |

# 20. Arsitektur Folder

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── shared/
├── hooks/
├── lib/
├── data/
├── types/
├── constants/
├── styles/
└── utils/

public/
├── images/
├── icons/
├── certificates/
└── cv.pdf
```

# 21. Technology Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lenis
- GSAP (opsional)
- Three.js / React Three Fiber (opsional)
- Lucide React
- Devicon
- Vercel

# 22. Checklist

- [ ] Setup Project
- [ ] Setup Tailwind
- [ ] Install shadcn/ui
- [ ] Install Framer Motion
- [ ] Bangun semua Section
- [ ] Responsive
- [ ] SEO
- [ ] Performance

Dokumen ini menjadi master blueprint implementasi portfolio.
