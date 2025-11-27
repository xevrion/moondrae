import { create } from "zustand";

interface ReaderState {
  currentPage: number;
  totalPages: number;
  isDark: boolean;
  progress: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  toggleTheme: () => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useReaderStore = create<ReaderState>((set, get) => ({
  currentPage: 1,
  totalPages: 0,
  isDark: false,
  progress: 0,

  setCurrentPage: (page: number) =>
    set((state) => ({
      currentPage: page,
      progress: state.totalPages > 0 ? (page / state.totalPages) * 100 : 0,
    })),

  setTotalPages: (total: number) =>
    set((state) => ({
      totalPages: total,
      progress: total > 0 ? (state.currentPage / total) * 100 : 0,
    })),

  toggleTheme: () =>
    set((state) => {
      const newIsDark = !state.isDark;
      if (newIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { isDark: newIsDark };
    }),

  nextPage: () =>
    set((state) => {
      if (state.currentPage < state.totalPages) {
        const newPage = state.currentPage + 1;
        return {
          currentPage: newPage,
          progress: (newPage / state.totalPages) * 100,
        };
      }
      return state;
    }),

  prevPage: () =>
    set((state) => {
      if (state.currentPage > 1) {
        const newPage = state.currentPage - 1;
        return {
          currentPage: newPage,
          progress: (newPage / state.totalPages) * 100,
        };
      }
      return state;
    }),
}));
