"use client"

import { useDarkModeStore } from "@/stores/useDarkModeStore";
import { useEffect } from "react";

export function InitTheme() {
  const { setDarkMode } = useDarkModeStore();

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === null) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, [setDarkMode]);

  return null;
}
