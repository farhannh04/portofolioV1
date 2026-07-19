"use client";

import { motion } from "framer-motion";
import { Mail, Code, Database, Monitor, Server, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import Link from "next/link";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function HeroSection() {
  const { personal } = PORTFOLIO_DATA;

  // Variants untuk animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Menampilkan elemen berurutan
        delayChildren: 0.8, // Delay disesuaikan agar menunggu loading screen terbuka selesai
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Decor statis dihapus karena sekarang memakai Cursor Glow yang interaktif */}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
          
            {/* Teks Content */}
          <motion.div
            className="flex-1 text-center lg:text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-blue-500 font-medium tracking-wide uppercase text-sm md:text-base mb-2">
                Halo, Saya
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                {personal.name}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground/90">
                {personal.role}
              </h3>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {personal.description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              {/* Tombol LinkedIn (sebelumnya Lihat Portofolio) */}
              <Button asChild size="lg" className="w-full sm:w-auto group bg-blue-600 hover:bg-blue-700 text-white">
                <a href="https://www.linkedin.com/in/mfarhannurhidayat/" target="_blank" rel="noreferrer">
                  <LinkedinIcon className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Profil LinkedIn
                </a>
              </Button>
              
              {/* Tombol Hubungi Saya */}
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto group hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                <Link href="#contact">
                  <Mail className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Hubungi Saya
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual / Animasi Interaktif Orbit */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Lingkaran Pusat (Center Orb) */}
              <motion.div 
                className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 z-10 flex items-center justify-center cursor-pointer"
                animate={{ 
                  boxShadow: ["0px 0px 40px rgba(59,130,246,0.3)", "0px 0px 80px rgba(59,130,246,0.6)", "0px 0px 40px rgba(59,130,246,0.3)"]
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.div>

              {/* Cincin Orbit (Orbit Rings) */}
              <div className="absolute inset-0 border border-blue-500/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-10 border border-blue-500/10 rounded-full" />
              <div className="absolute inset-20 border border-blue-500/5 rounded-full" />

              {/* Ikon Mengorbit (Orbiting Elements) */}
              {[
                { icon: Database, rotationStart: 0 },
                { icon: Monitor, rotationStart: 90 },
                { icon: Server, rotationStart: 180 },
                { icon: Globe, rotationStart: 270 },
              ].map((Item, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  initial={{ rotate: Item.rotationStart }}
                  animate={{ rotate: Item.rotationStart + 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-card border border-border shadow-lg rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-500/50"
                    whileHover={{ scale: 1.2 }}
                    // Membatalkan rotasi agar ikon tetap tegak
                    initial={{ rotate: -Item.rotationStart }}
                    animate={{ rotate: -(Item.rotationStart + 360) }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Item.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}