import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { personal } = PORTFOLIO_DATA;

  return (
    <footer className="relative bg-background pt-24 pb-8 overflow-hidden border-t border-border">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Call to Action Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              MARI BUAT SESUATU <br/> 
              YANG <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">LUAR BIASA.</span>
            </h2>
            <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold hover:text-blue-500 transition-colors group">
              Kirimkan Pesan 
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
            </a>
          </div>

          {/* Kontak Singkat */}
          <div className="flex flex-col gap-6 text-left md:text-right">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-widest font-bold mb-2 text-slate-500">Lokasi</p>
              <p className="font-medium text-foreground text-lg">{personal.location}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm uppercase tracking-widest font-bold mb-2 text-slate-500">Telepon / WA</p>
              <p className="font-medium text-foreground text-lg">{personal.phone}</p>
            </div>
            <div className="flex justify-start md:justify-end gap-4 mt-2">
              <a href={personal.github} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                <GithubIcon className="w-6 h-6" />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-foreground/60">
          <p>© {currentYear} {personal.shortName}. Hak Cipta Dilindungi.</p>
          <p>
            Didesain & Dibangun dengan <span className="text-foreground font-bold hover:text-blue-500 transition-colors cursor-pointer">Next.js</span>
          </p>
        </div>

      </div>

      {/* Raksasa Tipografi Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none translate-y-1/4">
        <h1 className="text-[18vw] font-black leading-none whitespace-nowrap overflow-hidden">
          {personal.shortName.toUpperCase()}
        </h1>
      </div>
      
    </footer>
  );
}