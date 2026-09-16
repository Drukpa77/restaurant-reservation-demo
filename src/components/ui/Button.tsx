import Link from "next/link";
import { cn } from "@/lib/cn";
import { SpinnerIcon } from "./Icons";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "text"
  | "text-ink"
  | "cream"
  | "outline-cream";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  fullWidth?: boolean;
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-[26px] py-[13px] text-[15px] tracking-button min-h-11",
  md: "px-[30px] py-[15px] text-button min-h-11",
  lg: "px-10 py-[19px] text-[16px] tracking-button min-h-12",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-olive text-cream shadow-primary-soft hover:bg-olive-hover hover:-translate-y-px hover:shadow-primary-hover active:bg-olive-pressed active:translate-y-0 active:shadow-none disabled:bg-muted-disabled disabled:text-cream disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed",
  secondary:
    "border border-hairline-25 bg-transparent text-ink hover:bg-surface hover:border-ink disabled:border-hairline-12 disabled:text-muted-disabled disabled:cursor-not-allowed",
  text: "rounded-none px-0 py-0 min-h-0 text-terracotta border-b border-terracotta hover:text-terracotta-dark hover:border-terracotta-dark disabled:text-muted-disabled disabled:border-muted-disabled",
  "text-ink":
    "rounded-none px-0 py-0 min-h-0 text-ink border-b border-ink hover:text-terracotta hover:border-terracotta disabled:text-muted-disabled disabled:border-muted-disabled",
  cream: "bg-cream text-ink hover:bg-surface active:bg-surface-alt",
  "outline-cream": "border border-cream-55 text-cream hover:bg-cream-07",
};

function buttonClassName({
  variant,
  size,
  fullWidth,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-pill font-ui font-normal transition-all duration-hover ease-out",
    "focus-visible:shadow-focus-button",
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    (variant === "text" || variant === "text-ink") && "tracking-button",
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  type = "button",
  href,
  ...props
}: ButtonProps) {
  const classes = buttonClassName({ variant, size, fullWidth, className });

  if (href && !disabled && !loading) {
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled || loading} className={classes} {...props}>
      {loading ? <SpinnerIcon /> : null}
      {children}
    </button>
  );
}
