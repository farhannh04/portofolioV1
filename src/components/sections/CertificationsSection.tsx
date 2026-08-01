"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Award, Eye, Calendar } from "lucide-react";

const CertificateModal = dynamic(
  () => import("@/components/shared/CertificateModal"),
  { ssr: false }
);

export default function CertificationsSection() {
  const { certifications } = PORTFOLIO_DATA;
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <>
      <section id="certifications" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium mb-4"
            >
              <Award className="w-3.5 h-3.5" />
              Pencapaian
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Sertifikasi & Pelatihan
              </span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {certifications.map((cert: (typeof certifications)[0], index: number) => {
              const isHovered = hoveredId === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredId(cert.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedCert(cert)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className="relative p-6 bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden"
                    animate={{
                      borderColor: isHovered ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.05)",
                      y: isHovered ? -3 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at left, rgba(59,130,246,0.05), transparent 70%)" }}
                    />

                    <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: isHovered ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)",
                          color: "#60a5fa",
                        }}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Award className="w-5 h-5" />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-1 leading-tight">
                          {cert.title}
                        </h4>
                        <p className="text-sm text-foreground/50">{cert.issuer}</p>
                      </div>

                      <div className="flex items-center gap-4 md:flex-shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-foreground/40">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="font-mono">{cert.date}</span>
                        </div>

                        <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {cert.role}
                        </span>

                        <motion.div
                          className="flex items-center gap-1 text-xs text-blue-400"
                          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Lihat</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedCert && (
        <CertificateModal key={selectedCert.id} cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </>
  );
}
