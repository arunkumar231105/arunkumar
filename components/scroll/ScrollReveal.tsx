"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 48,
  duration = 0.8,
  blur = false,
  scale = false,
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    scale: scale ? 0.92 : 1,
    filter: blur ? "blur(16px) saturate(0)" : "blur(0px) saturate(1)",
  };

  const animate = inView
    ? {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px) saturate(1)",
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      }
    : {};

  return (
    <motion.div ref={ref} initial={initial} animate={animate} className={className}>
      {children}
    </motion.div>
  );
}
