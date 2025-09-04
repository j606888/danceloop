import { useRef, useState, useEffect, useCallback } from "react";

export function useFocus() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const q = search.trim().toLowerCase();

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const handleChange = (v: string) => {
    setSearch(v);
    if ((inputRef.current === document.activeElement) && v.trim().length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleFocus = useCallback(() => {
    if (q.length > 0) setOpen(true);
  }, [q]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
    setOpen(false);
  };

  return {
    inputRef,
    rootRef,
    handleKeyDown,
    handleFocus,
    handleChange,
    open,
    search,
    q,
    clearSearch,
  };
}
