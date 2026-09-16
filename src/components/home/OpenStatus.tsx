"use client";

import { kitchenStatus } from "@/lib/hours";
import { cn } from "@/lib/cn";

export function OpenStatus({ className, compact = false }: { className?: string; compact?: boolean }) {
  const status = kitchenStatus();
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "rounded-full",
          compact ? "h-1.5 w-1.5" : "h-2 w-2 shadow-open",
          status.open ? "bg-success-accent" : "bg-muted-disabled",
        )}
      />
      {status.label}
    </span>
  );
}
