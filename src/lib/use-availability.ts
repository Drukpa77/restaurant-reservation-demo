"use client";

import { useEffect, useState } from "react";
import type { AvailabilityResponse } from "@/lib/types";

export function useAvailability(date: string | null, guests: number) {
  const [data, setData] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/availability?date=${date}&guests=${guests}`)
      .then((res) => res.json())
      .then((json: AvailabilityResponse) => {
        if (!cancelled) setData(json);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date, guests]);

  return { data, loading };
}
