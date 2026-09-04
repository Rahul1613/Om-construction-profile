"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    const stored = localStorage.getItem("theme");
    return stored === "dark" || stored === null;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      html.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 bg-brand-charcoal-light/80 backdrop-blur border border-brand-navy-light text-white hover:border-brand-orange transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 absolute inset-0 m-auto transition-all duration-300 opacity-0 rotate-90 scale-0 group-hover:opacity-100 dark:opacity-100 dark:rotate-0 dark:scale-100" />
      <Moon className="w-5 h-5 transition-all duration-300 opacity-100 rotate-0 scale-100 group-hover:opacity-0 dark:opacity-0 dark:-rotate-90 dark:scale-0" />
    </button>
  );
}
