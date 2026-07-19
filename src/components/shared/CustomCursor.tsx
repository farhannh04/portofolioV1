"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hanya tampilkan di Desktop/Laptop
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    // Sembunyikan kursor bawaan agar terasa lebih realistis dan menyatu
    document.body.style.cursor = "none";

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Deteksi elemen interaktif
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Sembunyikan kursor bawaan secara paksa di semua elemen yang bisa diklik */
        * { cursor: none !important; }
      `}} />
      
      {/* 
        Single Modern Cursor (Mix Blend Mode)
        Saat normal: Berbentuk titik kecil solid.
        Saat hover: Membesar transparan menyerupai area klik (Pointer)
      */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-difference bg-white"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 8), // Memusatkan kursor (40px / 2 atau 16px / 2)
          y: mousePosition.y - (isHovering ? 20 : 8),
          width: isHovering ? 40 : 16,
          height: isHovering ? 40 : 16,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
    </>
  );
}