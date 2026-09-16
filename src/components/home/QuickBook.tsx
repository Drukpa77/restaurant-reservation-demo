"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DateCard, TimeSlot } from "@/components/ui/Card";
import { CalendarIcon, ClockIcon, PersonIcon } from "@/components/ui/Icons";
import { Sheet } from "@/components/ui/Overlay";
import { Stepper } from "@/components/ui/Stepper";
import { Pill } from "@/components/ui/Pill";
import { useBooking } from "@/lib/booking-store";
import {
  addDays,
  dayNumber,
  formatCardDate,
  formatTimeLabel,
  guestLabel,
  isMonday,
  monthShort,
  startOfToday,
  toISODate,
  weekdayShort,
} from "@/lib/format";
import { useAvailability } from "@/lib/use-availability";

export function QuickBook() {
  const { draft, setGuests, setDate, setTime } = useBooking();
  const router = useRouter();
  const [sheet, setSheet] = useState<"guests" | "date" | "time" | null>(null);
  const { data, loading } = useAvailability(draft.date, draft.guests);
  const dates = Array.from({ length: 8 }, (_, i) => toISODate(addDays(startOfToday(), i)));

  function go() {
    const params = new URLSearchParams();
    params.set("guests", String(draft.guests));
    if (draft.date) params.set("date", draft.date);
    if (draft.time) params.set("time", draft.time);
    router.push(`/book?${params.toString()}`);
  }

  return (
    <>
      <div className="relative z-10 hidden px-gutter md:block md:-mt-16">
        <div className="grid items-center rounded-card-xl border border-hairline-6 bg-background px-[30px] py-[26px] shadow-float lg:grid-cols-[1fr_1fr_1fr_auto]">
          <button type="button" className="pr-[26px] text-left" onClick={() => setSheet("guests")}>
            <Field icon={<PersonIcon className="text-olive" />} label="Guests" value={guestLabel(draft.guests)} />
          </button>
          <button type="button" className="border-l border-hairline-10 px-[26px] text-left" onClick={() => setSheet("date")}>
            <Field
              icon={<CalendarIcon className="text-olive" />}
              label="Date"
              value={draft.date ? formatCardDate(draft.date) : "Choose date"}
            />
          </button>
          <button type="button" className="border-l border-hairline-10 px-[26px] text-left" onClick={() => setSheet("time")}>
            <Field
              icon={<ClockIcon className="text-olive" />}
              label="Time"
              value={draft.time ? formatTimeLabel(draft.time) : "Choose time"}
            />
          </button>
          <Button size="lg" onClick={go}>
            Find a Table
          </Button>
        </div>
      </div>

      <div className="px-5 pt-[22px] md:hidden">
        <div className="flex flex-col gap-3 rounded-card-xl border border-hairline-8 bg-background p-[18px] shadow-raised">
          <div className="flex gap-2.5">
            <Tile label="Guests" value={String(draft.guests)} onClick={() => setSheet("guests")} className="flex-1" />
            <Tile
              label="Date"
              value={draft.date ? formatCardDate(draft.date) : "Date"}
              onClick={() => setSheet("date")}
              className="flex-[1.4]"
            />
            <Tile
              label="Time"
              value={draft.time ? formatTimeLabel(draft.time) : "Time"}
              onClick={() => setSheet("time")}
              className="flex-[1.1]"
            />
          </div>
          <Button fullWidth onClick={go}>
            Find a Table
          </Button>
        </div>
      </div>

      <Sheet open={sheet === "guests"} onClose={() => setSheet(null)} labelledBy="qb-guests">
        <h2 id="qb-guests" className="font-display text-[32px] font-light">
          How many guests?
        </h2>
        <div className="mt-6 flex justify-center">
          <Stepper size="guest" value={draft.guests} min={1} max={14} onChange={setGuests} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {[2, 6, 8].map((n) => (
            <Pill key={n} variant={draft.guests === n ? "ink" : "outline"} onClick={() => setGuests(n)}>
              {n}
            </Pill>
          ))}
          <Pill variant={draft.guests > 10 ? "selected" : "group"} onClick={() => setGuests(14)}>
            10+ · group
          </Pill>
        </div>
        <Button fullWidth className="mt-8" onClick={() => setSheet(null)}>
          Done
        </Button>
      </Sheet>

      <Sheet open={sheet === "date"} onClose={() => setSheet(null)} labelledBy="qb-date">
        <h2 id="qb-date" className="font-display text-[32px] font-light">
          Choose a date
        </h2>
        <div className="mt-6 flex gap-2.5 overflow-x-auto pb-2">
          {dates.map((iso) => (
            <DateCard
              key={iso}
              weekday={weekdayShort(iso)}
              day={dayNumber(iso)}
              month={isMonday(iso) ? "Closed" : monthShort(iso)}
              unavailable={isMonday(iso)}
              selected={draft.date === iso}
              onClick={() => setDate(iso)}
              className="w-[72px] shrink-0 flex-none"
            />
          ))}
        </div>
        <Button fullWidth className="mt-6" disabled={!draft.date} onClick={() => setSheet("time")}>
          Continue to times
        </Button>
      </Sheet>

      <Sheet open={sheet === "time"} onClose={() => setSheet(null)} labelledBy="qb-time">
        <h2 id="qb-time" className="font-display text-[32px] font-light">
          Available times
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="shimmer h-16 rounded-slot" />)
            : (data?.slots ?? []).map((slot) => (
                <TimeSlot
                  key={slot.time}
                  time={slot.label}
                  status={draft.time === slot.time ? "selected" : slot.status}
                  onClick={() => slot.status !== "full" && setTime(slot.time)}
                />
              ))}
        </div>
        <Button fullWidth className="mt-6" disabled={!draft.time} onClick={go}>
          Find a Table
        </Button>
      </Sheet>
    </>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface">{icon}</div>
      <div className="flex flex-col gap-0.5">
        <p className="font-ui text-[11px] font-medium uppercase tracking-label text-muted-subtle">{label}</p>
        <p className="font-display text-[20px]">{value}</p>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  onClick,
  className,
}: {
  label: string;
  value: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={`rounded-slot bg-surface px-3.5 py-3 text-left ${className ?? ""}`}>
      <p className="font-ui text-[9px] font-medium uppercase tracking-label text-muted-subtle">{label}</p>
      <p className="mt-0.5 font-display text-[17px]">{value}</p>
    </button>
  );
}
