"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hemora-red disabled:opacity-50 disabled:pointer-events-none rounded-full cursor-pointer",
          size === "default" && "h-[50px] min-h-[50px] px-7 text-base",
          size === "sm" && "h-[44px] min-h-[44px] px-5 text-sm",
          size === "lg" && "h-[54px] min-h-[54px] px-8 text-base",
          variant === "primary" &&
            "bg-hemora-red text-white hover:bg-hemora-red-hover active:bg-hemora-red-hover shadow-none border border-transparent",
          variant === "secondary" &&
            "bg-white text-hemora-text border border-hemora-border hover:bg-hemora-bg hover:border-hemora-border/80",
          variant === "tertiary" &&
            "bg-transparent text-hemora-text hover:text-hemora-red p-0 h-auto rounded-none underline-offset-4 hover:underline",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
