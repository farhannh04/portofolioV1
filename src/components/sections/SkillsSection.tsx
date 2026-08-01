"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Code2, Database, BarChart3, Palette, Wrench, Sparkles } from "lucide-react";

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

const CATEGORY_COLORS: Record<string, string> = {
  "Web & Backend": "#3b82f6",
  "Database": "#f59e0b",
  "Data Analysis": "#10b981",
  "Design & Multimedia": "#a855f7",
  "Tools": "#6b7280",
};

const BENTO_LAYOUT = [
  { span: "lg:col-span-2", big: true },
  { span: "lg:col-span-1", big: false },
  { span: "lg:col-span-1", big: false },
  { span: "lg:col-span-2", big: true },
  { span: "lg:col-span-3", big: false },
];

function BentoCard({ group, layout, index }: {
  group: { category: string; items: string[] };
  layout: { span: string; big: boolean };
  index: number;
}) {
  const color = CATEGORY_COLORS[group.category] || "#3b82f6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`${layout.span} group`}
    >
      <div className={`relative h-full bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 ${layout.big ? "p-7" : "p-6"}`}>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at top left, ${color}10, transparent 60%)` }}
        />

        <div className="relative h-full flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div
              className={`${layout.big ? "w-12 h-12" : "w-10 h-10"} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
              style={{ backgroundColor: `${color}15`, color }}
            >
              {getCategoryIcon(group.category)}
            </div>
            <div>
              <h4 className={`font-semibold text-foreground ${layout.big ? "text-base" : "text-sm"}`}>
                {group.category}
              </h4>
              <p className="text-[10px] text-foreground/40">{group.items.length} skills</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {group.items.map((item: string, j: number) => (
              <motion.span
                key={j}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + j * 0.04 }}
                whileHover={{ scale: 1.07, y: -2 }}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-foreground/70 border border-white/5 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all cursor-default"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
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
            <Code2 className="w-3.5 h-3.5" />
            Keterampilan
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Keahlian & Teknologi
            </span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {skills.hardSkills.map((group: { category: string; items: string[] }, i: number) => (
              <BentoCard
                key={i}
                group={group}
                layout={BENTO_LAYOUT[i] || { span: "lg:col-span-1", big: false }}
                index={i}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8"
          >
            <div className="relative bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at top right, rgba(59,130,246,0.06), transparent 60%)" }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Soft Skills</h4>
                    <p className="text-[10px] text-foreground/40">{skills.softSkills.length} abilities</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {skills.softSkills.map((skill: string, i: number) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                      whileHover={{ scale: 1.07, y: -2 }}
                      className="px-4 py-2 text-xs font-medium rounded-lg bg-white/5 text-foreground/70 border border-white/5 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-xs text-foreground/40 font-mono">
            <span className="text-blue-400">$</span> skills --list --verbose
          </p>
        </motion.div>
      </div>
    </section>
  );
}
