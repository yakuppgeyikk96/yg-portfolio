"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DropdownItem = {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
};

export function Dropdown({
  trigger,
  items,
  align = "right",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const uniqueId = useId();

  const close = useCallback(() => setOpen(false), []);

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: align === "right" ? rect.right - 140 : rect.left,
      });
    }
  }, [align]);

  useLayoutEffect(() => {
    if (open && ref.current) {
      updatePosition();
    }
  }, [open, updatePosition]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const inTrigger = ref.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);
      if (!inTrigger && !inPanel) close();
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, close]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`.trim()}>
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!open) updatePosition();
          setOpen((prev) => !prev);
        }}
        className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/5"
        aria-expanded={open}
        aria-haspopup="true"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {trigger}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: -8, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="fixed z-50 min-w-35 overflow-hidden rounded-xl border border-white/10 bg-surface/80 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_20px_rgba(234,88,12,0.08)] backdrop-blur-xl"
                style={{ top: position.top, left: position.left }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {items.map((item, i) => (
                  <motion.div
                    key={`${uniqueId}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(i)}
                  >
                    {hoveredIndex === i && (
                      <motion.div
                        layoutId="dropdown-hover"
                        className="absolute inset-0 bg-white/5"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {hoveredIndex === i && (
                      <motion.div
                        layoutId="dropdown-accent"
                        className="absolute bottom-1 left-0 top-1 w-0.5 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="relative z-10 block px-4 py-2.5 text-sm text-foreground transition-colors hover:text-primary"
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          item.onClick?.();
                          close();
                        }}
                        className="relative z-10 block w-full px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
