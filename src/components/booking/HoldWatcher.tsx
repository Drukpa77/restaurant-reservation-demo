"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { useBooking } from "@/lib/booking-store";

export function HoldWatcher() {
  const { draft, expireHold } = useBooking();
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const expired = useRef(false);

  useEffect(() => {
    if (!draft.holdExpiresAt) {
      expired.current = false;
      return;
    }
    const id = window.setInterval(() => {
      if (draft.status === "confirmed" || pathname === "/book/confirmed") return;
      if (draft.holdExpiresAt && Date.now() >= draft.holdExpiresAt && !expired.current) {
        expired.current = true;
        expireHold();
        toast("Your hold expired — times refreshed");
        if (pathname.startsWith("/book") && pathname !== "/book") {
          router.push("/book");
        }
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [draft.holdExpiresAt, draft.status, expireHold, toast, pathname, router]);

  return null;
}
