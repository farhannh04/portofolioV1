"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useState } from "react";

const TECH_DATA: Record<string, { color: string; abbr: string; category: string }> = {
  "Laravel": { color: "#FF2D20", abbr: "L", category: "Frameworks" },
  "React": { color: "#61DAFB", abbr: "R", category: "Frameworks" },
  "Next.js": { color: "#ffffff", abbr: "N", category: "Frameworks" },
  "Node JS": { color: "#339933", abbr: "N", category: "Frameworks" },
  "JavaScript": { color: "#F7DF1E", abbr: "JS", category: "Languages" },
  "TypeScript": { color: "#3178C6", abbr: "TS", category: "Languages" },
  "PHP": { color: "#777BB4", abbr: "P", category: "Languages" },
  "Python": { color: "#3776AB", abbr: "Py", category: "Languages" },
  "MySQL": { color: "#4479A1", abbr: "DB", category: "Data & Tools" },
  "Git": { color: "#F05032", abbr: "G", category: "Data & Tools" },
  "GitHub": { color: "#888888", abbr: "GH", category: "Data & Tools" },
  "Jupyter Notebook": { color: "#DA5B0B", abbr: "JN", category: "Data & Tools" },
  "Pandas": { color: "#150458", abbr: "Pd", category: "Data & Tools" },
};

const TechCard = ({ tech, index }: { tech: string; index: number }) => {
  const data = TECH_DATA[tech] || { color: "#6b7280", abbr: tech[0], category: "Tech" };
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <motion.div
        className="relative p-4 bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-xl cursor-pointer overflow-hidden"
        animate={{
          borderColor: hovered ? `${data.color}50` : "rgba(255,255,255,0.05)",
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${data.color}10, transparent 70%)`,
          }}
        />
        
        <div className="relative flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{
              backgroundColor: hovered ? `${data.color}20` : `${data.color}10`,
              color: data.color,
              borderWidth: 1,
              borderColor: hovered ? `${data.color}40` : "transparent",
            }}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {data.abbr}
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{tech}</p>
            <p className="text-[10px] text-foreground/40 uppercase tracking-wider">{data.category}</p>
          </div>

          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: data.color }}
            animate={{
              opacity: hovered ? [0.4, 1, 0.4] : 0.4,
              boxShadow: hovered ? `0 0 8px ${data.color}` : "none",
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function TechStackSection() {
  const { techStack } = PORTFOLIO_DATA;
  
  const grouped = techStack.reduce<Record<string, string[]>>((acc, tech) => {
    const cat = TECH_DATA[tech]?.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tech);
    return acc;
  }, {});

  const categoryOrder = ["Frameworks", "Languages", "Data & Tools"];
  const sortedGroups = categoryOrder
    .filter(cat => grouped[cat])
    .map(cat => ({ name: cat, items: grouped[cat] }));

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
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
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Tech Stack
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Tools & Technologies
            </span>
          </h2>
          <p className="text-sm text-foreground/50 mt-3 max-w-md mx-auto">
            Technologies I use to build modern web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sortedGroups.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + gi * 0.1, duration: 0.5 }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-4 pl-1">
                {group.name}
              </p>
              <div className="flex flex-col gap-3">
                {group.items.map((tech, index) => (
                  <TechCard key={tech} tech={tech} index={gi * 5 + index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-foreground/40 font-mono">
            <span className="text-blue-400">$</span> ls ./stack --color-coded --interactive
          </p>
        </motion.div>
      </div>
    </section>
  );
}