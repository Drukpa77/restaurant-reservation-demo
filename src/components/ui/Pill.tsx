import { cn } from "@/lib/cn";

type PillVariant =
  | "outline"
  | "olive-outline"
  | "selected"
  | "ink"
  | "filter"
  | "group"
  | "status"
  | "warning";

type PillProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: PillVariant;
  as?: "button" | "span";
  size?: "sm" | "md";
};

const variants: Record<PillVariant, string> = {
  outline:
    "border border-hairline-16 text-ink hover:border-ink hover:bg-surface",
  "olive-outline":
    "border border-olive-outline text-olive font-medium tracking-[0.14em] uppercase",
  selected: "bg-olive text-cream border border-olive",
  ink: "bg-ink text-cream border border-ink",
  filter: "border border-olive-outline text-olive",
  group:
    "border border-dashed border-terracotta text-terracotta hover:bg-terracotta-fill",
  status:
    "bg-olive-muted text-olive gap-2",
  warning: "bg-terracotta-muted text-terracotta",
};

const sizes = {
  sm: "px-[11px] py-[5px] text-[11px] tracking-[0.14em]",
  md: "px-5 py-[11px] text-[15px] tracking-normal",
};

export function Pill({
  variant = "outline",
  as = "button",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: PillProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-pill font-ui font-normal transition-all duration-hover ease-out",
    "min-h-11 md:min-h-0",
    "focus-visible:shadow-focus-button",
    "disabled:cursor-not-allowed disabled:text-muted-disabled disabled:border-hairline-12",
    sizes[size],
    variants[variant],
    as === "span" && "min-h-0 cursor-default",
    className,
  );

  if (as === "span") {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
