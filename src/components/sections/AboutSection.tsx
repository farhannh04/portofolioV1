"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GraduationCap, Code2, Briefcase } from "lucide-react";

export default function AboutSection() {
  const { about } = PORTFOLIO_DATA;

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <GraduationCap className="w-7 h-7 text-blue-600" />;
      case 1: return <Code2 className="w-7 h-7 text-blue-600" />;
      case 2: return <Briefcase className="w-7 h-7 text-blue-600" />;
      default: return null;
    }
  };

  // Menghapus emoji dari teks data
  const cleanText = (text: string) => text.split(" ").slice(1).join(" ");

  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Kolom Kiri: Teks Bio */}
          <motion.div
            className="flex-1 space-y-6 text-center lg:text-right lg:pr-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
                {about.title}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                Mengenal Saya Lebih Dekat
              </h2>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed text-center lg:text-right">
              {about.description}
            </p>
          </motion.div>

          {/* Kolom Tengah: Foto Organik (Blob) */}
          <motion.div
            className="w-72 h-72 lg:w-96 lg:h-96 shrink-0 relative group perspective-1000"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Glow Animasi di Belakang */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />

            {/* Foto Utama dengan Bentuk Organik */}
            <Image
              src="/images/fotodiri.jpeg"
              alt="Foto Profil Farhan"
              width={384}
              height={384}
              priority
              className="w-full h-full object-cover rounded-[60%_40%_30%_70%/60%_30%_70%_40%] group-hover:rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border-4 border-background shadow-2xl relative z-10 transition-all duration-1000 ease-in-out grayscale group-hover:grayscale-0"
            />
          </motion.div>

          {/* Kolom Kanan: Poin Highlight */}
          <motion.div
            className="flex-1 space-y-8 lg:pl-6 w-full max-w-sm mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col gap-6">
              {about.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-center gap-5 group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {getIcon(index)}
                  </div>
                  <h4 className="font-semibold text-lg text-foreground leading-snug group-hover:text-blue-500 transition-colors">
                    {cleanText(highlight)}
                  </h4>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}