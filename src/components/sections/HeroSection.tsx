"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import Link from "next/link";
import { useState, useEffect } from "react";

const PARTICLE_POSITIONS = [
  { x: 100, y: 800 }, { x: 300, y: 750 }, { x: 500, y: 820 },
  { x: 700, y: 780 }, { x: 200, y: 850 }, { x: 400, y: 790 },
  { x: 600, y: 830 }, { x: 800, y: 760 }, { x: 150, y: 810 },
  { x: 350, y: 840 }, { x: 550, y: 770 }, { x: 750, y: 800 },
  { x: 250, y: 780 }, { x: 450, y: 850 }, { x: 650, y: 820 },
  { x: 850, y: 790 }, { x: 50, y: 830 }, { x: 950, y: 810 },
  { x: 180, y: 860 }, { x: 580, y: 780 },
];

const TECH_ITEMS = [
  { name: "Laravel", color: "#FF2D20" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Next.js", color: "#ffffff" },
  { name: "MySQL", color: "#4479A1" },
  { name: "Python", color: "#3776AB" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "PHP", color: "#777BB4" },
  { name: "Git", color: "#F05032" },
  { name: "Node.js", color: "#339933" },
];

const MarqueeRow = ({ items, direction, delay }: { items: typeof TECH_ITEMS; direction: "left" | "right"; delay: number }) => (
  <div className="relative overflow-hidden">
    <motion.div
      className="flex gap-3 w-max"
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear", delay }}
    >
      {[...items, ...items].map((item, i) => (
        <motion.div
          key={`${item.name}-${i}`}
          whileHover={{ y: -3, scale: 1.05 }}
          className="px-5 py-2.5 bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-lg font-mono text-sm cursor-pointer transition-colors hover:border-white/20 whitespace-nowrap"
        >
          <span className="text-gray-400 hover:text-white transition-colors" style={{ "--tech-color": item.color } as React.CSSProperties}>
            <span className="text-xs mr-2" style={{ color: item.color }}>●</span>
            {item.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const RoleCard = ({ role, index }: { role: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer"
    >
      <motion.div
        className="px-6 py-3 bg-gradient-to-r from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl"
        animate={{
          borderColor: isHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.1)",
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-lg md:text-xl font-medium text-foreground/80 text-center">
          {role}
        </p>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const InteractiveText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(" ");
  
  return (
    <span className={className}>
      {words.map((word: string, i: number) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          whileHover={{ scale: 1.1, color: "#60a5fa" }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const FloatingParticle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
    initial={{ opacity: 0, x, y }}
    animate={{
      opacity: [0, 1, 0],
      y: [y, y - 100],
      x: [x, x + 20],
    }}
    transition={{
      delay,
      duration: 3,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const CursorFollower = () => {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [visible, cursorX, cursorY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-0"
          style={{ x: cursorXSpring, y: cursorYSpring }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function HeroSection() {
  const { personal } = PORTFOLIO_DATA;
  const roles = personal.role.split("|").map(r => r.trim());

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <CursorFollower />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/30 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        
        {PARTICLE_POSITIONS.map((pos, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            x={pos.x}
            y={pos.y}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="min-h-screen flex flex-col justify-center items-center text-center py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2 bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-full"
              whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.4)" }}
            >
              <motion.span
                className="relative flex h-2 w-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </motion.span>
              <span className="text-sm text-gray-300 font-medium">Open to Work</span>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-400 font-medium tracking-widest uppercase text-xs mb-4"
          >
            Halo, Saya
          </motion.p>

          <div className="mb-6">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="block bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent">
                Muhammad
              </span>
              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Farhan
              </motion.span>
              <motion.span
                className="block text-foreground"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Nur Hidayat
              </motion.span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-lg md:text-xl text-foreground/60 max-w-xl leading-relaxed">
              <InteractiveText>{personal.description}</InteractiveText>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {roles.map((role, i) => (
              <RoleCard key={role} role={role} index={i} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <Button asChild size="lg" className="relative bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">
                <a href="https://www.linkedin.com/in/mfarhannurhidayat/" target="_blank" rel="noreferrer">
                  <LinkedinIcon className="mr-2 w-5 h-5" />
                  <span className="font-semibold">Profil LinkedIn</span>
                </a>
              </Button>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" variant="outline" className="rounded-xl px-8 border-2 hover:bg-blue-600/10">
                <Link href="#contact">
                  <Mail className="mr-2 w-5 h-5" />
                  <span className="font-semibold">Hubungi Saya</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 w-full"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-6 text-center"
            >
              Technologies I Work With
            </motion.p>
            <div className="space-y-2 mask-gradient">
              <MarqueeRow items={TECH_ITEMS} direction="left" delay={1.4} />
              <MarqueeRow items={[...TECH_ITEMS].reverse()} direction="right" delay={1.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
            >
              <ChevronDown className="w-6 h-6 text-foreground/30" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />

      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
