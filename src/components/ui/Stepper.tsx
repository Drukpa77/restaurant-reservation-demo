"use client";

import { cn } from "@/lib/cn";

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "quantity" | "guest";
  label?: string;
};

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 14,
  size = "quantity",
  label,
}: StepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;
  const isGuest = size === "guest";
  const buttonSize = isGuest ? "h-[46px] w-[46px] text-[22px]" : "h-9 w-9 text-[20px] md:h-9 md:w-9";

  const decrement = (
    <button
      type="button"
      aria-label="Decrease"
      disabled={atMin}
      onClick={() => onChange(Math.max(min, value - 1))}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-ui font-light transition-all duration-hover ease-out",
        "focus-visible:shadow-focus-button",
        buttonSize,
        atMin
          ? "cursor-not-allowed bg-surface-alt text-muted-disabled"
          : "bg-surface text-olive hover:bg-olive hover:text-cream",
      )}
    >
      −
    </button>
  );

  const increment = (
    <button
      type="button"
      aria-label="Increase"
      disabled={atMax}
      onClick={() => onChange(Math.min(max, value + 1))}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-ui font-light transition-all duration-hover ease-out",
        "focus-visible:shadow-focus-button",
        buttonSize,
        atMax
          ? "cursor-not-allowed bg-surface-alt text-muted-disabled"
          : "bg-olive text-cream hover:bg-olive-hover hover:shadow-stepper-hover",
      )}
    >
      +
    </button>
  );

  const count = (
    <span
      aria-live="polite"
      className={cn(
        "text-center tabular-nums text-ink",
        isGuest
          ? "min-w-24 font-display text-[28px] font-normal"
          : "min-w-6 font-ui text-[18px] font-normal md:text-[19px]",
      )}
    >
      {isGuest ? `${value} guests` : value}
    </span>
  );

  if (isGuest) {
    return (
      <div
        className="inline-flex items-center gap-2 rounded-pill border border-hairline-14 px-[18px] py-2.5"
        role="group"
        aria-label={label ?? "Guests"}
      >
        {decrement}
        {count}
        {increment}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3.5" role="group" aria-label={label ?? "Quantity"}>
      {decrement}
      {count}
      {increment}
    </div>
  );
}
