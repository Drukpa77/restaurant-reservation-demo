"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { TickIcon } from "./Icons";

type ToastItem = {
  id: number;
  message: string;
};

type ToastContextValue = {
  toast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-6 right-6 z-[60] flex flex-col gap-3"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((item) => (
          <Toast key={item.id} message={item.message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context.toast;
}

export function Toast({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-2.5 rounded-slot bg-ink px-4 py-[13px] font-ui text-small text-cream shadow-float",
        className,
      )}
      role="status"
    >
      <TickIcon size={15} className="text-success-accent" />
      {message}
    </div>
  );
}
