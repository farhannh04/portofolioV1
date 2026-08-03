"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Briefcase, Users, Calendar } from "lucide-react";

export default function ExperienceSection() {
  const { experience } = PORTFOLIO_DATA;

  // Filter data berdasarkan tipe
  const workExperience = experience.filter((item) => item.type === "work");
  const orgExperience = experience.filter((item) => item.type === "organization");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
            Pengalaman
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Perjalanan Karir & Organisasi
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Kolom Kiri: Pengalaman Kerja & Magang */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-blue-500 w-6 h-6" />
              <h3 className="text-2xl font-semibold">Kerja & Magang</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {workExperience.map((item) => (
                <motion.div key={item.id} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                     <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow relative z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 text-slate-900">{item.role}</h4>
                    <span className="text-blue-600 text-sm font-semibold block mb-4">{item.company}</span>
                    <ul className="list-disc list-outside ml-4 text-slate-700 text-sm space-y-2">
                      {item.responsibilities.map((resp: string, idx: number) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Kolom Kanan: Pengalaman Organisasi */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-blue-500 w-6 h-6" />
              <h3 className="text-2xl font-semibold">Organisasi</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {orgExperience.map((item) => (
                <motion.div key={item.id} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                     <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow relative z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 text-slate-900">{item.role}</h4>
                     <span className="text-blue-600 text-sm font-medium block mb-4">{item.company}</span>
                    <ul className="list-disc list-outside ml-4 text-slate-700 text-sm space-y-2">
                      {item.responsibilities.map((resp: string, idx: number) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}