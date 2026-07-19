"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/shared/SmoothScroll";
import Preloader from "@/components/shared/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";

const CustomCursor = dynamic(() => import("@/components/shared/CustomCursor"), { ssr: false });
const ParticleNetwork = dynamic(() => import("@/components/shared/ParticleNetwork"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const TechStackSection = dynamic(() => import("@/components/sections/TechStackSection"));
const EducationSection = dynamic(() => import("@/components/sections/EducationSection"));
const CertificationsSection = dynamic(() => import("@/components/sections/CertificationsSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Mencegah scroll selama loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SmoothScroll>
        <div className="flex flex-col min-h-screen relative z-10 overflow-hidden">
          
          {/* Animasi Jaringan Partikel (Konstelasi) di render 1 kali saja di global background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
            <ParticleNetwork id="tsparticles-main" />
          </div>
          
          {/* Konten Halaman tidak dimuat sampai loading selesai untuk kebersihan layar */}
          {!isLoading && (
            <>
              <Navbar />
              
              <main className="flex-1 w-full flex flex-col relative z-10">
                <HeroSection />
                <AboutSection />
                <ExperienceSection />
                <TechStackSection />
                <EducationSection />
                <CertificationsSection />
                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
              </main>

              <Footer />
            </>
          )}
        </div>
      </SmoothScroll>
    </>
  );
}