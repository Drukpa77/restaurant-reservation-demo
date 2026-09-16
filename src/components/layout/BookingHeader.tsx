"use client";

import Link from "next/link";
import { formatHold } from "@/lib/format";
import { useHoldRemaining } from "@/lib/booking-store";
import { cn } from "@/lib/cn";

type Step = { id: string; label: string };

export function BookingHeader({
  steps,
  current,
  right,
}: {
  steps: Step[];
  current: string;
  right?: React.ReactNode;
}) {
  const currentIndex = steps.findIndex((step) => step.id === current);

  return (
    <header className="border-b border-hairline-8 px-5 py-5 md:px-gutter">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="font-display text-[22px] tracking-wordmark">
          TERRA & VINE
        </Link>
        <p className="hidden font-ui text-[12px] uppercase tracking-locale text-muted-subtle md:block">
          Reservations
        </p>
        <div className="hidden font-ui text-[15px] font-light text-muted md:block">
          {right ?? "Need help? (03) 9417 2280"}
        </div>
        <div className="font-ui text-[15px] font-light text-muted md:hidden">{right}</div>
      </div>

      <ol className="mt-8 hidden items-center justify-center md:flex">
        {steps.map((step, index) => {
          const active = index === currentIndex;
          const done = index < currentIndex;
          return (
            <li key={step.id} className="flex items-center">
              {index > 0 ? <span className="mx-[22px] h-px w-[110px] bg-hairline-18" /> : null}
              <div className={cn("flex items-center gap-3.5", !active && "text-muted-subtle")}>
                <span
                  className={cn(
                    "flex h-[34px] w-[34px] items-center justify-center rounded-full font-ui text-[15px]",
                    active || done
                      ? "bg-olive text-cream"
                      : "border border-hairline-20 text-muted-subtle",
                  )}
                >
                  {index + 1}
                </span>
                <span className="font-ui text-[16px] tracking-[0.06em]">{step.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </header>
  );
}

export function HoldLabel() {
  const remaining = useHoldRemaining();
  if (!remaining) return null;
  return <span>Table held · {formatHold(remaining)} remaining</span>;
}

export function BookingMobileBar({
  stepLabel,
  right,
  onBack,
}: {
  stepLabel: string;
  right?: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-hairline-8 px-5 py-3.5 md:hidden">
      <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <p className="font-ui text-[12px] uppercase tracking-[0.24em] text-muted-subtle">{stepLabel}</p>
      <div className="min-w-11 text-right font-ui text-[14px] font-light text-muted">{right}</div>
    </div>
  );
}
