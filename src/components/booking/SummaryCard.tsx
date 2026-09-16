"use client";

import { Button } from "@/components/ui/Button";
import { formatSidebarDate, formatTimeLabel, guestLabel } from "@/lib/format";
import { cn } from "@/lib/cn";

export function SummaryCard({
  date,
  time,
  guests,
  mealsSelected,
  cta,
  ctaDisabled,
  ctaLoading,
  onCta,
  note,
  onEditDate,
  onEditTime,
  onEditGuests,
  onEditPreorder,
}: {
  date: string | null;
  time: string | null;
  guests: number;
  mealsSelected?: number;
  cta: string;
  ctaDisabled?: boolean;
  ctaLoading?: boolean;
  onCta?: () => void;
  note?: string;
  onEditDate?: () => void;
  onEditTime?: () => void;
  onEditGuests?: () => void;
  onEditPreorder?: () => void;
}) {
  const [weekday, rest] = date ? formatSidebarDate(date).split("\n") : ["Select a date", ""];

  return (
    <aside className="rounded-card-xl bg-surface p-8">
      <p className="font-ui text-[12px] uppercase tracking-locale text-muted-subtle">Your reservation</p>
      <h3 className="mt-3 font-display text-[34px] font-light leading-[1.15]">
        {weekday}
        {rest ? (
          <>
            <br />
            {rest}
          </>
        ) : null}
      </h3>
      <p className="mt-3 font-ui text-[22px] font-normal">
        {time ? formatTimeLabel(time) : "Choose a time"} · {guestLabel(guests)}
      </p>
      <div className="my-[22px] h-px bg-hairline-12" />
      <p className="font-ui text-[16px] font-light leading-relaxed text-muted">
        Terra & Vine
        <br />
        12 Hartwell Lane, Fitzroy
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Chip onClick={onEditDate}>Edit date</Chip>
        <Chip onClick={onEditTime}>Edit time</Chip>
        <Chip onClick={onEditGuests}>Edit guests</Chip>
      </div>
      {typeof mealsSelected === "number" ? (
        <>
          <div className="my-[22px] h-px bg-hairline-12" />
          <div className="flex items-baseline justify-between font-ui text-[17px] font-light">
            <span>Pre-order</span>
            <span>
              {mealsSelected} of {guests} meals
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded bg-track">
            <div
              className="h-full bg-olive"
              style={{ width: `${Math.min(100, (mealsSelected / guests) * 100)}%` }}
            />
          </div>
          {onEditPreorder ? (
            <button
              type="button"
              onClick={onEditPreorder}
              className="mt-3 border-b border-ink pb-0.5 font-ui text-[15px]"
            >
              Edit pre-order
            </button>
          ) : null}
        </>
      ) : null}
      <Button
        fullWidth
        className="mt-6"
        disabled={ctaDisabled}
        loading={ctaLoading}
        onClick={onCta}
      >
        {ctaLoading ? "Confirming…" : cta}
      </Button>
      {note ? (
        <p className="mt-3 text-center font-ui text-small text-muted-subtle">{note}</p>
      ) : null}
    </aside>
  );
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-pill border border-hairline-20 px-4 py-2 font-ui text-[14px] transition-colors duration-hover ease-out hover:border-ink hover:bg-background",
      )}
    >
      {children}
    </button>
  );
}
