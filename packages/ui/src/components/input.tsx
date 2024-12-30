import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { error?: boolean; errorMessage?: string }
>(({ className, type, error, errorMessage, ...props }, ref) => {
  return (
    <>
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          error ? "border-red-500" : ""
        )}
        ref={ref}
        {...props}
      />
      {error && errorMessage && (
        <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
      )}
    </>
  );
});
Input.displayName = "Input";

export { Input };
