"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function FindReservationPage() {
  const router = useRouter();
  const [ref, setRef] = useState("#RES1048");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const cleaned = ref.trim().toUpperCase().replace(/\s/g, "");
    const key = cleaned.startsWith("#") ? cleaned : `#${cleaned}`;
    setLoading(true);
    setError(undefined);
    const res = await fetch(`/api/reservations/${encodeURIComponent(key)}`);
    setLoading(false);
    if (!res.ok) {
      setError("We couldn't find that booking. Try #RES1048 or #RES1049 in this demo.");
      return;
    }
    router.push(`/reservations/${encodeURIComponent(key)}`);
  }

  return (
    <div className="bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-[560px] px-5 py-16 md:px-gutter">
        <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">Manage</p>
        <h1 className="mt-3 font-display text-[42px] font-light">Find your reservation</h1>
        <p className="mt-4 font-ui text-body text-muted">
          Enter the reference from your confirmation email or text. Demo bookings: #RES1048 (table for 4) and #RES1049 (group of 14).
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
          <Input
            label="Booking reference"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            error={error}
            placeholder="#RES1048"
          />
          <Button type="submit" loading={loading}>
            {loading ? "Looking…" : "View reservation"}
          </Button>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}
