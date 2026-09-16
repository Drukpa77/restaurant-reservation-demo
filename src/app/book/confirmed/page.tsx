"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PinIcon, PhoneIcon, ShareIcon, TickIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { formatCardDate, formatTimeLabel } from "@/lib/format";
import { useBooking } from "@/lib/booking-store";
import type { Reservation } from "@/lib/types";

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<div className="px-gutter py-16 font-ui text-muted">Loading confirmation…</div>}>
      <ConfirmedInner />
    </Suspense>
  );
}

function ConfirmedInner() {
  const searchParams = useSearchParams();
  const toast = useToast();
  const { draft, hydrated, resetDraft } = useBooking();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const ref = searchParams.get("ref") ?? draft.reference;

  useEffect(() => {
    if (!hydrated && !searchParams.get("ref")) return;
    if (!ref) {
      setLoading(false);
      setMissing(true);
      return;
    }
    setLoading(true);
    fetch(`/api/reservations/${encodeURIComponent(ref)}`)
      .then(async (res) => {
        if (!res.ok) {
          setMissing(true);
          setReservation(null);
          return;
        }
        setReservation(await res.json());
        setMissing(false);
      })
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [ref, hydrated, searchParams]);

  if (loading) {
    return <p className="px-gutter py-16 font-ui text-muted">Loading confirmation…</p>;
  }

  const data = reservation;
  if (missing || !data) {
    return (
      <div className="mx-auto max-w-[560px] px-5 py-16 md:px-gutter">
        <h1 className="font-display text-[32px] font-light">We couldn&apos;t find that reservation</h1>
        <p className="mt-4 font-ui text-body text-muted">
          Look it up with the reference from your confirmation, or book a new table.
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

  const dateParts = data.date.split("-");
  const timeParts = data.time.split(":");
  const reference = data.reference;
  const shareText = `${reference} · Terra & Vine · ${formatCardDate(data.date)} ${formatTimeLabel(data.time)}`;

  function calendar() {
    const start = `${dateParts[0]}${dateParts[1]}${dateParts[2]}T${timeParts[0]}${timeParts[1]}00`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Terra & Vine")}&dates=${start}/${start}`;
    window.open(url, "_blank");
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Terra & Vine", text: shareText });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      toast("Reservation copied");
    } catch {
      await navigator.clipboard.writeText(reference);
      toast("Reference copied");
    }
  }

  return (
    <div className="bg-background">
      <section className="bg-olive px-5 py-14 text-center text-cream md:px-11 md:py-14">
        <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full bg-cream-07 shadow-halo animate-tick-in">
          <TickIcon size={34} className="text-cream" />
        </div>
        <h1 className="mt-[22px] font-display text-[38px] font-light md:text-[46px]">Your table is reserved</h1>
        <p className="mt-3 font-ui text-[18px] font-light text-cream-82">We look forward to welcoming you.</p>
      </section>
      <div className="mx-auto max-w-[706px] px-5 py-9 md:px-11 md:py-11">
        <div className="rounded-card-lg border border-hairline-12 p-[30px] shadow-card">
          <div className="flex items-center justify-between">
            <p className="font-ui text-[12px] uppercase tracking-locale text-muted-subtle">Reservation</p>
            <p className="font-ui text-[17px] tracking-[0.08em]">{data.reference}</p>
          </div>
          <div className="my-5 h-px bg-hairline-10" />
          <div className="grid grid-cols-2 gap-5">
            <Meta label="Date" value={formatCardDate(data.date)} />
            <Meta label="Time" value={formatTimeLabel(data.time)} />
            <Meta label="Guests" value={String(data.guests)} />
            <Meta label="Booked by" value={`${data.details.firstName} ${data.details.lastName}`} />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <Button fullWidth onClick={calendar}>
            Add to Calendar
          </Button>
          <Button variant="secondary" fullWidth href={`/reservations/${encodeURIComponent(data.reference)}`}>
            Manage Reservation
          </Button>
          <Button variant="secondary" fullWidth href="/menu">
            View Menu
          </Button>
        </div>
        <div className="mt-[26px] flex justify-around font-ui text-[15px] text-muted md:justify-center md:gap-[30px]">
          <a href="https://maps.google.com/?q=12+Hartwell+Lane+Fitzroy" className="flex items-center gap-2">
            <PinIcon size={16} /> Directions
          </a>
          <a href="tel:+61394172280" className="flex items-center gap-2">
            <PhoneIcon size={16} /> Call restaurant
          </a>
          <button type="button" className="flex items-center gap-2" onClick={share}>
            <ShareIcon size={16} /> Share reservation
          </button>
        </div>
        <p className="mt-[26px] rounded-card bg-surface p-5 font-ui text-[16px] font-light leading-relaxed text-ink-alt">
          A confirmation is on its way to {data.details.email} and by text. Changes can be made until 24 hours before your table.
        </p>
        <div className="mt-8 text-center">
          <Button
            variant="text-ink"
            onClick={() => {
              resetDraft();
              window.location.href = "/";
            }}
          >
            Back to Terra & Vine
          </Button>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-ui text-[11px] uppercase tracking-label text-muted-subtle">{label}</p>
      <p className="mt-1.5 font-display text-[21px] font-light md:text-[26px]">{value}</p>
    </div>
  );
}
