"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GraduationCap, Calendar } from "lucide-react";

export default function EducationSection() {
  const { education } = PORTFOLIO_DATA;

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
    <section id="education" className="py-24 bg-muted/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
            Latar Belakang
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Pendidikan
          </h2>
        </div>

        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item: any) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants} 
                className="relative overflow-hidden p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Background Watermark Icon */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-foreground group-hover:text-blue-500 group-hover:opacity-[0.08] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                  <GraduationCap className="w-48 h-48" />
                </div>
                
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-4">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{item.period}</span>
                  </div>
                  
                  <h4 className="font-bold text-2xl mb-2 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {item.degree}
                  </h4>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-slate-600 text-base font-medium">{item.institution}</span>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      {item.score}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
