"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="py-24 bg-muted/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
            Kontak
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Mari Berkolaborasi!
          </h2>
          <p className="text-foreground/80">
            Jangan ragu untuk menghubungi saya melalui informasi di bawah ini atau kirimkan pesan secara langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Informasi Kontak */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground/60 mb-1">Email</h4>
                <a href={`mailto:${personal.email}`} className="text-lg font-semibold text-foreground hover:text-blue-500 transition-colors">
                  {personal.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground/60 mb-1">Telepon / WhatsApp</h4>
                <a href={`https://wa.me/${personal.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-lg font-semibold text-foreground hover:text-blue-500 transition-colors">
                  {personal.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground/60 mb-1">Lokasi</h4>
                <p className="text-lg font-semibold text-foreground">
                  {personal.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground/60 mb-1">Jam Kerja</h4>
                <p className="text-lg font-semibold text-foreground">
                  Senin - Jumat, 09:00 - 17:00
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Kontak (UI Alternatif) */}
          <motion.div
            className="p-8 rounded-2xl border border-border bg-background shadow-lg relative z-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Nama Lengkap</label>
                <input 
                  id="name" 
                  type="text" 
                  placeholder="Masukkan nama Anda" 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="nama@email.com" 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Pesan</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  placeholder="Tulis pesan Anda di sini..." 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <Button type="button" className="w-full h-12 text-base group">
                Kirim Pesan
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}