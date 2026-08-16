import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "brand" | "success" | "warning";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-colors",
        variant === "neutral" &&
          "bg-white text-hemora-muted border-hemora-border",
        variant === "brand" &&
          "bg-hemora-soft-red text-hemora-red border-hemora-border",
        variant === "success" &&
          "bg-emerald-50 text-emerald-800 border-emerald-200",
        variant === "warning" &&
          "bg-amber-50 text-amber-800 border-amber-200",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
