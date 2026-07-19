"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import {
  Atom,
  Blocks,
  BookOpen,
  Braces,
  CodeXml,
  Database,
  FileCode2,
  FileJson,
  FileSpreadsheet,
  GitBranch,
  GitPullRequest,
  Globe,
  NotebookText,
  ServerCog,
} from "lucide-react";

const getTechIcon = (tech: string) => {
  switch (tech) {
    case "Git":
      return <GitBranch className="w-7 h-7" />;
    case "GitHub":
      return <GitPullRequest className="w-7 h-7" />;
    case "JavaScript":
      return <FileJson className="w-7 h-7" />;
    case "Jupyter Notebook":
      return <NotebookText className="w-7 h-7" />;
    case "Laravel":
      return <Blocks className="w-7 h-7" />;
    case "MySQL":
      return <Database className="w-7 h-7" />;
    case "Next.js":
      return <Globe className="w-7 h-7" />;
    case "Node JS":
      return <ServerCog className="w-7 h-7" />;
    case "Pandas":
      return <FileSpreadsheet className="w-7 h-7" />;
    case "PHP":
      return <FileCode2 className="w-7 h-7" />;
    case "Python":
      return <Braces className="w-7 h-7" />;
    case "React":
      return <Atom className="w-7 h-7" />;
    case "TypeScript":
      return <CodeXml className="w-7 h-7" />;
    default:
      return <BookOpen className="w-7 h-7" />;
  }
};

const wrapPercent = (value: number) => `${(((value % 50) + 50) % 50) - 50}%`;

const TechCard = ({ tech }: { tech: string }) => (
  <div className="group flex min-w-[180px] items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-md relative z-10">
    <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
      {getTechIcon(tech)}
    </div>
    <span className="text-base font-semibold whitespace-nowrap text-slate-900">{tech}</span>
  </div>
);

export default function TechStackSection() {
  const { techStack } = PORTFOLIO_DATA;
  const half = Math.ceil(techStack.length / 2);
  const topRowItems = [...techStack.slice(0, half), ...techStack.slice(0, half)];
  const bottomRowItems = [...techStack.slice(half), ...techStack.slice(half)];
  const x = useMotionValue(0);
  const wrappedX = useTransform(x, wrapPercent);
  const wrappedXReverse = useTransform(x, (value) => wrapPercent(-value));
  const directionRef = useRef(1);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      if (delta !== 0) {
        directionRef.current = delta > 0 ? -1 : 1;
      }

      lastScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = Date.now();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let frameId = 0;

    const animate = () => {
      const isScrolling = Date.now() - lastScrollTimeRef.current < 120;
      const baseSpeed = isScrolling ? 0.06 : 0.02;
      x.set(x.get() + directionRef.current * baseSpeed);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [x]);

  return (
    <section id="tech-stack" className="py-24 bg-muted/30 relative z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
            Teknologi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tech Stack
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-muted/30 to-transparent" />

          <div className="flex flex-col gap-12">
            <motion.div className="flex w-max gap-4" style={{ x: wrappedX }}>
              {topRowItems.map((tech: string, index: number) => (
                <TechCard key={`top-${tech}-${index}`} tech={tech} />
              ))}
            </motion.div>

            <motion.div className="flex w-max gap-4" style={{ x: wrappedXReverse }}>
              {bottomRowItems.map((tech: string, index: number) => (
                <TechCard key={`bottom-${tech}-${index}`} tech={tech} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
