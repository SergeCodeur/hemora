import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow";
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 md:px-8",
        size === "default" && "max-w-[1380px]",
        size === "narrow" && "max-w-[760px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
