"use client";

import { ReactNode } from "react";
import { ChevronLeft, UploadCloud, Type, Sun, Moon } from "lucide-react";
import { useReaderStore } from "@/lib/store/useReaderStore";

interface ReaderShellProps {
  children: ReactNode;
}

export const ReaderShell = ({ children }: ReaderShellProps) => {
  const { isDark, toggleTheme } = useReaderStore();

  return (
    <div className="bg-paper-50 dark:bg-midnight-900 transition-colors duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] h-screen flex flex-col overflow-hidden text-paper-900 dark:text-gray-300 selection:bg-orange-100 dark:selection:bg-indigo-900/50">

      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-8 border-b border-transparent transition-all duration-500 hover:bg-paper-50/80 dark:hover:bg-midnight-900/80 hover:backdrop-blur-md group">

        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Currently Reading
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          <button
            className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            title="Upload Book"
          >
            <UploadCloud className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            title="Typography"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {children}

      <div className="fixed top-0 left-0 w-full h-32 bg-linear-to-b from-paper-50 dark:from-midnight-900 to-transparent pointer-events-none z-10" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-linear-to-t from-paper-50 dark:from-midnight-900 to-transparent pointer-events-none z-10" />
    </div>
  );
};
