"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { DateCard, TimeSlot } from "@/components/ui/Card";
import { Modal, Sheet } from "@/components/ui/Overlay";
import { Stepper } from "@/components/ui/Stepper";
import { Pill } from "@/components/ui/Pill";
import { useToast } from "@/components/ui/Toast";
import {
  addDays,
  dayNumber,
  formatLongDate,
  formatTimeLabel,
  guestLabel,
  isMonday,
  monthShort,
  startOfToday,
  toISODate,
  weekdayShort,
} from "@/lib/format";
import { useAvailability } from "@/lib/use-availability";
import { useBooking } from "@/lib/booking-store";
import type { Reservation } from "@/lib/types";

export default function ManageReservationPage() {
  const params = useParams<{ ref: string }>();
  const ref = decodeURIComponent(params.ref);

  return (
    <div className="bg-background">
      <SiteHeader />
      <ManageInner refCode={ref} />
      <SiteFooter />
    </div>
  );
}

function ManageInner({ refCode }: { refCode: string }) {
  const router = useRouter();
  const toast = useToast();
  const { loadFromReservation } = useBooking();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [missing, setMissing] = useState(false);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [sheet, setSheet] = useState<"date" | "time" | "guests" | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/reservations/${encodeURIComponent(refCode)}`)
      .then(async (res) => {
        if (!res.ok) {
          setMissing(true);
          return;
        }
        const data = (await res.json()) as Reservation;
        setReservation(data);
        setGuests(data.guests);
        setDate(data.date);
        setTime(data.time);
      })
      .catch(() => setMissing(true));
  }, [refCode]);

  const { data, loading } = useAvailability(date || null, guests);
  const dates = useMemo(
    () => Array.from({ length: 14 }, (_, i) => toISODate(addDays(startOfToday(), i))),
    [],
  );

  const dirty =
    !!reservation &&
    (guests !== reservation.guests || date !== reservation.date || time !== reservation.time);

  async function patch(body: Partial<Reservation>) {
    if (!reservation) return null;
    const res = await fetch(`/api/reservations/${encodeURIComponent(reservation.reference)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const next = (await res.json()) as Reservation;
    setReservation(next);
    setGuests(next.guests);
    setDate(next.date);
    setTime(next.time);
    return next;
  }

  async function save() {
    if (!reservation) return;
    setSaving(true);
    const next = await patch({
      guests,
      date,
      time,
      table: guests > 10 ? "Long table" : "Dining room",
      preOrder: guests > 10 ? reservation.preOrder : [],
    });
    setSaving(false);
    if (next) toast("Reservation updated");
  }

  async function cancel() {
    const next = await patch({ status: "cancelled" });
    setCancelOpen(false);
    if (next) toast("Reservation cancelled");
  }

  function editPreOrder() {
    if (!reservation) return;
    loadFromReservation(reservation);
    router.push(`/book/pre-order?manage=${encodeURIComponent(reservation.reference)}`);
  }

  if (missing) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-16 md:px-gutter">
        <h1 className="font-display text-h2">We couldn&apos;t find that booking</h1>
        <p className="mt-4 max-w-lg font-ui text-body text-muted">
          Check the reference in your confirmation text, or try the demo bookings #RES1048 and #RES1049.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/reservations">Find a booking</Button>
          <Button variant="secondary" href="/book">
            Book a Table
          </Button>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return <p className="px-gutter py-16 font-ui text-muted">Loading reservation…</p>;
  }

  const cancelled = reservation.status === "cancelled";
  const meals = reservation.preOrder.reduce((sum, line) => sum + line.qty, 0);
  const slots = data?.slots ?? [];

  return (
    <div className="mx-auto max-w-[860px] px-5 py-10 md:px-gutter md:py-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2.5 font-ui text-[12px] uppercase tracking-locale text-muted-subtle">
            Manage reservation · {reservation.reference}
          </p>
          <h1 className="font-display text-[32px] font-light leading-tight md:text-[40px]">
            {date ? formatLongDate(date) : formatLongDate(reservation.date)}
          </h1>
        </div>
        <span
          className={`inline-flex items-center gap-2 self-start rounded-pill px-[18px] py-2.5 font-ui text-[14px] tracking-[0.06em] ${
            cancelled ? "bg-error-muted text-error" : "bg-olive-muted text-olive"
          }`}
        >
          <span className={`h-[7px] w-[7px] rounded-full ${cancelled ? "bg-error" : "bg-olive"}`} />
          {cancelled ? "Cancelled" : "Confirmed"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Tile label="Time" value={time ? formatTimeLabel(time) : "—"} />
        <Tile label="Guests" value={guestLabel(guests)} />
        <Tile label="Table" value={guests > 10 ? "Long table" : reservation.table} />
      </div>

      <div className="mt-7 grid gap-[26px] border-t border-hairline-10 pt-[26px] md:grid-cols-2">
        <div>
          <p className="font-ui text-[11px] uppercase tracking-label text-muted-subtle">Contact</p>
          <p className="mt-2 font-ui text-[17px] font-light leading-relaxed text-ink-alt">
            {reservation.details.firstName} {reservation.details.lastName}
            <br />
            {reservation.details.email}
            <br />
            {reservation.details.phone}
          </p>
        </div>
        <div>
          <p className="font-ui text-[11px] uppercase tracking-label text-muted-subtle">Special requests</p>
          <p className="mt-2 font-ui text-[17px] font-light leading-relaxed text-ink-alt">
            {reservation.details.requests || "None"}
            {reservation.details.occasion !== "none" ? ` · ${reservation.details.occasion}` : ""}
            {reservation.details.dietary.length ? ` · ${reservation.details.dietary.join(", ")}` : ""}
            {reservation.details.highChair ? " · high chair" : ""}
          </p>
        </div>
      </div>

      {guests > 10 ? (
        <div className="mt-[26px] flex flex-col items-start justify-between gap-4 rounded-card bg-terracotta-fill p-[22px] sm:flex-row sm:items-center">
          <div>
            <p className="font-ui text-[12px] uppercase tracking-label text-terracotta">Pre-order</p>
            <p className="mt-1.5 font-display text-[22px] font-light">
              {meals} of {guests} meals selected
            </p>
          </div>
          <Button variant="secondary" className="border-terracotta text-terracotta" onClick={editPreOrder}>
            Edit Pre-order
          </Button>
        </div>
      ) : null}

      {!cancelled ? (
        <>
          <div className="mt-7 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <Button variant="secondary" onClick={() => setSheet("date")}>
              Change date
            </Button>
            <Button variant="secondary" onClick={() => setSheet("time")}>
              Change time
            </Button>
            <Button variant="secondary" onClick={() => setSheet("guests")}>
              Change guests
            </Button>
            <Button onClick={save} disabled={!dirty} loading={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
          {dirty ? (
            <p className="mt-3 font-ui text-small text-muted-subtle">You have unsaved changes.</p>
          ) : null}
          <p className="mt-[26px] font-ui text-[15px] font-light text-muted-subtle">
            Can&apos;t make it?{" "}
            <button type="button" onClick={() => setCancelOpen(true)} className="border-b border-muted-subtle">
              Cancel reservation
            </button>
          </p>
        </>
      ) : (
        <Button className="mt-8" href="/book">
          Book again
        </Button>
      )}

      <Sheet open={sheet === "date"} onClose={() => setSheet(null)} labelledBy="manage-date">
        <h2 id="manage-date" className="font-display text-[32px] font-light">
          Change date
        </h2>
        <div className="mt-6 flex gap-2.5 overflow-x-auto pb-2">
          {dates.map((iso) => (
            <DateCard
              key={iso}
              weekday={weekdayShort(iso)}
              day={dayNumber(iso)}
              month={isMonday(iso) ? "Closed" : monthShort(iso)}
              unavailable={isMonday(iso)}
              selected={date === iso}
              onClick={() => {
                setDate(iso);
                setTime("");
              }}
              className="w-[72px] shrink-0 flex-none"
            />
          ))}
        </div>
        <Button fullWidth className="mt-6" disabled={!date} onClick={() => setSheet("time")}>
          Choose a time
        </Button>
      </Sheet>

      <Sheet open={sheet === "time"} onClose={() => setSheet(null)} labelledBy="manage-time">
        <h2 id="manage-time" className="font-display text-[32px] font-light">
          Change time
        </h2>
        <div className="mt-5 grid max-h-[50vh] grid-cols-2 gap-3 overflow-y-auto">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="shimmer h-16 rounded-slot" />)
            : slots.map((slot) => (
                <TimeSlot
                  key={slot.time}
                  time={slot.label}
                  status={time === slot.time ? "selected" : slot.status}
                  onClick={() => slot.status !== "full" && setTime(slot.time)}
                />
              ))}
        </div>
        <Button fullWidth className="mt-6" disabled={!time} onClick={() => setSheet(null)}>
          Done
        </Button>
      </Sheet>

      <Sheet open={sheet === "guests"} onClose={() => setSheet(null)} labelledBy="manage-guests">
        <h2 id="manage-guests" className="font-display text-[32px] font-light">
          Change guests
        </h2>
        <div className="mt-6 flex justify-center">
          <Stepper size="guest" value={guests} min={1} max={14} onChange={setGuests} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {[2, 6, 8].map((n) => (
            <Pill key={n} variant={guests === n ? "ink" : "outline"} onClick={() => setGuests(n)}>
              {n}
            </Pill>
          ))}
          <Pill variant={guests > 10 ? "selected" : "group"} onClick={() => setGuests(14)}>
            10+ · group
          </Pill>
        </div>
        <Button fullWidth className="mt-8" onClick={() => setSheet(null)}>
          Done
        </Button>
      </Sheet>

      <Modal open={cancelOpen} onClose={() => setCancelOpen(false)} labelledBy="cancel-title">
        <h2 id="cancel-title" className="font-display text-[32px] font-light">
          Cancel this reservation?
        </h2>
        <p className="mt-4 font-ui text-[16px] font-light leading-relaxed text-muted">
          {reservation.reference} for {guestLabel(guests)} on {formatLongDate(date)} will be released. You can book again any time.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={cancel}>Yes, cancel it</Button>
          <Button variant="secondary" onClick={() => setCancelOpen(false)}>
            Keep reservation
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card bg-surface p-5">
      <p className="font-ui text-[11px] uppercase tracking-label text-muted-subtle">{label}</p>
      <p className="mt-1.5 font-display text-[26px] font-light">{value}</p>
    </div>
  );
}
