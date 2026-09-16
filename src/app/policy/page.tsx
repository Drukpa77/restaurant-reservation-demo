import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";

export default function PolicyPage() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <article className="mx-auto max-w-[720px] px-5 py-16 md:px-gutter">
        <p className="font-ui text-[12px] uppercase tracking-eyebrow text-terracotta">House rules</p>
        <h1 className="mt-3 font-display text-[42px] font-light">Reservation policy</h1>
        <div className="mt-8 space-y-6 font-ui text-[17px] font-light leading-relaxed text-ink-alt">
          <p>We hold your table for 10 minutes while you finish guest details. After that, times refresh and the slot may be taken.</p>
          <p>Changes and cancellations can be made until 24 hours before your sitting, using the booking reference we text and email you.</p>
          <p>Groups larger than 10 dine at the communal long table (max 14). A meal pre-order helps the kitchen serve everyone together. You can complete it later, up to 48 hours before.</p>
          <p>We keep tables for 15 minutes past the reserved time. After that we may release the booking to walk-ins.</p>
          <p>A mobile number is required. Confirmations and reminders are sent by SMS and email.</p>
        </div>
        <Button className="mt-10" href="/book">
          Book a Table
        </Button>
      </article>
      <SiteFooter />
    </div>
  );
}
