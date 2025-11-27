"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReaderStore } from "@/lib/store/useReaderStore";

export const ReaderControls = () => {
  const { currentPage, totalPages, progress, setCurrentPage, nextPage, prevPage } = useReaderStore();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const page = Math.max(1, Math.min(totalPages, Math.ceil((value / 100) * totalPages)));
    setCurrentPage(page);
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white/90 dark:bg-[#252529]/90 backdrop-blur-xl border border-stone-200/50 dark:border-white/5 shadow-2xl shadow-stone-200/50 dark:shadow-black/50 rounded-2xl px-6 py-3 flex items-center gap-6 w-auto min-w-[320px] max-w-md transform transition-all duration-300 hover:scale-[1.02]">

        <div className="text-xs font-medium text-gray-400 dark:text-gray-500 w-12 text-right tabular-nums">
          {Math.round(progress)}%
        </div>

        <div className="flex-1 relative h-4 flex items-center group">
          <div className="absolute w-full h-0.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-800 dark:bg-stone-200 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSliderChange}
            className="relative w-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-stone-800 dark:text-stone-200"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 dark:text-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-gray-900 dark:text-gray-200 w-16 text-center">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 dark:text-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
