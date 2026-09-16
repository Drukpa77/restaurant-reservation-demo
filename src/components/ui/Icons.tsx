import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
  size?: number;
  title?: string;
};

function Svg({
  className,
  size = 20,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" />
    </Svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </Svg>
  );
}

export function GroupIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="2.6" />
      <circle cx="15.5" cy="8.5" r="2.2" />
      <path d="M3.8 19c0-3 2.5-4.8 5.2-4.8s5.2 1.8 5.2 4.8" />
      <path d="M14.2 14.4c2.2.2 4.4 1.6 4.4 4.6" />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.2 3.8h3.2l1.2 3.2-2 1.4a11.5 11.5 0 0 0 5.2 5.2l1.4-2 3.2 1.2v3.2c0 .8-.7 1.6-1.6 1.6C9.6 19.6 4.4 14.4 4.4 7.4c0-.9.8-1.6 1.6-1.6z" />
    </Svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6.5" cy="12" r="2.2" />
      <circle cx="17" cy="6.5" r="2.2" />
      <circle cx="17" cy="17.5" r="2.2" />
      <path d="M8.5 11.1 15 7.4M8.6 12.9 15 16.6" />
    </Svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function TickIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 13l4 4L19 7" strokeWidth="2" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function SpinnerIcon({ className, size = 14 }: IconProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border-2 border-cream-35 border-t-cream animate-spin",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}
