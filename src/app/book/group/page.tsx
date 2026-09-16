"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookingHeader, BookingMobileBar } from "@/components/layout/BookingHeader";
import { Button } from "@/components/ui/Button";
import { formatCardDate, formatTimeLabel, guestLabel } from "@/lib/format";
import { useBooking } from "@/lib/booking-store";

export default function GroupDashboardPage() {
  const router = useRouter();
  const { draft, hydrated } = useBooking();

  useEffect(() => {
    if (!hydrated) return;
    if (draft.guests <= 10 || !draft.date || !draft.time) {
      router.replace("/book");
    }
  }, [hydrated, draft.guests, draft.date, draft.time, router]);

  return (
    <>
      <div className="hidden md:block">
        <BookingHeader
          steps={[
            { id: "table", label: "Table" },
            { id: "preorder", label: "Pre-order" },
            { id: "details", label: "Details" },
            { id: "confirm", label: "Confirm" },
          ]}
          current="preorder"
        />
      </div>
      <BookingMobileBar stepLabel="Group reservation" onBack={() => router.push("/book")} />
      <div className="mx-auto max-w-[860px] px-5 py-10 md:px-gutter md:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-3.5">
          <p className="font-ui text-[12px] uppercase tracking-locale text-muted-subtle">
            Group reservation
          </p>
          <span className="rounded-pill bg-terracotta-muted px-3.5 py-1.5 font-ui text-[13px] tracking-[0.06em] text-terracotta">
            Pre-order required
          </span>
        </div>
        <h1 className="font-display text-[40px] font-light">Your group reservation</h1>
        <div className="mt-7 grid gap-[18px] sm:grid-cols-2">
          <Tile label="Guests" value={String(draft.guests)} />
          <Tile label="Date" value={draft.date ? formatCardDate(draft.date) : "—"} />
          <Tile label="Time" value={draft.time ? formatTimeLabel(draft.time) : "—"} />
          <Tile label="Table" value="Long table" />
        </div>
        <div className="mt-7 flex flex-col gap-4 border-t border-hairline-10 pt-[26px] md:flex-row md:items-center md:justify-between">
          <p className="max-w-[330px] font-ui text-[17px] font-light leading-relaxed text-muted">
            {draft.mealsSelected === 0
              ? "Meals not selected yet. Your table is held either way."
              : `${draft.mealsSelected} of ${guestLabel(draft.guests)} selected.`}
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Button variant="text-ink" onClick={() => router.push("/book/details")}>
              Complete later
            </Button>
            <Button onClick={() => router.push("/book/pre-order")}>
              {draft.mealsSelected > 0 ? "Continue Pre-order" : "Start Pre-order"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card bg-surface p-[22px]">
      <p className="font-ui text-[11px] uppercase tracking-label text-muted-subtle">{label}</p>
      <p className="mt-2 font-display text-[30px] font-light">{value}</p>
    </div>
  );
}
