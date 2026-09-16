"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { GroupIcon } from "@/components/ui/Icons";
import { Modal, Sheet } from "@/components/ui/Overlay";
import { useBooking } from "@/lib/booking-store";

export function GroupNotice({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { acknowledgeGroup } = useBooking();
  const router = useRouter();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 759px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function continueGroup() {
    acknowledgeGroup();
    onClose();
  }

  function viewMenu() {
    acknowledgeGroup();
    onClose();
    router.push("/menu");
  }

  const body = (
    <>
      <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-surface">
        <GroupIcon className="text-terracotta" />
      </div>
      <h2 id="group-notice-title" className="font-display text-[34px] font-light leading-[1.15] md:text-[38px]">
        Planning something bigger?
      </h2>
      <p className="mt-4 font-ui text-[16px] font-light leading-relaxed text-muted md:text-[18px]">
        For groups larger than 10, we ask guests to pre-order their meals so our kitchen can prepare for your visit. It takes a few minutes and you can change it later.
      </p>
      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <Button onClick={continueGroup}>Continue Group Booking</Button>
        <Button variant="secondary" onClick={viewMenu}>
          View Menu
        </Button>
      </div>
    </>
  );

  if (mobile) {
    return (
      <Sheet open={open} onClose={continueGroup} labelledBy="group-notice-title">
        {body}
      </Sheet>
    );
  }

  return (
    <Modal open={open} onClose={continueGroup} labelledBy="group-notice-title">
      {body}
    </Modal>
  );
}
