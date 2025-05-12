import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useDropdown(defaultOpen: boolean) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(defaultOpen || pathname === "/");
  const contentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;

    if (isOpen) {
      // When opening
      element.style.display = "block";
      element.style.maxHeight = "0";
      // Force reflow to trigger transition
      void element.offsetHeight;
      element.style.maxHeight = `${element.scrollHeight}px`;
    } else {
      // When closing
      element.style.maxHeight = "0";
      const handleTransitionEnd = () => {
        if (!isOpen) {
          element.style.display = "none";
        }
      };
      element.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        element.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, toggle, contentRef };
}
