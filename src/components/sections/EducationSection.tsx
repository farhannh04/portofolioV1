"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GraduationCap, Calendar, BookOpen, Award } from "lucide-react";
import { useState } from "react";

const EDUCATION_DECORATIONS = [
  { icon: BookOpen, label: "Belajar", color: "#3b82f6" },
  { icon: Award, label: "Prestasi", color: "#a855f7" },
  { icon: GraduationCap, label: "Lulus", color: "#10b981" },
];

function EducationCard({ item, index }: {
  item: { id: number; institution: string; degree: string; period: string; score: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-1"
    >
      <motion.div
        className="relative p-8 bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden h-full"
        animate={{
          borderColor: hovered ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.05)",
          y: hovered ? -5 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle at top right, rgba(59,130,246,0.08), transparent 60%)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center"
              animate={{ 
                backgroundColor: hovered ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)",
                scale: hovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <GraduationCap className="w-6 h-6 text-blue-400" />
            </motion.div>

            <motion.div
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20"
              animate={{ 
                scale: hovered ? 1.05 : 1,
                borderColor: hovered ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              {item.score}
            </motion.div>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-400 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-mono">{item.period}</span>
          </div>

          <h4 className="font-bold text-xl text-foreground mb-2 leading-tight">
            {item.degree}
          </h4>

          <p className="text-sm text-foreground/50 mb-6">
            {item.institution}
          </p>

          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-foreground/40">Aktif</span>
            </div>
          </div>
        </div>

        {EDUCATION_DECORATIONS.map((deco, i) => (
          <motion.div
            key={i}
            className="absolute text-foreground/[0.03] pointer-events-none"
            style={{
              top: `${20 + i * 30}%`,
              right: `${-5 + i * 5}%`,
              transform: `rotate(${-15 + i * 15}deg)`,
            }}
            animate={{
              opacity: hovered ? 0.06 : 0.03,
              scale: hovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <deco.icon className="w-24 h-24" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function EducationSection() {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
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
            <GraduationCap className="w-3.5 h-3.5" />
            Latar Belakang
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Pendidikan
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto items-stretch">
          {education.map((item: { id: number; institution: string; degree: string; period: string; score: string }, index: number) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-foreground/40 font-mono">
            <span className="text-blue-400">$</span> cat ./background.json --pretty
          </p>
        </motion.div>
      </div>
    </section>
  );
}
