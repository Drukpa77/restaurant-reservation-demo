"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { nextSaturday, toISODate } from "@/lib/format";
import type { BookingDraft, GuestDetails, PreOrderLine, Reservation } from "@/lib/types";

const STORAGE_KEY = "demo-web-app-draft";
const HOLD_MS = 10 * 60 * 1000;

const emptyDetails: GuestDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  occasion: "none",
  requests: "",
  dietary: [],
  highChair: false,
  accessibility: false,
  marketingOptIn: false,
  policyAccepted: false,
};

function defaultDraft(): BookingDraft {
  return {
    guests: 2,
    date: toISODate(nextSaturday()),
    time: "19:00",
    groupMode: false,
    groupNoticeAcknowledged: false,
    preOrder: [],
    mealsSelected: 0,
    holdExpiresAt: null,
    details: emptyDetails,
    step: "table",
    status: "draft",
    reference: null,
  };
}

function mealsFrom(preOrder: PreOrderLine[]) {
  return preOrder.reduce((sum, line) => sum + line.qty, 0);
}

type BookingContextValue = {
  draft: BookingDraft;
  hydrated: boolean;
  setDraft: (patch: Partial<BookingDraft>) => void;
  setGuests: (guests: number) => void;
  setDate: (date: string | null) => void;
  setTime: (time: string | null, options?: { hold?: boolean }) => void;
  startHold: () => void;
  setPreOrderQty: (dishId: string, qty: number) => void;
  setDetails: (patch: Partial<GuestDetails>) => void;
  acknowledgeGroup: () => void;
  expireHold: () => void;
  resetDraft: () => void;
  loadFromReservation: (reservation: import("@/lib/types").Reservation) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<BookingDraft>(defaultDraft);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BookingDraft;
        setDraftState({
          ...defaultDraft(),
          ...parsed,
          details: { ...emptyDetails, ...parsed.details },
        });
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft, hydrated]);

  const setDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraftState((current) => ({ ...current, ...patch }));
  }, []);

  const setGuests = useCallback((guests: number) => {
    const next = Math.min(14, Math.max(1, guests));
    setDraftState((current) => ({
      ...current,
      guests: next,
      groupMode: next > 10,
      time: null,
      holdExpiresAt: null,
    }));
  }, []);

  const setDate = useCallback((date: string | null) => {
    setDraftState((current) => ({
      ...current,
      date,
      time: null,
      holdExpiresAt: null,
    }));
  }, []);

  const setTime = useCallback((time: string | null, options?: { hold?: boolean }) => {
    setDraftState((current) => ({
      ...current,
      time,
      holdExpiresAt: time && options?.hold ? Date.now() + HOLD_MS : time ? current.holdExpiresAt : null,
    }));
  }, []);

  const startHold = useCallback(() => {
    setDraftState((current) => ({
      ...current,
      holdExpiresAt: current.time ? Date.now() + HOLD_MS : null,
    }));
  }, []);

  const setPreOrderQty = useCallback((dishId: string, qty: number) => {
    setDraftState((current) => {
      const remaining = current.guests - mealsFrom(current.preOrder.filter((line) => line.dishId !== dishId));
      const nextQty = Math.max(0, Math.min(qty, remaining, 14));
      const preOrder = current.preOrder.filter((line) => line.dishId !== dishId);
      if (nextQty > 0) preOrder.push({ dishId, qty: nextQty });
      return {
        ...current,
        preOrder,
        mealsSelected: mealsFrom(preOrder),
      };
    });
  }, []);

  const setDetails = useCallback((patch: Partial<GuestDetails>) => {
    setDraftState((current) => ({
      ...current,
      details: { ...current.details, ...patch },
    }));
  }, []);

  const acknowledgeGroup = useCallback(() => {
    setDraftState((current) => ({ ...current, groupNoticeAcknowledged: true, groupMode: true }));
  }, []);

  const expireHold = useCallback(() => {
    setDraftState((current) => ({
      ...current,
      time: null,
      holdExpiresAt: null,
      step: "table",
      status: "draft",
    }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraftState(defaultDraft());
  }, []);

  const loadFromReservation = useCallback((reservation: Reservation) => {
    setDraftState({
      guests: reservation.guests,
      date: reservation.date,
      time: reservation.time,
      groupMode: reservation.guests > 10,
      groupNoticeAcknowledged: true,
      preOrder: reservation.preOrder,
      mealsSelected: mealsFrom(reservation.preOrder),
      holdExpiresAt: null,
      details: { ...emptyDetails, ...reservation.details },
      step: "preorder",
      status: "confirmed",
      reference: reservation.reference,
    });
  }, []);

  const value = useMemo(
    () => ({
      draft,
      hydrated,
      setDraft,
      setGuests,
      setDate,
      setTime,
      startHold,
      setPreOrderQty,
      setDetails,
      acknowledgeGroup,
      expireHold,
      resetDraft,
      loadFromReservation,
    }),
    [
      draft,
      hydrated,
      setDraft,
      setGuests,
      setDate,
      setTime,
      startHold,
      setPreOrderQty,
      setDetails,
      acknowledgeGroup,
      expireHold,
      resetDraft,
      loadFromReservation,
    ],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
}

export function useHoldRemaining() {
  const { draft } = useBooking();
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!draft.holdExpiresAt) {
      setRemaining(0);
      return;
    }

    function tick() {
      const ms = (draft.holdExpiresAt ?? 0) - Date.now();
      setRemaining(Math.max(0, ms));
    }

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [draft.holdExpiresAt]);

  return remaining;
}
