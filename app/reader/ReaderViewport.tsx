"use client";

import { useEffect, useRef } from "react";
import { useReaderStore } from "@/lib/store/useReaderStore";
import type { PDFDocumentProxy } from "pdfjs-dist";

export const ReaderViewport = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);
  const { currentPage, setTotalPages } = useReaderStore();

  useEffect(() => {
    const loadPdf = async () => {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

      const loadingTask = pdfjsLib.getDocument("/test.pdf");
      const pdf = await loadingTask.promise;
      pdfDocRef.current = pdf;

      setTotalPages(pdf.numPages);
    };

    loadPdf();
  }, [setTotalPages]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDocRef.current) return;

      const page = await pdfDocRef.current.getPage(currentPage);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      };

      await page.render(renderContext).promise;
    };

    renderPage();
  }, [currentPage]);

  return (
    <main className="flex-1 overflow-y-auto no-scrollbar relative w-full max-w-3xl mx-auto pt-24 pb-32 px-6 md:px-12 animate-fade-in flex justify-center items-start">
      <canvas ref={canvasRef} className="shadow-2xl" />
    </main>
  );
};
