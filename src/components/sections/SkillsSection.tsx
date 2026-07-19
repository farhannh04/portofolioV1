"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Code2, Database, BarChart3, Palette, Wrench, Sparkles } from "lucide-react";

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;

  // Mapping icon berdasarkan nama kategori
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web & Backend": return <Code2 className="w-5 h-5" />;
      case "Database": return <Database className="w-5 h-5" />;
      case "Data Analysis": return <BarChart3 className="w-5 h-5" />;
      case "Design & Multimedia": return <Palette className="w-5 h-5" />;
      case "Tools": return <Wrench className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
            Keterampilan
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Keahlian & Teknologi
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Kolom Hard Skills (Mendominasi Grid) */}
          <motion.div 
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Code2 className="text-blue-500 w-6 h-6" />
              Hard Skills
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.hardSkills.map((skillGroup: any, idx: number) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="p-5 rounded-xl border border-border bg-card shadow-sm relative z-10"
                >
                  <div className="flex items-center gap-3 mb-4 text-blue-600">
                    {getCategoryIcon(skillGroup.category)}
                    <h4 className="font-semibold text-slate-900">{skillGroup.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item: string, itemIdx: number) => (
                      <span 
                        key={itemIdx}
                        className="px-3 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Kolom Soft Skills */}
          <motion.div 
            className="lg:col-span-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="text-blue-500 w-6 h-6" />
              Soft Skills
            </h3>
            
            <div className="flex flex-col gap-3">
              {skills.softSkills.map((skill: string, idx: number) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card shadow-sm hover:border-blue-500/50 transition-colors relative z-10"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium text-slate-900">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}