// hooks/useScrollRestoration.ts
"use client";
import { useEffect } from "react";

export function useScrollRestoration(key: string) {
  useEffect(() => {
    const handleSave = () => {
      sessionStorage.setItem(`scroll-${key}`, String(window.scrollY));
    };

    window.addEventListener("scroll", handleSave);
    return () => window.removeEventListener("scroll", handleSave);
  }, [key]);

  useEffect(() => {
    const saved = sessionStorage.getItem(`scroll-${key}`);
    if (saved) {
      window.scrollTo(0, Number(saved));
    }
  }, [key]);
}
