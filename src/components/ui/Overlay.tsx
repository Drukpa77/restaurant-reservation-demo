"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  describedBy?: string;
};

function useLockBody(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
}

function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
  describedBy,
}: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBody(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter-m md:p-8">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-scrim animate-fade-in"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className="relative z-10 w-full max-w-[560px] rounded-modal bg-background p-10 shadow-modal animate-modal-in focus:outline-none"
      >
        {children}
      </div>
    </div>
  );
}

export function Sheet({
  open,
  onClose,
  children,
  labelledBy,
  describedBy,
}: OverlayProps) {
  const fallbackTitleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBody(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <button
        type="button"
        aria-label="Close sheet"
        className="absolute inset-0 bg-scrim-sheet animate-fade-in"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy ?? fallbackTitleId}
        aria-describedby={describedBy}
        tabIndex={-1}
        className="relative z-10 w-full rounded-t-sheet bg-background px-5 pb-8 pt-3 shadow-float animate-sheet-in focus:outline-none"
      >
        <div className="mx-auto mb-4 h-1 w-9 rounded-[3px] bg-hairline-18" />
        {children}
      </div>
    </div>
  );
}
