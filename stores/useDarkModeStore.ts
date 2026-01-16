"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type DarkModeState = {
  isDark: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
};

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDark: false,

      toggleDarkMode: () =>
        set((state) => ({ isDark: !state.isDark })),

      setDarkMode: (value) =>
        set({ isDark: value }),
    }),
    {
      name: "darkMode",
    }
  )
);
