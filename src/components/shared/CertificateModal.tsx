"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CertModalProps {
  cert: {
    title: string;
    issuer: string;
    file: string;
  };
  onClose: () => void;
}

export default function CertificateModal({ cert, onClose }: CertModalProps) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [containerWidth, setContainerWidth] = useState(600);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.dataset.modalOpen = "true";
    return () => {
      document.body.dataset.modalOpen = "false";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - 64;
        setContainerWidth(width);
        setScale(1);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
    setError(false);
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth - 64;
      setContainerWidth(width);
    }
    setScale(1);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setError(true);
  }, []);

  const isImage = (file: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative z-10 bg-card rounded-2xl border border-border shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate text-slate-900">{cert.title}</h3>
            <p className="text-sm text-slate-600">{cert.issuer}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {!isImage(cert.file) && !error && (
              <>
                <button
                  onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setScale(1);
                    if (containerRef.current) {
                      setContainerWidth(containerRef.current.offsetWidth - 64);
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                  title="Fit to width"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-600 min-w-[3rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={containerRef} className="flex-1 overflow-auto p-4 flex items-start justify-center bg-slate-50 dark:bg-slate-900">
          {isImage(cert.file) ? (
            <div className="relative w-full h-[70vh]">
              <Image
                src={cert.file}
                alt={cert.title}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-slate-600">Gagal memuat dokumen</p>
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Buka di tab baru
              </a>
            </div>
          ) : (
            <Document
              file={cert.file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
                </div>
              }
            >
              <Page
                pageNumber={currentPage}
                width={containerWidth}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          )}
        </div>

        {!isImage(cert.file) && !error && numPages > 1 && (
          <div className="flex items-center justify-center gap-4 p-3 border-t border-border">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-slate-800">
              {currentPage} / {numPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
              disabled={currentPage >= numPages}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
