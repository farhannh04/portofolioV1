"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(onComplete, prefersReduced ? 0 : 700);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="overflow-hidden flex items-center">
          <motion.span
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground"
          >
            {PORTFOLIO_DATA.personal.shortName}
          </motion.span>
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease: "backOut" }}
            className="text-4xl md:text-5xl font-extrabold text-primary ml-1"
          >
            .
          </motion.span>
        </div>

        <motion.div
          className="h-[2px] bg-muted w-48 overflow-hidden rounded-full mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
