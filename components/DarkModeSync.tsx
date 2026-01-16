"use client";

import { useDarkModeStore } from "@/stores/useDarkModeStore";
import { useEffect } from "react";

export default function DarkModeSync() {
  const { isDark } = useDarkModeStore();

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return null;
}
