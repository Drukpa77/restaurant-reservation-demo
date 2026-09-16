"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SummaryCard } from "@/components/booking/SummaryCard";
import { BookingHeader, BookingMobileBar, HoldLabel } from "@/components/layout/BookingHeader";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input, Textarea } from "@/components/ui/Input";
import { Pill } from "@/components/ui/Pill";
import { Select } from "@/components/ui/Select";
import { formatCardDate, formatTimeLabel, guestLabel } from "@/lib/format";
import { useBooking } from "@/lib/booking-store";
import { isDetailsComplete, validateEmail, validateName, validatePhone } from "@/lib/validation";

const OCCASIONS = [
  { value: "none", label: "None" },
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "business", label: "Business dinner" },
  { value: "celebration", label: "Celebration" },
  { value: "other", label: "Other" },
];

const DIETARY = ["Vegetarian", "Vegan", "Gluten free", "Nut allergy", "Shellfish"];

export default function DetailsPage() {
  const router = useRouter();
  const { draft, hydrated, setDetails, setDraft } = useBooking();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  const group = draft.guests > 10;
  const steps = group
    ? [
        { id: "table", label: "Table" },
        { id: "preorder", label: "Pre-order" },
        { id: "details", label: "Details" },
        { id: "confirm", label: "Confirm" },
      ]
    : [
        { id: "table", label: "Table" },
        { id: "details", label: "Details" },
        { id: "confirm", label: "Confirm" },
      ];

  const valid = isDetailsComplete(draft.details);
  const d = draft.details;

  useEffect(() => {
    if (!hydrated) return;
    if (!draft.date || !draft.time || (!draft.holdExpiresAt && draft.status === "draft")) {
      router.replace("/book");
    }
  }, [hydrated, draft.date, draft.time, draft.holdExpiresAt, draft.status, router]);

  if (!hydrated) {
    return <p className="px-gutter py-16 font-ui text-muted">Loading details…</p>;
  }

  function blur(field: string, value: string) {
    const message =
      field === "email"
        ? validateEmail(value)
        : field === "phone"
          ? validatePhone(value)
          : validateName(value);
    setErrors((current) => ({ ...current, [field]: message }));
  }

  function toggleDiet(item: string) {
    const next = d.dietary.includes(item)
      ? d.dietary.filter((entry) => entry !== item)
      : [...d.dietary, item];
    setDetails({ dietary: next });
  }

  async function confirm() {
    if (!valid || !draft.date || !draft.time) return;
    setSubmitting(true);
    setFailed(false);
    setDraft({ status: "submitting" });
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guests: draft.guests,
          date: draft.date,
          time: draft.time,
          preOrder: draft.preOrder,
          details: draft.details,
        }),
      });
      if (!res.ok) {
        setFailed(true);
        setDraft({ status: "failed" });
        return;
      }
      const reservation = await res.json();
      setDraft({ status: "confirmed", reference: reservation.reference, step: "confirm" });
      router.push(`/book/confirmed?ref=${encodeURIComponent(reservation.reference)}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (failed) {
    return (
      <div className="mx-auto max-w-[560px] px-5 py-16 md:px-gutter">
        <p className="font-ui text-[11px] uppercase tracking-[0.24em] text-error">Booking failed</p>
        <div className="mt-4 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-error-muted font-ui text-[24px] font-light text-error">
          !
        </div>
        <h1 className="mt-4 font-display text-[30px] font-light leading-tight">
          We couldn&apos;t complete your reservation
        </h1>
        <p className="mt-4 font-ui text-[16px] font-light leading-relaxed text-muted">
          Your table has not been booked and no payment details were taken. The time may have been claimed while you were filling in your details.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            onClick={() => {
              setFailed(false);
              confirm();
            }}
          >
            Try again
          </Button>
          <Button variant="text-ink" href="tel:+61394172280">
            Call the restaurant
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <BookingHeader steps={steps} current="details" right={<HoldLabel />} />
      </div>
      <BookingMobileBar
        stepLabel={`Step ${group ? "3 of 4" : "2 of 3"} · Details`}
        right={<HoldLabel />}
        onBack={() => router.push(group ? "/book/pre-order" : "/book")}
      />

      <div className="grid items-start gap-12 px-5 py-8 md:px-gutter md:py-11 lg:grid-cols-[1fr_372px]">
        <div className="flex flex-col gap-[30px]">
          <div className="rounded-card bg-surface px-4 py-3 md:hidden">
            <div className="flex items-center justify-between">
              <p className="font-ui text-[15px] font-light leading-snug text-ink-alt">
                {draft.date ? formatCardDate(draft.date) : ""} · {draft.time ? formatTimeLabel(draft.time) : ""}
                <br />
                {guestLabel(draft.guests)}
              </p>
              <button type="button" className="border-b border-ink font-ui text-[13px]" onClick={() => router.push("/book")}>
                Edit
              </button>
            </div>
          </div>
          <div>
            <h1 className="font-display text-[36px] font-light md:text-[44px]">Who&apos;s joining us?</h1>
            <p className="mt-2.5 font-ui text-[18px] font-light text-muted">
              We&apos;ll send your confirmation by email and text.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="First name"
              value={d.firstName}
              onChange={(e) => setDetails({ firstName: e.target.value })}
              onBlur={(e) => blur("firstName", e.target.value)}
              error={errors.firstName}
            />
            <Input
              label="Last name"
              value={d.lastName}
              onChange={(e) => setDetails({ lastName: e.target.value })}
              onBlur={(e) => blur("lastName", e.target.value)}
              error={errors.lastName}
            />
            <Input
              label="Email"
              type="email"
              value={d.email}
              onChange={(e) => setDetails({ email: e.target.value })}
              onBlur={(e) => blur("email", e.target.value)}
              error={errors.email}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="04__ ___ ___"
              value={d.phone}
              onChange={(e) => setDetails({ phone: e.target.value })}
              onBlur={(e) => blur("phone", e.target.value)}
              error={errors.phone}
            />
          </div>
          <Select
            label="Occasion"
            value={d.occasion}
            options={OCCASIONS}
            onChange={(value) => setDetails({ occasion: value })}
          />
          <Textarea
            label="Special requests"
            placeholder="A quiet corner table if one's free — we're celebrating."
            value={d.requests}
            onChange={(e) => setDetails({ requests: e.target.value })}
          />
          <div>
            <p className="mb-3 font-ui text-[12px] uppercase tracking-kicker text-muted-subtle">
              Dietary requirements
            </p>
            <div className="flex flex-wrap gap-2.5">
              {DIETARY.map((item) => (
                <Pill
                  key={item}
                  variant={d.dietary.includes(item) ? "selected" : "outline"}
                  onClick={() => toggleDiet(item)}
                >
                  {item}
                </Pill>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <Checkbox
              label="High chair required"
              checked={d.highChair}
              onChange={(e) => setDetails({ highChair: e.target.checked })}
            />
            <Checkbox
              label="Wheelchair accessibility needed"
              checked={d.accessibility}
              onChange={(e) => setDetails({ accessibility: e.target.checked })}
            />
            <Checkbox
              label="Send me seasonal menu news"
              checked={d.marketingOptIn}
              onChange={(e) => setDetails({ marketingOptIn: e.target.checked })}
            />
          </div>
          <div className="rounded-card bg-surface p-5">
            <Checkbox
              label={
                <span>
                  I agree to the reservation and cancellation policy.{" "}
                  <a href="/policy" className="border-b border-ink">
                    Read the full policy
                  </a>
                </span>
              }
              checked={d.policyAccepted}
              onChange={(e) => setDetails({ policyAccepted: e.target.checked })}
            />
          </div>
          <div className="lg:hidden">
            <Button fullWidth disabled={!valid} loading={submitting} onClick={confirm}>
              {submitting ? "Confirming…" : "Confirm Reservation"}
            </Button>
            {!valid ? (
              <p className="mt-3 text-center font-ui text-small text-muted-subtle">
                Disabled until phone and policy are complete.
              </p>
            ) : null}
          </div>
        </div>
        <div className="hidden lg:sticky lg:top-8 lg:block">
          <SummaryCard
            date={draft.date}
            time={draft.time}
            guests={draft.guests}
            mealsSelected={group ? draft.mealsSelected : undefined}
            cta={submitting ? "Confirming…" : "Confirm Reservation"}
            ctaDisabled={!valid}
            ctaLoading={submitting}
            onCta={confirm}
            note={!valid ? "Disabled until phone and policy are complete." : "Held for 10 minutes while you finish."}
            onEditDate={() => router.push("/book")}
            onEditTime={() => router.push("/book")}
            onEditGuests={() => router.push("/book")}
            onEditPreorder={group ? () => router.push("/book/pre-order") : undefined}
          />
        </div>
      </div>
    </>
  );
}
