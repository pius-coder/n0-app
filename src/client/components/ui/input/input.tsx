"use client";

import { forwardRef } from "react";
import { cn } from "@/client/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors",
          "placeholder:text-neutral-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500" : "border-neutral-300",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
