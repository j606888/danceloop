import { useState, useRef, useEffect } from "react";

function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = containerRef.current?.scrollTop;
      setIsScrolled(!!(offset && offset > 20));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef, isScrolled]);

  return {
    isScrolled,
    containerRef,
  }
}

export default useScroll;