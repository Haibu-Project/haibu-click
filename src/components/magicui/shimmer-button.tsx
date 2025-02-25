import React, { CSSProperties, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerCardProps extends ComponentPropsWithoutRef<"div"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerCard = React.forwardRef<
  HTMLDivElement,
  ShimmerCardProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "20px",
      background = "linear-gradient(to top, #F49000, #F9B742)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "relative z-0 flex flex-col items-center justify-center overflow-hidden border border-white/10 p-6 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
          "shadow-lg transform-gpu transition-transform duration-300 ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Animated border shimmer */}
        <div className="absolute inset-0 overflow-hidden rounded-[var(--radius)]">
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}
      </div>
    );
  }
);

ShimmerCard.displayName = "ShimmerCard";