"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const CvModal = dynamic(() => import("@/components/shared/CvModal"), { ssr: false });

const NAV_LINKS = [
  { name: "Beranda", href: "#home" },
  { name: "Tentang", href: "#about" },
  { name: "Pengalaman", href: "#experience" },
  { name: "Pendidikan", href: "#education" },
  { name: "Proyek", href: "#projects" },
  { name: "Keterampilan", href: "#skills" },
  { name: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  const openCv = () => {
    setIsMobileMenuOpen(false);
    setIsCvOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCv = () => {
    setIsCvOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="text-xl font-bold tracking-tighter">
          {PORTFOLIO_DATA.personal.shortName}
          <span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={openCv}
            className="ml-4 inline-flex items-center gap-2 h-7 px-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <Download className="h-4 w-4" />
            Lihat CV
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-foreground py-2 border-b border-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={openCv}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <Download className="h-4 w-4" />
            Lihat CV
          </button>
        </div>
      )}
      {isCvOpen && <CvModal file="/CV.pdf" onClose={closeCv} />}
    </header>
  );
}