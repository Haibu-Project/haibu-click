"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, type AnimationProps } from "motion/react";
import React from "react";

const animationProps = {
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface SimpleButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  isLoading?: boolean;
}

export const SimpleButton = React.forwardRef<
  HTMLButtonElement,
  SimpleButtonProps
>(({ children, className, color = "bg-blue-500", isLoading = false, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        `relative rounded-lg px-6 py-2 font-medium transition-shadow duration-300 ease-in-out hover:shadow ${color}`,
        className,
        { "cursor-not-allowed opacity-50": isLoading }
      )}
      disabled={isLoading}
      {...animationProps}
      {...props}
    >
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        <span className="relative block size-full text-sm uppercase tracking-wide text-white">
          {children}
        </span>
      )}
    </motion.button>
  );
});

SimpleButton.displayName = "SimpleButton";
