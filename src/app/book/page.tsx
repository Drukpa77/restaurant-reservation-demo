"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupNotice } from "@/components/booking/GroupNotice";
import { SummaryCard } from "@/components/booking/SummaryCard";
import { BookingHeader, BookingMobileBar } from "@/components/layout/BookingHeader";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "@/components/ui/Icons";
import { DateCard, TimeSlot } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Sheet } from "@/components/ui/Overlay";
import { Stepper } from "@/components/ui/Stepper";
import { useBooking } from "@/lib/booking-store";
import {
  addDays,
  dayNumber,
  formatLongDate,
  guestLabel,
  isMonday,
  monthLong,
  monthShort,
  startOfToday,
  toISODate,
  weekdayShort,
} from "@/lib/format";
import { useAvailability } from "@/lib/use-availability";
import { cn } from "@/lib/cn";

const STEPS = [
  { id: "table", label: "Table" },
  { id: "details", label: "Details" },
  { id: "confirm", label: "Confirm" },
];

const GROUP_STEPS = [
  { id: "table", label: "Table" },
  { id: "preorder", label: "Pre-order" },
  { id: "details", label: "Details" },
  { id: "confirm", label: "Confirm" },
];

export default function BookTablePage() {
  return (
    <Suspense fallback={<div className="px-gutter py-16 font-ui text-muted">Loading reservations…</div>}>
      <BookTableInner />
    </Suspense>
  );
}

function BookTableInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { draft, hydrated, setGuests, setDate, setTime, startHold, setDraft, acknowledgeGroup } = useBooking();
  const { data, loading } = useAvailability(draft.date, draft.guests);
  const [notice, setNotice] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guestSheet, setGuestSheet] = useState(false);
  const [mobileStage, setMobileStage] = useState<"guests" | "date" | "time">("guests");
  const [monthCursor, setMonthCursor] = useState(() => startOfToday());

  useEffect(() => {
    const guests = searchParams.get("guests");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    if (guests) setGuests(Number(guests));
    if (date) setDate(date);
    if (time) setTime(time, { hold: true });
    setDraft({ step: "table", status: "draft" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (draft.time && !draft.holdExpiresAt && draft.status !== "confirmed") {
      startHold();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  useEffect(() => {
    if (draft.guests > 10 && !draft.groupNoticeAcknowledged) {
      setNotice(true);
    }
  }, [draft.guests, draft.groupNoticeAcknowledged]);

  const strip = useMemo(() => {
    const start = startOfToday();
    return Array.from({ length: 14 }, (_, i) => toISODate(addDays(start, i)));
  }, []);

  const visibleStrip = strip.slice(0, 6);
  const canContinue = Boolean(draft.date && draft.time && !isMonday(draft.date ?? ""));

  function onGuests(next: number) {
    const wasGroup = draft.guests > 10;
    setGuests(next);
    if (next > 10 && !wasGroup && !draft.groupNoticeAcknowledged) {
      setNotice(true);
    }
  }

  function continueNext() {
    if (!canContinue) return;
    if (draft.guests > 10) {
      acknowledgeGroup();
      router.push("/book/group");
      return;
    }
    router.push("/book/details");
  }

  const steps = draft.guests > 10 ? GROUP_STEPS : STEPS;
  const slots = data?.slots ?? [];

  return (
    <>
      <div className="hidden md:block">
        <BookingHeader steps={steps} current="table" />
      </div>
      <BookingMobileBar
        stepLabel={`Step 1 of ${steps.length} · ${mobileStage}`}
        right={
          <button type="button" onClick={() => router.push("/")} className="min-h-11">
            Close
          </button>
        }
        onBack={() => {
          if (mobileStage === "time") setMobileStage("date");
          else if (mobileStage === "date") setMobileStage("guests");
          else router.push("/");
        }}
      />

      <div className="px-5 py-8 md:px-gutter md:py-11">
        <div className="hidden md:block">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_372px]">
            <div className="flex flex-col gap-11">
              <GuestsBlock guests={draft.guests} onGuests={onGuests} />
              <DatesBlock
                dates={visibleStrip}
                selected={draft.date}
                onSelect={setDate}
                onMore={() => setCalendarOpen(true)}
              />
              <TimesBlock
                date={draft.date}
                guests={draft.guests}
                loading={loading}
                closed={data?.closed}
                slots={slots}
                selected={draft.time}
                onSelect={(time) => setTime(time, { hold: true })}
              />
            </div>
            <div className="lg:sticky lg:top-8">
              <SummaryCard
                date={draft.date}
                time={draft.time}
                guests={draft.guests}
                cta={draft.guests > 10 ? "Continue to group booking" : "Continue to details"}
                ctaDisabled={!canContinue}
                onCta={continueNext}
                note="Held for 10 minutes while you finish."
              />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          {mobileStage === "guests" ? (
            <div>
              <h1 className="font-display text-[32px] font-light">How many guests?</h1>
              <div className="mt-6 rounded-pill bg-surface px-4 py-3">
                <Stepper size="guest" value={draft.guests} min={1} max={14} onChange={onGuests} />
              </div>
              <GuestChips guests={draft.guests} onGuests={onGuests} />
              <p className="mt-4 font-ui text-small text-muted-subtle">
                Groups over 10 pre-order their meals — we&apos;ll walk you through it.
              </p>
              <Button fullWidth className="mt-8" onClick={() => setMobileStage("date")}>
                Continue
              </Button>
            </div>
          ) : null}

          {mobileStage === "date" ? (
            <div className="flex flex-col gap-[22px]">
              <div className="flex gap-1.5">
                <span className="h-1 flex-1 rounded bg-olive" />
                <span className="h-1 flex-1 rounded bg-track" />
                <span className="h-1 flex-1 rounded bg-track" />
              </div>
              <h1 className="font-display text-[32px] font-light">Choose a date</h1>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {strip.slice(0, 8).map((iso) => (
                  <DateCard
                    key={iso}
                    weekday={weekdayShort(iso)}
                    day={dayNumber(iso)}
                    month={isMonday(iso) ? "Closed" : monthShort(iso)}
                    unavailable={isMonday(iso)}
                    selected={draft.date === iso}
                    onClick={() => setDate(iso)}
                    className="w-[72px] shrink-0 flex-none py-3.5"
                  />
                ))}
              </div>
              <MonthCalendar
                cursor={monthCursor}
                selected={draft.date}
                onPrev={() => setMonthCursor(addDays(monthCursor, -31))}
                onNext={() => setMonthCursor(addDays(monthCursor, 31))}
                onSelect={setDate}
              />
              <Button fullWidth disabled={!draft.date} onClick={() => setMobileStage("time")}>
                Continue to times
              </Button>
            </div>
          ) : null}

          {mobileStage === "time" ? (
            <div className="pb-32">
              <h1 className="font-display text-[32px] font-light">Available times</h1>
              <p className="mt-2 font-ui text-[15px] font-light text-muted" aria-live="polite">
                {draft.date ? formatLongDate(draft.date) : ""} · {guestLabel(draft.guests)}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="shimmer h-16 rounded-card" />
                    ))
                  : slots.map((slot) => (
                      <TimeSlot
                        key={slot.time}
                        time={slot.label}
                        status={draft.time === slot.time ? "selected" : slot.status}
                        caption={
                          slot.status === "almost_full"
                            ? `${slot.remaining ?? 2} tables left`
                            : undefined
                        }
                        onClick={() => slot.status !== "full" && setTime(slot.time, { hold: true })}
                      />
                    ))}
              </div>
              <div className="fixed inset-x-0 bottom-0 border-t border-hairline-8 bg-background px-5 py-4">
                <div className="mb-3 flex items-center justify-between font-ui text-small text-muted">
                  <span>
                    {draft.date ? formatLongDate(draft.date) : ""} ·{" "}
                    {draft.time ? slots.find((s) => s.time === draft.time)?.label : "Time"} ·{" "}
                    {guestLabel(draft.guests)}
                  </span>
                  <button type="button" className="border-b border-muted" onClick={() => setMobileStage("date")}>
                    Edit
                  </button>
                </div>
                <Button fullWidth disabled={!canContinue} onClick={continueNext}>
                  {draft.guests > 10 ? "Continue to group booking" : "Continue to details"}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <GroupNotice open={notice} onClose={() => setNotice(false)} />

      <Sheet open={calendarOpen} onClose={() => setCalendarOpen(false)} labelledBy="more-dates">
        <h2 id="more-dates" className="font-display text-[32px] font-light">
          More dates
        </h2>
        <div className="mt-6">
          <MonthCalendar
            cursor={monthCursor}
            selected={draft.date}
            onPrev={() => setMonthCursor(addDays(monthCursor, -31))}
            onNext={() => setMonthCursor(addDays(monthCursor, 31))}
            onSelect={(iso) => {
              setDate(iso);
              setCalendarOpen(false);
            }}
          />
        </div>
      </Sheet>

      <Sheet open={guestSheet} onClose={() => setGuestSheet(false)} labelledBy="guest-sheet">
        <h2 id="guest-sheet" className="font-display text-[32px] font-light">
          How many guests?
        </h2>
        <div className="mt-6 flex justify-center">
          <Stepper size="guest" value={draft.guests} min={1} max={14} onChange={onGuests} />
        </div>
        <GuestChips guests={draft.guests} onGuests={onGuests} />
        <Button fullWidth className="mt-8" onClick={() => setGuestSheet(false)}>
          Continue
        </Button>
      </Sheet>
    </>
  );
}

function GuestsBlock({ guests, onGuests }: { guests: number; onGuests: (n: number) => void }) {
  return (
    <div className="flex flex-col gap-[18px]">
      <h1 className="font-display text-[38px] font-light">How many guests?</h1>
      <div className="flex flex-wrap items-center gap-5">
        <Stepper size="guest" value={guests} min={1} max={14} onChange={onGuests} />
        <GuestChips guests={guests} onGuests={onGuests} />
      </div>
    </div>
  );
}

function GuestChips({ guests, onGuests }: { guests: number; onGuests: (n: number) => void }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2.5 md:mt-0">
      {[2, 6, 8].map((n) => (
        <Pill key={n} variant={guests === n ? "ink" : "outline"} onClick={() => onGuests(n)}>
          {n}
        </Pill>
      ))}
      <Pill variant={guests > 10 ? "selected" : "group"} onClick={() => onGuests(14)}>
        10+ · group
      </Pill>
    </div>
  );
}

function DatesBlock({
  dates,
  selected,
  onSelect,
  onMore,
}: {
  dates: string[];
  selected: string | null;
  onSelect: (iso: string) => void;
  onMore: () => void;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[38px] font-light">Choose a date</h2>
        <button
          type="button"
          onClick={onMore}
          className="flex items-center gap-2 border-b border-ink pb-0.5 font-ui text-[15px]"
        >
          <CalendarIcon size={17} />
          More dates
        </button>
      </div>
      <div className="flex gap-3">
        {dates.map((iso) => (
          <DateCard
            key={iso}
            weekday={weekdayShort(iso)}
            day={dayNumber(iso)}
            month={isMonday(iso) ? "Closed" : monthShort(iso)}
            unavailable={isMonday(iso)}
            selected={selected === iso}
            onClick={() => onSelect(iso)}
            className="py-[18px]"
          />
        ))}
      </div>
    </div>
  );
}

function TimesBlock({
  date,
  guests,
  loading,
  closed,
  slots,
  selected,
  onSelect,
}: {
  date: string | null;
  guests: number;
  loading: boolean;
  closed?: boolean;
  slots: { time: string; label: string; status: "available" | "almost_full" | "full" | "popular"; remaining?: number }[];
  selected: string | null;
  onSelect: (time: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[38px] font-light">Available times</h2>
        <p className="font-ui text-[15px] font-light text-muted" aria-live="polite">
          {date ? formatLongDate(date) : "Select a date"} · {guestLabel(guests)}
        </p>
      </div>
      {closed ? (
        <p className="font-ui text-body text-muted">We&apos;re closed on Mondays. Please try another date.</p>
      ) : loading ? (
        <div className="grid grid-cols-4 gap-3" aria-busy="true" aria-label="Loading available times">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="shimmer h-20 rounded-slot" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {slots.map((slot) => (
            <TimeSlot
              key={slot.time}
              time={slot.label}
              status={selected === slot.time ? "selected" : slot.status}
              caption={
                slot.status === "almost_full" ? `Only ${slot.remaining ?? 2} tables left` : undefined
              }
              onClick={() => slot.status !== "full" && onSelect(slot.time)}
            />
          ))}
        </div>
      )}
      <div className="mt-1 flex flex-wrap gap-6 font-ui text-small text-muted-subtle">
        <Legend swatch="border border-hairline-30" label="Available" />
        <Legend swatch="bg-olive" label="Selected" />
        <Legend swatch="border border-terracotta-outline bg-terracotta-fill" label="Almost full" />
        <Legend swatch="bg-track" label="Unavailable" />
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-3 w-3 rounded-[3px]", swatch)} />
      {label}
    </div>
  );
}

function MonthCalendar({
  cursor,
  selected,
  onPrev,
  onNext,
  onSelect,
}: {
  cursor: Date;
  selected: string | null;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (iso: string) => void;
}) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = startOfToday();
  const cells = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-card-lg bg-surface p-[18px]">
      <div className="mb-3.5 flex items-center justify-between font-ui text-[15px]">
        <button type="button" className="h-11 w-11" onClick={onPrev} aria-label="Previous month">
          ‹
        </button>
        <span>
          {monthLong(toISODate(first))} {year}
        </span>
        <button type="button" className="h-11 w-11" onClick={onNext} aria-label="Next month">
          ›
        </button>
      </div>
      <div className="mb-1.5 grid grid-cols-7 text-center font-ui text-[10px] font-medium uppercase text-muted-subtle">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={`${d}-${i}`} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-ui text-[15px] font-light">
        {cells.map((day, index) => {
          if (!day) return <div key={`e-${index}`} className="py-2" />;
          const date = new Date(year, month, day);
          const iso = toISODate(date);
          const past = date < today;
          const closed = date.getDay() === 1;
          const isSelected = selected === iso;
          return (
            <button
              key={iso}
              type="button"
              disabled={past || closed}
              onClick={() => onSelect(iso)}
              className={cn(
                "min-h-11 rounded-[8px] py-2",
                isSelected && "bg-olive text-cream",
                (past || closed) && "text-muted-disabled",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
