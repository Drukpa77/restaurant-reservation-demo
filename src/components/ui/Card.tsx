import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "card" | "card-lg" | "card-xl";
  hover?: boolean;
  selected?: boolean;
  tone?: "cream" | "surface";
};

const paddings = {
  none: "p-0",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  padding = "md",
  radius = "card",
  hover = false,
  selected = false,
  tone = "cream",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "border border-hairline-8 shadow-card transition-all duration-hover ease-out",
        tone === "cream" ? "bg-background" : "bg-surface",
        radius === "card" && "rounded-card",
        radius === "card-lg" && "rounded-card-lg",
        radius === "card-xl" && "rounded-card-xl",
        paddings[padding],
        hover &&
          "hover:-translate-y-0.5 hover:border-hairline-14 hover:shadow-raised",
        selected && "border-olive shadow-selected",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type DateCardProps = {
  weekday: string;
  day: string;
  month?: string;
  selected?: boolean;
  unavailable?: boolean;
  onClick?: () => void;
  className?: string;
};

export function DateCard({
  weekday,
  day,
  month,
  selected,
  unavailable,
  onClick,
  className,
}: DateCardProps) {
  return (
    <button
      type="button"
      disabled={unavailable}
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex min-h-11 flex-1 flex-col items-center rounded-card px-0 py-3 text-center transition-all duration-hover ease-out",
        "border border-hairline-14",
        "hover:border-ink hover:bg-surface",
        "focus-visible:shadow-focus-button",
        selected &&
          "border-olive bg-olive text-cream shadow-primary hover:border-olive hover:bg-olive",
        unavailable &&
          "cursor-not-allowed border-hairline-8 bg-surface-alt text-muted-disabled hover:border-hairline-8 hover:bg-surface-alt",
        className,
      )}
    >
      <span
        className={cn(
          "font-ui text-[11px] font-medium uppercase tracking-label",
          selected ? "text-cream-70" : unavailable ? "text-muted-disabled" : "text-muted-subtle",
        )}
      >
        {weekday}
      </span>
      <span className="font-display text-[34px] font-light leading-none">{day}</span>
      {month ? (
        <span
          className={cn(
            "mt-1 font-ui text-[13px] font-light",
            selected ? "text-cream-70" : unavailable ? "text-muted-unavailable" : "text-muted",
          )}
        >
          {unavailable ? "Closed" : month}
        </span>
      ) : null}
    </button>
  );
}

type TimeSlotStatus = "available" | "selected" | "popular" | "almost_full" | "full";

type TimeSlotProps = {
  time: string;
  status?: TimeSlotStatus;
  caption?: string;
  onClick?: () => void;
};

export function TimeSlot({
  time,
  status = "available",
  caption,
  onClick,
}: TimeSlotProps) {
  const isFull = status === "full";
  const isSelected = status === "selected";
  const isAlmost = status === "almost_full";
  const isPopular = status === "popular";

  const resolvedCaption =
    caption ??
    (isSelected
      ? "Selected"
      : isAlmost
        ? "Only 2 tables left"
        : isPopular
          ? "Popular"
          : isFull
            ? "Fully booked"
            : "Available");

  return (
    <button
      type="button"
      disabled={isFull}
      onClick={onClick}
      aria-pressed={isSelected}
      className={cn(
        "flex min-h-11 flex-col items-center rounded-slot px-2 py-[18px] text-center transition-all duration-hover ease-out",
        "border border-hairline-16 font-ui text-[18px] font-normal",
        "hover:border-ink hover:bg-surface",
        "focus-visible:shadow-focus-button",
        isSelected && "border-olive bg-olive text-cream hover:border-olive hover:bg-olive",
        isPopular && !isSelected && "shadow-card",
        isAlmost &&
          "border-terracotta-outline bg-terracotta-fill text-terracotta-dark hover:border-terracotta-outline hover:bg-terracotta-fill",
        isFull &&
          "cursor-not-allowed border-hairline-8 bg-surface-alt text-muted-unavailable hover:border-hairline-8 hover:bg-surface-alt",
      )}
    >
      <span>{time}</span>
      <span
        className={cn(
          "mt-1 text-[12px] font-light",
          isSelected ? "text-cream-70" : isAlmost ? "text-terracotta-dark" : isPopular ? "text-olive" : "text-muted-subtle",
          isFull && "text-muted-unavailable",
        )}
      >
        {resolvedCaption}
      </span>
    </button>
  );
}
