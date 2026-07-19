"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Award, Eye } from "lucide-react";

const CertificateModal = dynamic(
  () => import("@/components/shared/CertificateModal"),
  { ssr: false }
);

export default function CertificationsSection() {
  const { certifications } = PORTFOLIO_DATA;
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);

  const openModal = (cert: (typeof certifications)[0]) => {
    setSelectedCert(cert);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = "unset";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <section id="certifications" className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
              Pencapaian
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Sertifikasi & Pelatihan
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {certifications.map((cert: any, index: number) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                onClick={() => openModal(cert)}
                className={`group relative z-10 p-6 md:p-8 rounded-3xl bg-card border border-border shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-500/50 flex flex-col ${
                  index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {cert.date}
                  </span>
                </div>
                <h4 className="font-bold text-xl leading-tight mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cert.title}
                </h4>
                <p className="text-sm text-slate-600 mb-6 flex-grow">
                  {cert.issuer}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="text-sm font-semibold text-slate-800">
                    <span className="font-normal text-slate-500 mr-1">Hasil:</span>{cert.role}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <Eye className="w-4 h-4" />
                    Lihat Dokumen
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedCert && (
        <CertificateModal key={selectedCert.id} cert={selectedCert} onClose={closeModal} />
      )}
    </>
  );
}
